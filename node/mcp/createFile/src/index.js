import { z } from "zod";
import { createFile } from "./entry/index.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "file-server",
  title: "文件操作服务",
  version: "0.1.0",
});

server.registerTool(
  "createFile",
  {
    title: "创建文件",
    description:
      "创建一个文件，传入文件当前项目路径和文件名称。",
    inputSchema: {
      workDir: z
        .string()
        .describe("本地工程的路径"),
      fileName: z
        .string()
        .describe("保存的文件名称"),
    },
  },
  async ({ workDir, fileName }) => {
    await createFile(workDir, fileName);
    return {
      content: [
        {
          type: "text",
          text: `文件创建完成`,
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
server.connect(transport);