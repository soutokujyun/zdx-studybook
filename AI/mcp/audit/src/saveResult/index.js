import { UserInteractionHandler } from "./modules/UserInteractionHandler.js";

/**
 * 保存审计结果的主函数
 * @param {string} renderedResult 渲染后的审计结果
 * @returns {Promise<string>} 保存的文件路径
 */
export async function saveResult(renderedResult) {
  if (!renderedResult || typeof renderedResult !== "string") {
    throw new Error("无效的审计结果内容");
  }

  const handler = new UserInteractionHandler();
  return await handler.promptAndSave(renderedResult);
}
