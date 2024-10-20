#!/bin/bash

export py_packages=(
  pika
  mysql.connector
)

if ! command -v "python3" 2>&1 >/dev/null; then
  apt install python3-full -y
fi

# apt install -y python3-${py_packages[@]}

if [ -f /etc/systemd/system/dbworker.service ]; then
  rm /etc/systemd/system/dbworker.service
  systemctl daemon-reload
fi

systemctl link ./dbworker.service
systemctl daemon-reload
systemctl start dbworker.service
systemctl enable dbworker.service
