import fs from "fs";
import path from "path";

/**
 * 平台配置对象
 * 定义每个仓库平台的特定信息
 */
const PLATFORM_CONFIGS = {
  github: {
    name: "GitHub",
    hostname: "github.com",
    apiBaseUrl: "https://api.github.com",
    rawBaseUrl: "https://raw.githubusercontent.com",
    defaultBranch: "main",
    apiProjectEndpoint: "/repos/{owner}/{repo}",
    rawFileTemplate: "{rawBaseUrl}/{owner}/{repo}/{branch}/package.json",
  },
  gitee: {
    name: "Gitee",
    hostname: "gitee.com",
    apiBaseUrl: "https://gitee.com/api/v5",
    rawBaseUrl: "https://gitee.com",
    defaultBranch: "master",
    apiProjectEndpoint: "/repos/{owner}/{repo}",
    rawFileTemplate: "{rawBaseUrl}/{owner}/{repo}/raw/{branch}/package.json",
  },
  gitlab: {
    name: "GitLab",
    hostnamePattern: /gitlab\./,
    apiBaseUrl: "https://{hostname}/api/v4",
    rawBaseUrl: "https://{hostname}",
    defaultBranch: "master",
    apiProjectEndpoint: "/projects/{owner}%2F{repo}",
    rawFileTemplate: "{rawBaseUrl}/{owner}/{repo}/-/raw/{branch}/package.json",
    // GitLab 支持自定义域名，所以使用模式匹配
    supportsCustomDomains: true,
  },
};

/**
 * 统一的仓库处理器
 * 使用配置驱动的方式处理本地和远程仓库
 */
