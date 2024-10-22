#!/usr/bin/env python3

import aio_pika
import json
import asyncio
import os

async def handle_fe_request(body, correlation_id):
  print(f"Processing frontend request: {correlation_id}")
  if 'query' in body:
    await send_message('DB', body, correlation_id)
  else:
    processed_response = json.dumps({'message': 'sent successfully'})
    await send_message('FE', processed_response, correlation_id)

async def handle_db_response(body, correlation_id):
  print(f"Processing database response: {correlation_id}")
  processed_response = json.dumps({'message': 'Processed database response successfully', 'body': body})
  await send_message('FE', processed_response, correlation_id)

async def send_message(destination, body, correlation_id):
  message = json.dumps(body)
  async with aio_pika.connect(f"amq://admin:{os.environ['rmq_passwd']}@100.118.142.26/") as connection:
    async with connection.channel() as channel:
      await channel.default_exchange.publish(
        aio_pika.Message(
          body=message.encode(),
          correlation_id=correlation_id,
          headers={'to': destination, 'from': 'BE'}
        ),
        routing_key='response_queue' if destination == 'FE' else 'request_queue',
      )

async def listen_for_messages():
  connection = await aio_pika.connect(f"amqp://admin:{os.environ['rmq_passwd']}@100.118.142.26/")
  async with connection:
    async with connection.channel() as channel:
      await channel.set_qos(prefetch_count=3)
      async def callback(message: aio_pika.IncomingMessage):
        try:
          raw_body = message.body.decode()
          print(f"Received raw message body: {raw_body}")
          msg = json.loads(raw_body)
          print(f"Decoded message: {msg}")
          if message.headers.get('to') != 'BE':
            print(f"Message not for this machine. Requeueing...")
            await message.reject(requeue=True)
            return
          if message.headers.get('from') == 'FE':
            await handle_fe_request(msg, message.correlation_id)
          elif message.headers.get('from') == 'DB':
            await handle_db_response(msg, message.correlation_id)
        except json.JSONDecodeError as e:
          print(f"JSON decoding error: {e}")
          await message.nack(requeue=True)
        except aio_pika.exceptions.MessageProcessError as e:
          print(f"Message processing error: {e}")
        except Exception as e:
          print(f"Error processing message: {e}")
          await message.nack(requeue=True)
      request_queue = await channel.declare_queue('request_queue', durable=True, arguments={'x-message-ttl': 60_000})
      response_queue = await channel.declare_queue('response_queue', durable=True, arguments={'x-message-ttl': 60_000})
      await request_queue.consume(callback, no_ack=False)
      await response_queue.consume(callback, no_ack=False)
      print("Waiting for messages...")
      await asyncio.Future()

async def main():
  await listen_for_messages()

if __name__ == "__main__":
  asyncio.run(main())