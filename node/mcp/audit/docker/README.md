# Docker 环境一致性解决方案

## 问题描述

原有的代码安全审计项目在不同用户的本地环境中，由于 npm 版本不同会导致生成的 lock 文件格式不一致，影响审计结果的可靠性。

## 解决方案

使用 Docker 容器技术固定 Node.js 和 npm 版本，确保在任何环境中都能生成一致的 lock 文件。

## 环境要求

- Docker (版本 20.0+)
- Bash shell (用于运行构建脚本)

## 使用方法

### 1. 构建 Docker 镜像

首次使用前需要构建 Docker 镜像：

```bash
# 使用npm脚本（自动检测平台）
npm run docker:build

# Unix/Linux/macOS
npm run docker:build:unix
# 或直接运行
bash docker/unix/build-docker.sh

# Windows
npm run docker:build:win
# 或直接运行
docker\windows\build-docker.bat
```

### 2. 正常使用项目

构建镜像后，项目会自动使用 Docker 容器来生成 lock 文件，无需额外操作。

```javascript
import { auditPackage } from "./src/entry/index.js";

// 使用方式保持不变
await auditPackage("/path/to/project", "./audit-result.md");
```

### 3. 手动生成 lock 文件

如果需要单独生成 lock 文件：

```bash
# 使用npm脚本（自动检测平台）
npm run docker:generate-lock /path/to/work/directory

# Unix/Linux/macOS
bash docker/unix/generate-lock-docker.sh /path/to/work/directory

# Windows
docker\windows\generate-lock-docker.bat C:\path\to\work\directory
```

### 4. 测试 Docker 环境

验证 Docker 环境是否正常工作：

```bash
npm run docker:test
```

这个命令会创建一个临时测试环境，验证 lock 文件是否能正确生成。

## Docker 镜像详情

- **基础镜像**: `node:18-bullseye-slim`
- **Node.js 版本**: 18.x LTS
- **npm 版本**: 8.19.4 (固定版本)
- **额外依赖**: git

## 故障排除

### Docker 不可用

如果系统中没有安装 Docker，项目会抛出错误：

```
Docker is not available. Please install Docker to ensure consistent lock file generation across different environments.
```

请安装 Docker Desktop 或 Docker Engine。

### 镜像构建失败

如果镜像构建失败，请检查：

1. 网络连接是否正常
2. Dockerfile 是否存在且格式正确
3. Docker 是否有足够权限

### 权限问题

在 Linux 系统上可能需要将当前用户添加到 docker 组：

```bash
sudo usermod -aG docker $USER
# 重新登录或运行 newgrp docker
```

## 优势

1. **环境一致性**: 无论在哪个开发环境中，都能生成相同的 lock 文件
2. **版本控制**: Node.js 和 npm 版本固定，避免版本兼容性问题
3. **隔离性**: Docker 容器与宿主环境完全隔离
4. **可重现性**: 审计结果在任何环境中都一致

## 文件结构

```
.
├── Dockerfile                  # Docker镜像定义
├── .dockerignore              # Docker构建忽略文件
├── docker/
│   ├── unix/                  # Unix/Linux/macOS 脚本
│   │   ├── build-docker.sh    # 构建Docker镜像脚本
│   │   └── generate-lock-docker.sh # 生成lock文件脚本
│   ├── windows/               # Windows 脚本
│   │   ├── build-docker.bat   # 构建Docker镜像脚本
│   │   └── generate-lock-docker.bat # 生成lock文件脚本
│   ├── test/
│   │   └── test-docker.js     # Docker环境测试脚本
│   └── README.md              # 本文档
└── src/generateLock/generateLock.js  # 修改后的lock文件生成逻辑
```
