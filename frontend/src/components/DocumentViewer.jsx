import { useCallback } from 'react';
import { Copy, Download, X } from 'lucide-react';

export default function DocumentViewer({ open, onClose, doc }) {
  const handleCopy = useCallback(async () => {
    if (!doc?.body) return;
    try {
      await navigator.clipboard.writeText(doc.body);
    } catch {
      // ignore — demo
    }
  }, [doc]);

  const handleDownload = useCallback(() => {
    if (!doc?.body) return;
    const blob = new Blob([doc.body], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(doc.title || 'document').replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [doc]);

  if (!open) return null;

  return (
    <aside className="hidden w-[min(100%,420px)] shrink-0 border-l border-slate-200/80 bg-white shadow-inner dark:border-slate-800 dark:bg-slate-900 md:flex md:flex-col">
      <div className="flex h-12 items-center justify-between border-b border-slate-200/80 px-3 dark:border-slate-800">
        <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">
          Document
        </p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          aria-label="Close panel"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {!doc ? (
        <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-slate-500 dark:text-slate-400">
          No document yet. Try sending a message containing <span className="font-medium">nda</span>{' '}
          or <span className="font-medium">rent</span>.
        </div>
      ) : (
        <>
          <div className="border-b border-slate-200/80 px-4 py-3 dark:border-slate-800">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">{doc.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Copy className="h-4 w-4" />
                Copy
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              {doc.body}
            </pre>
          </div>
        </>
      )}
    </aside>
  );
}