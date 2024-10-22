#!/bin/bash

# Start backend
# python3 ../backend/backend.py & BACKEND_PID=$!

# Start dbworker
# python3 ../database/dbworker.py & DBWORKER_PID=$!

# Start middleware
node ../frontend/middleware.js & MIDDLEWARE_PID=$!

# Wait for services to start
sleep 5

# Send test request
RESPONSE=$(curl -s -X POST http://localhost:3000/api/form-submit -H "Content-Type: application/json" -d '{"query": "SELECT * FROM users"}')

# Print response
echo "Response: $RESPONSE"

# Kill all processes
if [ -z $BACKEND_BID ]; then
	kill $BACKEND_PID
fi
if [ -z $DBWORKER_PID ]; then
	kill $DBWORKER_PID
fi
if [ -z $MIDDLEWARE_PID ]; then
	kill $MIDDLEWARE_PID
fi
