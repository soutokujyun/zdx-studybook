import { RepositoryFactory } from "./modules/repositoryFactory.js";

const repositoryFactory = new RepositoryFactory();

/**
 * 解析工程根目录下的package.json文件
 * 支持本地路径和多种远程仓库URL（GitHub、Gitee、GitLab等）
 * @param {string} projectRoot 工程本地的根目录或远程仓库的URL
 * @example
 * // 本地项目
 * parseProject('/path/to/local/project');
 * // GitHub仓库
 * parseProject('https://github.com/webpack/webpack');
 * // Gitee仓库
 * parseProject('https://gitee.com/some-user/some-repo');
 * // GitLab仓库
 * parseProject('https://gitlab.com/user/repo');
 * @returns {Promise<Object>} 返回解析后的package.json内容
 * @throws {Error} 如果解析失败或文件不存在，或URL格式不支持
 */
export function parseProject(projectRoot) {
  // 使用工厂模式创建合适的处理器（自动识别本地路径或远程URL）
  const handler = repositoryFactory.createHandler(projectRoot);
  // 统一的解析接口
  return handler.parseProject(projectRoot);
}

/**
 * 检查URL是否被支持
 * @param {string} url - 仓库URL
 * @returns {boolean} 是否支持
 */
export function isSupportedRepositoryUrl(url) {
  return repositoryFactory.isSupported(url);
}

/**
 * 获取所有支持的仓库平台
 * @returns {Array<string>} 支持的平台列表
 */
export function getSupportedPlatforms() {
  return repositoryFactory.getSupportedPlatforms();
}
