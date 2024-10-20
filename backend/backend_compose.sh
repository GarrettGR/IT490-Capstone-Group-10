#!/bin/bash

export py_packages=(
  pika
  aio-pika
  # passlib
)

if ! command -v "python3" 2>&1 >/dev/null; then
  apt install python3-full -y
fi

apt install -y python3-${py_packages[@]}

systemctl link ./backend.service
systemctl daemon-reload
systemctl start backend.service
systemctl enable backend.service
