// app/routes/log.tsx
import { ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { getAllMessages, deleteAllMessages } from "~/models/message.server";
import { format } from "date-fns";

export const loader = async () => {
  const pk = "USER#demo"; // hard coded
  const messages = await getAllMessages(pk);
  return { messages };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const pk = "USER#demo";

  if (intent === "delete") {
    await deleteAllMessages(pk);
    return { success: true };
  }

  return new Response(
    JSON.stringify({ success: false, error: "Invalid intent" }),
    {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export default function Log() {
  const { messages } = useLoaderData<typeof loader>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const submit = useSubmit();
  const navigation = useNavigation();
  const isDeleting =
    navigation.state === "submitting" &&
    navigation.formData?.get("intent") === "delete";

  const toggleItem = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleItem(index);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete all messages?")) {
      const formData = new FormData();
      formData.append("intent", "delete");
      submit(formData, { method: "post" });
    }
  };

  return (
    <div className="bg-base-100 min-h-screen w-full p-6 flex flex-col justify-start items-center m-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">LOG</h1>
      <p className="mb-6 text-sm text-gray-400">
        Total messages: {messages?.length ?? 0}
      </p>
      <button
        className="btn btn-error mb-4"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Clear All Messages"}
      </button>

      <div className="mx-auto space-y-2 w-full max-w-3xl">
        {messages?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No messages to display
          </div>
        ) : (
          messages.map((m, i) => {
            let parsed: any = {};
            try {
              parsed = JSON.parse(m.json);
            } catch (err) {
              console.error("Failed to parse m.json", m.json);
              parsed = { error: "Failed to parse JSON" };
            }

            const preview =
              parsed?.messages?.[1]?.content?.slice(0, 100) ?? "[No Content]";
            const timestamp = parsed?.createdAt
              ? format(new Date(parsed.createdAt), "MM/dd/yy h:mm aaa")
              : "[No Timestamp]";

            return (
              <div
                key={m.sk}
                className="bg-base-200 rounded-lg p-4 shadow-md cursor-pointer hover:bg-base-300 transition-colors"
                onClick={() => toggleItem(i)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                tabIndex={0}
                role="button"
                aria-expanded={openIndex === i}
              >
                <div className="font-mono truncate text-sm">
                  <strong>{timestamp}</strong>: {preview}
                  {preview.length >= 100 && "..."}
                </div>
                {openIndex === i && (
                  <div className="mt-2 text-left text-sm text-gray-300 whitespace-pre-wrap">
                    <pre className="break-words whitespace-pre-wrap overflow-x-auto">
                      {JSON.stringify(m, null, 2)}
                    </pre>
                    <div className="mt-2">
                      <h3 className="text-base font-semibold">
                        Parsed Content:
                      </h3>
                      <pre className="break-words whitespace-pre-wrap overflow-x-auto">
                        {JSON.stringify(parsed, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
