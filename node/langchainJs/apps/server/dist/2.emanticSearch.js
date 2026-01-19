/**
 * 本教程将帮助您熟悉 LangChain 的文档加载器、嵌入和向量存储抽象概念。
 * 这些抽象概念旨在支持从（向量）数据库和其他来源检索数据，以便与 LLM 工作流集成。
 * 对于那些需要获取数据以进行推理以用于模型推理的应用程序（例如检索增强生成，即RAG）而言，这些抽象概念至关重要。
 */
/**
 * 我们将在此构建一个基于 PDF 文档的搜索引擎。这将使我们能够检索 PDF 中与输入查询相似的段落。本指南还包含一个基于该搜索引擎的最小 RAG 实现。
 */
// 1. 文档加载器
/**
 * LangChain 实现了文档抽象，旨在表示一个文本单元及其关联的元数据。它具有三个属性：
 * pageContent：表示内容的字符串；
 * metadata：包含任意元数据的字典,可以捕获有关文档来源、与其他文档的关系以及其他信息
 * id（可选）文档的字符串标识符。
 */
// import { Document } from "@langchain/core/documents";
// const documents = [
//   new Document({
//     pageContent:
//       "Dogs are great companions, known for their loyalty and friendliness.",
//     metadata: { source: "mammal-pets-doc" },
//   }),
//   new Document({
//     pageContent: "Cats are independent pets that often enjoy their own space.",
//     metadata: { source: "mammal-pets-doc" },
//   }),
// ];
// 2. 嵌入
/**
 * 嵌入是将文本转换为向量表示的过程。
 * 这使得可以在向量空间中对文本进行比较和操作。
 * 例如，我们可以计算两个文本之间的相似度，或者找到与给定文本最相似的文本。
 */
// 加载pdf文件
import 'dotenv/config';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import path from 'path';
import { fileURLToPath } from 'url';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
// import { Chroma } from "@langchain/community/vectorstores/chroma";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const loader = new PDFLoader(path.join(__dirname, "../public/test.pdf"));
const docs = await loader.load();
// console.log(docs.length);
// 分割器
/**
 * 文档加载器将文档加载到内存中。
 * 但是，我们通常需要将文档拆分成更小的块，以便可以将它们嵌入到向量数据库中。
 * 这就是文本分割器的用武之地。
 * 文本分割器将文档拆分成更小的块，每个块都有一个最大字符数。
 * 这确保了每个块都可以适合模型的上下文窗口。
 */
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});
const allSplits = await textSplitter.splitDocuments(docs);
// console.log(allSplits.length);
// console.log(allSplits.at(0)?.pageContent);
// console.log(process.env.DASHSCOPE_API_KEY);
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
// 容器存储
// const vectorStore = new Chroma(embeddings, {
//     collectionName: "a-test-collection",
// });
// const vector1 = await embeddings.embedQuery(allSplits.at(0)?.pageContent || '');
// const vector2 = await embeddings.embedQuery(allSplits.at(1)?.pageContent || '');
// console.assert(vector1.length === vector2.length);
// console.log(`Generated vectors of length ${vector1.length}\n`);
// console.log(vector1.slice(0, 10));
// 查询使用
// const results1 = await vectorStore.similaritySearch(
//   "When was Nike incorporated?"
// );
// console.log(results1[0]);
const results2 = await vectorStore.similaritySearchWithScore("请给出运动处方制定的原则", 3);
console.log(results2);
