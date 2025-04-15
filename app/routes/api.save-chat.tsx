// app/routes/api.save-chat.tsx
import { json, type ActionFunctionArgs } from "@remix-run/node";
import arc from "@architect/functions";
import { createId } from "@paralleldrive/cuid2";
import { type Message } from "~/models/message.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { conversation } = await request.json();

  if (!Array.isArray(conversation) || conversation.length === 0) {
    return json({ success: false, error: "Invalid conversation data." }, { status: 400 });
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

  return json({ success: true, conversationId });
};