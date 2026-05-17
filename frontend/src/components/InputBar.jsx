import { useCallback, useState } from 'react';
import { ImagePlus, SendHorizontal } from 'lucide-react';

export default function InputBar({ onSend, disabled }) {

  const [value, setValue] = useState('');
  const [file, setFile] = useState(null);

  const submit = useCallback(() => {

    onSend(value, file);

    setValue('');
    setFile(null);

  }, [onSend, value, file]);

  const onKeyDown = useCallback(
    (e) => {

      if (e.key === 'Enter' && !e.shiftKey) {

        e.preventDefault();
        submit();

      }

    },
    [submit]
  );

  return (

    <div className="shrink-0 border-t border-slate-200/80 bg-white/90 px-3 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 md:px-6">

      <div className="mx-auto max-w-3xl">

        <div
          className={[
            'flex items-end gap-2 rounded-2xl border bg-white px-2 py-2 shadow-sm ring-0 transition focus-within:ring-2 dark:bg-slate-900',
            disabled
              ? 'border-slate-200 opacity-60 dark:border-slate-800'
              : 'border-slate-200 hover:border-slate-300 focus-within:border-indigo-300 focus-within:ring-indigo-200 dark:border-slate-700 dark:hover:border-slate-600 dark:focus-within:border-indigo-500 dark:focus-within:ring-indigo-900/40',
          ].join(' ')}
        >

          {/* HIDDEN FILE INPUT */}
          <input
            type="file"
            accept="application/pdf"
            hidden
            id="pdfUpload"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {/* PDF BUTTON */}
          <label
            htmlFor="pdfUpload"
            className="mb-1 cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <ImagePlus className="h-5 w-5" />
          </label>

          {/* TEXTAREA */}
          <textarea
            rows={1}
            value={value}
            disabled={disabled}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Enter a legal query…"
            className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-1 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500"
          />

          {/* SEND BUTTON */}
          <button
            type="button"
            onClick={submit}
            disabled={disabled || !value.trim()}
            className="mb-1 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-3 py-2 text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700"
            title="Send"
          >
            <SendHorizontal className="h-5 w-5" />
          </button>

        </div>

        {/* FILE NAME */}
        {file && (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Selected PDF: {file.name}
          </p>
        )}

        <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
          Demo only. Not legal advice.
        </p>

      </div>

    </div>

  );

}