// src/pages/api/agent.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createReactAgent, AgentExecutor } from "langchain/agents";
import { pull } from "langchain/hub";
import { queryLogsTool } from "@/tools/queryLogs";
import { PromptTemplate } from "@langchain/core/prompts";

type ResponseData = { output: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { input } = req.body;
  if (!input) return res.status(400).json({ error: "Input is required" });

  try {
    const model = new ChatGoogleGenerativeAI({
      // model: "gemini-2.5-pro-preview-06-05",
      model: "gemini-2.5-flash-preview-05-20",
      temperature: 0,
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const prompt = await pull<PromptTemplate>("hwchase17/react-chat");

    const agent = await createReactAgent({
      llm: model,
      tools: [queryLogsTool],
      prompt,
    });

    const executor = new AgentExecutor({
      agent,
      tools: [queryLogsTool],
      verbose: true,
    });

    const result = await executor.invoke({
      input,
      chat_history: "",
    });

    console.log("=== AGENT RESULT ===");
    console.dir(result, { depth: null });
    res.status(200).json({ output: result.output });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
