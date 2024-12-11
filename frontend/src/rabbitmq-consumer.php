<?php
require_once __DIR__ . '/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQConsumer {
  private $connection;
  private $channel;
  private $hosts;

  public function __construct($hosts) {
    $this->hosts = $hosts;
    $this->connect();
  }

  private function connect() {
    shuffle($this->hosts);
    foreach ($this->hosts as $host) {
      try {
        $this->connection = new AMQPStreamConnection($host, 5672, 'admin', 'student123', '/', false, 'AMQPLAIN', null, 'en_US', 3.0, 3.0, null, true,  60);
        $this->channel = $this->connection->channel();
        $this->channel->queue_declare('response_queue', false, true, false, false, false, ['x-queue-type' => 'quorum', 'x-message-ttl' => 60000]);
        $this->channel->basic_qos(null, 1, null);
        return;
      } catch (\Exception $e) {
        continue;
      }
    }
    throw new \Exception("Could not connect to any RabbitMQ nodes");
  }

  public function consume($callback) {
    try {
      $this->channel->basic_consume('response_queue', '', false, false, false, false, 
        function($msg) use ($callback) {
          try {
            $headers = $msg->get_properties()->get_headers();
            if ($headers['to'] === 'FE') {
              $data = json_decode($msg->body, true);
              $callback($data, $msg->get('correlation_id'));
            }
            $msg->delivery_info['channel']->basic_ack($msg->delivery_info['delivery_tag']);
          } catch (\Exception $e) {
            $msg->delivery_info['channel']->basic_nack($msg->delivery_info['delivery_tag'], false, true);
          }
        }
      );
      while ($this->channel && $this->channel->is_open()) {
        $this->channel->wait();
      }
    } catch (\Exception $e) {
      $this->reconnect();
    }
  }

  private function reconnect() {
    $this->close();
    sleep(5);
    $this->connect();
  }

  public function close() {
    if ($this->channel) {
      $this->channel->close();
    }
    if ($this->connection) {
      $this->connection->close();
    }
  }
}

$consumer = new RabbitMQConsumer(['droplet-01', 'droplet-02', 'droplet-03']);

$consumer->consume(function($data, $correlationId) {
  echo "Received message with correlation ID: $correlationId\n";
  echo "Data: " . print_r($data, true) . "\n";
});
