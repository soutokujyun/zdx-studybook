import { audit } from "../audit/index.js";
import { render } from "../render/index.js";
import { saveResult } from "../saveResult/index.js";
import { parseProject } from "../parseProject/index.js";
import { generateLock } from "../generateLock/index.js";
import { workDir as workDirInstance } from "../workDir/index.js";

/**
 * 对项目本身以及其所有直接和间接依赖进行安全审计
 * @param {string} projectRoot 项目根目录，可以是本地项目的路径或远程项目的URL
 */
export async function auditProject(projectRoot) {
  let workDir;

  try {
    // 1. 创建工作目录
    workDir = await workDirInstance.createWorkDir();
    // 2. 解析项目的package.json文件
    const packageJSON = await parseProject(projectRoot);
    // 3. 生成lock文件
    await generateLock(workDir, packageJSON);
    // 4. 执行安全审计
    const auditResult = await audit(workDir, packageJSON);
    // 5. 渲染审计结果
    const renderedResult = await render(auditResult, packageJSON);
    // 6. 删除工作目录
    await workDir.deleteWorkDir(workDir);
    // 7. 将结果保存到指定位置
    await saveResult(renderedResult);
  } catch (error) {
    // 如果有步骤出错，清理工作目录并重新抛出错误
    if (workDir) {
      await workDir
        .deleteWorkDir(workDir)
        .catch((cleanupError) =>
          console.warn("清理工作目录失败:", cleanupError.message)
        );
    }
    throw error;
  }
}
