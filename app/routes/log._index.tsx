// app/routes/log.tsx
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getAllMessages } from "~/models/message.server";

export const loader = async () => {
  const pk = "USER#demo";
  const messages = await getAllMessages(pk);
  console.log("Result", messages);
  return { messages };
};

export default function Log() {
  const { messages } = useLoaderData<typeof loader>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  console.log("Client messages", messages); // ✅ Sanity check in browser

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
    <div className="bg-base-100 min-h-screen w-full p-6 flex flex-col justify-start items-center m-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">LOG</h1>
      <p className="mb-6 text-sm text-gray-400">
        Total messages: {messages?.length ?? 0}
      </p>

      <div className="mx-auto space-y-2 w-full max-w-3xl">
        {messages?.map((m, i) => {
          let parsed: any = {};
          try {
            parsed = JSON.parse(m.json);
          } catch (err) {
            console.error("Failed to parse m.json", m.json, err);
          }

          const preview =
            parsed?.messages?.[0]?.content?.slice(0, 100) ?? "[No Content]";
          const timestamp = parsed?.createdAt ?? "[No Timestamp]";

          return (
            <div
              key={m.sk}
              className="bg-base-200 rounded-lg p-4 shadow-md cursor-pointer "
              onClick={() => toggleItem(i)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              tabIndex={0}
              role="button"
              aria-expanded={openIndex === i}
            >
              <div className="font-mono truncate text-sm">
                <strong>{timestamp}</strong>: {preview}
              </div>
              {openIndex === i && (
                <div className="mt-2 text-left text-sm text-gray-300 whitespace-pre-wrap ">
                  <pre className="break-words whitespace-pre-wrap">
                    {JSON.stringify(m, null, 2)}
                  </pre>
                  <div className="mt-2">
                    <h3 className="text-base font-semibold">Parsed Content:</h3>
                    <pre className="break-words whitespace-pre-wrap">
                      {JSON.stringify(parsed, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
