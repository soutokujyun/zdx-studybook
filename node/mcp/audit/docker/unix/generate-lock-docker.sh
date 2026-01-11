#!/bin/bash

# 使用Docker容器生成lock文件的脚本
# 确保在固定环境中生成一致的lock文件

set -e

IMAGE_NAME="mcp-audit-env"
IMAGE_TAG="latest"
WORK_DIR="$1"

if [ -z "$WORK_DIR" ]; then
    echo "Usage: $0 <work_directory>"
    echo "Example: $0 /path/to/work/dir"
    exit 1
fi

if [ ! -d "$WORK_DIR" ]; then
    echo "Error: Work directory does not exist: $WORK_DIR"
    exit 1
fi

echo "Generating lock file in Docker container..."
echo "Work directory: $WORK_DIR"
echo "Using Docker image: $IMAGE_NAME:$IMAGE_TAG"

# 在Docker容器中运行npm install --package-lock-only --force
docker run --rm \
    -v "$WORK_DIR:/workspace" \
    -w /workspace \
    "$IMAGE_NAME:$IMAGE_TAG" \
    npm install --package-lock-only --force

echo "Lock file generated successfully in: $WORK_DIR/package-lock.json"
