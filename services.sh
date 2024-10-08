#!/bin/sh

while [ $# -gt 0 ]; do
	case "$1" in
		-b | --backend)
      if [[ -n "$2" ]]; then
				if [[ "$2" == "start" ]]; then
				  if [ "$(hostname)" = "backend" ]; then
				    bash ~/Capstone-Group-09/backend/startbackend.sh
			    else
				    ssh backend "bash ~/Capstone-Group-09/backend/startbackend.sh"
			    fi
				elif [[ "$2" == "stop" ]]; then
					if [ "$(hostname)" = "backend" ]; then
				    bash ~/Capstone-Group-09/backend/stopbackend.sh
			    else
				    ssh backend "bash ~/Capstone-Group-09/backend/stopbackend.sh"
			    fi
				else
					echo "Unknown control: \"$2\". Please enter \"start\" or \"stop\"."
					exit 1
				fi
			fi
		;;
		-f | --frontend)
			if [[ -n "$2" ]]; then
				if [[ "$2" == "start" ]]; then
				  if [ "$(hostname)" = "frontend" ]; then
				    # bash ~/Capstone-Group-09/frontend/startfrontend.sh
            hostname
			    else
				    # ssh frontend "bash ~/Capstone-Group-09/frontend/startfrontend.sh"
            ssh frontend "hostname"
			    fi
				elif [[ "$2" == "stop" ]]; then
					if [ "$(hostname)" = "frontend" ]; then
				    # bash ~/Capstone-Group-09/backend/stopfrontend.sh
            echo "Stopped $(hostname)"
			    else
				    # ssh frontend "bash ~/Capstone-Group-09/frontend/stopfrontend.sh"
            ssh frontend 'echo "Stopped $(hostname)"'
			    fi
				else
					echo "Unknown control: \"$2\". Please enter \"start\" or \"stop\"."
					exit 1
				fi
			fi
		;;
		-d | --database)
      if [[ -n "$2" ]]; then
				if [[ "$2" == "start" ]]; then
				  if [ "$(hostname)" = "database" ]; then
				    bash ~/Capstone-Group-09/database/startdb.sh
			    else
				    ssh database "bash ~/Capstone-Group-09/database/startdb.sh"
			    fi
				elif [[ "$2" == "stop" ]]; then
					if [ "$(hostname)" = "database" ]; then
				    bash ~/Capstone-Group-09/database/stopdb.sh
			    else
				    ssh database "bash ~/Capstone-Group-09/database/stopdb.sh"
			    fi
				else
					echo "Unknown control: \"$2\". Please enter \"start\" or \"stop\"."
					exit 1
				fi
			fi
		;;
		-c | --communication)
      if [[ -n "$2" ]]; then
				if [[ "$2" == "start" ]]; then
				  if [ "$(hostname)" = "communication" ]; then
				    bash ~/Capstone-Group-09/messaging/startrmq.sh
			    else
				    ssh communication "bash ~/Capstone-Group-09/messaging/startrmq.sh"
			    fi
				elif [[ "$2" == "stop" ]]; then
					if [ "$(hostname)" = "communication" ]; then
				    bash ~/Capstone-Group-09/messaging/stoprmq.sh
			    else
				    ssh communication "bash ~/Capstone-Group-09/messaging/stoprmq.sh"
			    fi
				else
					echo "Unknown control: \"$2\". Please enter \"start\" or \"stop\"."
					exit 1
				fi
			fi
		;;
	esac
	shift
done

