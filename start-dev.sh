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
