#!/usr/bin/node

const express = require("express");
const cors = require("cors");
const amqp = require("amqplib");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(cors());

const rmq_user = "admin";
const rmq_ip = "100.118.142.26";
const rmq_port = 5672;
const rmq_url = `amqp://${rmq_user}:${process.env.rmq_passwd}@${rmq_ip}:${rmq_port}`;

let connection;
let channel;
const pending_requests = {};

async function init_rmq() {
  try {
    connection = await amqp.connect(rmq_url);
    channel = await connection.createChannel();
    await channel.assertQueue("request_queue", {
      durable: true,
      arguments: { "x-message-ttl": 60000 },
    });
    await channel.assertQueue("response_queue", {
      durable: true,
      arguments: { "x-message-ttl": 60000 },
    });
    channel.consume(
      "response_queue",
      (message) => {
        const correlation_id = message.properties.correlationId;
        const response = JSON.parse(message.content.toString());
        console.log(
          `Received response: ${correlation_id} -- body: ${JSON.stringify(response)}`,
        );
        if (pending_requests[correlation_id]) {
          pending_requests[correlation_id](response);
          delete pending_requests[correlation_id];
        }
        channel.ack(message);
      },
      { noAck: false },
    );
    console.log("RabbitMQ initialized");
  } catch (error) {
    console.error("Error initializing RabbitMQ:", error);
  }
}

async function rmq_handler(body, correlation_id) {
  try {
    console.log("Sending message to request_queue:", body, correlation_id);
    channel.sendToQueue("request_queue", Buffer.from(JSON.stringify(body)), {
      correlationId: correlation_id,
      headers: {
        to: body["query"] !== undefined ? "DB" : "BE", // routing is duplicated on BE (?)
        from: "FE",
      },
    });
    console.log(
      "Message sent to request_queue with correlation_id:",
      correlation_id,
    );
  } catch (error) {
    console.error("Error sending message to request_queue:", error);
  }
}

async function graceful_shutdown() {
  console.log("Shutting down...");
  if (channel) {
    await channel.close();
    console.log("Channel closed");
  }
  if (connection) {
    await connection.close();
    console.log("Connection closed");
  }
  process.exit(0);
}

function get_unique_id() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

app.post("/api/login", async (req, res) => {
  try {
    const request = req.body;
    if (!request || !request.query) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Invalid request payload sent for login form.",
        });
    }
    const correlation_id = get_unique_id();
    console.log(`Recieved request: ${correlation_id}`); // -- body: ${JSON.stringify(request)}.
    const response_promise = new Promise((resolve) => {
      pending_requests[correlation_id] = resolve;
    });
    await rmq_handler(request, correlation_id);
    const response = await response_promise;
    const user =
      response.body.results.length > 0 ? response.body.results[0] : null;
    if (!user) {
      res.json({ status: "error", message: "Invalid email or password." });
      return;
    }
    const is_password_valid = await bcrypt.compare(request.password, user[0]);
    if (is_password_valid) {
      res.json({ status: "success", message: `Welcome back, ${user[1]}!` });
    } else {
      res.json({ status: "error", message: "Invalid email or password." });
    }
  } catch (error) {
    console.error(
      "Error encountered while handling login form submission: ",
      error,
    );
    res
      .status(500)
      .json({
        status: "error",
        message:
          "Internal server error encountered while handling login form submission.",
      });
  }
});

app.post("/api/signup", async (req, res) => {
  try {
    const request = req.body;
    if (!request || !request.query) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Invalid request payload sent for signup form.",
        });
    }
    const correlation_id = get_unique_id();
    console.log(`Recieved request: ${correlation_id}`); //  -- body: ${JSON.stringify(request)}.
    const response_promise = new Promise((resolve) => {
      pending_requests[correlation_id] = resolve;
    });
    await rmq_handler(request, correlation_id);
    const response = await response_promise;
    if (response.body.affected_rows > 0) {
      res.json({ status: "success", message: "Signup successful!" });
    } else {
      res.json({ status: "error", message: "Signup failed." });
    }
  } catch (error) {
    console.error(
      "Error encountered while handling signup form submission: ",
      error,
    );
    res
      .status(500)
      .json({
        status: "error",
        message:
          "Internal server error encountered while handling signup form submission.",
      });
  }
});

app.post("/api/recovery", async (req, res) => {
  try {
    const request = req.body;
    if (!request || !request.query) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Invalid request payload sent for password recovery.",
        });
    }
    const correlation_id = get_unique_id();
    console.log(`Recieved request: ${correlation_id}`); //  -- body: ${JSON.stringify(request)}.
    const response_promise = new Promise((resolve) => {
      pending_requests[correlation_id] = resolve;
    });
    await rmq_handler(request, correlation_id);
    const response = await response_promise;
    //Check if the query is requesting the security question
    if (
      request.query.includes(
        "SELECT security_question_1 FROM email WHERE email=",
      )
    ) {
      const user =
        response.body.results.length > 0 ? response.body.results[0] : null;
      if (!user) {
        res.json({ status: "error", message: "Email not found." });
      } else {
        //Return the security question if email exists
        res.json({ status: "success", body: { results: [[user[0]]] } });
      }
    } else if (request.query.includes("SELECT")) {
      //Handle regular login SELECT queries
      const user =
        response.body.results.length > 0 ? response.body.results[0] : null;
      if (!user) {
        res.json({ status: "error", message: "Invalid email or password." });
      } else {
        const is_password_valid = await bcrypt.compare(
          request.password,
          user[0],
        );
        if (is_password_valid) {
          res.json({ status: "success", message: `Welcome back, ${user[1]}!` });
        } else {
          res.json({ status: "error", message: "Invalid email or password." });
        }
      }
    } else if (request.query.includes("INSERT")) {
      if (response.body.affected_rows > 0) {
        res.json({ status: "success", message: "Signup successful!" });
      } else {
        res.json({ status: "error", message: "Signup failed." });
      }
    } else {
      res.json(response.body);
    }
  } catch (error) {
    console.error("Error handling form submission:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

app.listen(3000, async () => {
  await init_rmq();
  console.log("Server is running on port 3000");
  process.on("SIGTERM", graceful_shutdown);
  process.on("SIGINT", graceful_shutdown);
});
