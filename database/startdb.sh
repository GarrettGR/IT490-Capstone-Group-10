#!/bin/bash

if [[ $(systemctl is-active mysql) == "inactive" ]]; then
    systemctl start mysql
fi
