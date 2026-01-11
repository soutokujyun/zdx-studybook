import fs from "fs";
import { join } from "path";
import { uniqueId, getDirname } from "../common/utils.js";

class WorkDir {
  constructor() {
    this.__dirname = getDirname(import.meta.url); // 获取当前文件的目录名
    this.basePath = join(this.__dirname, "../.."); // 获取上两级目录
    this.workBasePath = join(this.basePath, "work"); // 定义工作目录路径
    fs.mkdirSync(this.workBasePath, { recursive: true }); // 确保工作目录存在
  }

  /**
   * 创建工作目录
   * @returns {Promise<string>} 工作目录路径
   */
  async createWorkDir() {
    const workDir = join(this.workBasePath, uniqueId());
    await fs.promises.mkdir(workDir, { recursive: true }); // 创建工作目录
    return workDir;
  }

  /**
   * 删除工作目录
   * @param {string} workDir 要删除的工作目录路径
   */
  async deleteWorkDir(workDir) {
    await fs.promises.rm(workDir, { recursive: true }); // 删除工作目录
  }
}

// 导出单例实例
export const workDir = new WorkDir();
