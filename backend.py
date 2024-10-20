#!/usr/bin/env python3

import aio_pika
import json
import asyncio
import uuid  # Import uuid to generate unique tags

async def handle_fe_request(payload):
    print(f"Processing frontend request: {payload}")
    if 'db_query' in payload:
        tag = str(uuid.uuid4())  # generate the unique tag
        await send_message('request', 'DB', payload['db_query'], tag)  # pass the tag
    else:
        response = {"message": "Processed frontend request successfully"}
        await send_message('response', 'FE', response)

async def handle_db_response(payload):
    print(f"Processing database response: {payload}")
    response = {"message": "Processed database response successfully"}
    await send_message('FE', response)

async def send_message(destination, payload, tag=None):
    message = json.dumps({'to': destination, 'from': 'BE', 'payload': payload, 'tag': tag})  # tag included
    async with aio_pika.connect("amqp://guest:guest@100.118.142.26/") as connection:
        async with connection.channel() as channel:
            await channel.default_exchange.publish(
                aio_pika.Message(body=message.encode()),
                routing_key='response_queue' if destination == 'FE' else 'request_queue',
            )

async def listen_for_messages():
    async with aio_pika.connect("amqp://guest:guest@100.118.142.26/") as connection:
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
