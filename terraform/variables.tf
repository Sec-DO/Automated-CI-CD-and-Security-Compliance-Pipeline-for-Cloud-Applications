variable "aws_region" {
  type = string
}

variable "ami_id" {
  type = string
}

variable "instance_type" {
  type = string
}

variable "key_name" {
  type = string
}

variable "my_ip" {
  type = string
}

variable "vpc_cidr" {
  type = string
}

variable "public_subnet1_cidr" {
  type = string
}

variable "public_subnet2_cidr" {
  type = string
}

variable "private_subnet_cidr" {
  type = string

}
variable "sonarqube_instance_type" {
  description = "SonarQube EC2 instance type"
  type        = string
}
variable "bastion_instance_type" {
  type = string
}
variable "monitoring_instance_type" {
  type = string
}
