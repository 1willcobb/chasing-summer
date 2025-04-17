import { type ActionFunctionArgs } from "@remix-run/node";
import { OpenAI } from "openai";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { messages } = await request.json();

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          reply: {
            role: "assistant",
            content: "API key missing. Please add OPENAI_API_KEY to your environment variables.",
          },
          error: "API key missing",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content:
            "You are a cheerful, witty assistant who helps artists unlock their creative thinking. Respond with brevity, humor, and actionable advice.",
        },
        ...messages,
      ],
      temperature: 0.8,
    });

    return new Response(
      JSON.stringify({ reply: completion.choices[0].message }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        reply: {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
        },
        error: String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
