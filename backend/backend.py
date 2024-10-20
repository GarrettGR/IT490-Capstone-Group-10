#!/usr/bin/env python3

import pika
import json
import sys
import os
import threading
# import datetime
# import passlib
# import beautifulsoup

connection = pika.BlockingConnection(pika.ConnectionParameters('100.118.142.26'))
channel = connection.channel()

channel.queue_declare(queue='fe_to_be')
channel.queue_declare(queue='be_to_fe')
channel.queue_declare(queue='db_to_be')
channel.queue_declare(queue='be_to_db')

def listen_for_fe_request():
  def callback(ch, method, properties, body):
    request = json.loads(body)
    print(f"Received request from frontend: {request}")
  channel.basic_consume(queue='fe_to_be', on_message_callback=callback, auto_ack=True)
  print('Waiting for frontend requests...')
  channel.start_consuming()

def send_fe_response(response):
  message = json.dumps({"response": response})
  channel.basic_publish(exchange='', routing_key='be_to_fe', body=message)
  print(f"Send response to frontend: {response}")

def send_db_query(query):
  message = json.dumps({"query": query})
  channel.basic_publish(exchange='', routing_key='be_to_db', body=message)
  print(f"Sent DB query: {query}")


def listen_for_db_response():
  def callback(ch, method, properties, body):
    response = json.loads(body)
    print(f"Received response from DB: {response}")
  channel.basic_consume(queue='db_to_be', on_message_callback=callback, auto_ack=True)
  print('Waiting for database responses...')
  channel.start_consuming()

fe_thread = threading.Thread(target=listen_for_fe_request)
db_thread = threading.Thread(target=listen_for_db_response)

fe_thread.start()
db_thread.start()

fe_thread.join()
db_thread.join()
