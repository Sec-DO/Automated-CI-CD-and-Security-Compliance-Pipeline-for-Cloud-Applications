#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

# Configuration variables
VAR_FILE="terraform.tfvars"
BACKUP_DIR="backup"

# Generate timestamp format: YYYYMMDD_HHMMSS
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="${BACKUP_DIR}/terraform_destroy_${TIMESTAMP}.log"

echo "========================================="
echo "🚨 WARNING: STARTING TERRAFORM DESTROY 🚨"
echo "========================================="

# 1. Double-check user intent
read -p "Are you absolutely sure you want to destroy all infrastructure? (type 'yes' to proceed): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Action cancelled by user."
    exit 1
fi

# 2. Ensure backup folder exists
mkdir -p "$BACKUP_DIR"

# 3. Initialize Terraform to sync backend
echo "🔄 Initializing Terraform..."
if ! terraform init > "$LOG_FILE" 2>&1; then
    echo "❌ Error during 'terraform init'. Check $LOG_FILE for details."
    exit 1
fi

# 4. Execute Destroy with Auto-Approve
echo "💣 Destroying infrastructure..."
if [ -f "$VAR_FILE" ]; then
    echo "📄 Using variable file: $VAR_FILE"
    terraform destroy -var-file="$VAR_FILE" -auto-approve >> "$LOG_FILE" 2>&1
else
    echo "ℹ️ No var-file found. Proceeding with default variables."
    terraform destroy -auto-approve >> "$LOG_FILE" 2>&1
fi

echo "✅ Infrastructure successfully destroyed."
echo "📂 Log saved to: $LOG_FILE"
