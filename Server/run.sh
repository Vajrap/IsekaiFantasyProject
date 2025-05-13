#!/bin/bash

# Get the directory of the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# Go to the project root directory (parent of Server)
cd "$SCRIPT_DIR/.."

# Build TypeScript files
npm run build || { echo "Build failed. Aborting."; exit 1; }
# Run server with environment variable for development
NODE_ENV=development npx ts-node Server/server.ts
