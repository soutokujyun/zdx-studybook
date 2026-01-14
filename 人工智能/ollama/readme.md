🚀 快速开始
前置要求
Docker Desktop20.10+
至少 8GB 可用内存
至少 10GB 可用磁盘空间
macOS 10.15+ 或 Windows 10/11
1. 克隆/下载项目
# 创建项目目录
mkdir ai-local-env
cd ai-local-env

# 下载配置文件
curl -O https://raw.githubusercontent.com/your-repo/docker-compose.yml
curl -O https://raw.githubusercontent.com/your-repo/start.sh
curl -O https://raw.githubusercontent.com/your-repo/start.ps1
curl -O https://raw.githubusercontent.com/your-repo/start.bat
2. 启动服务
macOS / Linux:
# 给脚本执行权限
chmod +x start.sh

# 启动服务
./start.sh
Windows:
双击运行 start.bat
或以管理员身份运行 PowerShell 脚本：
.\start.ps1
3. 下载模型
启动脚本会提示是否下载 Qwen3:1.7B 模型。如果跳过，可手动下载：
# 进入容器下载
docker exec ollama ollama pull qwen3:1.7b

# 或通过 API 下载
curl http://localhost:11434/api/pull -d '{
  "name": "qwen3:1.7b"
}'
🔧 服务信息
服务
	
端口
	
API 地址
	
说明


Ollama
	
11434
	
http://localhost:11434
	
大语言模型服务


ChromaDB
	
8000
	
http://localhost:8000
	
向量数据库服务
📁 项目结构
ai-local-env/
├── docker-compose.yml    # Docker Compose 配置
├── start.sh             # macOS/Linux 启动脚本
├── start.ps1            # Windows PowerShell 脚本
├── start.bat            # Windows 批处理脚本
├── data/                # 持久化数据目录（自动创建）
│   ├── ollama/         # Ollama 模型数据
│   └── chromadb/       # ChromaDB 向量数据
└── README.md           # 本文档
⚡ 常用命令
服务管理
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs -f ollama      # Ollama 日志
docker-compose logs -f chromadb    # ChromaDB 日志
docker-compose logs -f            # 所有服务日志

# 停止服务
docker-compose stop

# 停止并删除容器
docker-compose down

# 停止并删除容器和所有数据
docker-compose down -v

# 重启服务
docker-compose restart
Ollama 操作
# 查看已安装模型
curl http://localhost:11434/api/tags

# 下载模型
docker exec ollama ollama pull qwen3:1.7b
docker exec ollama ollama pull llama3:8b
docker exec ollama ollama pull mistral:7b

# 运行模型（交互式对话）
docker exec -it ollama ollama run qwen3:1.7b

# 删除模型
docker exec ollama ollama rm qwen3:1.7b

# 查看模型信息
curl http://localhost:11434/api/show -d '{
  "name": "qwen3:1.7b"
}'
ChromaDB 操作
# 检查服务状态
curl http://localhost:8000/api/v1/heartbeat

# 创建集合
curl -X POST http://localhost:8000/api/v1/collections \
  -H "Content-Type: application/json" \
  -d '{"name": "my_collection"}'

# 列出所有集合
curl http://localhost:8000/api/v1/collections

# 添加文档
curl -X POST http://localhost:8000/api/v1/collections/my_collection/add \
  -H "Content-Type: application/json" \
  -d '{
    "documents": ["文档内容1", "文档内容2"],
    "metadatas": [{"source": "doc1"}, {"source": "doc2"}],
    "ids": ["id1", "id2"]
  }'

# 查询相似文档
curl -X POST http://localhost:8000/api/v1/collections/my_collection/query \
  -H "Content-Type: application/json" \
  -d '{
    "query_texts": ["查询内容"],
    "n_results": 5
  }'
集成使用示例
# test_integration.py
import requests
import json

# 1. 通过 Ollama 生成向量
def generate_embedding(text, model="qwen3:1.7b"):
    response = requests.post("http://localhost:11434/api/embeddings", 
                           json={"model": model, "prompt": text})
    return response.json()["embedding"]

# 2. 存储到 ChromaDB
def store_in_chromadb(text, embedding, collection="documents"):
    data = {
        "documents": [text],
        "embeddings": [embedding],
        "metadatas": [{"source": "ollama"}],
        "ids": [f"doc_{hash(text)}"]
    }
    response = requests.post(f"http://localhost:8000/api/v1/collections/{collection}/add", 
                           json=data)
    return response.json()

# 3. 检索和生成
def rag_query(question):
    # 生成问题的向量
    query_embedding = generate_embedding(question)
    
    # 在 ChromaDB 中检索相似文档
    response = requests.post("http://localhost:8000/api/v1/collections/documents/query",
                           json={
                               "query_embeddings": [query_embedding],
                               "n_results": 3
                           })
    
    # 构建上下文
    context = "\n".join([doc["documents"][0] for doc in response.json()])
    
    # 让模型基于上下文回答问题
    prompt = f"""基于以下上下文回答问题：

{context}

问题：{question}
答案："""
    
    response = requests.post("http://localhost:11434/api/generate",
                          json={
                              "model": "qwen3:1.7b",
                              "prompt": prompt,
                              "stream": False
                          })
    return response.json()["response"]

# 使用示例
if __name__ == "__main__":
    # 存储一些知识
    texts = [
        "Python是一种高级编程语言，由Guido van Rossum创建。",
        "Docker是一个容器化平台，用于打包、分发和运行应用程序。",
        "机器学习是人工智能的一个分支，专注于算法和统计模型。"
    ]
    
    for text in texts:
        embedding = generate_embedding(text)
        store_in_chromadb(text, embedding)
        print(f"已存储: {text[:50]}...")
    
    # 进行RAG查询
    result = rag_query("什么是Python？")
    print(f"\n回答: {result}")
