#!/bin/bash

systemctl is-active --quiet rabbitmq-serverz

if [ ! systemctl is-active --quiet mysql ]; then
    systemctl start mysql
fi
