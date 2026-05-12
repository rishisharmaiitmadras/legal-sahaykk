import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble.jsx';

export default function ChatArea({ messages, isTyping, suggestedPrompts, onPickSuggestion }) {
  const bottomRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping]);

  const empty = messages.length === 0 && !isTyping;

  return (
    <div
      ref={scrollRef}
      className="min-h-0 flex-1 overflow-y-auto scroll-smooth px-3 py-6 md:px-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {empty && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 md:text-3xl">
              Hello, how can I help you today?
            </h1>
            <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
              Ask a question or try one of the suggestions below. This is a UI demo — not legal
              advice.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPickSuggestion(p)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <MessageBubble key={m.id} role={m.role} content={m.content} />
        ))}

        {isTyping && (
          <div className="flex justify-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700" />
            <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-sm text-slate-500 shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-800">
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
              </span>
              Thinking…
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}