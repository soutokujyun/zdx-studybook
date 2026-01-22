import generateLockInstance from "./modules/generateLock.js";

/**
 * 生成 lock 文件
 * @param {string} workDir 工作目录
 * @param {object} packageJson package.json 内容
 */
export async function generateLock(workDir, packageJson) {
  return generateLockInstance.generateLock(workDir, packageJson);
}
