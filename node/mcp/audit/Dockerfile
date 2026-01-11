# 使用官方Node.js LTS镜像作为基础镜像
FROM node:18-bullseye-slim

# 设置工作目录
WORKDIR /app

# 安装必要的系统依赖
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# 固定npm版本到8.x LTS（与Node.js 18兼容）
RUN npm install -g npm@8.19.4

# 验证安装的版本
RUN node --version && npm --version

# 设置默认命令
CMD ["node"]
