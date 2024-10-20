#!/usr/bin/node

// const http = require('http')
// const fs = require('fs')
// const path = require('path')
const amqp = require('amqplib')
const { parse } = require('querystring')

const rmq_user = "admin"
const rmq_ip = "100.118.142.26"
const rmq_port = 5672
const queue_name = 'request_queue'

const http_rmq_proxy = async () => {
  // const payload = //TODO: AWAIT OR ASYNC FOR A HTTP 'POST' REQUEST
  amqp.connect(`amqp://${rmq_user}:${process.env.rmq_passwd}@${rmq_ip}:${rmq_port}`, (error, connection) => {
    if (error) {
      console.error('Connection error: ', error)
      return
    }
    connection.createChannel((error, channel) => {
      if (error) {
        console.error('Channel error: ', error)
        return
      }
      // Recieve 'payload' as an HTTP 'POST'
      const message = JSON.stringify({ 'to': 'BE', 'from': 'FE', 'payload': payload })
      channel.assertQueue(queue_name, { durable: false })
      console.log('Sent to RabbitMQ: ', message)
    });
  });
};

const rmq_http_proxy = async () => {
  amqp.connect(`amqp://${rmq_user}:${process.env.rmq_passwd}@${rmq_ip}:${rmq_port}`, (error, connection) => {
    if (error) {
      console.error('Connection error: ', error)
      return
    }
    connection.createChannel((error, channel) => {
      if (error) {
        console.error('Channel error: ', error)
        return
      }
      channel.consume(QUEUE_NAME, (message) => {
        // Forward as an HTTP 'POST'
        console.log('Received message:', message.const.toString())
      }, { noAck: false })
    });
  });
}