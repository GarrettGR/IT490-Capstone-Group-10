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
  local quiet_mode=$3
  local short_mode=$4
  local all_services_ok=true

  check_single_service() {
    local service=$1
    local quiet_mode=$2
    local short_mode=$3
    local status

    status=$(ssh $SSH_OPTS "$host" "systemctl is-active $service 2>/dev/null")
    if [[ "$status" != "active" ]]; then
      if [[ "$short_mode" != "true" ]]; then
        print_status "warning" "Service $service is not active (status: $status)" "$quiet_mode"
      fi
      all_services_ok=false
    elif [[ "$short_mode" != "true" ]]; then
      print_status "success" "Service $service is running" "$quiet_mode"
    fi
  }

  case $server_type in
    "database")
      check_single_service "mariadb.service" $quiet_mode $short_mode
      check_single_service "dbworker.service" $quiet_mode $short_mode
    ;;
    "backend")
      check_single_service "backend.service" $quiet_mode $short_mode
    ;;
    "frontend")
      check_single_service "node_server.service" $quiet_mode $short_mode
      check_single_service "middleware.service" $quiet_mode $short_mode
    ;;
    "communication")
      check_single_service "rabbitmq-server.service" $quiet_mode $short_mode
    ;;
    *)
      print_status "warning" "Unknown server type: $server_type" "false"
      return 1
    ;;
  esac

  if $all_services_ok; then
    return 0
  else
    return 1
  fi
}

control_services() {
  local host=$1
  local service=$2
  local action=$3

  if ! ssh $SSH_OPTS "$host" "systemctl $action $service" 2>/dev/null; then
    print_status "failure" "Failed to $action $service on $host" "false"
    get_service_logs "$host" "$service"
    return 1
  fi

  local counter=0
  local status

  while [ $counter -lt 15 ]; do
    status=$(ssh $SSH_OPTS "$host" "systemctl is-active $service 2>/dev/null")
    if [[ "$status" == "active" ]]; then
      print_status "success" "Successfully started $service on $host" "false"
      return 0
    fi
    counter=$((counter + 1))
    sleep 1
  done

  get_service_logs() {
    local host=$1
    local service=$2

    echo "Last 15 lines of logs for $service on $host:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    ssh $SSH_OPTS "$host" "journalctl -u $service -n 15 --no-pager" 2>/dev/null | \
    while IFS= read -r line; do
      echo -e "${RED}$line${RESET}"
    done

    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  }

  print_status "failure" "Service $service failed to start within 15 seconds on $host" "false"
  get_service_logs "$host" "$service"
  return 1
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

  if ! check_services "$host" "$server_type" "$quiet_mode" "$short_mode" ; then
    if [[ "$short_mode" == "true" ]]; then
      print_status "warning" "One or more services are not running correctly on $host" "$quiet_mode"
    fi
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
    IFS=$'\n' sorted_hosts=($(sort <<<"${hosts[*]}"))
    unset IFS

    local host_list=$(printf "%s, " "${sorted_hosts[@]}")
    host_list=${host_list%, }

    print_status "$status" "$host_list" "false"
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
        echo "  -l, --list <status>     List all possible hosts"
        echo "                          (all|up|active)"
        echo "  -H, --host <HOST>       Connect only to hosts of specified type"
        echo "                          (frontend|backend|database|communication)"
        echo "  -n, --number <NUMBER>   Connect only to hosts with specified number (0-3)"
        echo "  -a, --action <ACTION>   Perform the following action on each host (default 'status')"
        echo "                          (status, start, stop)"
        echo "  -s, --short             Short mode - don't show the status of each VMs' services"
        echo "  -q, --quiet             Quiet mode - only show final summary"
        echo "  -h, --help              Show this help message"
        exit 0
      ;;
      -l|--list)
        list_hosts
        exit 0
      ;;
      -H|--host)
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
    echo "Hosts with service warnings:"
    print_host_list "warning" "${warning_hosts[@]}"
    echo "Failed hosts:"
    print_host_list "failure" "${failed_hosts[@]}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  fi
}

main "$@"
exit 0
