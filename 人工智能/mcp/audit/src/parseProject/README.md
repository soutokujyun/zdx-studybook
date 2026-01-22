# ParseProject Module

解析工程根目录下的 package.json 文件，支持本地路径和多种远程仓库 URL。

## 🎯 核心特性

- ✅ **零配置扩展**: 添加新仓库平台只需几行配置代码
- ✅ **统一处理**: 所有平台使用相同的处理逻辑，无重复代码
- ✅ **智能识别**: 自动检测并处理不同平台的 URL
- ✅ **容错设计**: API 调用失败时自动降级到默认分支
- ✅ **类型安全**: 支持自定义域名和自托管实例

## 📁 目录结构

```
src/parseProject/
├── index.js                    # 主入口文件，导出核心函数
├── modules/                    # 核心功能模块
│   ├── repositoryHandlers.js   # 统一的仓库处理器（本地+远程）
│   └── repositoryFactory.js    # 工厂类，管理平台配置
├── README.md                   # 模块说明文档
└── test/                       # 测试文件
    └── test.js
```

## 🌟 支持的仓库平台

- **GitHub**: `https://github.com/owner/repo`
- **Gitee**: `https://gitee.com/owner/repo`
- **GitLab**: `https://gitlab.com/owner/repo` 或自托管实例
- **更多平台**: 可轻松扩展支持 Bitbucket、Coding 等

## 💡 使用示例

```javascript
import {
  parseProject,
  isSupportedRepositoryUrl,
  getSupportedPlatforms,
} from "./parseProject/index.js";

// 解析本地项目
const localPackage = await parseProject("/path/to/local/project");

// 🎯 统一接口：自动识别输入类型（本地路径或远程URL）
// 本地项目
const localPackage = await parseProject("/path/to/local/project");

// 远程仓库（自动识别平台）
const githubPackage = await parseProject("https://github.com/webpack/webpack");
const giteePackage = await parseProject("https://gitee.com/mirrors/webpack");
const gitlabPackage = await parseProject(
  "https://gitlab.com/gitlab-org/gitlab-ui"
);

// 检查URL支持情况
const isSupported = isSupportedRepositoryUrl("https://github.com/user/repo");

// 获取支持的平台列表
const platforms = getSupportedPlatforms(); // ['GitHub', 'Gitee', 'GitLab']
```

## 🏗️ 架构优势

- **单一处理器**: 一个 `RepositoryHandler` 类搞定所有场景
- **统一接口**: `parseProject()` 自动识别本地路径和远程 URL
- **配置驱动**: 一个配置对象定义一个平台
- **零重复代码**: 所有平台使用统一的处理逻辑
- **一键扩展**: 添加新平台只需几行配置
- **动态管理**: 运行时注册/注销平台配置

## 🔧 扩展新平台

### 方法一：动态注册（推荐）

```javascript
import { RepositoryFactory } from "./parseProject/modules/repositoryFactory.js";

const factory = new RepositoryFactory();

// 添加 Bitbucket 支持
factory.registerPlatform("bitbucket", {
  name: "Bitbucket",
  hostname: "bitbucket.org",
  apiBaseUrl: "https://api.bitbucket.org/2.0",
  rawBaseUrl: "https://bitbucket.org",
  defaultBranch: "master",
  apiProjectEndpoint: "/repositories/{owner}/{repo}",
  rawFileTemplate: "{rawBaseUrl}/{owner}/{repo}/raw/{branch}/package.json",
});

// 现在自动支持 Bitbucket URL！
const packageJson = await parseProject("https://bitbucket.org/user/repo");
```

### 方法二：源码配置

在 `modules/repositoryHandlers.js` 的 `PLATFORM_CONFIGS` 中添加新平台配置：

```javascript
const PLATFORM_CONFIGS = {
  // ... 现有配置
  bitbucket: {
    name: "Bitbucket",
    hostname: "bitbucket.org",
    // ... 其他配置
  },
};
```

## 🎛️ 高级功能

### 平台配置管理

```javascript
import { RepositoryFactory } from "./parseProject/modules/repositoryFactory.js";

const factory = new RepositoryFactory();

// 获取平台配置
const githubConfig = factory.getPlatformConfig("github");

// 获取所有配置
const allConfigs = factory.getAllPlatformConfigs();

// 动态注册新平台
factory.registerPlatform("myplatform", config);

// 注销平台
factory.unregisterPlatform("bitbucket");
```

### 支持自定义域名

```javascript
// 自托管 GitLab
factory.registerPlatform("customgitlab", {
  name: "Custom GitLab",
  hostnamePattern: /^gitlab\..*\.com$/, // 匹配 gitlab.*.com
  apiBaseUrl: "https://{hostname}/api/v4",
  rawBaseUrl: "https://{hostname}",
  supportsCustomDomains: true,
  // ... 其他配置
});
```

## 🧪 测试

运行测试验证功能：

```bash
cd src/parseProject
node test/test.js
```
