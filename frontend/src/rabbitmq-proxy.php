#!/usr/bin/env php

<?php

if (!extension_loaded('amqp')) {
  die("AMQP extension is not loaded. Please install php-amqp package.\n");
}

$env = file_get_contents("/root/Capstone-Group-10/.env");
$lines = explode("\n",$env);

foreach($lines as $line){
  preg_match("/([^#]+)\=(.*)/",$line,$matches);
  if(isset($matches[2])){ putenv(trim($line)); }
} # SOURCE: https://stackoverflow.com/questions/67963371/load-a-env-file-with-php
#NOTE: I could use parse_ini or otherwise create a worse solution for parsing the .env file, but this one is how I would do it, and it just so happens that someone has already done it and posted about it online before too

if (defined('RABBITMQ_PROXY_INCLUDED')) return;
define('RABBITMQ_PROXY_INCLUDED', true);

class RMQClient {
  private $connection;
  private $channel;
  private $exchange;
  private $frontend_queue;
  private $pending_requests = [];

  public function __construct() {
    $this->connect();
    register_shutdown_function([$this, 'close']);
  }

  private function connect() {
    try {
      $this->connection = new AMQPConnection([
        'host' => '10.0.0.11',
        'port' => 5672,
        'login' => 'admin',
        'password' => getenv('rmq_passwd')
      ]);
      $this->connection->connect();
      $this->channel = new AMQPChannel($this->connection);

      $this->exchange = new AMQPExchange($this->channel);
      $this->exchange->setName('applicare');
      $this->exchange->setType(AMQP_EX_TYPE_DIRECT);
      $this->exchange->setFlags(AMQP_DURABLE);
      $this->exchange->declareExchange();

      $this->frontend_queue = new AMQPQueue($this->channel);
      $this->frontend_queue->setName('frontend_queue');
      $this->frontend_queue->setFlags(AMQP_DURABLE);
      $this->frontend_queue->setArguments([
        'x-queue-type' => 'quorum',
        'x-message-ttl' => 60000
      ]);
      $this->frontend_queue->declareQueue();
      $this->frontend_queue->bind('applicare', 'frontend');

    } catch (AMQPException $e) {
      error_log("RabbitMQ connection error: " . $e->getMessage());
      throw $e;
    }
  }

  public function sendRequest($body, $destination = 'backend') {
    try {
      $correlation_id = $this->getUniqueId();
      $message_body = is_string($body) ? $body : json_encode($body);

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
    $start = time();
    $response = null;
    $processed_messages = [];

    while ($response === null && (time() - $start) < $timeout) {
      try {
        while ($message = $this->frontend_queue->get(AMQP_AUTOACK)) {
          $msg_correlation_id = $message->getCorrelationId();
 
          if ($msg_correlation_id !== $correlation_id) {
            if (!in_array($msg_correlation_id, $processed_messages)) {
              $processed_messages[] = $msg_correlation_id;
              $this->frontend_queue->nack($message->getDeliveryTag(), AMQP_REQUEUE);
            }
            continue;
          }

          $response = json_decode($message->getBody(), true);
          $this->frontend_queue->ack($message->getDeliveryTag());
          break;
        }

        if ($response === null) {
          usleep(100000);
        }
      } catch (Exception $e) {
        error_log("Error in consume: " . $e->getMessage());
      }
    }
    if ($response === null) {
      error_log("Timeout waiting for response to correlation_id: $correlation_id");
    }

    return $response;
  }

  private function getUniqueId() {
    return uniqid() . bin2hex(random_bytes(8));
  }

  public function close() {
    if ($this->channel) {
      $this->channel = null;
    }
    if ($this->connection) {
      $this->connection->disconnect();
    }
  }

  public function queryDatabase($query) {
    $message = ['query' => $query];
    $correlation_id = $this->sendRequest($message, 'database');
    return $this->waitForResponse($correlation_id);
  }

  public function sendToBackend($data) {
    $correlation_id = $this->sendRequest($data, 'backend');
    return $this->waitForResponse($correlation_id);
  }
}

if (basename($_SERVER['SCRIPT_FILENAME']) == basename(__FILE__)) {
  if (php_sapi_name() === 'cli') {
    if ($argc < 2) {
      echo "Usage: rmq_proxy <message> <destination>\n";
      echo "Example: rmq_proxy '{\"query\":\"SELECT * FROM appliances\"}' database\n";
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
