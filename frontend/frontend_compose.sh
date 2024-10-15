#!/bin/bash

# Node compose script

ln -s node_server.service /lib/systemd/system/node_server.service
systemctl enable node_server.service
# systemctl start node_server.service
# systemctl restart node_server.service
# systemctl status node_server.service
# journalctl -u node_server.service
systemctl daemon-reload
# systemctl restart node_server.serviceps -ef | grep frontend.js
