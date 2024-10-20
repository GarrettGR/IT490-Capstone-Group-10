#!/usr/bin/env python3

import pika
import json
import threading
# import sys
# import os
# import datetime
# import passlib
# import beautifulsoup

connection = pika.BlockingConnection(pika.ConnectionParameters('100.118.142.26'))
channel = connection.channel()

channel.queue_declare(queue='request_queue')  # request queue (combined)
channel.queue_declare(queue='response_queue')  # response queue (combined)

def handle_fe_request(payload):
  print(f"Processing frontend request: {payload}")
  if 'db_query' in payload:
    send_message('request', 'DB', payload['db_query'])
  else:
    response = {"message": "Processed frontend request successfully"}
    send_message('response', 'FE', response)

def handle_db_response(payload):
  print(f"Processing database response: {payload}")
  response = {"message": "Processed database response successfully"}
  send_message('response', 'FE', response)

def send_message(message_type, destination, response):
  message = json.dumps({"to": destination, "from": "BE", "payload": response})
  channel.basic_publish(exchange='', routing_key=f"{message_type}_queue", body=message)
  print(f"Sent {message_type} to {destination}: {response}")

def listen_for_messages(message_type):
  def callback(ch, method, properties, body):
    message = json.loads(body)
    print(f"Received request: {message}")
    if message['to'] == 'BE':
      if message['from'] == 'FE':
        handle_fe_request(message['payload'])
      elif message['from'] == 'DB':
        handle_db_response(message['payload'])
  channel.basic_consume(queue=f"{message_type}_queue", on_message_callback=callback, auto_ack=True)
  print('Waiting for requests...')
  channel.start_consuming()

request_thread = threading.Thread(target=listen_for_messages("request"))
response_thread = threading.Thread(target=listen_for_messages("response"))

request_thread.start()
response_thread.start()

request_thread.join()
response_thread.join()
