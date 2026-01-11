import fs from "fs";
import { join, dirname } from "path";
import { execSync } from "child_process";
import { runCommand } from "../../common/utils.js";

class GenerateLock {
  constructor() {
    this.imageName = "mcp-audit-env:latest";
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
   * 检查 Docker 是否可用
   */
  checkDockerAvailable() {
    try {
      execSync("docker --version", { stdio: "ignore" });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * 确保 Docker 镜像存在，如果不存在则构建
   */
  async ensureDockerImage() {
    try {
      // 检查镜像是否存在
      execSync(`docker image inspect ${this.imageName}`, { stdio: "ignore" });
      console.log("Docker image already exists:", this.imageName);
    } catch (error) {
      // 镜像不存在，构建镜像
      console.log("Building Docker image:", this.imageName);
      const dockerfileDir = process.cwd();
      execSync(`docker build -t ${this.imageName} .`, {
        cwd: dockerfileDir,
        stdio: "inherit",
      });
      console.log("Docker image built successfully:", this.imageName);
    }
  }

  /**
   * 创建 lock 文件（使用 Docker 容器确保环境一致性）
   */
  async createLockFile(workDir) {
    if (!this.checkDockerAvailable()) {
      throw new Error(
        "Docker is not available. Please install Docker to ensure consistent lock file generation across different environments."
      );
    }

    // 确保 Docker 镜像存在
    await this.ensureDockerImage();

    // 使用 Docker 容器运行 npm 命令
    const cmd = `docker run --rm -v "${workDir}:/workspace" -w /workspace ${this.imageName} npm install --package-lock-only --force`;

    try {
      console.log("Generating lock file using Docker container...");
      await runCommand(cmd, process.cwd());
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
