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

  const items: Message[] = conversation.map((msg: any, index: number) => ({
    pk,
    sk: `MESSAGE#${createId()}`,
    json: JSON.stringify({
      ...msg,
      createdAt: new Date(timestamp + index).toISOString(), // staggered timestamps
    }),
  }));

  await Promise.all(items.map((item) => db.summer.put(item)));

  return json({ success: true, count: items.length });
};
