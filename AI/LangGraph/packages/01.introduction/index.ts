/**
 * LangGraph 算术代理示例
 * 
 * 这个示例展示了如何使用LangGraph创建一个简单的算术代理，
 * 该代理可以执行基本的数学运算（加法、乘法和除法）。
 * 
 * 工作流程：
 * 1. 用户输入一个数学问题
 * 2. LLM分析问题并决定使用哪个工具
 * 3. 执行工具调用并获取结果
 * 4. LLM基于工具结果生成最终答案
 */

import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { SystemMessage, AIMessage, ToolMessage } from "@langchain/core/messages";
import {
    StateGraph,
    StateSchema,
    MessagesValue,
    ReducedValue,
    type GraphNode,
    type ConditionalEdgeRouter,
    START,
    END,
} from "@langchain/langgraph";
import { tools, toolsByName } from "./tools.js";
import * as z from "zod";

// 初始化OpenAI模型
const model = new ChatOpenAI({
    model: "qwen-plus", // 使用通义千问模型
    temperature: 0,      // 设置为0以获得更确定性的输出
    maxRetries: 2,       // 最大重试次数
    apiKey: process.env.DASHSCOPE_API_KEY,
    configuration: {
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
    },
    verbose: true,       // 启用详细日志输出
});

// 将工具绑定到模型，使模型能够调用这些工具
const modelWithTools = model.bindTools(tools);

// 定义状态模式，描述代理在执行过程中维护的状态
const MessagesState = new StateSchema({
    // 消息列表，包含对话历史和工具调用结果
    messages: MessagesValue,
    // LLM调用计数器，用于统计模型被调用的次数
    llmCalls: new ReducedValue(
        z.number(),
        { reducer: (x, y) => x + y }
    ),
});

/**
 * LLM调用节点
 * 
 * 这个节点负责：
 * 1. 接收当前状态（包含消息历史）
 * 2. 调用LLM并传入系统提示和消息历史
 * 3. 返回LLM的响应和增加的调用计数
 */
const llmCall: GraphNode<typeof MessagesState> = async (state) => {
    console.log("执行LLM调用...");
    return {
        messages: [await modelWithTools.invoke([
            new SystemMessage(
                "You are a helpful assistant tasked with performing arithmetic on a set of inputs. " +
                "Use the appropriate tool to calculate the result and provide a clear explanation."
            ),
            ...state.messages,
        ])],
        llmCalls: 1, // 每次调用增加计数
    };
};

/**
 * 工具执行节点
 * 
 * 这个节点负责：
 * 1. 检查LLM是否请求了工具调用
 * 2. 执行所有请求的工具调用
 * 3. 返回工具执行结果
 */
const toolNode: GraphNode<typeof MessagesState> = async (state) => {
    const lastMessage = state.messages.at(-1);

    // 如果最后一条消息不是AI消息或没有工具调用，则返回空结果
    if (lastMessage == null || !AIMessage.isInstance(lastMessage)) {
        return { messages: [] };
    }

    // 执行所有工具调用
    const result: ToolMessage[] = [];
    for (const toolCall of lastMessage.tool_calls ?? []) {
        console.log(`执行工具调用: ${toolCall.name}`);
        const tool = toolsByName[toolCall.name];
        if (!tool) {
            throw new Error(`未知工具: ${toolCall.name}`);
        }
        const observation = await tool.invoke(toolCall);
        result.push(observation);
    }

    return { messages: result };
};

/**
 * 条件边路由器
 * 
 * 决定下一步应该执行哪个节点：
 * - 如果LLM请求了工具调用，则转到工具节点
 * - 否则，结束对话
 */
const shouldContinue: ConditionalEdgeRouter<typeof MessagesState> = (state) => {
    const lastMessage = state.messages.at(-1);

    // 检查是否是AI消息
    if (!lastMessage || !AIMessage.isInstance(lastMessage)) {
        return END;
    }

    // 如果LLM请求了工具调用，则转到工具节点
    if (lastMessage.tool_calls?.length) {
        return "toolNode";
    }

    // 否则，结束对话
    return END;
};

// 创建并编译状态图
const agent = new StateGraph(MessagesState)
    .addNode("llmCall", llmCall)    // 添加LLM调用节点
    .addNode("toolNode", toolNode)   // 添加工具执行节点
    .addEdge(START, "llmCall")      // 从开始节点到LLM调用节点
    .addConditionalEdges("llmCall", shouldContinue, ["toolNode", END]) // 添加条件边
    .addEdge("toolNode", "llmCall")  // 从工具节点回到LLM调用节点
    .compile();

// 示例：调用代理执行计算
console.log("启动算术代理...");
const result = await agent.invoke({
    messages: [new HumanMessage("Add 3 and 4.")],
});

// 输出结果
console.log("\n=== 对话结果 ===");
for (const message of result.messages) {
    console.log(`[${message.type}]: ${message.text}`);
}
console.log(`\n总共调用了LLM ${result.llmCalls} 次`);