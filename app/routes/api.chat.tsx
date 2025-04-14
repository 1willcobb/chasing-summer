// app/routes/api.chat.tsx
import { json } from "@remix-run/node";
import { OpenAI } from "openai";

export const action = async ({ request }) => {
  const { messages } = await request.json();

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a cheerful, witty assistant who helps artists unlock their creative thinking. Respond with brevity, humor, and actionable advice.",
      },
      ...messages,
    ],
    temperature: 0.8,
  });

  return json({ reply: completion.choices[0].message });
};
