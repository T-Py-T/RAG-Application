#!/bin/bash
# start-frontend.sh
# Starts only the frontend with hot reloading

echo "⚛️  Starting Next.js frontend with hot reloading..."
cd frontend
if command -v pnpm &> /dev/null; then
    pnpm dev
else
    npm run dev
fi
