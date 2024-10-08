#!/bin/sh

if [ "systemctl is-active --quiet rabbitmq-server" ]; then
  sudo systemctl stop rabbitmq-server
fi
