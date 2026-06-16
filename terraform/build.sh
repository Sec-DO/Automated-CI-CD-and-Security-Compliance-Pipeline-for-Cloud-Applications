#!/bin/bash
set -e          # Stop script immediately if any command returns an error
set -o pipefail # Catch hidden errors inside pipelines


echo "========================================="
echo "🚀 Starting Terraform Pipeline..."
echo "========================================="

echo "\n🔄 Step 1: Initializing Terraform..."
echo "--- Running: terraform init ---"
terraform init
echo "========================================="

echo -e "\n🎨 Step 2: Formatting Configuration..."
echo "--- Running: terraform fmt ---"
terraform fmt

echo "========================================="

echo -e "\n🔍 Step 3: Validating Configuration..."
echo "--- Running: terraform validate ---"
terraform validate
echo "========================================="

echo -e "\n📋 Step 3: Generating Execution Plan..."
echo "--- Running: terraform plan ---"
terraform plan -out=tfplan

echo "========================================="

echo -e "\n⚡ Step 4: Applying Changes..."
echo "--- Running: terraform apply ---"
terraform apply tfplan


echo -e "\n✅ Deployment completed successfully!"
echo "========================================="
