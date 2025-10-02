#!/bin/bash
# .devcontainer/setup.sh
# Sets up the development environment for the RAG application
# This script runs after the container is created to install dependencies

set -e  # Exit on any error

echo "🚀 Setting up development environment..."

# Install Python dependencies
echo "📦 Installing Python dependencies..."
if [ -f "backend/requirements.txt" ]; then
    pip install -r backend/requirements.txt
    # Install development dependencies for hot reloading
    pip install uvicorn[standard] watchdog
    echo "✅ Python dependencies installed"
else
    echo "⚠️  No requirements.txt found in backend/"
fi

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
if [ -f "frontend/package.json" ]; then
    cd frontend
    # Check if pnpm is available, otherwise use npm
    if command -v pnpm &> /dev/null; then
        pnpm install --frozen-lockfile
    else
        npm install
    fi
    cd ..
    echo "✅ Node.js dependencies installed"
else
    echo "⚠️  No package.json found in frontend/"
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p backend/logs
mkdir -p frontend/.next

# No additional scripts needed - services start automatically

# Set proper permissions
echo "🔐 Setting permissions..."
chmod +x .devcontainer/setup.sh

echo "✅ Environment setup complete!"
echo "🚀 Starting development servers automatically..."

# Start both backend and frontend with hot reloading
echo "🐍 Starting FastAPI backend with hot reloading..."
cd backend
uvicorn app:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
cd ..

echo "⚛️  Starting Next.js frontend with hot reloading..."
cd frontend
if command -v pnpm &> /dev/null; then
    pnpm dev &
else
    npm run dev &
fi
FRONTEND_PID=$!
cd ..

echo "✅ Development servers started!"
echo "🎯 Backend: http://localhost:8000 (with hot reload)"
echo "🎯 Frontend: http://localhost:3000 (with hot reload)"
echo "📚 API Docs: http://localhost:8000/docs"
