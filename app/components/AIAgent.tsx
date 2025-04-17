import { useEffect, useState } from "react";

export default function AIAgent() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey there, what creative riddle are we solving today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sendMessage = async () => {
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, data.reply]);
    setInput("");
    setLoading(false);
  };

  const saveConversation = async () => {
    await fetch("/api/save-chat", {
      method: "POST",
      body: JSON.stringify({ conversation: messages }),
    });
    setDone(true);
    setShowSuccess(true);
  };

  // Hide the message after 2 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
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
            placeholder=" Provident cupiditate voluptatem et in. "
          ></textarea>

          <div className="flex gap-2">
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Send
            </button>
            <button
              onClick={saveConversation}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Done
            </button>
          </div>

          {showSuccess && (
            <p className="text-lg text-green-600">✅ Conversation saved!</p>
          )}
        </div>
      </div>
    </div>
  );
}
