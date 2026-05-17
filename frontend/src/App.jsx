import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Menu, Moon, PanelRightClose, PanelRightOpen, Sun } from 'lucide-react';
import Sidebar from './components/Sidebar.jsx';
import ChatArea from './components/ChatArea.jsx';
import InputBar from './components/InputBar.jsx';
import DocumentViewer from './components/DocumentViewer.jsx';
import HelpPage from './pages/HelpPage.jsx';
import ActivityPage from './pages/ActivityPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

const DUMMY_CHATS = [
  { id: '1', title: 'Contract review basics' },
  { id: '2', title: 'Rental agreement questions' },
  { id: '3', title: 'NDA for freelancers' },
];

const DOCUMENTS = {
  nda: {
    title: 'Non-Disclosure Agreement (NDA)',
    body: `NON-DISCLOSURE AGREEMENT (SAMPLE / PLACEHOLDER)

This Agreement is entered into as of [DATE], by and between [PARTY A] ("Disclosing Party") and [PARTY B] ("Receiving Party").

1. Definition of Confidential Information
   For purposes of this Agreement, "Confidential Information" means any information disclosed by Disclosing Party to Receiving Party, whether orally or in writing, that is designated as confidential or that reasonably should be understood to be confidential.

2. Obligations
   Receiving Party agrees to hold and maintain the Confidential Information in strict confidence and not disclose it to any third party without prior written consent.

3. Term
   This Agreement shall remain in effect for [TERM] from the date of disclosure.

4. General
   This is dummy placeholder text for UI demonstration only. Replace with counsel-approved language.

_________________________          _________________________
Disclosing Party                   Receiving Party`,
  },
  rent: {
    title: 'Residential Rental Agreement',
    body: `RESIDENTIAL LEASE AGREEMENT (SAMPLE / PLACEHOLDER)

This Lease Agreement ("Lease") is made as of [DATE], between [LANDLORD] ("Landlord") and [TENANT] ("Tenant").

1. Premises
   Landlord leases to Tenant the premises located at [ADDRESS].

2. Term
   The term shall begin on [START DATE] and end on [END DATE].

3. Rent
   Tenant agrees to pay rent of [AMOUNT] per month, due on the [DAY] of each month.

4. Use
   The premises shall be used solely as a private residence.

5. Notice
   This is dummy placeholder text for UI demonstration only. Not legal advice.

Landlord: _________________    Tenant: _________________`,
  },
};

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [docOpen, setDocOpen] = useState(false);
  const [docContent, setDocContent] = useState(null);
  const [dark, setDark] = useState(false);
  const [mainView, setMainView] = useState('chat');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const resetDocIfKeywords = useCallback((text) => {
    const lower = text.toLowerCase();
    if (lower.includes('nda')) {
      setDocContent(DOCUMENTS.nda);
      setDocOpen(true);
      return;
    }
    if (lower.includes('rent')) {
      setDocContent(DOCUMENTS.rent);
      setDocOpen(true);
    }
  }, []);

  const simulateAssistantReply = useCallback(async (userText, file) => {

  try {

    const lower = userText.toLowerCase();

    // OPTIONAL DOCUMENT PANEL
    if (lower.includes('nda')) {

      setDocContent(DOCUMENTS.nda);
      setDocOpen(true);

    } else if (lower.includes('rent')) {

      setDocContent(DOCUMENTS.rent);
      setDocOpen(true);

    }

    // FORM DATA
    const formData = new FormData();

    formData.append("text", userText);

    if (file) {
      formData.append("file", file);
    }

    // BACKEND API
    const res = await fetch(
      "http://localhost:5000/api/ai/ask",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    // AI RESPONSE
    setMessages((prev) => [
      ...prev,
      {
        id: makeId(),
        role: "assistant",
        content: data.answer,
      },
    ]);

  } catch (error) {

    console.log(error);

    setMessages((prev) => [
      ...prev,
      {
        id: makeId(),
        role: "assistant",
        content: "Backend connection failed.",
      },
    ]);

  } finally {

    setIsTyping(false);

  }

}, []);
  const handleSend = useCallback(
    (rawText, file) => {
      const text = rawText.trim();
      if (!text || isTyping) return;

      setMessages((prev) => [...prev, { id: makeId(), role: 'user', content: text }]);
      resetDocIfKeywords(text);
      setIsTyping(true);

      simulateAssistantReply(text, file);
    },
    [isTyping, resetDocIfKeywords, simulateAssistantReply]
  );

  const handleNewChat = useCallback(() => {
    setMainView('chat');
    setMessages([]);
    setIsTyping(false);
    setDocContent(null);
    setDocOpen(false);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  const suggestedPrompts = useMemo(
    () => ['Draft an NDA', 'Explain contract law', 'Property dispute help'],
    []
  );

  const isChat = mainView === 'chat';

  const headerTitle =
    mainView === 'help'
      ? 'Help'
      : mainView === 'activity'
        ? 'Activity'
        : mainView === 'settings'
          ? 'Settings'
          : 'Legal Sahayak';

  return (
    <div className="flex h-screen min-h-0 w-full overflow-hidden bg-slate-50 transition-colors dark:bg-slate-950">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        open={sidebarOpen}
        chats={DUMMY_CHATS}
        onNewChat={handleNewChat}
        onCloseMobile={() => setSidebarOpen(false)}
        onNavigate={setMainView}
      />

      <main className="relative flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/90 px-3 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-900/90 md:px-4">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 md:hidden"
              onClick={() => setSidebarOpen((o) => !o)}
              aria-expanded={sidebarOpen}
              aria-controls="app-sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="hidden rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 md:inline-flex"
              onClick={() => setSidebarOpen((o) => !o)}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            {!isChat && (
              <button
                type="button"
                onClick={() => setMainView('chat')}
                className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                aria-label="Back to chat"
                title="Back to chat"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <span className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
              {headerTitle}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isChat && (
              <button
                type="button"
                onClick={() => setDocOpen((o) => !o)}
                className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                aria-pressed={docOpen}
                title="Toggle document panel"
              >
                {docOpen ? (
                  <PanelRightClose className="h-5 w-5" />
                ) : (
                  <PanelRightOpen className="h-5 w-5" />
                )}
              </button>
            )}
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-semibold text-white shadow-sm ring-2 ring-white dark:ring-slate-900"
              title="User"
            >
              U
            </div>
          </div>
        </header>

        {isChat ? (
          <div className="flex min-h-0 flex-1">
            <div className="flex min-w-0 min-h-0 flex-1 flex-col">
              <ChatArea
                messages={messages}
                isTyping={isTyping}
                suggestedPrompts={suggestedPrompts}
                onPickSuggestion={handleSend}
              />
              <InputBar onSend={handleSend} disabled={isTyping} />
            </div>

            <DocumentViewer
              open={docOpen}
              onClose={() => setDocOpen(false)}
              doc={docContent}
            />
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col">
            {mainView === 'help' && <HelpPage />}
            {mainView === 'activity' && <ActivityPage />}
            {mainView === 'settings' && <SettingsPage />}
          </div>
        )}
      </main>
    </div>
  );
}