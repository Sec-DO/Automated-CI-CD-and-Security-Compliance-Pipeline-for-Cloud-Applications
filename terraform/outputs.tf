output "bastion_public_ip" {
  value = aws_instance.bastion.public_ip
}

output "jenkins_private_ip" {
  value = aws_instance.jenkins.private_ip
}

output "jenkins_url" {
  value = "http://${aws_lb.jenkins_alb.dns_name}"
}
