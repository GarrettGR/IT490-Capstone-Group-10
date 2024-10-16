#!/bin/bash

export packages=(
	pika
	passlib
	# uuid
	# beautifulsoup
	# playwright
	# fastapi
	# mariadb
)

if ! command -v "python3" 2>&1 >/dev/null; then
	apt install python3 -y
fi

apt install -y python3-${packages[@]}
