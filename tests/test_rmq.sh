#!/bin/bash

# Start backend
# nohup python3 ../backend/backend.py > backend.log 2>&1 & BACKEND_PID=$!

# Start dbworker
# nohup python3 ../database/dbworker.py > dbworker.log 2>&1 & DBWORKER_PID=$!

# Start middleware
nohup node ../frontend/middleware.js > middleware.log 2>&1 & MIDDLEWARE_PID=$!

# Wait for services to start
sleep 5

# Send test request
RESPONSE=$(curl -s -X POST http://localhost:3000/api/form-submit -H "Content-Type: application/json" -d '{"query": "SELECT * FROM users"}')

# Print response
echo "Response: $RESPONSE"

# Kill all processes
if [ -n "$BACKEND_PID" ]; then
  kill $BACKEND_PID
fi
if [ -n "$DBWORKER_PID" ]; then
  kill $DBWORKER_PID
fi
if [ -n "$MIDDLEWARE_PID" ]; then
  kill $MIDDLEWARE_PID
fi