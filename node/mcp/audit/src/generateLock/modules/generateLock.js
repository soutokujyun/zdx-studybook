import fs from "fs";
import { join, dirname } from "path";
import { runCommand } from "../../common/utils.js";

class GenerateLock {
  constructor() {
  }

  /**
   * 写入 package.json 文件
   */
  async writePackageJson(workDir, packageJson) {
    const packageJsonPath = join(workDir, "package.json");
    fs.mkdirSync(dirname(packageJsonPath), { recursive: true });
    await fs.promises.writeFile(
      packageJsonPath,
      JSON.stringify(packageJson),
      "utf8"
    );
  }

  /**
   * 创建 lock 文件
   */
  async createLockFile(workDir) {
    const cmd = `npm install --package-lock-only --force`;

    try {
      console.log("Generating lock file using Docker container...");
      await runCommand(cmd, workDir);
      console.log("Lock file generated successfully using Docker container");
    } catch (error) {
      console.error(
        "Failed to generate lock file using Docker:",
        error.message
      );
      throw error;
    }
  }

  /**
   * 生成 lock 文件
   */
  async generateLock(workDir, packageJson) {
    // 1. 将 package.json 写入工作目录
    await this.writePackageJson(workDir, packageJson);
    // 2. 生成 lock 文件
    await this.createLockFile(workDir);
  }
}

// 导出单例实例
export default new GenerateLock();
