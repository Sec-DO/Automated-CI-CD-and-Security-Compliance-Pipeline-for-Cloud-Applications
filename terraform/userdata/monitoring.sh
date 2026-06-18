#!/bin/bash

dnf update -y

dnf install -y \
wget \
tar \
curl \
unzip

# Create monitoring user
useradd -rs /bin/false prometheus
useradd -rs /bin/false alertmanager

# Prometheus
cd /tmp

wget https://github.com/prometheus/prometheus/releases/download/v3.5.0/prometheus-3.5.0.linux-amd64.tar.gz

tar -xzf prometheus-3.5.0.linux-amd64.tar.gz

mv prometheus-3.5.0.linux-amd64 /opt/prometheus

chown -R prometheus:prometheus /opt/prometheus

# Node Exporter
wget https://github.com/prometheus/node_exporter/releases/download/v1.9.1/node_exporter-1.9.1.linux-amd64.tar.gz

tar -xzf node_exporter-1.9.1.linux-amd64.tar.gz

mv node_exporter-1.9.1.linux-amd64 /opt/node_exporter

# Grafana
cat > /etc/yum.repos.d/grafana.repo <<GRAFANAEOF
[grafana]
name=grafana
baseurl=https://rpm.grafana.com
enabled=1
gpgcheck=1
gpgkey=https://rpm.grafana.com/gpg.key
GRAFANAEOF

dnf install -y grafana

systemctl enable grafana-server
systemctl start grafana-server
