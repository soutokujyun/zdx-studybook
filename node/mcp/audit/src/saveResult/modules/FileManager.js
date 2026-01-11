import fs from "fs";
import { dirname, basename } from "path";
import { createInterface } from "readline";
import { PathResolver } from "./PathResolver.js";
import { CONFIG } from "../config.js";

/**
 * 文件管理器类 - 负责文件操作
 */
export class FileManager {
  constructor(pathResolver = new PathResolver()) {
    this.pathResolver = pathResolver;
  }

  /**
   * 保存文件
   * @param {string} content 文件内容
   * @param {string} userPath 用户指定的路径
   * @param {boolean} enableBackup 是否启用备份
   */
  async save(content, userPath, enableBackup = true) {
    const filePath = this.pathResolver.resolve(userPath);

    // 检查文件是否存在，询问是否覆盖
    if (await this.#fileExists(filePath)) {
      const shouldOverwrite = await this.#confirmOverwrite(filePath);
      if (!shouldOverwrite) {
        throw new Error("用户取消了文件保存操作");
      }

      // 创建备份
      if (enableBackup) {
        await this.#createBackup(filePath);
      }
    }

    // 确保目录存在
    await this.#ensureDirectoryExists(filePath);

    // 写入文件
    await this.#writeFile(filePath, content);

    return filePath;
  }

  /**
   * 检查文件是否存在
   * @private
   */
  async #fileExists(filePath) {
    try {
      await fs.promises.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 确认是否覆盖文件
   * @private
   */
  async #confirmOverwrite(filePath) {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(
        `文件 "${basename(filePath)}" 已存在，是否覆盖？(y/N): `,
        (answer) => {
          rl.close();
          resolve(
            answer.toLowerCase() === "y" || answer.toLowerCase() === "yes"
          );
        }
      );
    });
  }

  /**
   * 创建文件备份
   * @private
   */
  async #createBackup(filePath) {
    try {
      const backupPath = `${filePath}${CONFIG.BACKUP_SUFFIX}`;
      await fs.promises.copyFile(filePath, backupPath);
      console.log(`已创建备份文件: ${basename(backupPath)}`);
    } catch (error) {
      console.warn(`创建备份失败: ${error.message}`);
    }
  }

  /**
   * 确保目录存在
   * @private
   */
  async #ensureDirectoryExists(filePath) {
    const dir = dirname(filePath);
    await fs.promises.mkdir(dir, { recursive: true });
  }

  /**
   * 写入文件
   * @private
   */
  async #writeFile(filePath, content) {
    await fs.promises.writeFile(filePath, content, "utf8");
  }
}
