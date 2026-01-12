/**
 * 获取项目根目录
 */
import { join } from "path";
import { getDirname } from "../common/utils.js";

/**
 * saveResult 模块的统一配置文件
 */
export const CONFIG = {
  // 默认文件名
  DEFAULT_FILENAME: "AUDIT_RESULT.md",

  // 备份文件后缀
  BACKUP_SUFFIX: ".backup",

  // 支持的文件扩展名
  SUPPORTED_EXTENSIONS: [".md", ".txt", ".json"],

  // 最大备份数量
  MAX_BACKUPS: 5,
};

export const PROJECT_ROOT = join(getDirname(import.meta.url), "../..");
