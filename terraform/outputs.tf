output "bastion_public_ip" {
description = "Public IP of Bastion Host"
value       = aws_instance.bastion.public_ip
}

output "jenkins_private_ip" {
description = "Private IP of Jenkins Server"
value       = aws_instance.jenkins.private_ip
}

output "sonarqube_private_ip" {
  description = "Private IP of SonarQube Server"
  value       = aws_instance.sonarqube.private_ip
}

output "jenkins_url" {
description = "Jenkins URL via ALB"
value       = "http://${aws_lb.jenkins_alb.dns_name}"
}

output "sonarqube_url" {
description = "SonarQube URL via ALB"
value       = "http://${aws_lb.jenkins_alb.dns_name}/sonarqube"
}


