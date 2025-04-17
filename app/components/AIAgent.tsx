import { useEffect, useState } from "react";

export default function AIAgent() {
  // Use the same initial state for both server and client
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey there, what creative riddle are we solving today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Move to useEffect to prevent hydration mismatch
  // Any state that should only exist on client-side should be initialized in useEffect
  const [showSuccess, setShowSuccess] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, data.reply]);
      } else {
        console.error("Error sending message");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  const saveConversation = async () => {
    try {
      await fetch("/api/save-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conversation: messages }),
      });
      setShowSuccess(true);
    } catch (error) {
      console.error("Failed to save conversation:", error);
    }
  };

  // Hide the success message after 2 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccess) {
      timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showSuccess]);

  return (
    <div className="hero min-h-screen">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center w-full">
        <div className="max-w-md w-full flex flex-col items-center">
          <h1 className="mb-5 text-5xl font-bold">WRITE HERE</h1>
          <div className="space-y-2 bg-base-100 p-4 rounded-md h-96 overflow-y-auto w-full mb-5">
            {messages.map((m, i) => (
              <div key={i} className="whitespace-pre-wrap text-left">
                <strong className="capitalize">{m.role}:</strong> {m.content}
              </div>
            ))}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mb-5 bg-base-300 h-24 outline-primary rounded-lg p-2 resize-none w-full test-right"
            placeholder="Type your message here..."
          ></textarea>

          <div className="flex gap-2">
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={`bg-blue-600 text-white px-4 py-2 rounded-md ${loading || !input.trim() ? "opacity-50" : ""}`}
            >
              {loading ? "Sending..." : "Send"}
            </button>
            <button
              onClick={saveConversation}
              disabled={messages.length <= 1}
              className={`bg-green-600 text-white px-4 py-2 rounded-md ${messages.length <= 1 ? "opacity-50" : ""}`}
            >
              Done
            </button>
          </div>

          {showSuccess ? (
            <p className="text-lg text-green-600 mt-4">
              ✅ Conversation saved!
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
