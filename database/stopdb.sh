#!/bin/bash

if [ "systemctl is-active --quiet mysql" ]; then
    sudo systemctl start mysql
fi
