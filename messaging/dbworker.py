#!/usr/bin/env python3

import pika
import os
import json
import mysql.connector

db_config = {
    'user': 'admiin',
    'password': os.environ['db_passwd'],
    'host': 'localhost',
    'database': 'applicare'
}

connection = pika.BlockingConnection(pika.ConnectionParameters('100.118.142.26'))
channel = connection.channel()

channel.queue_declare(queue='request_queue')
channel.queue_declare(queue='response_queue')

def listen_for_requests():
  def callback(ch, method, properties, body):
    request = json.loads(body)
    print(f"Received query from backend: {request}")
    if request['to'] == 'DB':
      execute_query(request['query'])
  channel.basic_consume(queue='request_queue', on_message_callback=callback, auto_ack=True)
  print('Waiting for database queries...')
  channel.start_consuming()

def execute_query(query):
  try:
    db_connection = mysql.connector.connect(**db_config)
    cursor = db_connection.cursor()
    cursor.execute(query)
    results = cursor.fetchall()
    send_db_response(results)
    cursor.close()
    db_connection.close()
  except mysql.connector.Error as err:
    print(f"Error: {err}")
    send_db_response({"error": str(err)})

def send_db_response(response):
  message = json.dumps({"from": "DB", "to":"BE", "payload": response})
  channel.basic_publish(exchange='', routing_key='response_queue', body=message)
  print(f"Sent response to backend: {response}")

listen_for_requests()
