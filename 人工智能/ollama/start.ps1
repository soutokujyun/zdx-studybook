# Ollama + ChromaDB 启动脚本 (Windows PowerShell)
Write-Host "=================================" -ForegroundColor Blue
Write-Host "  Ollama + ChromaDB 本地环境" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Blue
Write-Host ""

# 检查 Docker
Write-Host "[1/4] 检查 Docker 状态..." -ForegroundColor Blue
try {
    docker info 2>&1 | Out-Null
    Write-Host "✓ Docker 正在运行" -ForegroundColor Green
} catch {
    Write-Host "错误: Docker 未运行！" -ForegroundColor Red
    Write-Host "请启动 Docker Desktop 后再运行此脚本。"
    exit 1
}

# 检查 Docker Compose
Write-Host "[2/4] 检查 Docker Compose..." -ForegroundColor Blue
try {
    if (docker compose version 2>&1) {
        $COMPOSE_CMD = "docker compose"
        Write-Host "✓ 使用 Docker Compose V2" -ForegroundColor Green
    } elseif (docker-compose version 2>&1) {
        $COMPOSE_CMD = "docker-compose"
        Write-Host "✓ 使用 Docker Compose V1" -ForegroundColor Green
    } else {
        throw "Docker Compose 未找到"
    }
} catch {
    Write-Host "错误: Docker Compose 未找到！" -ForegroundColor Red
    exit 1
}

# 启动服务
Write-Host "[3/4] 正在启动服务..." -ForegroundColor Blue
Write-Host "这可能需要几分钟时间，请耐心等待..." -ForegroundColor Yellow

Invoke-Expression "$COMPOSE_CMD up -d"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ 服务启动成功" -ForegroundColor Green
} else {
    Write-Host "✗ 服务启动失败" -ForegroundColor Red
    exit 1
}

# 等待并检查状态
Write-Host "[4/4] 检查服务状态..." -ForegroundColor Blue
Start-Sleep -Seconds 8

Write-Host "`n容器状态:" -ForegroundColor Yellow
Invoke-Expression "$COMPOSE_CMD ps"

Write-Host "`n服务访问地址:" -ForegroundColor Green
Write-Host "Ollama API:    http://localhost:11434"
Write-Host "ChromaDB API:  http://localhost:8000"
Write-Host ""
Write-Host "测试命令:" -ForegroundColor Yellow
Write-Host "1. 测试 Ollama:   curl http://localhost:11434/api/tags"
Write-Host "2. 测试 ChromaDB: curl http://localhost:8000/api/v1/heartbeat"
Write-Host ""
Write-Host "管理命令:" -ForegroundColor Cyan
Write-Host "停止服务:  docker-compose down"
Write-Host "查看日志:  docker-compose logs -f [服务名]"
Write-Host "进入容器:  docker exec -it ollama sh"
Write-Host ""
Write-Host "下载 Qwen3:1.7B 模型: docker exec ollama ollama pull qwen3:1.7b"
Write-Host ""

# 询问是否下载模型
$download = Read-Host "是否要下载 Qwen3:1.7B 模型？(y/n)"
if ($download -eq 'y') {
    Write-Host "正在下载 Qwen3:1.7B 模型..." -ForegroundColor Blue
    Write-Host "这可能需要一些时间，取决于您的网络速度" -ForegroundColor Yellow
    docker exec ollama ollama pull qwen3:1.7b
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ 模型下载完成" -ForegroundColor Green
    } else {
        Write-Host "✗ 模型下载失败" -ForegroundColor Red
    }
}

Write-Host "`n按任意键退出..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")