🔄 API 接口
Ollama API
# 生成文本
curl http://localhost:11434/api/generate -d '{
  "model": "qwen3:1.7b",
  "prompt": "你好，介绍一下你自己",
  "stream": false
}'

# 聊天对话
curl http://localhost:11434/api/chat -d '{
  "model": "qwen3:1.7b",
  "messages": [
    {"role": "user", "content": "你好"}
  ],
  "stream": false
}'

# 生成向量
curl http://localhost:11434/api/embeddings -d '{
  "model": "qwen3:1.7b",
  "prompt": "这是一段文本"
}'

# 复制模型
curl http://localhost:11434/api/copy -d '{
  "source": "qwen3:1.7b",
  "destination": "qwen3-copy:1.7b"
}'
ChromaDB API
# 创建集合
curl -X POST http://localhost:8000/api/v1/collections \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my_collection",
    "metadata": {"description": "我的文档集合"}
  }'

# 获取集合
curl http://localhost:8000/api/v1/collections/my_collection

# 添加数据
curl -X POST http://localhost:8000/api/v1/collections/my_collection/add \
  -H "Content-Type: application/json" \
  -d '{
    "documents": ["文档1", "文档2"],
    "metadatas": [{"type": "article"}, {"type": "paper"}],
    "ids": ["1", "2"]
  }'

# 查询
curl -X POST http://localhost:8000/api/v1/collections/my_collection/query \
  -H "Content-Type: application/json" \
  -d '{
    "query_texts": ["查询关键词"],
    "n_results": 5
  }'

# 更新
curl -X POST http://localhost:8000/api/v1/collections/my_collection/update \
  -H "Content-Type: application/json" \
  -d '{
    "documents": ["更新后的文档"],
    "metadatas": [{"type": "updated"}],
    "ids": ["1"]
  }'

# 删除
curl -X POST http://localhost:8000/api/v1/collections/my_collection/delete \
  -H "Content-Type: application/json" \
  -d '{
    "ids": ["1"]
  }'
🐳 Docker 容器管理
进入容器
# 进入 Ollama 容器
docker exec -it ollama /bin/bash

# 进入 ChromaDB 容器
docker exec -it chromadb /bin/bash
查看资源使用
# 查看容器资源使用
docker stats

# 查看容器详细信息
docker inspect ollama

# 查看容器日志
docker logs ollama --tail 50 -f
备份和恢复
# 备份数据卷
docker run --rm -v ollama_data:/source -v $(pwd):/backup alpine \
  tar -czf /backup/ollama_backup.tar.gz -C /source .

# 恢复数据卷
docker run --rm -v ollama_data:/target -v $(pwd):/backup alpine \
  tar -xzf /backup/ollama_backup.tar.gz -C /target
🚨 故障排除
常见问题
端口冲突
# 检查端口占用
lsof -i :11434  # macOS/Linux
netstat -ano | findstr :11434  # Windows

# 修改 docker-compose.yml 中的端口映射
ports:
  - "11435:11434"  # 将宿主机端口改为 11435
容器启动失败
# 查看详细日志
docker-compose logs ollama

# 重启服务
docker-compose down
docker-compose up -d
模型下载失败
# 检查网络连接
docker exec ollama ping -c 3 ollama.com

# 手动下载镜像
docker pull ollama/ollama:latest
docker pull chromadb/chroma:latest
内存不足
macOS: Docker Desktop → Preferences → Resources → Memory (≥ 6GB)
Windows: Docker Desktop → Settings → Resources → Memory (≥ 6GB)
磁盘空间不足
# 清理未使用的 Docker 资源
docker system prune -a

# 删除特定镜像
docker rmi <image_id>
日志级别
# 查看详细的 Docker 日志
docker-compose logs --tail=100 -f

# 进入容器查看进程
docker exec -it ollama ps aux
docker exec -it chromadb ps aux
📈 性能优化
内存限制
根据可用内存调整 docker-compose.yml：
deploy:
  resources:
    limits:
      memory: 4G  # Ollama
      memory: 1G  # ChromaDB
存储优化
使用本地目录而非 Docker 卷：
volumes:
  - ./data/ollama:/root/.ollama
  - ./data/chromadb:/chroma/chroma
网络配置
使用自定义网络提高性能：
networks:
  ai-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
🔄 更新和维护
更新镜像
# 拉取最新镜像
docker-compose pull

# 重启服务
docker-compose up -d
清理
# 清理未使用的资源
docker system prune

# 删除所有容器和卷
docker-compose down -v
docker system prune -a

# 只删除未使用的卷
docker volume prune
监控
# 实时监控
docker stats

# 查看服务健康
docker-compose ps
docker-compose top
📊 支持的模型
推荐模型
模型
	
大小
	
内存需求
	
说明


Qwen3:1.7B
	
~1.1GB
	
4-6GB
	
中文优化，推荐


Llama3.2:1B
	
~0.6GB
	
2-3GB
	
英文，速度最快


Gemma2:2b
	
~1.4GB
	
4-6GB
	
Google 轻量级


Phi3:mini
	
~1.8GB
	
4-6GB
	
微软小模型
下载更多模型
# 查看可用模型
curl http://localhost:11434/api/tags

# 下载其他模型
docker exec ollama ollama pull llama3.2:1b
docker exec ollama ollama pull gemma2:2b
docker exec ollama ollama pull phi3:mini