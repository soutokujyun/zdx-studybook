import 'dotenv/config';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from '@langchain/openai';

// 使用环境变量管理API密钥
const apiKey = process.env.DEEPSEEK_API_KEY;

if (!apiKey) {
  throw new Error('请在.env文件中设置DEEPSEEK_API_KEY');
}

// 修正API配置
const embeddings = new OpenAIEmbeddings({
  apiKey,
  model: 'deepseek-embed-text',
  timeout: 30000, // timeout可以作为顶级属性
  configuration: {
    baseURL: 'https://api.deepseek.com/v1', // baseURL需要放在configuration对象中
    maxRetries: 3, // maxRetries需要放在configuration对象中
  },
});

// 创建示例文档
const documents = [
  {
    pageContent: '我是小循，我是一个职业，我在厦门上班',
    metadata: { source: 'doc1' }
  }
];

// 使用async函数包装所有异步操作
async function runRAG() {
  try {
    // 创建向量存储
    const vectorStore = await MemoryVectorStore.fromDocuments(documents, embeddings);
    console.log('向量存储创建成功');
    
    // 执行向量查询
    const query = '我是小循,我在那里上班？';
    console.log(`正在查询: ${query}`);
    const vector = await embeddings.embedQuery(query);
    console.log('查询向量结果:', vector);
    
    // 也可以直接从向量存储中查询相关文档
    const results = await vectorStore.similaritySearch(query, 1);
    console.log('相似文档查询结果:', results);
    
  } catch (error) {
    console.error('执行出错:', error);
    // 提供更详细的错误信息
    if (error instanceof Error) {
      console.error('错误详情:', error.message);
      if ('status' in error) {
        console.error('HTTP状态码:', error.status);
      }
    }
  }
}

// 执行主函数
runRAG();