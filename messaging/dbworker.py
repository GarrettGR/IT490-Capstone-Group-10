import pika
import pymysql
import json

def consume_db_queries():
  connection = pika.BlockingConnection(pika.ConnectionParameters('100.118.142.26'))
  channel = connection.channel()

  # Declare the database request queue
  channel.queue_declare(queue='backend_db_queue')

  # Declare the response queue
  channel.queue_declare(queue='db_response_queue')

  def callback(ch, method, properties, body):
    message = json.loads(body)
    query = message['query']
    print(f"Executing query: {query}")

    # Execute query on the actual database
    result = execute_query(query)  # Function to execute query using pymysql

    # Send response back to RabbitMQ
    response_message = json.dumps({"result": result})
    channel.basic_publish(exchange='', routing_key='db_response_queue', body=response_message)

  # Start consuming database queries
  channel.basic_consume(queue='backend_db_queue', on_message_callback=callback, auto_ack=True)
  print('Waiting for database queries...')
  channel.start_consuming()

def execute_query(query):
  connection = pymysql.connect(host='localhost', user='admin', password='student123', db='applicare')
  with connection.cursor() as cursor:
    cursor.execute(query)
    result = cursor.fetchall()
  connection.close()
  return result

consume_db_queries()
