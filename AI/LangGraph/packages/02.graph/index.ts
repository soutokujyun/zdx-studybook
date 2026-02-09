/**
 * graph
 * 3个基本元素
 * 1. 节点（Node）一个处理数据的节点，更新state
 * 2. 边（Edge）连接节点之间的路径，定义了数据的流向
 * 3. 状态（State） 整个图的状态
 */
import fs from "fs";
import {
    StateGraph,
    StateSchema,
    START,
    END,
} from "@langchain/langgraph";
import * as z from "zod";

const InputState = new StateSchema({
  userInput: z.string(),
});

const OutputState = new StateSchema({
  graphOutput: z.string(),
});

const OverallState = new StateSchema({
  foo: z.string(),
  userInput: z.string(),
  graphOutput: z.string(),
});

const PrivateState = new StateSchema({
  bar: z.string(),
});

const graph = new StateGraph({
  state: OverallState,
  input: InputState,
  output: OutputState,
})
  .addNode("node1", (state) => {
    // Write to OverallState
    return { foo: state.userInput + " 学院" };
  })
  .addNode("node2", (state) => {
    // Read from OverallState, write to PrivateState
    return { bar: state.foo + " 非常" };
  })
  .addNode(
    "node3",
    (state) => {
      // Read from PrivateState, write to OutputState
      return { graphOutput: state.bar + " 靠谱" };
    },
    { input: PrivateState }
  )
  .addEdge(START, "node1")
  .addEdge("node1", "node2")
  .addEdge("node2", "node3")
  .addEdge("node3", END)
  .compile();

// 生成流程图
const graphImage = await graph.getGraph().drawMermaidPng();
console.log("流程图已生成");
// 将 Blob 转换为 Buffer
const buffer = Buffer.from(await graphImage.arrayBuffer());
fs.writeFileSync("graph.png", buffer);

const result = await graph.invoke({ userInput: "图灵" });
console.log("=== 图计算结果 ===");
console.log(result);
