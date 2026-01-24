/**
 * Tools for the LangChain agent.
 *
 * Define your agent's tools here using the `tool` function from langchain.
 * Each tool should have a clear name, description, and schema to help
 * the model understand when and how to use it.
 */
import { db } from "./db.js";
import { tool } from "langchain";
import { z } from "zod";

const DENY_RE = /\b(INSERT|UPDATE|DELETE|ALTER|DROP|CREATE|REPLACE|TRUNCATE)\b/i;
const HAS_LIMIT_TAIL_RE = /\blimit\b\s+\d+(\s*,\s*\d+)?\s*;?\s*$/i;

export const sanitizeSqlQuery = async (q: string) => {
  let query = String(q ?? "").trim();

  // block multiple statements (allow one optional trailing ;)
  const semis = [...query].filter((c) => c === ";").length;
  if (semis > 1 || (query.endsWith(";") && query.slice(0, -1).includes(";"))) {
    throw new Error("multiple statements are not allowed.")
  }
  query = query.replace(/;+\s*$/g, "").trim();

  // read-only gate
  if (!query.toLowerCase().startsWith("select")) {
    throw new Error("Only SELECT statements are allowed")
  }
  if (DENY_RE.test(query)) {
    throw new Error("DML/DDL detected. Only read-only queries are permitted.")
  }
  
  // append LIMIT only if not already present
  if (!HAS_LIMIT_TAIL_RE.test(query)) {
    query += " LIMIT 5";
  }

  try {
    await db?.run("Explain " + query);
  } catch (e: any) {
    throw new Error("SQL syntax error.")
  }
  return query;
};

/**
 * A simple calculator tool that can perform basic arithmetic operations.
 */
export const calculator = tool(
  async ({ operation, a, b }) => {
    switch (operation) {
      case "add":
        return `${a} + ${b} = ${a + b}`;
      case "subtract":
        return `${a} - ${b} = ${a - b}`;
      case "multiply":
        return `${a} × ${b} = ${a * b}`;
      case "divide":
        if (b === 0) {
          return "Error: Division by zero is not allowed.";
        }
        return `${a} ÷ ${b} = ${a / b}`;
      default:
        return "Error: Unknown operation.";
    }
  },
  {
    name: "calculator",
    description:
      "Perform basic arithmetic operations (add, subtract, multiply, divide) on two numbers.",
    schema: z.object({
      operation: z
        .enum(["add", "subtract", "multiply", "divide"])
        .describe("The arithmetic operation to perform"),
      a: z.number().describe("The first number"),
      b: z.number().describe("The second number"),
    }),
  }
);

/**
 * A tool that returns the current date and time.
 */
export const getCurrentTime = tool(
  async () => {
    const now = new Date();
    return `Current date and time: ${now.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    })}`;
  },
  {
    name: "get_current_time",
    description:
      "Get the current date and time. Use this when the user asks about the current time or date.",
    schema: z.object({}),
  }
);

/**
 * A tool that simulates fetching weather data for a given location.
 * In a real application, this would call a weather API.
 */
export const getWeather = tool(
  async ({ location, unit }) => {
    // Simulated weather data - in production, replace with actual API call
    const conditions = ["sunny", "cloudy", "rainy", "partly cloudy", "windy"];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];

    // Generate a random temperature
    const tempCelsius = Math.floor(Math.random() * 35) + 5;
    const temp =
      unit === "fahrenheit"
        ? Math.round((tempCelsius * 9) / 5 + 32)
        : tempCelsius;
    const unitSymbol = unit === "fahrenheit" ? "°F" : "°C";

    return `Weather in ${location}: ${condition}, ${temp}${unitSymbol}. (Note: This is simulated data)`;
  },
  {
    name: "get_weather",
    description:
      "Get the current weather for a specified location. Returns temperature and conditions.",
    schema: z.object({
      location: z.string().describe("The city or location to get weather for"),
      unit: z
        .enum(["celsius", "fahrenheit"])
        .default("celsius")
        .describe("Temperature unit preference"),
    }),
  }
);

/**
 * A tool that can search through a knowledge base.
 * This is a placeholder - replace with actual search functionality.
 */
export const searchKnowledge = tool(
  async ({ query, maxResults }) => {
    // Simulated search results - in production, connect to a vector store or search API
    const results = [
      {
        title: "Introduction to AI Agents",
        snippet:
          "AI agents are autonomous systems that can perceive, reason, and act...",
      },
      {
        title: "Building with LangChain",
        snippet:
          "LangChain provides tools and abstractions for building LLM applications...",
      },
      {
        title: "Tool Calling in LLMs",
        snippet:
          "Modern LLMs can use tools to extend their capabilities beyond text generation...",
      },
    ];

    const limitedResults = results.slice(0, maxResults);
    return `Found ${limitedResults.length} results for "${query}":\n\n${limitedResults
      .map((r, i) => `${i + 1}. **${r.title}**\n   ${r.snippet}`)
      .join("\n\n")}`;
  },
  {
    name: "search_knowledge",
    description:
      "Search through the knowledge base for relevant information. Use this when the user asks questions that may require looking up information.",
    schema: z.object({
      query: z.string().describe("The search query to look for"),
      maxResults: z
        .number()
        .min(1)
        .max(10)
        .default(3)
        .describe("Maximum number of results to return"),
    }),
  }
);

/**
 * A tool that sanitizes and executes SQL queries.
 */
export const executeSql = tool(
  async ({ query }) => {
    const sanitizedQuery = await sanitizeSqlQuery(query);
    const result = await db?.run(sanitizedQuery);
    return JSON.stringify(result, null, 2);
  },
  {
    name: "execute_sql",
    description: "Execute a READ-ONLY Mysql SELECT query and return results.",
    schema: z.object({
      query: z.string().describe("Mysql SELECT query to execute (read-only)."),
    }),
  }
);

/**
 * All tools available to the agent.
 * Add or remove tools here to customize your agent's capabilities.
 */
export const TOOLS = [executeSql];
