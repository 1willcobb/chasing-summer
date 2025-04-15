// app/routes/log.tsx
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Nav from "~/components/Nav";
import type { Message } from "~/models/message";
import { getAllMessages } from "~/models/message.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const pk = "USER#demo"; // Replace with actual user from session if needed

  const messages = await getAllMessages(pk);

  console.log("Result", messages);

  return json({ messages });
};

export default function Log() {
  const { messages } = useLoaderData<typeof loader>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleItem(index);
    }
  };

  return (
    <div
      className="bg-base-100 min-h-screen w-full p-6 flex flex-col justify-start items-center m-auto"
    >
      <h1 className="text-3xl font-bold mb-4 text-center">LOG</h1>
      <div className=" mx-auto space-y-2">
        {messages.map((m, i) => {
          const parsed = JSON.parse(m.json);
          const preview =
            parsed?.messages[1]?.content?.slice(0, 100) ?? "[No Content]";
          return (
            <div
              key={m.sk}
              className="bg-base-200 rounded-lg p-4 shadow-md cursor-pointer"
              onClick={() => toggleItem(i)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              tabIndex={0}
              role="button"
              aria-expanded={openIndex === i}
            >
              <div className="font-mono truncate text-sm">
                <strong>{parsed.createdAt}</strong>: {preview}
              </div>
              {openIndex === i ? (
                <div className="mt-2 text-left text-sm text-gray-300 whitespace-pre-wrap">
                  {/* Display the full message object as JSON */}
                  <pre>{JSON.stringify(m, null, 2)}</pre>
                  <div className="mt-2">
                    <h3 className="text-base font-semibold">Parsed Content:</h3>
                    <pre>{JSON.stringify(parsed, null, 2)}</pre>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
