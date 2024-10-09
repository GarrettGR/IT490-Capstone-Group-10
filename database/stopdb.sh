#!/bin/bash

if [ "systemctl is-active mysql" ]; then
    sudo systemctl stop mysql
fi
