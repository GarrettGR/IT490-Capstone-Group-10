#!/usr/bin/env node

const http = require('http');
const hostname = '0.0.0.0'; // listen on all ports
const port = 7012;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World, This is just temporary');
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
