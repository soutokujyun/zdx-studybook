#!/usr/bin/env node

/**
 * Docker环境测试脚本
 * 用于验证Docker镜像是否能正常生成lock文件
 * @description 生成结果位置：当前根目录/wordk/xxxx下面
 */

import fs from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { auditPackage } from "../../src/entry/index.js";

async function testDockerEnvironment() {
  console.log("Testing Docker environment for lock file generation...\n");

  // 创建临时测试目录
  const testDir = join(tmpdir(), "mcp-audit-docker-test-" + Date.now());
  const resultPath = join(testDir, "test-result.md");
  const packageJsonPath = join(testDir, "package.json");

  try {
    // 创建测试用的package.json
    const testPackageJson = {
      name: "test-package",
      version: "1.0.0",
      dependencies: {
        lodash: "^4.17.21",
      },
    };

    fs.mkdirSync(testDir, { recursive: true });

    // 将package.json写入临时目录
    fs.writeFileSync(packageJsonPath, JSON.stringify(testPackageJson, null, 2));

    console.log("1. Testing lock file generation with Docker...");

    // 测试auditPackage函数（传递项目目录路径）
    await auditPackage(testDir, resultPath);

    console.log("2. Checking if lock file was generated...");

    // 检查lock文件是否生成
    const lockFilePath = join(testDir, "package-lock.json");
    if (fs.existsSync(lockFilePath)) {
      console.log("✅ Lock file generated successfully!");
      const stats = fs.statSync(lockFilePath);
      console.log(`   File size: ${stats.size} bytes`);
    } else {
      console.log("❌ Lock file was not generated");
      process.exit(1);
    }

    // 检查结果文件
    if (fs.existsSync(resultPath)) {
      console.log("✅ Audit result generated successfully!");
    } else {
      console.log("❌ Audit result was not generated");
    }

    console.log("\n🎉 Docker environment test passed!");
    console.log("The Docker-based lock file generation is working correctly.");
  } catch (error) {
    console.error("\n❌ Docker environment test failed:");
    console.error(error.message);

    if (error.message.includes("Docker is not available")) {
      console.log("\n💡 Please install Docker and try again.");
      console.log(
        "   Download: https://www.docker.com/products/docker-desktop"
      );
    }

    process.exit(1);
  } finally {
    // 清理临时目录
    try {
      if (fs.existsSync(testDir)) {
        fs.rmSync(testDir, { recursive: true, force: true });
        console.log("\n🧹 Cleaned up test directory");
      }
    } catch (cleanupError) {
      console.warn(
        "Warning: Failed to clean up test directory:",
        cleanupError.message
      );
    }
  }
}

// 运行测试
testDockerEnvironment().catch(console.error);
