#!/bin/sh

if [ $(systemctl is-active node_server.service) ]; then
  systemctl stop node_server.service
fi
