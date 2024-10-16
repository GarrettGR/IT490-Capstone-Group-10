#!/bin/sh

if [ $(systemctl is-active node_server.service) ]; then
    systemctl start node_server.service
fi
