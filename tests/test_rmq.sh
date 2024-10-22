#!/bin/bash

# Send test request
RESPONSE=$(curl -s -X POST http://localhost:3000/api/form-submit -H "Content-Type: application/json" -d '{"query": "SELECT * FROM users"}')

# Print response
echo "Response: $RESPONSE"