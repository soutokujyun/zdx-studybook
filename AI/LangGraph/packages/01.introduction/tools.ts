/**
 * 数学运算工具集
 * 
 * 这个文件定义了三个基本的数学运算工具：加法、乘法和除法。
 * 这些工具可以被LangChain代理使用，以执行基本的数学计算。
 */

import { tool } from "@langchain/core/tools";
import * as z from "zod";

/**
 * 加法工具
 * 计算两个数字的和
 */
const add = tool(({ a, b }) => {
  const result = a + b;
  console.log(`执行加法: ${a} + ${b} = ${result}`);
  return result;
}, {
  name: "add",
  description: "Add two numbers together and return their sum",
  schema: z.object({
    a: z.number().describe("The first number to add"),
    b: z.number().describe("The second number to add"),
  }),
});

/**
 * 乘法工具
 * 计算两个数字的积
 */
const multiply = tool(({ a, b }) => {
  const result = a * b;
  console.log(`执行乘法: ${a} × ${b} = ${result}`);
  return result;
}, {
  name: "multiply",
  description: "Multiply two numbers together and return their product",
  schema: z.object({
    a: z.number().describe("The first number to multiply"),
    b: z.number().describe("The second number to multiply"),
  }),
});

/**
 * 除法工具
 * 计算两个数字的商
 * 注意：这个工具不处理除以零的情况，在实际应用中应该添加错误处理
 */
const divide = tool(({ a, b }) => {
  if (b === 0) {
    throw new Error("除数不能为零");
  }
  const result = a / b;
  console.log(`执行除法: ${a} ÷ ${b} = ${result}`);
  return result;
}, {
  name: "divide",
  description: "Divide the first number by the second number and return the quotient",
  schema: z.object({
    a: z.number().describe("The dividend (number to be divided)"),
    b: z.number().describe("The divisor (number to divide by)"),
  }),
});

/**
 * 工具映射表
 * 将工具名称映射到工具函数，便于通过名称查找和调用工具
 */
export const toolsByName: Record<string, typeof add | typeof multiply | typeof divide> = {
  [add.name]: add,
  [multiply.name]: multiply,
  [divide.name]: divide,
};

/**
 * 工具数组
 * 包含所有可用工具的数组，用于绑定到模型
 */
export const tools = Object.values(toolsByName);