export class RepositoryHandler {
  /**
   * 构造函数，传入平台配置
   * @param {Object} config - 平台配置对象
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * 检测是否支持该URL
   * @param {string} url - 仓库URL
   * @returns {boolean} 是否支持
   */
  static canHandle(url) {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;

      // 检查是否匹配已知平台
      for (const [key, config] of Object.entries(PLATFORM_CONFIGS)) {
        if (config.hostname === hostname) {
          return true;
        }
        // 对于支持自定义域名的平台（如GitLab），使用模式匹配
        if (config.hostnamePattern && config.hostnamePattern.test(hostname)) {
          return true;
        }
      }

      return false;
    } catch {
      return false;
    }
  }

  /**
   * 解析URL，提取仓库信息
   * @param {string} url - 仓库URL
   * @returns {Object} { owner, repo, path, platform, hostname }
   */
  parseUrl(url) {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;

      // 确定平台
      let platform = null;
      let config = null;

      for (const [key, cfg] of Object.entries(PLATFORM_CONFIGS)) {
        if (cfg.hostname === hostname) {
          platform = key;
          config = cfg;
          break;
        }
        if (cfg.hostnamePattern && cfg.hostnamePattern.test(hostname)) {
          platform = key;
          config = cfg;
          break;
        }
      }

      if (!platform) {
        throw new Error(`Unsupported repository platform: ${hostname}`);
      }

      // 获取路径并去除空字符串（如开头的 /）
      const parts = parsedUrl.pathname.split("/").filter(Boolean);

      // 至少需要 owner 和 repo 两段
      if (parts.length < 2) {
        throw new Error(
          `Invalid ${config.name} repository URL: insufficient path segments`
        );
      }

      const owner = parts[0];
      const repo = parts[1];
      const restPath = parts.slice(2);

      // 构造 path：如果有后续路径，则以 '/' 开头拼接；否则为空字符串
      const path = restPath.length > 0 ? "/" + restPath.join("/") : "";

      return {
        owner,
        repo,
        path,
        platform,
        hostname,
        config,
      };
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error("Invalid URL: malformed or missing");
      }
      throw error;
    }
  }

  /**
   * 获取package.json的原始URL
   * @param {Object} gitInfo - 解析后的仓库信息
   * @returns {Promise<string>} package.json的URL
   */
  async getPackageJsonUrl(gitInfo) {
    const { owner, repo, path, hostname, config } = gitInfo;
    let branch = config.defaultBranch;

    // 如果URL中指定了分支（如 /tree/branch），使用指定的分支
    if (path.startsWith("/tree/")) {
      const pathParts = path.split("/").filter(Boolean);
      if (pathParts.length > 1) {
        branch = pathParts[1];
      }
    } else {
      // 尝试从API获取默认分支
      branch = await this.fetchDefaultBranch(owner, repo, hostname, config);
    }

    // 构造原始文件URL
    return this.buildRawFileUrl(owner, repo, branch, hostname, config);
  }

  /**
   * 从API获取默认分支
   * @param {string} owner - 仓库所有者
   * @param {string} repo - 仓库名
   * @param {string} hostname - 主机名
   * @param {Object} config - 平台配置
   * @returns {Promise<string>} 默认分支名
   */
  async fetchDefaultBranch(owner, repo, hostname, config) {
    try {
      let apiUrl = config.apiBaseUrl;

      // 对于支持自定义域名的平台，替换主机名
      if (config.supportsCustomDomains) {
        apiUrl = config.apiBaseUrl.replace("{hostname}", hostname);
      }

      // 构造API URL
      const endpoint = config.apiProjectEndpoint
        .replace("{owner}", owner)
        .replace("{repo}", repo);

      const fullApiUrl = `${apiUrl}${endpoint}`;

      const response = await fetch(fullApiUrl);
      if (response.ok) {
        const info = await response.json();
        return info.default_branch || config.defaultBranch;
      }
    } catch (error) {
      // API调用失败时静默处理，使用默认分支
      console.warn(
        `Failed to fetch default branch from ${config.name} API, using ${config.defaultBranch}:`,
        error.message
      );
    }

    return config.defaultBranch;
  }

  /**
   * 构造原始文件URL
   * @param {string} owner - 仓库所有者
   * @param {string} repo - 仓库名
   * @param {string} branch - 分支名
   * @param {string} hostname - 主机名
   * @param {Object} config - 平台配置
   * @returns {string} 原始文件URL
   */
  buildRawFileUrl(owner, repo, branch, hostname, config) {
    let rawUrl = config.rawFileTemplate;

    // 替换模板变量
    rawUrl = rawUrl
      .replace("{rawBaseUrl}", config.rawBaseUrl)
      .replace("{owner}", owner)
      .replace("{repo}", repo)
      .replace("{branch}", branch);

    // 对于支持自定义域名的平台，替换主机名
    if (config.supportsCustomDomains) {
      rawUrl = rawUrl.replace("{hostname}", hostname);
    }

    return rawUrl;
  }

  /**
   * 解析远程仓库
   * @param {string} url - 仓库URL
   * @returns {Promise<Object>} package.json内容
   */
  async parseProject(input) {
    // 检查是否为远程仓库URL
    if (input.startsWith("http://") || input.startsWith("https://")) {
      // 远程仓库处理
      const gitInfo = this.parseUrl(input);
      const packageJsonUrl = await this.getPackageJsonUrl(gitInfo);
      const response = await fetch(packageJsonUrl);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch package.json: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } else {
      // 本地项目处理
      try {
        const packageJsonPath = path.join(input, "package.json");
        const json = await fs.promises.readFile(packageJsonPath, "utf8");
        return JSON.parse(json);
      } catch (error) {
        if (error.code === "ENOENT") {
          throw new Error(`package.json not found in: ${input}`);
        }
        if (error instanceof SyntaxError) {
          throw new Error(`Invalid JSON in package.json: ${error.message}`);
        }
        throw error;
      }
    }
  }
}

/**
 * 获取所有支持的平台配置
 * @returns {Object} 平台配置对象
 */
export function getPlatformConfigs() {
  return PLATFORM_CONFIGS;
}

/**
 * 获取支持的平台名称列表
 * @returns {Array<string>} 平台名称数组
 */
export function getSupportedPlatforms() {
  return Object.values(PLATFORM_CONFIGS).map((config) => config.name);
}
