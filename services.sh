#!/bin/sh

while [ $# -gt 0 ]; do
	case "$1" in
		-b | --backend)
			if [ "$(hostname)" = "backend" ]; then
				bash ~/Capstone-Group-09/backend/startbackend.sh
			else
				ssh backend "bash ~/Capstone-Group-09/backend/startbackend.sh"
			fi
		;;
		-f | --frontend)
			if [ "$(hostname)" = "frontend" ]; then
				hostname
			else
				ssh frontend "hostname"
			fi
		;;
		-d | --database)
			if [ "$(hostname)" = "database" ]; then
				bash ~/Capstone-Group-09/database/startdb.sh
			else
				ssh database "bash ~/Capstone-Group-09/database/startdb.sh"
			fi
		;;
		-c | --communication)
			if [ "$(hostname)" = "communication" ]; then
				bash ~/Capstone-Group-09/messaging/startrmq.sh
			else
				ssh communication "bash ~/Capstone-Group-09/messaging/startrmq.sh"
			fi
		;;
	esac
	shift
done

