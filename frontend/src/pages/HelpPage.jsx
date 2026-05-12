import { BookOpen, Keyboard, Scale, ShieldAlert } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Help
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              How to use Legal Sahayak (demo UI — not legal advice).
            </p>
          </div>
        </div>

        <section className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
            <Scale className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            What this app is
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Legal Sahayak is a <strong>frontend-only</strong> chat-style interface. Answers and documents shown here are{' '}
            <strong>placeholders</strong> for layout and workflow. A developer can later connect your own API (for example
            Gemini, OpenAI, or an internal legal stack).
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
            <Keyboard className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            Chat basics
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            <li>Type a message in the box at the bottom and press <strong>Enter</strong> to send (or use the send button).</li>
            <li>Use <strong>New Chat</strong> in the sidebar to clear the conversation.</li>
            <li>
              Try messages containing <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800">nda</code>{' '}
              or <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800">rent</code> to open sample
              documents in the right panel (on the chat screen).
            </li>
            <li>Use the header button to show or hide the document panel.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-5 dark:border-amber-900/50 dark:bg-amber-950/30">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-amber-900 dark:text-amber-200">
            <ShieldAlert className="h-4 w-4" />
            Important disclaimer
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-amber-900/90 dark:text-amber-100/90">
            Nothing here is legal advice. For real matters, consult a qualified lawyer in your jurisdiction.
          </p>
        </section>
      </div>
    </div>
  );
}