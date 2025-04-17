
import arc from "@architect/functions";
import { createId } from "@paralleldrive/cuid2";
import { type ActionFunctionArgs } from "@remix-run/node";

import { type Message } from "~/models/message.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { conversation } = await request.json();

    if (!Array.isArray(conversation) || conversation.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid conversation data." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const db = await arc.tables();
    const pk = `USER#demo`; // Replace with actual user logic or session
    const timestamp = Date.now();
    const conversationId = createId();

    // Create a single item with the entire conversation
    const item: Message = {
      pk,
      sk: `MESSAGE#${conversationId}`,
      json: JSON.stringify({
        id: conversationId,
        messages: conversation,
        createdAt: new Date(timestamp).toISOString(),
        updatedAt: new Date(timestamp).toISOString()
      }),
    };

    await db.summer.put(item);

    return new Response(
      JSON.stringify({ success: true, conversationId }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Save chat error:", error);
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
