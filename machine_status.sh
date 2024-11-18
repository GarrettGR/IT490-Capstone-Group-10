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
  local quiet_mode=$3

  if [[ "$quiet_mode" != "true" ]]; then
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
  fi
}

check_services() {
  local host=$1
  local server_type=$2

  # database
  # systemctl is-active mariadb.service
  # systemctl is-active dbworker.service

  # backend
  # systemctl is-active backend.service

  # frontend
  # systemctl is-active node_server.service
  # systemctl is-active middleware.service

  # communication
  # systemctl is-active rabbitmq-server.service

  return 0
}

control_services() {
  local host=$1
  local server_type=$2
  local value=$3

  
}

ssh_execute() {
  local host=$1
  local quiet_mode=$2
  local short_mode=$3
  local return_status="success"

  local server_type
  server_type=$(echo "$host" | cut -d'_' -f1)

  if [[ "$short_mode" != "true" ]]; then
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    print_status "info" "Connecting to $host" "$quiet_mode"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  fi

  if ! timeout 10s ssh $SSH_OPTS "$host" "hostname; uptime" >/dev/null 2>&1; then
    print_status "failure" "Failed to connect to $host" "$quiet_mode"
    return 1
  fi

  if ! check_services "$host" "$server_type"; then
    if [[ "$short_mode" != "true" ]]; then
      echo "Service Status:"
    fi
    print_status "warning" "One or more services are not running correctly on $host" "$quiet_mode"
    return 2
  fi

  if [[ "$short_mode" != "true" ]]; then
    print_status "success" "Connection to $host successful" "$quiet_mode"
  fi

  return 0
}

list_hosts() {
  print_status "info" "Available hosts:" "false"
  printf '%s\n' "${HOSTS[@]}" | sort | sed 's/^/  /'
}

print_host_list() {
  local status=$1
  shift
  local -a hosts=("$@")

  if [ ${#hosts[@]} -eq 0 ]; then
    echo "  None"
  else
    printf '  %s' "${hosts[@]}" | sort "false"
  fi
}

main() {
  local TYPE=""
  local NUMBER=""
  local QUIET_MODE="false"
  local SHORT_MODE="false"

  while [[ $# -gt 0 ]]; do
    case $1 in
      -h|--help)
        echo "Usage: $0 [options]"
        echo "Options:"
        echo "  -l, --list      List all possible hosts"
        echo "  -t <TYPE>       Connect only to hosts of specified type"
        echo "                  (frontend|backend|database|communication)"
        echo "  -n <NUMBER>     Connect only to hosts with specified number (0-3)"
        echo "  -s, --short     Short mode - don't show the status of each VMs' services"
        echo "  -q, --quiet     Quiet mode - only show final summary"
        echo "  -h, --help      Show this help message"
        exit 0
      ;;
      -l|--list)
        list_hosts
        exit 0
      ;;
      -t|--type)
        TYPE="$2"
        shift 2
      ;;
      -n|--number)
        NUMBER="$2"
        shift 2
      ;;
      -s|--short)
        SHORT_MODE="true"
        shift
      ;;
      -q|--quiet)
        QUIET_MODE="true"
        SHORT_MODE="true"
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

    ssh_execute "$host" "$QUIET_MODE" "$SHORT_MODE"
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

    if [[ "$SHORT_MODE" != "true" ]]; then
      echo
    fi
  done

  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "Final Summary:"
  print_status "success" "Successful connections: ${#success_hosts[@]}" "false"
  print_status "warning" "Hosts with warnings: ${#warning_hosts[@]}" "false"
  print_status "failure" "Failed connections: ${#failed_hosts[@]}" "false"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  if [[ "$QUIET_MODE" != "true" ]]; then
    echo "Successful hosts:"
    print_host_list "success" "${success_hosts[@]}"
    echo
    echo "Hosts with service warnings:"
    print_host_list "warning" "${warning_hosts[@]}"
    echo
    echo "Failed hosts:"
    print_host_list "failure" "${failed_hosts[@]}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  fi
}

main "$@"
exit 0
