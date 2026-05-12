import {
  Activity,
  ChevronRight,
  HelpCircle,
  MessageSquarePlus,
  Scale,
  Settings,
} from 'lucide-react';

export default function Sidebar({ open, chats, onNewChat, onCloseMobile, onNavigate }) {
  return (
    <aside
      id="app-sidebar"
      className={[
        'fixed inset-y-0 left-0 z-40 flex w-[min(280px,85vw)] flex-col border-r border-slate-200/80 bg-white shadow-xl transition-transform duration-300 ease-out dark:border-slate-800 dark:bg-slate-900 md:static md:translate-x-0 md:shadow-none',
        open ? 'translate-x-0' : '-translate-x-full md:w-0 md:min-w-0 md:overflow-hidden md:border-0 md:opacity-0',
      ].join(' ')}
    >
      <div className="flex h-14 items-center gap-2 border-b border-slate-200/80 px-4 dark:border-slate-800">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
          <Scale className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">
            Legal Sahayak
          </p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">Your legal workspace</p>
        </div>
      </div>

      <div className="p-3">
        <button
          type="button"
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99] dark:bg-indigo-600 dark:hover:bg-indigo-500"
        >
          <MessageSquarePlus className="h-4 w-4" />
          New Chat
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
        <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
          Recent
        </p>
        <ul className="space-y-1">
          {chats.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => {
                  onNavigate?.('chat');
                  onCloseMobile?.();
                }}
                className="group flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <span className="min-w-0 flex-1 truncate">{c.title}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 opacity-0 transition group-hover:opacity-100 dark:text-slate-600" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <nav className="border-t border-slate-200/80 p-2 dark:border-slate-800">
        {[
          { id: 'help', icon: HelpCircle, label: 'Help' },
          { id: 'activity', icon: Activity, label: 'Activity' },
          { id: 'settings', icon: Settings, label: 'Settings' },
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              onNavigate?.(id);
              if (typeof window !== 'undefined' && window.innerWidth < 768) {
                onCloseMobile?.();
              }
            }}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}