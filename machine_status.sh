#!/bin/bash

# =============================================================================
# Configuration
# =============================================================================

readonly TYPES=("frontend" "backend" "database" "communication")
readonly MAX_NUMBER=3

declare -a HOSTS
for type in "${TYPES[@]}"; do
    for i in $(seq 0 $MAX_NUMBER); do
        HOSTS+=("${type}_${i}")
    done
done

readonly SSH_OPTS="-o StrictHostKeyChecking=no -o ConnectTimeout=10"

readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly NC='\033[0m'

# =============================================================================
# Helper Functions
# =============================================================================

print_status() {
  local status=$1
  local message=$2

  case $status in
    "success")
      echo -e "${GREEN}✓${NC} $message"
    ;;
    "failure")
      echo -e "${RED}✗${NC} $message"
    ;;
    "info")
      echo -e "${YELLOW}ℹ${NC} $message"
    ;;
  esac
}

get_service_commands() {
  local server_type=$1
  local summary_mode=$2

  if [[ "$summary_mode" == "true" ]]; then
    echo "hostname; uptime"
    return
  fi

  case $server_type in
    "frontend")
      echo "hostname; uptime; systemctl status -n0 node_server.service && systemctl status -n0 middleware.service"
    ;;
    "backend")
      echo "hostname; uptime; systemctl status -n0 backend.service"
    ;;
    "database")
      echo "hostname; uptime; systemctl status -n0 mariadb.service && systemctl status -n0 dbworker.service"
    ;;
    "communication")
      echo "hostname; uptime; systemctl status -n0 rabbitmq-server"
    ;;
    *)
      echo "hostname; uptime"
    ;;
  esac
}

# =============================================================================
# Core Functions
# =============================================================================

ssh_execute() {
  local host=$1
  local summary_mode=$2
  local server_type

  server_type=$(echo "$host" | cut -d'_' -f1)

  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  print_status "info" "Connecting to $host"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  local COMMANDS
  COMMANDS=$(get_service_commands "$server_type" "$summary_mode")

  if timeout 10s ssh $SSH_OPTS "$host" "$COMMANDS" 2>/dev/null; then
    print_status "success" "Connection to $host successful"
    return 0
  else
    print_status "failure" "Failed to connect to $host"
    return 1
  fi
}

list_hosts() {
  print_status "info" "Available hosts:"
  printf '%s\n' "${HOSTS[@]}" | sort | sed 's/^/  /'
}

# =============================================================================
# Main Script
# =============================================================================

main() {
  local TYPE=""
  local NUMBER=""
  local SUMMARY_MODE="false"

  while [[ $# -gt 0 ]]; do
    case $1 in
      -h|--help)
        echo "Usage: $0 [options]"
        echo "Options:"
        echo "  -l, --list      List all available hosts"
        echo "  -t <TYPE>       Connect only to hosts of specified type"
        echo "                  (frontend|backend|database|communication)"
        echo "  -n <NUMBER>     Connect only to hosts with specified number (0-3)"
        echo "  -s, --summary   Show only connection status without service details"
        echo "  -h, --help      Show this help message"
        exit 0
      ;;
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
      -s|--summary)
        SUMMARY_MODE="true"
        shift
      ;;
      *)
        shift
      ;;
    esac
  done

  local success_count=0
  local failure_count=0

  for host in "${HOSTS[@]}"; do
    if [[ -n "$TYPE" && "$host" != "${TYPE}_"* ]]; then
      continue
    fi
    if [[ -n "$NUMBER" && "$host" != *"_${NUMBER}" ]]; then
      continue
    fi

    if ssh_execute "$host" "$SUMMARY_MODE"; then
      ((success_count++))
    else
      ((failure_count++))
    fi
    echo
  done 

    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    print_status "info" "Final Summary:"
    print_status "success" "Successful connections: $success_count"
    print_status "failure" "Failed connections: $failure_count"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  }

main "$@"
exit 0
