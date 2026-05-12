import { Scale } from 'lucide-react';

export default function MessageBubble({ role, content }) {
  const isUser = role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[min(100%,720px)] rounded-2xl rounded-br-md bg-indigo-600 px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
        <Scale className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
      </div>
      <div className="max-w-[min(100%,720px)] rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-sm leading-relaxed text-slate-800 shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-800">
        {content}
      </div>
    </div>
  );
}