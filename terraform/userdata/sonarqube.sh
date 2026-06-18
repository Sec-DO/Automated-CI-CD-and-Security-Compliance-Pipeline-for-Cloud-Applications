#!/bin/bash

# Update system
dnf update -y

# Install Java 17
dnf install -y java-17-amazon-corretto

# Install unzip and wget
dnf install -y unzip wget

# Download SonarQube
cd /opt
wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-25.6.0.109173.zip

# Extract SonarQube
unzip sonarqube-25.6.0.109173.zip

# Rename directory
mv sonarqube-25.6.0.109173 sonarqube

# Create sonar user
id sonar || useradd sonar

# Set ownership
chown -R sonar:sonar /opt/sonarqube

# Required kernel settings
echo "vm.max_map_count=524288" >> /etc/sysctl.conf
echo "fs.file-max=131072" >> /etc/sysctl.conf

sysctl -p

# Configure SonarQube context path
echo "sonar.web.context=/sonarqube" >> /opt/sonarqube/conf/sonar.properties

# Create SonarQube service
cat <<SERVICE > /etc/systemd/system/sonarqube.service
[Unit]
Description=SonarQube
After=network.target

[Service]
Type=forking
User=sonar
Group=sonar

ExecStart=/opt/sonarqube/bin/linux-x86-64/sonar.sh start
ExecStop=/opt/sonarqube/bin/linux-x86-64/sonar.sh stop

Restart=always
LimitNOFILE=131072
LimitNPROC=8192

[Install]
WantedBy=multi-user.target
SERVICE

# Enable and Start SonarQube
systemctl daemon-reload
systemctl enable sonarqube
systemctl start sonarqube

# Save service status
systemctl status sonarqube > /home/ec2-user/sonarqube-status.txt

# Give ec2-user access
chown ec2-user:ec2-user /home/ec2-user/sonarqube-status.txt
