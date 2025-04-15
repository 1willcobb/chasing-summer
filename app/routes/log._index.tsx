// app/routes/log.tsx
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Nav from "~/components/Nav";
import type { Message } from "~/models/message";
import {getAllMessages} from "~/models/message.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const pk = "USER#demo"; // Replace with actual user from session if needed

  const result = await getAllMessages(pk);

  const messages: Message[] = result.Items;

  console.log("Messages", messages);

  
  return json({ messages });
};

export default function Log() {
  const { messages } = useLoaderData<typeof loader>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-base-100 min-h-screen p-6">
      <Nav />
      <h1 className="text-3xl font-bold mb-4 text-center">LOG</h1>
      <div className="max-w-2xl mx-auto space-y-2">
        {messages.map((m, i) => {
          const parsed = JSON.parse(m.json);
          const preview = parsed.content?.slice(0, 100) ?? "[No Content]";
          return (
            <div
              key={m.sk}
              className="bg-base-200 rounded-lg p-4 shadow-md cursor-pointer"
              onClick={() => setOpenIndex(i === openIndex ? null : i)}
            >
              <div className="font-mono truncate text-sm text-left">
                <strong>{parsed.role}</strong>: {preview}
              </div>
              {openIndex === i && (
                <div className="mt-2 text-left text-sm text-gray-300 whitespace-pre-wrap">
                  {parsed.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
