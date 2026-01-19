import { z } from 'zod';
import { ChatOllama } from '@langchain/ollama';
import { createAgent, tool } from 'langchain';

const getWeather = tool(
  ({ city }) => `It's always sunny in ${city}!`,
  {
    name: "get_weather",
    description: "Get the weather for a given city",
    schema: z.object({
      city: z.string(),
    }),
  },
);

const WeatherSchema = z.object({
  city: z.string().describe("The city to get the weather for"),
  temperature: z.number().describe("The temperature in Celsius"),
  description: z.string().describe("A short description of the weather"),
});

const llm = new ChatOllama({
  model: 'qwen3:1.7b',
  temperature: 0.5,
});

const agent = createAgent({
  model: llm,
  tools: [getWeather],
  responseFormat: WeatherSchema,
});

const invoke = async () => {
    const result = await agent.invoke({
        messages: [{ role: "user", content: "What's the weather in Tokyo?" }],
    });
    console.log(result.structuredResponse);
}

invoke();