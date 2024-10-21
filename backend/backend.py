#!/usr/bin/env python3

import aio_pika
import json
import asyncio
import os
# import datetime
# import beautifulsoup

async def handle_fe_request(payload):
  print(f"Processing frontend request: {payload}")
  # Process the message
    # send a query to DB if needed:
    # await send_message('request', 'DB', db_query_payload)
    await send_message('response', 'FE', {'message': 'sent successfully'})

async def handle_db_response(payload):
  print(f"Processing database response: {payload}")
  response = {'message": "Processed database response successfully'}
  await send_message('response', 'FE', response)

async def send_message(destination, payload):
  message = json.dumps({'to': destination, 'from': 'BE', 'payload': payload})
  async with aio_pika.connect(f"amq://admin:{os.environ['rmq_passwd']}@100.118.142.26/") as connection:
    async with connection.channel() as channel:
      await channel.default_exchange.publish(
        aio_pika.Message(body=message.encode()),
        routing_key='response_queue' if destination == 'FE' else 'request_queue',
      )

async def listen_for_messages():
  connection = await aio_pika.connect(f"amqp://admin:{os.environ['rmq_passwd']}@100.118.142.26/")
  async with connection:
    async with connection.channel() as channel:
      await channel.set_qos(prefetch_count=1)
      async def callback(message: aio_pika.IncomingMessage):
        async with message.process():
          msg = json.loads(message.body)
          print(f"Received request: {msg}")
          if msg['to'] == 'BE':
            if msg['from'] == 'FE':
              await handle_fe_request(msg['payload'], message.correlation_id)
            elif msg['from'] == 'DB':
              await handle_db_response(msg['payload'], message.correlation_id)
      # await channel.consume("request_queue", callback)
      # await channel.consume("response_queue", callback)
      request_queue = await channel.declare_queue('request_queue')
      response_queue = await channel.declare_queue('response_queue')
      await request_queue.consume(callback, no_ack=True)
      await response_queue.consume(callback, no_ack=True)
      print("Wating for messages...")
      await asyncio.Future() # is this needed?

async def main():
  await listen_for_messages()

if __name__ == "__main__":
  asyncio.run(main())
