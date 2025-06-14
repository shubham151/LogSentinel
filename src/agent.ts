// pages/api/agent.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { pull } from "langchain/hub";
import type { PromptTemplate } from "@langchain/core/prompts";
import { queryLogsTool } from "./tools/queryLogs"; // Correct path to your tool

// Define the response data structure
type ResponseData = {
  output: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "Input is required" });
    }

    // 1. Initialize the LLM
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-pro-preview-06-05",
      temperature: 0,
      apiKey: process.env.GOOGLE_API_KEY,
    });

    // 2. Get the prompt
    const prompt = await pull<PromptTemplate>("hwchase17/react-chat");

    // 3. Create the agent
    const agent = await createReactAgent({
      llm: model,
      tools: [queryLogsTool],
      prompt,
    });

    // 4. Create the executor
    const agentExecutor = new AgentExecutor({
      agent,
      tools: [queryLogsTool],
      verbose: true, // Set to true to see the agent's "thoughts" in your server logs
    });

    // 5. Run the agent
    console.log(`Executing agent with input: "${input}"`);
    const result = await agentExecutor.invoke({
      input: input,
    });

    res.status(200).json({ output: result.output });
  } catch (error: any) {
    console.error("Error in agent API:", error);
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
}
