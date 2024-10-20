#!/bin/bash

export py_packages=(
  pika
  aio-pika
  # passlib
)

if ! command -v "python3" 2>&1 >/dev/null; then
  apt install python3-full -y
fi

# apt install -y python3-${py_packages[@]}

if [ -f /etc/systemd/system/backend.service ]; then
  rm /etc/systemd/system/backend.service
  systemctl daemon-reload
fi

systemctl link ./backend.service
systemctl daemon-reload
systemctl start backend.servicie
systemctl enable backend.service
