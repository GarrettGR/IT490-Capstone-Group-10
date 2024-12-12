#!/usr/bin/env php

<?php

if (defined('RABBITMQ_PROXY_INCLUDED')) return;
define('RABBITMQ_PROXY_INCLUDED', true);

class RMQClient {
  private $connection;
  private $channel;
  private $request_queue;
  private $response_queue;
  private $pending_requests = [];

  public function __construct() {
    $this->connect();
    register_shutdown_function([$this, 'close']);
  }

  private function connect() {
    try {
      $this->connection = new AMQPConnection();
      $this->connection->setHost('10.0.0.11');
      $this->connection->setPort(5672);
      $this->connection->setLogin('admin');
      $this->connection->setPassword(getenv('rmq_passwd'));
      $this->connection->connect();
      $this->channel = new AMQPChannel($this->connection);

      $exchange = new AMQPExchange($this->channel);
      $exchange->setName('applicare');
      $exchange->setType(AMQP_EX_TYPE_DIRECT);
      $exchange->setFlags(AMQP_DURABLE);
      $exchange->declareExchange();

      $frontend_queue = new AMQPQueue($this->channel);
      $frontend_queue->setName('frontend_queue');
      $frontend_queue->setFlags(AMQP_DURABLE);
      $frontend_queue->setArguments([
        'x-queue-type' => 'quorum',
        'x-message-ttl' => 60000
      ]);
      $frontend_queue->declareQueue();
      $frontend_queue->bind('applicare', 'frontend');

      $this->exchange = $exchange;
      $this->frontend_queue = $frontend_queue;

      $this->frontend_queue->consume(function($message) {
        $correlation_id = $message->getCorrelationId();
        if (isset($this->pending_requests[$correlation_id])) {
          $response = json_decode($message->getBody(), true);
          call_user_func($this->pending_requests[$correlation_id], $response);
          unset($this->pending_requests[$correlation_id]);
        }
        $message->ack();
      });
    } catch (AMQPException $e) {
      error_log("RabbitMQ connection error: " . $e->getMessage());
      throw $e;
    }
  }

  public function sendRequest($body, $destination = 'backend') {
    try {
      $correlation_id = $this->getUniqueId();
      $message_body = is_string($body) ? $body : json_encode($body);
          
      $message = new AMQPMessage($message_body, [
        'correlation_id' => $correlation_id,
        'delivery_mode' => 2
      ]);
          
      $this->exchange->publish(
        $message_body,
        $destination,
        AMQP_NOPARAM,
        [
          'correlation_id' => $correlation_id,
          'delivery_mode' => 2
        ]
      );
  
      error_log("Published message with correlation_id: $correlation_id to $destination");
      return $correlation_id;
    } catch (Exception $e) {
      error_log("Error sending request: " . $e->getMessage());
      throw $e;
    }
  }

  public function waitForResponse($correlation_id, $timeout = 30) {
    $response = null;
    $this->pending_requests[$correlation_id] = function($data) use (&$response) { 
      error_log("Received response for correlation_id: $correlation_id");
      $response = $data; 
    };
    $start = time();

    while ($response === null && (time() - $start) < $timeout) {
      try {
        $this->response_queue->consume(null, AMQP_NOPARAM, 1);
      } catch (Exception $e) {
        error_log("Error in consume: " . $e->getMessage());
      }
    }
    if ($response === null) {
      error_log("Timeout waiting for response to correlation_id: $correlation_id");
    }

    unset($this->pending_requests[$correlation_id]);
    return $response;
  }

  private function getUniqueId() {
    return uniqid() . bin2hex(random_bytes(8));
  }

  public function close() {
    if ($this->channel) {
      $this->channel->close();
    }
    if ($this->connection) {
      $this->connection->close();
    }
  }

  public function queryDatabase($query) {
    $message = ['query' => $query];
    $correlation_id = $this->sendRequest($message, 'DB');
    return $this->waitForResponse($correlation_id);
  }

  public function sendToBackend($data) {
    $correlation_id = $this->sendRequest($data, 'BE');
    return $this->waitForResponse($correlation_id);
  }
}

if (basename($_SERVER['SCRIPT_FILENAME']) == basename(__FILE__)) {
  if (php_sapi_name() === 'cli') {
    if ($argc < 2) {
      echo "Usage: php rabbitmq-proxy.php <message> <destination>\n";
      echo "Example: php rabbitmq-proxy.php '{\"query\":\"SELECT * FROM users\"}' DB\n";
      exit(1);
    }

    $rmq = new RMQClient();
    
    try {
      $message = json_decode($argv[1], true);
      if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON message provided");
      }

      $destination = isset($argv[2]) ? $argv[2] : 'BE';
      echo "Sending message to $destination...\n";
      $correlation_id = $rmq->sendRequest($message, $destination);        
 
      echo "Waiting for response...\n";
      $response = $rmq->waitForResponse($correlation_id);    
      if ($response) {
        echo "Response received:\n";
        echo json_encode($response, JSON_PRETTY_PRINT) . "\n";
        exit(0);
      } else {
        echo "Error: Request timed out\n";
        exit(1);
      }
        
    } catch (Exception $e) {
      echo "Error: " . $e->getMessage() . "\n";
      exit(1);
    }
  } else {
    try {
      $rmq = new RMQClient();
      $input = json_decode(file_get_contents('php://input'), true);
        
      if (!$input) {
        throw new Exception("Invalid JSON input");
      }
        
      $correlation_id = $rmq->sendRequest($input);
      $response = $rmq->waitForResponse($correlation_id);
        
      if ($response) {
        http_response_code(200);
      } else {
        http_response_code(500);
        $response = ['error' => 'Request timed out'];
      }

      header('Content-Type: application/json');
      echo json_encode($response);

    } catch (Exception $e) {
      http_response_code(500);
      echo json_encode(['error' => $e->getMessage()]);
    }
  }
}