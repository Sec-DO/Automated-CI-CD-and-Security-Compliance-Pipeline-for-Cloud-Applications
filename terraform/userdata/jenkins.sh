#!/bin/bash

# Update system

dnf update -y

# Install required packages

dnf install -y git wget unzip jq java-21-amazon-corretto docker maven

# Install Jenkins repository

wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/rpm-stable/jenkins.repo

# Import Jenkins key

rpm --import https://pkg.jenkins.io/rpm-stable/jenkins.io-2026.key

# Install Jenkins

dnf install -y jenkins

# Enable and start Jenkins

systemctl enable jenkins
systemctl start jenkins

# Enable and start Docker

systemctl enable docker
systemctl start docker

# Add users to docker group

usermod -aG docker jenkins
usermod -aG docker ec2-user

# Install AWS CLI v2

cd /tmp

curl -o awscliv2.zip https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip

unzip -o awscliv2.zip

./aws/install

# Install kubectl

curl -LO https://dl.k8s.io/release/stable.txt

K8S_VERSION=$(cat stable.txt)

curl -LO https://dl.k8s.io/release/${K8S_VERSION}/bin/linux/amd64/kubectl

install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

#Install Helm

curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

#Install Terraform

dnf install -y dnf-plugins-core

dnf config-manager --add-repo https://rpm.releases.hashicorp.com/AmazonLinux/hashicorp.repo

dnf install -y terraform

# Install Trivy

rpm --import https://aquasecurity.github.io/trivy-repo/rpm/public.key

cat > /etc/yum.repos.d/trivy.repo <<EOF
[trivy]
name=Trivy Repository
baseurl=https://aquasecurity.github.io/trivy-repo/rpm/releases/\$basearch/
enabled=1
gpgcheck=1
gpgkey=https://aquasecurity.github.io/trivy-repo/rpm/public.key
EOF

dnf install -y trivy

# Save Jenkins password

sleep 30

cp /var/lib/jenkins/secrets/initialAdminPassword /home/ec2-user/jenkins-password.txt

chown ec2-user:ec2-user /home/ec2-user/jenkins-password.txt

# Verification file

echo "Installation completed" > /home/ec2-user/install-status.txt

chown ec2-user:ec2-user /home/ec2-user/install-status.txt
