// app/routes/chat.tsx
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey there, what creative riddle are we solving today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    console.log("Sending messages:");
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);

    

    const res = await fetch("/api.chat", {
      method: "POST",
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, data.reply]);
    setInput("");
    setLoading(false);
  };

  const saveConversation = async () => {
    await fetch("/api.save-chat", {
      method: "POST",
      body: JSON.stringify({ conversation: messages }),
    });
    setDone(true);
  };

  if (done) {
    return <p className="text-lg text-green-600">✅ Conversation saved!</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Creative Assistant</h1>
      <div className="space-y-2 bg-gray-100 p-4 rounded-md h-96 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className="whitespace-pre-wrap">
            <strong className="capitalize">{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={3}
        className="w-full p-2 border rounded-md"
        placeholder="Type your question..."
      />
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
    </div>
  );
}
