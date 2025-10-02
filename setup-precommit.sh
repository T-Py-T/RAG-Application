#!/bin/bash

# Setup script for pre-commit hooks
# This script sets up pre-commit hooks for the RAG Application

echo "Setting up pre-commit hooks for RAG Application..."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is required but not installed."
    exit 1
fi

# Install pre-commit if not already installed
if ! command -v pre-commit &> /dev/null; then
    echo "Installing pre-commit..."
    pip install pre-commit
else
    echo "pre-commit is already installed."
fi

# Install the pre-commit hooks
echo "Installing pre-commit hooks..."
pre-commit install

# Run pre-commit on all files to check current status
echo "Running pre-commit checks on all files..."
pre-commit run --all-files

echo ""
echo "Pre-commit setup complete!"
echo ""
echo "Pre-commit hooks will now run automatically on every commit."
echo "You can also run them manually with:"
echo "  pre-commit run --all-files"
echo ""
echo "To update hooks to their latest versions:"
echo "  pre-commit autoupdate"
