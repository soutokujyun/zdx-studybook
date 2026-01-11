#!/bin/bash

# Docker镜像构建脚本
# 用于构建固定的Node.js环境镜像，确保npm版本一致性

set -e

IMAGE_NAME="mcp-audit-env"
IMAGE_TAG="latest"

echo "Building Docker image: $IMAGE_NAME:$IMAGE_TAG"

# 构建镜像
docker build -t "$IMAGE_NAME:$IMAGE_TAG" .

echo "Docker image built successfully: $IMAGE_NAME:$IMAGE_TAG"
echo "You can now use this image to generate consistent lock files across different environments."
