#!/usr/bin/env python3

import aio_pika
import json
import asyncio
# import os
# import datetime
# import beautifulsoup

async def handle_fe_request(payload):
  print(f"Processing frontend request: {payload}")
  if 'db_query' in payload:
    await send_message('request', 'DB', payload['db_query'])
  else:
    response = {"message": "Processed frontend request successfully"}
    await send_message('response', 'FE', response)

async def handle_db_response(payload):
  print(f"Processing database response: {payload}")
  response = {"message": "Processed database response successfully"}
  await send_message('FE', response)

async def send_message(destination, payload):
  message = json.dumps({'to': destination, 'from': 'BE', 'payload': payload})
  async with aio_pika.connect("amq://guest:guest@100.118.142.26/") as connection:
    async with connection.channel() as channel:
      await channel.default_exchange.publish(
        aio_pika.Message(body=message.encode()),
        routing_key='response_queue' if destination == 'FE' else 'request_queue',
      )

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

async def listen_for_messages():
  connection = await aio_pika.connect("amqp://guest:guest@100.118.142.26/")
  async with connection:
    async with connection.channel() as channel:
      await channel.set_qos(prefetch_count=1)
      async def callback(message: aio_pika.IncomingMessage):
        async with message.process():
          msg = json.loads(message.body)
          print(f"Received request: {msg}")
          if msg['to'] == 'BE':
            if msg['from'] == 'FE':
              await handle_fe_request(msg['payload'])
            elif msg['from'] == 'DB':
              await handle_db_response(msg['payload'])
      await channel.basic_consume("request_queue", callback)
      await channel.basic_consume("response_queue", callback)

async def main():
  await listen_for_messages()

if __name__ == "__main__":
  asyncio.run(main())
