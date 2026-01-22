import {
  RepositoryHandler,
  getPlatformConfigs,
  getSupportedPlatforms as getSupportedPlatformsFromHandlers,
} from "./repositoryHandlers.js";

/**
 * 仓库处理器工厂类
 * 根据URL自动选择合适的仓库处理器，使用配置驱动的方式
 */
export class RepositoryFactory {
  constructor() {
    this.platformConfigs = getPlatformConfigs();
  }

  /**
   * 根据输入创建合适的仓库处理器
   * @param {string} input - 本地路径或仓库URL
   * @returns {RepositoryHandler} 对应的处理器实例
   * @throws {Error} 如果输入无效或不支持
   */
  createHandler(input) {
    // 检查是否为远程仓库URL
    if (input.startsWith("http://") || input.startsWith("https://")) {
      if (RepositoryHandler.canHandle(input)) {
        return new RepositoryHandler();
      }
      throw new Error(
        `Unsupported repository URL: ${input}. Supported platforms: ${this.getSupportedPlatforms().join(
          ", "
        )}`
      );
    }

    // 本地路径，直接返回处理器（现在RepositoryHandler可以处理本地路径）
    return new RepositoryHandler();
  }

  /**
   * 检查URL是否被支持
   * @param {string} url - 仓库URL
   * @returns {boolean} 是否支持
   */
  isSupported(url) {
    return RepositoryHandler.canHandle(url);
  }

  /**
   * 获取所有支持的平台信息
   * @returns {Array<string>} 支持的平台列表
   */
  getSupportedPlatforms() {
    return getSupportedPlatformsFromHandlers();
  }

  /**
   * 获取平台配置
   * @param {string} platformName - 平台名称
   * @returns {Object|null} 平台配置对象，如果不存在返回null
   */
  getPlatformConfig(platformName) {
    return this.platformConfigs[platformName.toLowerCase()] || null;
  }

  /**
   * 获取所有平台配置
   * @returns {Object} 所有平台配置
   */
  getAllPlatformConfigs() {
    return { ...this.platformConfigs };
  }

  /**
   * 注册新的平台配置
   * @param {string} platformKey - 平台键名
   * @param {Object} config - 平台配置对象
   * @throws {Error} 如果配置无效或平台已存在
   */
  registerPlatform(platformKey, config) {
    // 验证配置
    const requiredFields = ["name", "rawFileTemplate", "defaultBranch"];

    for (const field of requiredFields) {
      if (!config[field]) {
        throw new Error(`Platform config missing required field: ${field}`);
      }
    }

    // 检查平台是否已存在
    if (this.platformConfigs[platformKey]) {
      throw new Error(`Platform ${platformKey} already exists`);
    }

    this.platformConfigs[platformKey] = config;
  }

  /**
   * 注销平台配置
   * @param {string} platformKey - 平台键名
   * @returns {boolean} 是否成功注销
   */
  unregisterPlatform(platformKey) {
    if (this.platformConfigs[platformKey]) {
      delete this.platformConfigs[platformKey];
      return true;
    }
    return false;
  }
}
