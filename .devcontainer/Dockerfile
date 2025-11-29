# .devcontainer/Dockerfile
# Builds an image with Python and Node matching CI environment.
# Not intended for production deployment.

FROM python:3.11-slim

# Install curl, gnupg, and git required for NodeSource setup and pnpm
RUN apt-get update \
    && apt-get install -y curl gnupg git \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
