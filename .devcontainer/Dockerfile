# .devcontainer/Dockerfile
# Builds an image with Python and Node for full-stack testing.
# Not intended for production deployment.

FROM python:3.11-slim

# Install curl and gnupg required for NodeSource setup
RUN apt-get update \
    && apt-get install -y curl gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
