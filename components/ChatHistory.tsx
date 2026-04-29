import { Bot, User } from "lucide-react";
import type { ChatMessage } from "@/lib/types";

export function ChatHistory({ messages }: { messages: ChatMessage[] }) {
  return (
    <section className="surface rounded-2xl p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black">AI chat history</h2>
          <p className="text-sm text-slate-400">Every message is linked to actions when the agent changes something.</p>
        </div>
      </div>
      <div className="space-y-4">
        {messages.map((message) => {
          const isUser = message.role === "user";
          const Icon = isUser ? User : Bot;
          return (
            <div key={message.id} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/8 text-mint">
                <Icon size={17} />
              </span>
              <div className={`max-w-2xl rounded-2xl p-4 ${isUser ? "bg-cyan/12" : "bg-white/7"}`}>
                <p className="text-sm leading-6 text-slate-100">{message.content}</p>
                {message.linkedActionId ? <p className="mt-2 text-xs text-mint">Linked action: {message.linkedActionId}</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
