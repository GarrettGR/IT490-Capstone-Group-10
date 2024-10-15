#!/bin/sh

if [ $(systemctl is-active rabbitmq-server) ]; then
  systemctl stop rabbitmq-server
else 
  echo "not started"
fi
