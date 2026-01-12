import { join, isAbsolute } from "path";
import { CONFIG, PROJECT_ROOT } from "../config.js";

/**
 * 路径解析器类 - 负责解析用户输入的保存路径
 */
export class PathResolver {
  constructor(projectRoot = PROJECT_ROOT) {
    this.projectRoot = projectRoot;
  }

  /**
   * 解析用户输入路径
   * @param {string} userInput 用户输入
   * @returns {string} 解析后的绝对路径
   */
  resolve(userInput) {
    const input = this.#normalizeInput(userInput);

    if (!input) {
      return this.#getDefaultPath();
    }

    if (this.#isAbsolutePath(input)) {
      return this.#ensureValidExtension(input);
    }

    if (this.#isRelativeToProject(input)) {
      return this.#resolveRelativeToProject(input);
    }

    return this.#resolveAsFilename(input);
  }

  /**
   * 标准化用户输入
   * @private
   */
  #normalizeInput(input) {
    return input?.trim() || "";
  }

  /**
   * 获取默认路径
   * @private
   */
  #getDefaultPath() {
    return join(this.projectRoot, CONFIG.DEFAULT_FILENAME);
  }

  /**
   * 检查是否为绝对路径
   * @private
   */
  #isAbsolutePath(input) {
    return isAbsolute(input);
  }

  /**
   * 检查是否为项目相对路径
   * @private
   */
  #isRelativeToProject(input) {
    return input.startsWith("./") || input.startsWith("../");
  }

  /**
   * 确保文件有有效扩展名
   * @private
   */
  #ensureValidExtension(path) {
    const ext = this.#getExtension(path);
    if (!ext) {
      return `${path}.md`;
    }
    return path;
  }

  /**
   * 解析相对于项目的路径
   * @private
   */
  #resolveRelativeToProject(input) {
    const relativePath = input.startsWith("./") ? input.substring(2) : input;
    const fullPath = join(this.projectRoot, relativePath);
    return this.#ensureValidExtension(fullPath);
  }

  /**
   * 作为文件名解析
   * @private
   */
  #resolveAsFilename(input) {
    const fullPath = join(this.projectRoot, input);
    return this.#ensureValidExtension(fullPath);
  }

  /**
   * 获取文件扩展名
   * @private
   */
  #getExtension(filename) {
    return filename.includes(".")
      ? filename.substring(filename.lastIndexOf("."))
      : "";
  }
}
