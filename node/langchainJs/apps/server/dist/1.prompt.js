import 'dotenv/config';
import { ChatDeepSeek } from '@langchain/deepseek';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import http from 'node:http';
// 使用环境变量管理API密钥
const apiKey = process.env.DEEPSEEK_API_KEY;
if (!apiKey) {
    throw new Error('请在.env文件中设置DEEPSEEK_API_KEY');
}
// 初始化DeepSeek模型
const model = new ChatDeepSeek({
    model: 'deepseek-chat', // DeepSeek的主要聊天模型
    temperature: 0.7,
    apiKey,
    maxTokens: 1000,
    timeout: 10000, // 10秒超时
    // DeepSeek特有的配置（如果需要）
    // baseURL: 'https://api.deepseek.com/v1', // 默认URL，通常不需要修改
});
// 使用async/await进行异步处理
async function translateText() {
    try {
        const result = await model.invoke([
            new SystemMessage('你是一个专业的翻译，将中文翻译成英文'),
            new HumanMessage('你好，世界！')
        ]);
        // 输出翻译结果
        console.log('翻译结果:', result.content);
        return result.content;
    }
    catch (error) {
        console.error('翻译出错:', error);
        // 提供更友好的错误信息
        if (error instanceof Error) {
            console.error('错误详情:', error.message);
        }
        throw error;
    }
}
// 执行翻译
// translateText();
const app = http.createServer(async (req, res) => {
    const result = await translateText();
    res.end(result);
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
