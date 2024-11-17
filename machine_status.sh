#!/bin/bash

TYPES=("frontend" "backend" "database" "communication")
MAX_NUMBER=3

declare -a HOSTS

for type in "${TYPES[@]}"; do
  for i in $(seq 0 $MAX_NUMBER); do
    HOSTS+=("${type}_${i}")
  done
done

SSH_USER="username"

SSH_OPTS="-o StrictHostKeyChecking=no -o ConnectTimeout=10"

ssh_execute() {
  local host=$1
  echo "================================"
  echo "Connecting to $host..."
  echo "================================"

  server_type=$(echo $host | cut -d'_' -f1)

  case $server_type in
    "frontend")
      COMMANDS="hostname; uptime; systemctl status -n0 node_server.service && systemctl status -n0 middleware.service"
    ;;
    "backend")
      COMMANDS="hostname; uptime; systemctl status -n0 backend.service"
    ;;
    "database")
      COMMANDS="hostname; uptime; systemctl status -n0 mariadb.service && systemctl status -n0 dbworker.service"
    ;;
    "communication")
      COMMANDS="hostname; uptime; systemctl status -n0 rabbitmq-server"
    ;;
    *)
      COMMANDS="hostname; uptime"
    ;;
    esac

    if ssh $SSH_OPTS $host "$COMMANDS"; then
      echo "Successfully connected to $host"
    else
      echo "Failed to connect to $host"
      return 1
    fi
    echo
}

list_hosts() {
  echo "Available hosts:"
  printf '%s\n' "${HOSTS[@]}" | sort
}

main() {
  if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    echo "Usage: $0 [options]"
    echo "Options:"
    echo "  -l, --list     List all available hosts"
    echo "  -t <TYPE>      Connect only to hosts of specified type"
    echo "                 (frontend|backend|database|communication)"
    echo "  -n <NUMBER>    Connect only to hosts with specified number (0-3)"
    echo "  -h, --help     Show this help message"
    exit 0
  fi

  while [[ $# -gt 0 ]]; do
    case $1 in
      -l|--list)
        list_hosts
        exit 0
      ;;
      -t)
        TYPE="$2"
        shift 2
      ;;
      -n)
        NUMBER="$2"
        shift 2
      ;;
      *)
        shift
      ;;
    esac
  done

  for host in "${HOSTS[@]}"; do
    if [[ -n "$TYPE" && "$host" != "${TYPE}_"* ]]; then
      continue
    fi
    if [[ -n "$NUMBER" && "$host" != *"_${NUMBER}" ]]; then
      continue
    fi
    ssh_execute "$host"
  done
}

main "$@"
exit 0
