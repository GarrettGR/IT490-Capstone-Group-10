#!/usr/bin/env python3

import pika
import os
import json
import mysql.connector
from mysql.connector import pooling

db_config = {
    'user': 'admin',
    'password': os.environ['db_passwd'],
    'host': 'localhost',
    'database': 'applicare'
}

pool = pooling.MySQLConnectionPool(pool_name="db_pool", pool_size=5, **db_config)

connection = pika.BlockingConnection(pika.ConnectionParameters('100.118.142.26'))
channel = connection.channel()

channel.queue_declare(queue='request_queue')
channel.queue_declare(queue='response_queue')

def listen_for_requests():
  def callback(ch, method, properties, body):
    request = json.loads(body)
    print(f"Received query from backend: {request}")
    if request['to'] == 'DB':
      execute_query(request['payload'])
  channel.basic_consume(queue='request_queue', on_message_callback=callback, auto_ack=True)
  print('Waiting for database queries...')
  channel.start_consuming()

def execute_query(payload):
  try:
    db_connection = pool.get_connection()
    cursor = db_connection.cursor()
    cursor.execute(payload['query'])
    results = cursor.fetchall()
    send_db_response(results)
  except mysql.connector.Error as err:
    print(f"Error: {err}")
    send_db_response({"error": str(err)})
  finally:
    cursor.close()
    db_connection.close()

def send_db_response(response):
  message = json.dumps({"from": "DB", "to":"BE", "payload": response})
  channel.basic_publish(exchange='', routing_key='response_queue', body=message)
  print(f"Sent response to backend: {response}")

listen_for_requests()
