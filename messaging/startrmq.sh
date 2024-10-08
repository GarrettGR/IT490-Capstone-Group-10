#!/bin/sh

if [ ! "systemctl is-active --quiet rabbitmq-server" ]; then
    systemctl start rabbitmq-server
fi
