import {
  parseProject,
  isSupportedRepositoryUrl,
  getSupportedPlatforms,
} from "../index.js";
import fs from "fs";
import path from "path";

// 辅助函数：保存JSON结果到文件
function saveResult(filename, data) {
  const resultDir = path.join(process.cwd(), "src/parseProject/test/result");
  const filePath = path.join(resultDir, filename);

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    console.log(`结果已保存到: ${filePath}`);
  } catch (error) {
    console.error(`保存文件失败 ${filename}:`, error.message);
  }
}

// 测试本地项目解析
async function testLocalProject() {
  const localProjectPath =
    process.platform === "win32"
      ? "D:\\backup\\MCP\\mcp-audit"
      : "/path/to/local/project";

  try {
    const packageJson = await parseProject(localProjectPath);
    console.log("本地项目解析成功:", packageJson.name);
    saveResult("result-local.json", packageJson);
  } catch (error) {
    console.error("本地项目解析失败:", error.message);
  }
}

// 测试GitHub仓库解析
async function testGitHubProject() {
  const githubUrl = "https://github.com/webpack/webpack";
  try {
    console.log("测试GitHub仓库:", githubUrl);
    const packageJson = await parseProject(githubUrl);
    console.log("GitHub仓库解析成功:", packageJson.name);
    saveResult("result-github.json", packageJson);
  } catch (error) {
    console.error("GitHub仓库解析失败:", error.message);
  }
}

// 测试Gitee仓库解析
async function testGiteeProject() {
  const giteeUrl = "https://gitee.com/mirrors/webpack";
  try {
    console.log("测试Gitee仓库:", giteeUrl);
    const packageJson = await parseProject(giteeUrl);
    console.log("Gitee仓库解析成功:", packageJson.name);
    saveResult("result-gitee.json", packageJson);
  } catch (error) {
    console.error("Gitee仓库解析失败:", error.message);
  }
}

// 测试GitLab仓库解析
async function testGitLabProject() {
  const gitlabUrl = "https://gitlab.com/gitlab-org/gitlab-ui";
  try {
    console.log("测试GitLab仓库:", gitlabUrl);
    const packageJson = await parseProject(gitlabUrl);
    console.log(
      "GitLab仓库解析成功:",
      packageJson.name || "package.json found (no name field)"
    );
    saveResult("result-gitlab.json", packageJson);
  } catch (error) {
    console.error("GitLab仓库解析失败:", error.message);
  }
}

// 测试URL支持检测
function testUrlSupport() {
  console.log("\n=== URL支持检测测试 ===");
  const urls = [
    "https://github.com/user/repo",
    "https://gitee.com/user/repo",
    "https://gitlab.com/user/repo",
    "https://example.com/user/repo", // 不支持
    "invalid-url", // 不支持
  ];

  urls.forEach((url) => {
    const supported = isSupportedRepositoryUrl(url);
    console.log(`${url}: ${supported ? "支持" : "不支持"}`);
  });

  console.log("\n支持的平台:", getSupportedPlatforms().join(", "));
}

// 运行所有测试
async function runAllTests() {
  console.log("=== 开始运行所有测试 ===\n");

  await testLocalProject();
  console.log();

  await testGitHubProject();
  console.log();

  await testGiteeProject();
  console.log();

  await testGitLabProject();
  console.log();

  testUrlSupport();

  console.log("\n=== 所有测试完成 ===");
}

runAllTests();
