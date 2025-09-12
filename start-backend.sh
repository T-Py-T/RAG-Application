#!/bin/bash
# start-backend.sh
# Starts only the backend with hot reloading

echo "🐍 Starting FastAPI backend with hot reloading..."
cd backend
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
