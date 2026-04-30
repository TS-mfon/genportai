"use client";

import { useState } from "react";
import { Send, Search } from "lucide-react";
import { ChatHistory } from "@/components/ChatHistory";
import { Shell } from "@/components/Shell";
import { useAppState } from "@/lib/app-state";

export default function ChatPage() {
  const { data, sendChatMessage } = useAppState();
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messages = data.chat.filter((item) => item.content.toLowerCase().includes(query.toLowerCase()));

  return (
    <Shell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-mint">Memory-enabled agent</p>
          <h1 className="mt-2 text-4xl font-black">AI chat</h1>
          <p className="mt-3 text-slate-400">Ask simple questions. Trade-impacting requests become suggestions or approval items.</p>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div>
          <div className="mb-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
            <Search size={17} className="text-slate-500" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search chat history..." className="w-full bg-transparent outline-none" />
          </div>
          <ChatHistory messages={messages} />
        </div>
        <aside className="surface rounded-2xl p-5">
          <h2 className="text-xl font-black">Ask the agent</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Example: “Should I reduce Base exposure?” or “Never buy meme tokens.”
          </p>
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} className="mt-5 min-h-40 w-full rounded-2xl border border-white/10 bg-white/6 p-4 outline-none focus:border-mint/50" placeholder="Type your request..." />
          <button
            onClick={() => {
              const nextMessage = message;
              setMessage("");
              setIsSending(true);
              sendChatMessage(nextMessage).finally(() => setIsSending(false));
            }}
            disabled={isSending}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-mint px-4 py-3 font-bold text-ink"
          >
            <Send size={17} /> {isSending ? "Calling GenLayer..." : "Send to GenLayer"}
          </button>
        </aside>
      </div>
    </Shell>
  );
}
