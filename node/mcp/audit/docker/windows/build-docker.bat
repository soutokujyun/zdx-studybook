@echo off
REM Docker镜像构建脚本 (Windows版本)
REM 用于构建固定的Node.js环境镜像，确保npm版本一致性

setlocal enabledelayedexpansion

set IMAGE_NAME=mcp-audit-env
set IMAGE_TAG=latest

echo Building Docker image: %IMAGE_NAME%:%IMAGE_TAG%

REM 构建镜像
docker build -t "%IMAGE_NAME%:%IMAGE_TAG%" .

if %ERRORLEVEL% EQU 0 (
    echo Docker image built successfully: %IMAGE_NAME%:%IMAGE_TAG%
    echo You can now use this image to generate consistent lock files across different environments.
) else (
    echo Failed to build Docker image
    exit /b 1
)
