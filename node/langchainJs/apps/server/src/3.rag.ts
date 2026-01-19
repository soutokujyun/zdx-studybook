/**
 * 检索增强生成（Retrieval Augmented Generation）
 * LM 最强大的应用之一是复杂的问答聊天机器人。这些应用程序可以回答有关特定源信息的问题。这些应用使用了一种称为 “检索增强生成”（RAG）的技术。
 */
import 'dotenv/config';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import path from 'path';
import { fileURLToPath } from 'url';
import { createAgent } from 'langchain';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import * as z from 'zod';
import { tool } from "@langchain/core/tools";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const loader = new PDFLoader(path.join(__dirname,"../public/test.pdf"));

const docs = await loader.load();
// 分割器
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
const allSplits = await textSplitter.splitDocuments(docs);

// 使用嵌入模型进行初始化，这些模型决定了如何将文本数据转换为数值向量
const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-v1",
    apiKey: process.env.DASHSCOPE_API_KEY,
    configuration: {
        baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    }
  }); 
// 内存存储
/**
 * VectorStore：包绕向量数据库的封装器，用于存储和查询嵌入
 */
const vectorStore = new MemoryVectorStore(embeddings);
await vectorStore.addDocuments(allSplits);

const retrieveSchema = z.object({ query: z.string() });

/**
 * Retrieval(检索)--检索工具
 * 大型语言模型（LLM）功能强大，但它们有两个关键限制:
 * 1、有限语境——他们无法一次性吞噬整个语料库。
 * 2、静态知识——他们的训练数据被冻结在某个时间点。
 * 解决方法：检索增强生成（RAG）--通过上下文特定信息增强LLM的答案
 */
const retrieve = tool(
  async ({ query }) => {
    // 从向量数据库中检索与查询最相关的文档
    const retrievedDocs = await vectorStore.similaritySearch(query, 2);
    // 序列化文档，将其转换为字符串格式
    const serialized = retrievedDocs
      .map(
        (doc) => `Source: ${doc.metadata.source}\nContent: ${doc.pageContent}`
      )
      .join("\n");
    return [serialized, retrievedDocs];
  },
  {
    name: "retrieve", // 检索工具的名称
    description: "Retrieve information related to a query.", // 检索工具的描述
    schema: retrieveSchema, // 检索工具的输入模式
    responseFormat: "content_and_artifact", // 响应格式
  }
);

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
    tools: [retrieve],
    systemPrompt: new SystemMessage("你是一个专业的健康问答机器人，只能根据提供的信息回答问题。"),
});

let agentInputs = {
  messages: [new HumanMessage("请给出运动处方制定的原则")],
};

const stream = await agent.stream(agentInputs, {
  streamMode: "values",
});
for await (const step of stream) {
  const lastMessage = step.messages[step.messages.length - 1];
  console.log(`[${lastMessage?.id}]: ${lastMessage?.content}`);
  console.log("-----\n");
}