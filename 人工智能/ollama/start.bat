@echo off
chcp 65001 >nul
title Ollama + ChromaDB 启动脚本

echo =================================
echo   Ollama + ChromaDB 本地环境
echo =================================
echo.

echo [1/4] 检查 Docker 状态...
docker info >nul 2>&1
if errorlevel 1 (
    echo 错误: Docker 未运行！
    echo 请启动 Docker Desktop 后再运行此脚本。
    pause
    exit /b 1
)
echo ✓ Docker 正在运行

echo.
echo [2/4] 检查 Docker Compose...
docker compose version >nul 2>&1
if errorlevel 1 (
    docker-compose version >nul 2>&1
    if errorlevel 1 (
        echo 错误: Docker Compose 未找到！
        pause
        exit /b 1
    ) else (
        set COMPOSE_CMD=docker-compose
        echo ✓ 使用 Docker Compose V1
    )
) else (
    set COMPOSE_CMD=docker compose
    echo ✓ 使用 Docker Compose V2
)

echo.
echo [3/4] 正在启动服务...
echo 这可能需要几分钟时间，请耐心等待...
%COMPOSE_CMD% up -d

if errorlevel 1 (
    echo ✗ 服务启动失败
    pause
    exit /b 1
)
echo ✓ 服务启动成功

echo.
echo [4/4] 检查服务状态...
timeout /t 8 /nobreak >nul

echo.
echo 容器状态:
%COMPOSE_CMD% ps

echo.
echo 服务访问地址:
echo Ollama API:    http://localhost:11434
echo ChromaDB API:  http://localhost:8000
echo.
echo 测试命令:
echo 1. 测试 Ollama:   curl http://localhost:11434/api/tags
echo 2. 测试 ChromaDB: curl http://localhost:8000/api/v1/heartbeat
echo.
echo 管理命令:
echo 停止服务:  docker-compose down
echo 查看日志:  docker-compose logs -f [服务名]
echo 进入容器:  docker exec -it ollama sh
echo.
echo 下载模型: docker exec ollama ollama pull qwen3:1.7b
echo.

set /p download=是否要下载 Qwen3:1.7B 模型？(y/n): 
if /i "%download%"=="y" (
    echo 正在下载 Qwen3:1.7B 模型...
    echo 这可能需要一些时间，取决于您的网络速度
    docker exec ollama ollama pull qwen3:1.7b
    
    if errorlevel 1 (
        echo ✗ 模型下载失败
    ) else (
        echo ✓ 模型下载完成
    )
)

echo.
pause