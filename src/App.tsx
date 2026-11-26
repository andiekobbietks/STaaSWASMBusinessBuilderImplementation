import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AuthScreen } from "@/components/AuthScreen";
import { Analyzer } from "@/components/Analyzer";
import { ReportHistory } from "@/components/ReportHistory";
import { ChatWorkspace } from "@/components/ChatWorkspace";
import type { LangCode } from "@/lib/translations";

type View = "workspace" | "analyzer" | "history";

function AppContent() {
  const { session, loading } = useAuth();
  const [lang, setLang] = useState<LangCode>("en");
  const [view, setView] = useState<View>("analyzer");

  useEffect(() => {
    const stored = localStorage.getItem("bb-lang") as LangCode | null;
    if (stored === "en" || stored === "it") {
      setLang(stored);
    }
  }, []);

  const handleLangChange = (l: LangCode) => {
    setLang(l);
    localStorage.setItem("bb-lang", l);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <AuthScreen lang={lang} onLangChange={handleLangChange} />;
  }

  return view === "workspace" ? (
    <ChatWorkspace onOpenAnalyzer={() => setView("analyzer")} />
  ) : view === "history" ? (
    <ReportHistory
      lang={lang}
      onLangChange={handleLangChange}
      onBack={() => setView("analyzer")}
    />
  ) : (
    <Analyzer
      lang={lang}
      onLangChange={handleLangChange}
      onViewHistory={() => setView("history")}
      onViewWorkspace={() => setView("workspace")}
    />
  );
}

export default function App() {
  if (new URLSearchParams(window.location.search).get("demo") === "1") {
    return <ChatWorkspace demo />;
  }
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
