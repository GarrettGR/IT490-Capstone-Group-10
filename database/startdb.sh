#!/bin/bash

if [ ! $(systemctl is-active mysql) ]; then
    systemctl start mysql
fi
