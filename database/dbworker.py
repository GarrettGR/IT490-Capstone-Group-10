#!/usr/bin/env python3

import pika
import os
import json
import mysql.connector
from mysql.connector import pooling
from datetime import datetime

db_config = {
    'user': 'admin',
    'password': os.environ['mdb_passwd'],
    'host': os.environ['mdb_ip'],
    'database': 'applicare',
    'ssl_disabled': True
}

try:
  conn = mysql.connector.connect(**db_config)
  print("Successfully connected to database")
  conn.close()
except mysql.connector.Error as err:
  print(f"Error: {err}")

pool = pooling.MySQLConnectionPool(pool_name="db_pool", pool_size=5, **db_config)

connection = pika.BlockingConnection(pika.ConnectionParameters(os.environ['rmq_ip'], credentials=pika.PlainCredentials('admin', os.environ['rmq_passwd'])))
channel = connection.channel()

channel.queue_declare(queue='request_queue', durable=True, arguments={'x-message-ttl':60_000, 'x-queue-type': 'quorum'})
channel.queue_declare(queue='response_queue', durable=True, arguments={'x-message-ttl':60_000, 'x-queue-type': 'quorum'})

def listen_for_requests():
  def callback(ch, method, properties, body):
    try:
      request = json.loads(body)
      print(f"Received message: {request}")
      if properties.headers.get('to') != 'DB':
        print(f"Message not for this machine. Requeueing...")
        ch.basic_reject(delivery_tag=method.delivery_tag, requeue=True)
        return
      execute_query(request, properties.correlation_id)
      ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
      print(f"Error processing message: {e}")
      ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)
  channel.basic_consume(queue='request_queue', on_message_callback=callback, auto_ack=False)
  print('Waiting for database queries...')
  channel.start_consuming()

def serialize_row(row):
  return [item.isoformat() if isinstance(item, datetime) else item for item in row]

def execute_query(body, correlation_id):
  try:
    db_connection = pool.get_connection()
    cursor = db_connection.cursor()
    cursor.execute(body['query'])
    if cursor.description is None:
      affected_rows = cursor.rowcount
      if affected_rows > 0:
        db_connection.commit()
        send_db_response({"status": "success", "affected_rows": affected_rows}, correlation_id)
      else:
        send_db_response({"status": "error", "message": "No rows affected."}, correlation_id)
    else:
      results = cursor.fetchall()
      print(f"Query results: {results}")
      serialized_results = [serialize_row(row) for row in results]
      send_db_response({"status": "success", "results": serialized_results}, correlation_id)
  except mysql.connector.Error as err:
    print(f"Error: {err}")
    send_db_response({"error": str(err)}, correlation_id)
  finally:
    cursor.close()
    db_connection.close()

def send_db_response(response, correlation_id):
  message = json.dumps({"body": response})
  try:
    channel.basic_publish(exchange='', routing_key='response_queue', body=message, 
                          properties=pika.BasicProperties(correlation_id=correlation_id,
                                                          headers={'to': 'BE', 'from':'DB' }))
    print(f"Sent response to backend: {response}")
  except Exception as e:
    print(f"Error sending response: {e}")

listen_for_requests()
