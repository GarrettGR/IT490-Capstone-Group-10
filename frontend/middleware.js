#!/usr/bin/node

const express = require('express')
const amqp = require('amqplib')
const { parse } = require('querystring')

const app = express()
app.use(express.json())

const rmq_user = "admin"
const rmq_ip = "100.118.142.26"
const rmq_port = 5672
const rmq_url = `amqp://${rmq_user}:${process.env.rmq_passwd}@${rmq_ip}:${rmq_port}`

let connection;
let channel;
const pendingRequests = {}

async function init_rmq() {
  connection = await amqp.connect(rmq_url)
  channel = await connection.createChannel()
  await channel.assertQueue('request_queue', { durable: true, arguments: { 'x-message-ttl': 60000 } })
  await channel.assertQueue('response_queue', { durable: true, arguments: { 'x-message-ttl': 60000 } })
  channel.consume('response_queue', (message) => {
    const correlation_id = message.properties.correlationId
    const response = JSON.parse(message.content.toString())
    if (pendingRequests[correlation_id]) {
      pendingRequests[correlation_id](response)
      delete pendingRequests[correlation_id]
    }
    channel.ack(message)
  }, { noAck: false });
}

async function rmq_handler(payload) {
  const correlation_id = get_unique_id()
  pendingRequests[correlation_id] = (response) => {
    // handle responses from the back end
    console.log('Received response:', response)
  };
  channel.sendToQueue('request_queue', Buffer.from(JSON.stringify(payload)), {
    correlationId: correlation_id,
    headers: {
      to: 'BE',
      from: 'FE',
    },
  });
}

async function graceful_shutdown() {
  console.log('Shutting down...')
  if (channel) {
    await channel.close()
    console.log('Channel closed')
  }
  if (connection) {
    await connection.close()
    console.log('Connection closed')
  }
  process.exit(0)
}

function get_unique_id() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

app.post('/api/form-submit', async (req, res) => {
  try {
    const request = req.body
    const response_promise = new Promise((resolve) => {
      pendingRequests[get_unique_id()] = resolve
    })
    const response = await response_promise
    res.json(response)
  } catch (error) {
    console.error('Error handling form submission:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
});

app.listen(3000, async () => {
  await init_rmq()
  console.log('Server is running on port 3000')
  process.on('SIGTERM', gracefulShutdown)
  process.on('SIGINT', gracefulShutdown)
});
