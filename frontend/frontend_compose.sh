#!/bin/bash

if [ -f /etc/systemd/system/node_server.service ]; then
  rm /etc/systemd/system/node_server.service
  systemctl daemon-reload
fi

systemctl link ./node_server.service
systemctl daemon-reload
systemctl start node_server.service
systemctl enable node_server.service
