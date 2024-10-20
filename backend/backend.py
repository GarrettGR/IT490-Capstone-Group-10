#!/usr/bin/env python3

import pika
import sys
import os
import passlib

print("hello")

connection = pika.BlockingConnection(pika.ConnectionParameters('100.118.142.26'))
channel = connection.channel()

# Declare an exchange and queue
channel.exchange_declare(exchange='test_exchange', exchange_type='direct')
channel.queue_declare(queue='backend')

# Producer: publish message to the exchange
channel.basic_publish(exchange='test_exchange', routing_key='backend', body='Hello from backend!')

# Consumer: consume messages from the queue
def callback(ch, method, properties, body):
    print("Received: %r" % body)

channel.basic_consume(queue='backend', on_message_callback=callback, auto_ack=True)
channel.start_consuming()
