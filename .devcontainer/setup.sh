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

# Create development scripts
echo "📝 Creating development scripts..."
cat > start-dev.sh << 'EOF'
#!/bin/bash
# start-dev.sh
# Starts both backend and frontend in development mode with hot reloading

echo "🚀 Starting development servers..."

# Function to cleanup background processes on exit
cleanup() {
    echo "🛑 Stopping development servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend with hot reloading
echo "🐍 Starting FastAPI backend with hot reloading..."
cd backend
uvicorn app:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
cd ..

# Start frontend with hot reloading
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
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait
EOF

cat > start-backend.sh << 'EOF'
#!/bin/bash
# start-backend.sh
# Starts only the backend with hot reloading

echo "🐍 Starting FastAPI backend with hot reloading..."
cd backend
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
EOF

cat > start-frontend.sh << 'EOF'
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
EOF

# Make scripts executable
chmod +x start-dev.sh start-backend.sh start-frontend.sh

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
echo ""
echo "💡 Additional commands available:"
echo "  ./start-dev.sh     - Restart both servers"
echo "  ./start-backend.sh - Start only backend"
echo "  ./start-frontend.sh- Start only frontend"
