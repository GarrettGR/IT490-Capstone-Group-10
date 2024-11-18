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
readonly BLUE='\033[0;34m'
readonly MAGENTA='\033[0;35m'
readonly CYAN='\033[0;36m'

readonly RESET='\033[0m'

readonly BRIGHT='\033[1m' # bold
readonly DIM='\033[2m' # 50/50 if this is supported...
readonly UNDERLINE='\033[4m'
readonly HIDDEN='\033[8m'
readonly BLINK='\033[5m'
readonly INVERT='\033[7m'

# =============================================================================
# Helper Functions
# =============================================================================

print_status() {
  local status=$1
  local message=$2

  case $status in
    "success")
      echo -e "${GREEN}✓${RESET} $message"
    ;;
    "failure")
      echo -e "${RED}✗${RESET} $message"
    ;;
    "info")
      echo -e "${YELLOW}ℹ${RESET} $message"
    ;;
    "warning")
      echo -e "${YELLOW}⚠${RESET} $message"
    ;;
  esac
}

get_service_commands() {
  local server_type=$1

  case $server_type in
    "frontend")
      echo "systemctl status -n0 node_server.service && systemctl status -n0 middleware.service"
    ;;
    "backend")
      echo "systemctl status -n0 backend.service"
    ;;
    "database")
      echo "systemctl status -n0 mariadb.service && systemctl status -n0 dbworker.service"
    ;;
    "communication")
      echo "systemctl status -n0 rabbitmq-server"
    ;;
    *)
      echo ""
    ;;
  esac
}

# =============================================================================
# Core Functions
# =============================================================================

ssh_execute() {
  local host=$1
  local summary_mode=$2
  local return_status="success"

  local server_type
  server_type=$(echo "$host" | cut -d'_' -f1)

  if [[ "$summary_mode" != "true" ]]; then
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    print_status "info" "Connecting to $host"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  fi

  if ! timeout 10s ssh $SSH_OPTS "$host" "hostname; uptime" 2>/dev/null; then
    if [[ "$summary_mode" != "true" ]]; then
      print_status "failure" "Failed to connect to $host"
    fi
    return 1
  fi

  if [[ "$summary_mode" == "true" ]]; then
    print_status "success" "Connection to $host successful"
    return 0
  fi

  local COMMANDS
  COMMANDS=$(get_service_commands "$server_type")

  if [[ -n "$COMMANDS" ]]; then
    echo -e "\nService Status:"
    if ! ssh $SSH_OPTS "$host" "$COMMANDS" 2>/dev/null; then
      print_status "warning" "One or more services are not running correctly"
      return 2
    fi
  fi

  print_status "success" "Connection to $host successful"
  return 0
}

list_hosts() {
  print_status "info" "Available hosts:"
  printf '%s\n' "${HOSTS[@]}" | sort | sed 's/^/  /'
}

print_host_list() {
  local status=$1
  shift
  local -a hosts=("$@")

  if [ ${#hosts[@]} -eq 0 ]; then
    echo "  None"
  else
    printf '  %s\n' "${hosts[@]}" | sort
  fi
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

  local -a success_hosts=()
  local -a warning_hosts=()
  local -a failed_hosts=()

  for host in "${HOSTS[@]}"; do
    if [[ -n "$TYPE" && "$host" != "${TYPE}_"* ]]; then
      continue
    fi
    if [[ -n "$NUMBER" && "$host" != *"_${NUMBER}" ]]; then
      continue
    fi

    ssh_execute "$host" "$SUMMARY_MODE"
    case $? in
      0)
        success_hosts+=("$host")
      ;;
      1)
        failed_hosts+=("$host")
      ;;
      2)
        warning_hosts+=("$host")
      ;;
    esac
    echo
  done

  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  print_status "info" "Final Summary:"
  print_status "success" "Successful connections: ${#success_hosts[@]}"
  print_status "warning" "Hosts with warnings: ${#warning_hosts[@]}"
  print_status "failure" "Failed connections: ${#failed_hosts[@]}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "Successful hosts:"
  print_host_list "success" "${success_hosts[@]}"
  echo
  echo "Hosts with service warnings:"
  print_host_list "warning" "${warning_hosts[@]}"
  echo
  echo "Failed hosts:"
  print_host_list "failure" "${failed_hosts[@]}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

main "$@"
exit 0
