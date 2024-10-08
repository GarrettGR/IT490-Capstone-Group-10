#!/bin/bash

if [ ! "systemctl is-active --quiet mysql" ]; then
    systemctl start mysql
fi
