#!/bin/bash

systemctl link ./node_server.service
systemctl daemon-reload
systemctl start node_server.service
systemctl enable node_server.service
