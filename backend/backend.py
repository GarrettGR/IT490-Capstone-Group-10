#!/usr/bin/env python3

import aio_pika
import json
import asyncio
import os
# import datetime
# import beautifulsoup

async def handle_fe_request(payload, correlation_id):
  print(f"Processing frontend request: {payload}")
  # Process the message
    # send a query to DB if needed:
    # await send_message('DB', db_query_payload, correlation_id)
  processed_response = json.dumps({'message': 'sent successfully'})
  await send_message('FE', processed_response, correlation_id)

async def handle_db_response(payload, correlation_id):
  print(f"Processing database response: {payload}")
  # Process the response from the database...
  processed_response = json.dumps({'message': 'Processed database response successfully'})
  await send_message('FE', processed_response, correlation_id)

async def send_message(destination, payload, correlation_id):
  message = json.dumps({'payload': payload})
  async with aio_pika.connect(f"amq://admin:{os.environ['rmq_passwd']}@100.118.142.26/") as connection:
    async with connection.channel() as channel:
      await channel.default_exchange.publish(
        aio_pika.Message(body=message.encode(),
                         correlation_id=correlation_id,
                         headers={'to':destination, 'from': 'BE'},
        routing_key='response_queue' if destination == 'FE' else 'request_queue',
      ))

async def listen_for_messages():
  connection = await aio_pika.connect(f"amqp://admin:{os.environ['rmq_passwd']}@100.118.142.26/")
  async with connection:
    async with connection.channel() as channel:
      await channel.set_qos(prefetch_count=3)
      async def callback(message: aio_pika.IncomingMessage):
        async with message.process():
          try:
            msg = json.loads(message.body)
            print(f"Received request: {msg}")
            if message.headers.get('to') != 'BE':
              print(f"Message not for this machine. Requeueing...")
              await message.reject(requeue=True)
              return
            if msg['from'] == 'FE':
              await handle_fe_request(msg['payload'], message.correlation_id)
            elif msg['from'] == 'DB':
              await handle_db_response(msg['payload'], message.correlation_id)
            await message.ack()
          except Exception as e:
            print(f"Error processing message: {e}")
            message.nack(requeue=True)
      request_queue = await channel.declare_queue('request_queue', arguments={'x-message-ttl':60_000})
      response_queue = await channel.declare_queue('response_queue', arguments={'x-message-ttl':60_000})
      await request_queue.consume(callback, no_ack=False)
      await response_queue.consume(callback, no_ack=False)
      print("Wating for messages...")
      await asyncio.Future() # is this needed?

async def main():
  await listen_for_messages()

if __name__ == "__main__":
  asyncio.run(main())
