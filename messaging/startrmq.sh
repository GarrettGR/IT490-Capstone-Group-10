#!/bin/sh

if [ $(systemctl is-active rabbitmq-server) ]; then
    systemctl start rabbitmq-server
else
    echo "already started"
fi
