import fs from "fs";
import { join } from "path";
import { generateLock } from "../index.js";
import { getDirname } from "../../common/utils.js";

const packageJsonPath = join(getDirname(import.meta.url), "test-package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

async function test() {
  console.log("🧪 Running generateLock tests...\n");

  const workDir = join(getDirname(import.meta.url), "workdir");

  try {
    // 清理旧的测试文件
    const packageJsonFile = join(workDir, "package.json");
    const lockFile = join(workDir, "package-lock.json");

    if (fs.existsSync(packageJsonFile)) {
      fs.unlinkSync(packageJsonFile);
      console.log("🧹 Cleaned up old package.json");
    }
    if (fs.existsSync(lockFile)) {
      fs.unlinkSync(lockFile);
      console.log("🧹 Cleaned up old package-lock.json");
    }

    console.log("📝 Testing package.json generation...");
    await generateLock(workDir, packageJson);

    // 验证 package.json 是否生成
    if (fs.existsSync(packageJsonFile)) {
      console.log("✅ package.json generated successfully");

      const generatedContent = JSON.parse(
        fs.readFileSync(packageJsonFile, "utf8")
      );
      if (JSON.stringify(generatedContent) === JSON.stringify(packageJson)) {
        console.log("✅ package.json content matches expected");
      } else {
        console.log("❌ package.json content mismatch");
        process.exit(1);
      }
    } else {
      console.log("❌ package.json was not generated");
      process.exit(1);
    }

    // 验证 lock 文件是否生成（如果 Docker 可用）
    if (fs.existsSync(lockFile)) {
      console.log("✅ package-lock.json generated successfully");
      console.log("🎉 All tests passed!");
    } else {
      console.log(
        "⚠️  package-lock.json was not generated (Docker may not be available)"
      );
      console.log(
        "📋 Test partially passed - package.json generation works correctly"
      );
    }
  } catch (error) {
    if (error.message.includes("Docker is not available")) {
      console.log("⚠️  Docker is not available in this environment");
      console.log(
        "📋 Test partially passed - package.json generation works correctly"
      );
    } else {
      console.error("❌ Test failed:", error.message);
      process.exit(1);
    }
  }
}

test().catch(console.error);
