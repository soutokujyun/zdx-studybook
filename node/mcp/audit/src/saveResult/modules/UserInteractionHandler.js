import { createInterface } from "readline";
import { FileManager } from "./FileManager.js";

/**
 * 用户交互处理器类 - 负责与用户的交互
 */
export class UserInteractionHandler {
  constructor(fileManager = new FileManager()) {
    this.fileManager = fileManager;
  }

  /**
   * 询问用户保存位置并保存文件
   * @param {string} content 要保存的内容
   * @returns {Promise<string>} 保存的文件路径
   */
  async promptAndSave(content) {
    const userPath = await this.#promptSaveLocation();
    const savedPath = await this.fileManager.save(content, userPath);

    console.log(`✅ 审计结果已成功保存到: ${savedPath}`);
    return savedPath;
  }

  /**
   * 提示用户输入保存位置
   * @private
   */
  async #promptSaveLocation() {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(
        `
        📁 请输入审计结果保存位置:
          • 默认: ./AUDIT_RESULT.md
          • 绝对路径: 例如 /path/to/file.md
          • 相对路径: 例如 ./reports/audit.md
          • 仅文件名: 例如 my-audit (自动添加 .md 扩展名)

        > `,
        (answer) => {
          rl.close();
          resolve(answer);
        }
      );
    });
  }
}
