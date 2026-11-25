import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AuthScreen } from "@/components/AuthScreen";
import { Analyzer } from "@/components/Analyzer";
import { ReportHistory } from "@/components/ReportHistory";
import type { LangCode } from "@/lib/translations";

type View = "analyzer" | "history";

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

  return view === "history" ? (
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
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
