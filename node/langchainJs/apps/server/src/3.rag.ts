/**
 * 检索增强生成（Retrieval Augmented Generation）
 * LM 最强大的应用之一是复杂的问答聊天机器人。这些应用程序可以回答有关特定源信息的问题。这些应用使用了一种称为 “检索增强生成”（RAG）的技术。
 */
import 'dotenv/config';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import path from 'path';
import { fileURLToPath } from 'url';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
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
const vectorStore = new MemoryVectorStore(embeddings);
await vectorStore.addDocuments(allSplits);

const retrieveSchema = z.object({ query: z.string() });

/**
 * 检索工具
 * 该工具用于根据查询从向量数据库中检索相关文档。
 * 它将查询作为输入，并返回与查询最相关的文档。
 * 输入：
 * - query: 要检索的查询字符串。
 * 
 * 输出：
 * - 一个包含与查询最相关的文档的数组。
 * 
 * 示例：
 * - 查询：“什么是检索增强生成？”
 * - 输出：一个包含与查询最相关的文档的数组。
 */
const retrieve = tool(
  async ({ query }) => {
    const retrievedDocs = await vectorStore.similaritySearch(query, 3);
    const serialized = retrievedDocs
      .map(
        (doc) => `Source: ${doc.metadata.source}\nContent: ${doc.pageContent}`
      )
      .join("\n");
    return [serialized, retrievedDocs];
  },
  {
    name: "retrieve",
    description: "Retrieve information related to a query.",
    schema: retrieveSchema,
    responseFormat: "content_and_artifact",
  }
);