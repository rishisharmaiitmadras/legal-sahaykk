import { Activity } from 'lucide-react';

const ROWS = [
  { id: '1', title: 'Session opened', detail: 'You opened Legal Sahayak (demo).', time: 'Just now' },
  { id: '2', title: 'No API calls', detail: 'This build has no backend — activity is sample data.', time: '—' },
  { id: '3', title: 'Next step', detail: 'BACKEND INTEGRATION POINT: log events from your server.', time: '—' },
];

export default function ActivityPage() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Activity
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              A simple activity feed (dummy rows until you connect analytics or a backend).
            </p>
          </div>
        </div>

        <ul className="space-y-3">
          {ROWS.map((r) => (
            <li
              key={r.id}
              className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{r.title}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{r.detail}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">{r.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}