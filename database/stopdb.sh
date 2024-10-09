#!/bin/bash

if [ "systemctl is-active mysql" ]; then
    sudo systemctl start mysql
fi
