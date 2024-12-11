<?php
require_once __DIR__ . '/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQPublisher {
  private $connection;
  private $channel;

  public function __construct($hosts) {
    shuffle($hosts);
    foreach ($hosts as $host) {
      try {
        $this->connection = new AMQPStreamConnection($host, 5672, 'admin', 'student123'); //TODO: This should be moved to environment variables...
        $this->channel = $this->connection->channel();
        break;
      } catch (\Exception $e) {
        continue;
      }
    }
    $this->channel->queue_declare('request_queue', false, true, false, false, false, [
      'x-queue-type' => 'quorum',
      'x-message-ttl' => 60000
    ]);
    $this->channel->queue_declare('response_queue', false, true, false, false, false, [
      'x-queue-type' => 'quorum',
      'x-message-ttl' => 60000
    ]);
  }

  public function publish($message, $correlationId) {
    $msg = new AMQPMessage(json_encode($message),
      [
        'correlation_id' => $correlationId,
        'headers' => [
          'to' => 'BE',
          'from' => 'FE'
        ],
        'delivery_mode' => 2 
      ]
    );
    $this->channel->basic_publish($msg, '', 'request_queue');
  }

  public function close() {
    $this->channel->close();
    $this->connection->close();
  }
}

$rmq = new RabbitMQPublisher(['droplet-01', 'droplet-02', 'droplet-03']);
