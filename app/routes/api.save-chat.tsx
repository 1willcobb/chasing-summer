// app/routes/api.save-chat.tsx
import { json } from "@remix-run/node";
// import { db } from "~/utils/db.server"; // replace with your DB method

export const action = async ({ request }) => {
  const { conversation } = await request.json();
  const id = crypto.randomUUID();
  const timestamp = new Date().toISOString();

  // 🧠 Replace with your DB save logic
  console.log("Saving conversation:", { id, conversation });

  // await db.conversations.create({ id, messages: conversation, createdAt: timestamp });

  return json({ success: true, id });
};
