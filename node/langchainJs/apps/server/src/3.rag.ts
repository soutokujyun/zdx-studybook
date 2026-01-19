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