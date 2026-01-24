/**
 * 构建一个能够使用 LangChain 回答 SQL 数据库问题的代理RAG:
 * 1. 从数据库获取可用的表和模式
 * 2. 确定哪些表格与问题相关
 * 3. 获取相关表的模式
 * 4. 根据问题和模式中的信息生成查询
 * 5. 用LLM仔细检查查询中的常见错误
 * 6. 执行查询并返回结果
 * 7. 数据库引擎发现的错误纠正，直到查询成功--EXPLAIN是MySQL数据库提供的命令，用于分析SQL语句的执行计划。
 * 8. 根据结果制定回应
 */
import { SqlDatabase } from "@langchain/classic/sql_db";
import { DataSource } from "typeorm";
import { SystemMessage, createAgent, tool } from "langchain"
import * as z from "zod";
import { ChatOpenAI } from "@langchain/openai";

async function getDb(): Promise<SqlDatabase | undefined> {
    const datasource = new DataSource({ type: "mysql", host: "localhost", port: 3306, username: "root", password: "123456", database: "dass" });
    const db = await SqlDatabase.fromDataSourceParams({ appDataSource: datasource });
    return db;
}

const db: SqlDatabase | undefined = await getDb();

async function getSchema() {
  if (!db) {
    throw new Error("db is not initialized");
  }
  return await db.getTableInfo();
}

const DENY_RE = /\b(INSERT|UPDATE|DELETE|ALTER|DROP|CREATE|REPLACE|TRUNCATE)\b/i;
const HAS_LIMIT_TAIL_RE = /\blimit\b\s+\d+(\s*,\s*\d+)?\s*;?\s*$/i;

async function sanitizeSqlQuery(q: string) {
  let query = String(q ?? "").trim();

  // block multiple statements (allow one optional trailing ;)
  const semis = [...query].filter((c) => c === ";").length;
  if (semis > 1 || (query.endsWith(";") && query.slice(0, -1).includes(";"))) {
    throw new Error("multiple statements are not allowed.")
  }
  query = query.replace(/;+\s*$/g, "").trim();

  // read-only gate
  if (!query.toLowerCase().startsWith("select")) {
    throw new Error("Only SELECT statements are allowed")
  }
  if (DENY_RE.test(query)) {
    throw new Error("DML/DDL detected. Only read-only queries are permitted.")
  }
  
  // append LIMIT only if not already present
  if (!HAS_LIMIT_TAIL_RE.test(query)) {
    query += " LIMIT 5";
  }

  try {
    await db?.run("Explain " + query);
  } catch (e: any) {
    throw new Error("SQL syntax error.")
  }
  return query;
}

const executeSql = tool(
  async ({ query }) => {
    const q = await sanitizeSqlQuery(query);
    try {
      const result = await db?.run(q);
      return typeof result === "string" ? result : JSON.stringify(result, null, 2);
    } catch (e: any) {
      throw new Error(e?.message ?? String(e))
    }
  },
  {
    name: "execute_sql",
    description: "Execute a READ-ONLY Mysql SELECT query and return results.",
    schema: z.object({
      query: z.string().describe("Mysql SELECT query to execute (read-only)."),
    }),
  }
);

const getSystemPrompt = async () => new SystemMessage(`You are a careful Mysql analyst.

Authoritative schema (do not invent columns/tables):
${await getSchema()}

Rules:
- Think step-by-step.
- When you need data, call the tool \`execute_sql\` with ONE SELECT query.
- Read-only only; no INSERT/UPDATE/DELETE/ALTER/DROP/CREATE/REPLACE/TRUNCATE.
- Limit to 5 rows unless user explicitly asks otherwise.
- If the tool returns 'Error:', revise the SQL and try again.
- Limit the number of attempts to 5.
- If you are not successful after 5 attempts, return a note to the user.
- Prefer explicit column lists; avoid SELECT *.
`);

const llm = new ChatOpenAI({
  model: "qwen-plus",
  temperature: 0,
  // maxTokens: 1000, // 最大输出token数
  // timeout: 300, // 超时时间，单位秒
  maxRetries: 2, // 最大重试次数
  apiKey: process.env.DASHSCOPE_API_KEY,
  configuration: {
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  }
  // organization: "...",
  // other params...
  });

const agent = createAgent({
  model: llm,
  tools: [executeSql],
  systemPrompt: await getSystemPrompt(),
});

const question = "请结合com_prop_defs和com_prop_values两张表，给出server_id为form_01的表单的所有属性值";
const stream = await agent.stream(
  { messages: [{ role: "user", content: question }] },
  { streamMode: "values" }
);
for await (const step of stream) {
  const message = step.messages.at(-1);
  console.log(`${message?.id}: ${JSON.stringify(message?.content, null, 2)}`);
}