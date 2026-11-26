import { streamText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const provider = createOpenAICompatible({
  name: "staas-local",
  baseURL: process.env.LLM_BASE_URL || "http://127.0.0.1:11434/v1",
  apiKey: process.env.LLM_API_KEY || "local-demo",
});
const modelName = process.env.LLM_MODEL || "qwen2.5:0.5b";

export default async function handler(req: any, res: any) {
  // This unauthenticated route is deliberately demo-only. Production must add
  // Supabase session verification, venture-level authorisation and rate limits.
  if (process.env.STAAS_DEMO_CHAT !== "true") {
    res.status(503).json({ error: "Chat inference is disabled until an authenticated production gateway is configured." });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const prompt = messages
      .map((message: any) => {
        const text = Array.isArray(message.parts)
          ? message.parts.filter((part: any) => part.type === "text").map((part: any) => part.text).join("\n")
          : "";
        return text ? `${message.role}: ${text}` : "";
      })
      .filter(Boolean)
      .join("\n\n");

    if (!prompt.trim()) {
      res.status(400).json({ error: "A text message is required." });
      return;
    }

    const result = streamText({
      model: provider.chatModel(modelName),
      instructions: [
        "You are the STaaS founder copilot.",
        "Help founders structure business questions, test assumptions and plan evidence collection.",
        "Distinguish facts supplied by the user from hypotheses and illustrative examples.",
        "Do not invent market statistics, citations, customer interviews or company facts.",
        "When evidence is missing, say so and propose a way to obtain it.",
        "Keep responses concise, practical and suitable for a small local demonstration model.",
      ].join(" "),
      prompt,
      maxOutputTokens: 420,
      temperature: 0.2,
    });

    const response = result.toUIMessageStreamResponse();
    res.status(response.status);
    response.headers.forEach((value, key) => res.setHeader(key, value));
    const reader = response.body?.getReader();
    if (!reader) {
      res.end();
      return;
    }
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
    res.end();
  } catch (error) {
    console.error("STaaS chat inference failed", error);
    res.status(502).json({ error: "The configured model endpoint could not complete inference." });
  }
}
