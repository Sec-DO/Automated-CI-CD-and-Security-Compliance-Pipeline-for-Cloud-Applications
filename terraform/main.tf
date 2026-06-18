#########################################
# STEP 1: VPC
#########################################

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "secdo-vpc"
  }
}

#########################################
# STEP 2: Internet Gateway
#########################################

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}

#########################################
# STEP 3: Public Subnet AZ-A
#########################################

resource "aws_subnet" "public1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet1_cidr
  availability_zone       = "ap-south-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet-1"
  }
}

#########################################
# STEP 4: Public Subnet AZ-B
#########################################

resource "aws_subnet" "public2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet2_cidr
  availability_zone       = "ap-south-1b"
  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet-2"
  }
}

#########################################
# STEP 5: Private Subnet
#########################################

resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidr
  availability_zone = "ap-south-1a"

  tags = {
    Name = "private-subnet"
  }
}

#########################################
# STEP 6: Elastic IP
#########################################

resource "aws_eip" "nat_eip" {
  domain = "vpc"
}

#########################################
# STEP 7: NAT Gateway
#########################################

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public1.id

  depends_on = [
    aws_internet_gateway.igw
  ]
}

#########################################
# STEP 8: Public Route Table
#########################################

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

#########################################
# STEP 9: Private Route Table
#########################################

resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }
}

#########################################
# STEP 10: Route Associations
#########################################

resource "aws_route_table_association" "public1_assoc" {
  subnet_id      = aws_subnet.public1.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "public2_assoc" {
  subnet_id      = aws_subnet.public2.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "private_assoc" {
  subnet_id      = aws_subnet.private.id
  route_table_id = aws_route_table.private_rt.id
}

#########################################
# STEP 11: Bastion SG
#########################################

resource "aws_security_group" "bastion_sg" {
  name   = "bastion-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.my_ip]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

#########################################
# STEP 12: ALB SG
#########################################

resource "aws_security_group" "alb_sg" {
  name   = "alb-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

#########################################
# STEP 13: Jenkins SG
#########################################

resource "aws_security_group" "jenkins_sg" {
  name   = "jenkins-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    security_groups = [aws_security_group.bastion_sg.id]
  }

  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

#########################################
# STEP 13A: SonarQube SG
#########################################

resource "aws_security_group" "sonarqube_sg" {

  name   = "sonarqube-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    security_groups = [aws_security_group.bastion_sg.id]
  }

  ingress {
    from_port       = 9000
    to_port         = 9000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

#########################################
# STEP 14: Bastion EC2
#########################################

resource "aws_instance" "bastion" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.public1.id
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.bastion_sg.id]

  tags = {
    Name = "Bastion"
  }
}

#########################################
# STEP 15: Jenkins EC2
#########################################

resource "aws_instance" "jenkins" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.private.id
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.jenkins_sg.id]

  user_data = <<-EOF
#!/bin/bash

yum update -y

wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/rpm-stable/jenkins.repo

rpm --import https://pkg.jenkins.io/rpm-stable/jenkins.io-2026.key

yum upgrade -y

yum install -y java-21-amazon-corretto

yum install -y jenkins

systemctl enable jenkins

systemctl start jenkins

sleep 60

cp /var/lib/jenkins/secrets/initialAdminPassword /home/ec2-user/jenkins-password.txt

chown ec2-user:ec2-user /home/ec2-user/jenkins-password.txt

EOF

  tags = {
    Name = "Jenkins"
  }
}

#########################################
# STEP 15A: SonarQube EC2
#########################################

resource "aws_instance" "sonarqube" {

  ami           = var.ami_id
  instance_type = var.sonarqube_instance_type

  subnet_id = aws_subnet.private.id

  key_name = var.key_name

  vpc_security_group_ids = [
    aws_security_group.sonarqube_sg.id
  ]

  user_data = <<-EOF
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

EOF

  depends_on = [
    aws_nat_gateway.nat,
    aws_route_table_association.private_assoc
  ]

  tags = {
    Name = "SonarQube"
  }
}

#########################################
# STEP 16: Target Group
#########################################

resource "aws_lb_target_group" "jenkins_tg" {
  name     = "jenkins-tg"
  port     = 8080
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
}

#########################################
# STEP 16A: SonarQube Target Group
#########################################

resource "aws_lb_target_group" "sonarqube_tg" {

  name = "sonarqube-tg"

  port = 9000

  protocol = "HTTP"

  vpc_id = aws_vpc.main.id

  health_check {
    path = "/"
  }
}

#########################################
# STEP 17: Application Load Balancer
#########################################

resource "aws_lb" "jenkins_alb" {
  name               = "jenkins-alb"
  load_balancer_type = "application"
  internal           = false

  security_groups = [aws_security_group.alb_sg.id]

  subnets = [
    aws_subnet.public1.id,
    aws_subnet.public2.id
  ]
}

#########################################
# STEP 18: Attach Jenkins
#########################################

resource "aws_lb_target_group_attachment" "jenkins_attach" {
  target_group_arn = aws_lb_target_group.jenkins_tg.arn
  target_id        = aws_instance.jenkins.id
  port             = 8080
}
#########################################
# STEP 18A: Attach SonarQube
#########################################

resource "aws_lb_target_group_attachment" "sonarqube_attach" {

  target_group_arn = aws_lb_target_group.sonarqube_tg.arn

  target_id = aws_instance.sonarqube.id

  port = 9000
}
#########################################
# STEP 19: Jenkins Listener Rule
#########################################

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.jenkins_alb.arn

  port     = 80
  protocol = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.jenkins_tg.arn
  }
}

#########################################
# STEP 20: SonarQube Listener Rule
#########################################

resource "aws_lb_listener_rule" "sonarqube" {

  listener_arn = aws_lb_listener.http.arn

  priority = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.sonarqube_tg.arn
  }

  condition {
    path_pattern {
      values = ["/sonarqube*", "/sonar*"]
    }
  }
}
