#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查 Docker 是否运行
check_docker() {
    echo -e "${BLUE}[1/4] 检查 Docker 状态...${NC}"
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}错误: Docker 未运行！${NC}"
        echo "请启动 Docker Desktop 后再运行此脚本。"
        exit 1
    fi
    echo -e "${GREEN}✓ Docker 正在运行${NC}"
}

# 检查 Docker Compose
check_compose() {
    echo -e "${BLUE}[2/4] 检查 Docker Compose...${NC}"
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        echo -e "${RED}错误: Docker Compose 未找到！${NC}"
        exit 1
    fi
    
    # 优先使用 docker compose（Docker Compose V2）
    if docker compose version &> /dev/null; then
        COMPOSE_CMD="docker compose"
        echo -e "${GREEN}✓ 使用 Docker Compose V2${NC}"
    else
        COMPOSE_CMD="docker-compose"
        echo -e "${GREEN}✓ 使用 Docker Compose V1${NC}"
    fi
}

# 检测操作系统
detect_os() {
    echo -e "${BLUE}检测到系统: ${NC}"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo -e "${GREEN}✓ macOS${NC}"
        export DOCKER_DEFAULT_PLATFORM=linux/amd64
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        echo -e "${GREEN}✓ Windows (Git Bash)${NC}"
    elif [[ "$OSTYPE" == "cygwin" ]]; then
        echo -e "${GREEN}✓ Windows (Cygwin)${NC}"
    else
        echo -e "${GREEN}✓ Linux 或其他 Unix 系统${NC}"
    fi
}

# 启动服务
start_services() {
    echo -e "${BLUE}[3/4] 正在启动服务...${NC}"
    echo -e "${YELLOW}这可能需要几分钟时间，请耐心等待...${NC}"
    
    $COMPOSE_CMD up -d
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ 服务启动成功${NC}"
    else
        echo -e "${RED}✗ 服务启动失败${NC}"
        exit 1
    fi
}

# 检查服务状态
check_status() {
    echo -e "${BLUE}[4/4] 检查服务状态...${NC}"
    sleep 8
    
    echo -e "\n${YELLOW}容器状态:${NC}"
    $COMPOSE_CMD ps
    
    echo -e "\n${YELLOW}服务健康检查:${NC}"
    
    # 检查 Ollama
    if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Ollama 运行正常 (端口: 11434)${NC}"
    else
        echo -e "${YELLOW}⚠ Ollama 正在启动中...${NC}"
    fi
    
    # 检查 ChromaDB
    if curl -s http://localhost:8000/api/v1/heartbeat > /dev/null 2>&1; then
        echo -e "${GREEN}✓ ChromaDB 运行正常 (端口: 8000)${NC}"
    else
        echo -e "${YELLOW}⚠ ChromaDB 正在启动中...${NC}"
    fi
}

# 显示帮助信息
show_help() {
    echo -e "\n${BLUE}AI 本地开发环境启动脚本${NC}"
    echo -e "版本: 1.0.0"
    echo -e "支持平台: macOS, Windows (Git Bash/Cygwin), Linux\n"
    
    echo -e "${YELLOW}使用方法:${NC}"
    echo "  ./start.sh       启动所有服务"
    echo "  ./start.sh stop  停止所有服务"
    echo "  ./start.sh logs  查看服务日志"
    echo "  ./start.sh help  显示此帮助信息"
}

# 停止服务
stop_services() {
    echo -e "${RED}正在停止服务...${NC}"
    $COMPOSE_CMD down
    echo -e "${GREEN}服务已停止${NC}"
}

# 查看日志
show_logs() {
    echo -e "${BLUE}选择要查看的日志:${NC}"
    echo "1) Ollama 日志"
    echo "2) ChromaDB 日志"
    echo "3) 所有服务日志"
    echo "4) 返回主菜单"
    
    read -p "请选择 [1-4]: " choice
    
    case $choice in
        1) $COMPOSE_CMD logs -f ollama ;;
        2) $COMPOSE_CMD logs -f chromadb ;;
        3) $COMPOSE_CMD logs -f ;;
        4) return ;;
        *) echo "无效选择" ;;
    esac
}

# 下载模型
download_model() {
    echo -e "${YELLOW}是否要下载 Qwen3:1.7B 模型？${NC}"
    read -p "输入 y 确认，其他键跳过: " confirm
    
    if [[ "$confirm" == "y" || "$confirm" == "Y" ]]; then
        echo -e "${BLUE}正在下载 Qwen3:1.7B 模型...${NC}"
        echo -e "${YELLOW}这可能需要一些时间，取决于您的网络速度${NC}"
        echo -e "${YELLOW}模型大小约为 1.1 GB${NC}"
        
        docker exec ollama ollama pull qwen3:1.7b
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ 模型下载完成${NC}"
        else
            echo -e "${RED}✗ 模型下载失败${NC}"
        fi
    fi
}

# 主菜单
show_menu() {
    echo -e "\n${BLUE}==========================${NC}"
    echo -e "${GREEN}  Ollama + ChromaDB 管理${NC}"
    echo -e "${BLUE}==========================${NC}\n"
    
    echo "当前服务状态:"
    if [ "$(docker ps -q -f name=ollama)" ] && [ "$(docker ps -q -f name=chromadb)" ]; then
        echo -e "  ${GREEN}● 全部服务正在运行${NC}"
    else
        echo -e "  ${YELLOW}○ 服务未完全启动${NC}"
    fi
    
    echo -e "\n${YELLOW}请选择操作:${NC}"
    echo "1) 启动/重启服务"
    echo "2) 停止服务"
    echo "3) 查看服务状态"
    echo "4) 查看日志"
    echo "5) 下载 Qwen3:1.7B 模型"
    echo "6) 打开服务地址"
    echo "7) 查看帮助"
    echo "8) 退出"
    
    read -p "请输入选项 [1-8]: " choice
    
    case $choice in
        1)
            detect_os
            check_docker
            check_compose
            start_services
            check_status
            ;;
        2) stop_services ;;
        3) $COMPOSE_CMD ps ;;
        4) show_logs ;;
        5) download_model ;;
        6)
            echo -e "\n${GREEN}服务访问地址:${NC}"
            echo "Ollama API:    http://localhost:11434"
            echo "ChromaDB API:  http://localhost:8000"
            echo "Ollama WebUI:  http://localhost:11434 (API端点)"
            echo ""
            echo "测试 Ollama:   curl http://localhost:11434/api/tags"
            echo "测试 ChromaDB: curl http://localhost:8000/api/v1/heartbeat"
            ;;
        7) show_help ;;
        8) echo "再见！" && exit 0 ;;
        *) echo "无效选项，请重新选择" ;;
    esac
    
    echo ""
    read -p "按回车键返回主菜单..."
    show_menu
}

# 主逻辑
main() {
    clear
    echo -e "${BLUE}================================${NC}"
    echo -e "${GREEN}  Ollama + ChromaDB 本地环境${NC}"
    echo -e "${BLUE}================================${NC}\n"
    
    # 如果指定了参数
    case $1 in
        stop) stop_services ;;
        logs) show_logs ;;
        help) show_help ;;
        *)
            # 如果没有参数，显示菜单
            if [ $# -eq 0 ]; then
                show_menu
            else
                # 如果指定了其他参数，直接启动服务
                detect_os
                check_docker
                check_compose
                start_services
                check_status
                download_model
            fi
            ;;
    esac
}

main "$@"