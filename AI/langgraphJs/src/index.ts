/**
 * LangChain Agent - Entry Point
 *
 * This file provides a simple CLI interface for testing the agent locally.
 * Run with: pnpm start
 */

import "dotenv/config";
import { agent } from "./agent.js";

console.log("🤖 LangChain Agent Started\n");
console.log("Ask me anything! I can:");
console.log("  • Perform calculations");
console.log("  • Tell you the current time");
console.log("  • Check the weather (simulated)");
console.log("  • Search the knowledge base\n");

// Example conversation
const questions = [
  "请结合com_prop_defs和com_prop_values两张表，给出server_id为form_01的表单的所有属性值",
];

for (const question of questions) {
  console.log(`📝 User: ${question}\n`);

  try {
    const result = await agent.invoke({
      messages: [{ role: "user", content: question }],
    });

    // The result contains the agent's response
    console.log(`🤖 Agent: ${result.messages.at(-1)?.content}\n`);
    console.log("─".repeat(50) + "\n");
  } catch (error) {
    console.error("Error:", error);
  }
}
