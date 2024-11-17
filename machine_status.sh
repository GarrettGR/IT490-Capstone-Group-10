#!/bin/bash

HOSTS=(
"backend_0"
"backend_1"
"database_0"
)

SSH_OPTS="-o StrictHostKeyChecking=no -o ConnectTimeout=10"

ssh_execute() {
  local host=$1
  echo "================================"
  echo "Connecting to $host..."
  echo "================================"

  if ssh $SSH_OPTS $host "hostname; uptime"; then
    echo "Successfully connected to $host"
  else
    echo "Failed to connect to $host"
    return 1
  fi
  echo
}

main() {
  for host in "${HOSTS[@]}"; do
    ssh_execute "$host"
  done
}

main

exit 0
