import { z } from "zod";
import { AIMessage } from "@langchain/core/messages";

import { StateSchema, MessagesValue, StateGraph, START, END } from "@langchain/langgraph";

const AgentState = new StateSchema({
  messages: MessagesValue,  // 内置聊天消息字段，带归约器
  count: z.number().default(0),  // 常规 Zod 字段
});

// 完整图使用
type State = typeof AgentState.State;  // 推断: { messages: BaseMessage[], count: number }
const graph = new StateGraph(AgentState)
  .addNode("agent1", (state: State) => {
    // state.messages 是 BaseMessage 对象数组
    return { 
      messages: [new AIMessage("响应1")],  // 通过归约器追加
      count: state.count + 1 
    };
  })
  .addNode("agent2", (state: State) => {
    // state.messages 是 BaseMessage 对象数组
    return { 
      messages: [new AIMessage("响应2")],  // 通过归约器追加
      count: state.count + 1 
    };
  })
  .addEdge(START, "agent1")
  .addEdge("agent1", "agent2")
  .addEdge("agent2", END)
  .compile();

// 使用 OpenAI 格式调用（自动转换）
const result = await graph.invoke({ 
  messages: [{ role: "user", content: "你好" }]  // 反序列化为 HumanMessage
});
console.log(result);  // "你好"