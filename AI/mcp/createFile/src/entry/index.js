
import fs from "fs";
import { join, dirname } from "path";

export async function createFile(workDir, fileName) {
  const filePath = join(workDir, fileName);
  console.log(filePath);
  
  fs.mkdirSync(dirname(filePath), { recursive: true });
  await fs.promises.writeFile(filePath, "文件内容", "utf-8");
}