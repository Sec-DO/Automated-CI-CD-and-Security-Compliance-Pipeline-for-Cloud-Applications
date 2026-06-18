aws_region = "ap-south-1"

ami_id = "ami-0e38835daf6b8a2b9"

bastion_instance_type    = "t3.micro"
instance_type            = "m7i-flex.large"
sonarqube_instance_type  = "m7i-flex.large"
monitoring_instance_type = "m7i-flex.large"
key_name                 = "SecDO"

my_ip = "0.0.0.0/0"

vpc_cidr = "10.0.0.0/20"

public_subnet1_cidr = "10.0.1.0/24"

public_subnet2_cidr = "10.0.3.0/24"

private_subnet_cidr = "10.0.2.0/24"
