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

async function rmq_handler(payload) {
  const connection = await amqp.connect(rmq_url)
  const channel = await connection.createChannel()

  await channel.assertQueue('request_queue', arguments={'x-message-ttl': 60000,})
  await channel.assertQueue('response_queue', arguments={'x-message-ttl': 60000,})

  const correlation_id = get_unique_id()
  channel.sendToQueue('request_queue', Buffer.from(JSON.stringify(payload)), {
    correlationId: correlation_id,
    headers: {
      to: 'BE',
      from: 'FE',
    },
  })
  return new Promise((resolve, reject) => {
    channel.consume('response_queue',
      (message) => {
        if (message.properties.correlationId === correlation_id) {
          const response = JSON.parse(message.content.toString())
          resolve(response)
          channel.close()
          connection.close()
        }
      },
      { noAck: true }
    );
  });
}

function get_unique_id() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

app.post('/api/form-submit', async (req, res) => {
  try {
    const request = req.body;
    const response = await rmq_handler(request)
    res.json(response)
  } catch (error) {
    console.error('Error handling form submission:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000')
});
