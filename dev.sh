#!/bin/bash

# ===========================================
# Development Server Script for IsekaiFantasy
# ===========================================

# Set environment variables
export NODE_ENV=development
export ALLOW_ALL_ORIGINS=true

# Get the directory of the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to the project root directory
cd "$SCRIPT_DIR" || { echo "Failed to change to project directory"; exit 1; }

echo "====================================="
echo "Starting server in DEVELOPMENT mode"
echo "CORS: All origins allowed"
echo "====================================="

# Run the server directly with ts-node (bypassing build step)
npx ts-node Server/server.ts

# If server fails, print helpful message
if [ $? -ne 0 ]; then
  echo "====================================="
  echo "Server failed to start"
  echo "Make sure all dependencies are installed:"
  echo "  npm install"
  echo "====================================="
  exit 1
fi