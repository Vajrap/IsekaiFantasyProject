#!/bin/bash

# Build TypeScript files
npm run build || { echo "Build failed. Aborting."; exit 1; }
# Run server
npx ts-node server.ts
