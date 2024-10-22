#!/bin/bash

# Test 1
RESPONSE=$(curl -s -X POST http://localhost:3000/api/form-submit -H "Content-Type: application/json" -d '{"query": "SELECT * FROM users"}')
echo "Response: $RESPONSE"

# Test 2
RESPONSE=$(curl -s -X POST http://localhost:3000/api/form-submit -H "Content-Type: application/json" -d '{"query": "SELECT * FROM users WHERE user_id = 1"}')
echo "Response: $RESPONSE"

# Test 3
RESPONSE=$(curl -s -X POST http://localhost:3000/api/form-submit -H "Content-Type: application/json" -d '{"greeting": "hello world"}')
echo "Response: $RESPONSE"

# Test 4
RESPONSE=$(curl -s -X POST http://localhost:3000/api/form-submit -H "Content-Type: application/json" -d '{"query": "INSERT INTO users (username, email, password_hash) VALUES (\"j_doe123\", \"jane.doe@example.org\", \"SALT#password123#HASH\")"}')
echo "Response: $RESPONSE"

# Test 5
RESPONSE=$(curl -s -X POST http://localhost:3000/api/form-submit -H "Content-Type: application/json" -d '{"query": "SELECT * FROM users WHERE email = \"john.doe@example.com\""}')
echo "Response: $RESPONSE"

# Test 6
RESPONSE=$(curl -s -X POST http://localhost:3000/api/form-submit -H "Content-Type: application/json" -d '{"query": "SELECT * FROM users WHERE email = \"jane.doe@example.org\""}')
echo "Response: $RESPONSE"
