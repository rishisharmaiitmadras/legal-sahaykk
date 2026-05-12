import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Settings
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Placeholder settings page — wire real controls when you add persistence or a backend.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Appearance</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Light / dark toggle stays in the top header for now. Later you can store the preference in{' '}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800">localStorage</code> or your
              account settings API.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Model and data</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Add fields here for model selection, region, retention, export, and deletion — all require backend rules and
              product decisions.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">About this build</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Version label, build hash, and support links are usually shown here in production apps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}