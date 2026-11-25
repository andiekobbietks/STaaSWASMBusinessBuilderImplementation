import { useState, useEffect, useCallback } from "react";
import {
  Building2, ArrowLeft, FileText, Trash2, Download,
  Loader2, AlertCircle, Calendar, ChevronRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UI_TRANSLATIONS, type LangCode } from "@/lib/translations";
import { supabase } from "@/lib/supabase";
import { type Report, type AnalysisResult } from "@/lib/types";
import { Markdown } from "@/components/Markdown";
import { exportToPDF } from "@/lib/pdf";
import { LangToggle } from "@/components/AuthScreen";

interface Props {
  lang: LangCode;
  onLangChange: (lang: LangCode) => void;
  onBack: () => void;
}

export function ReportHistory({ lang, onLangChange, onBack }: Props) {
  const { signOut } = useAuth();
  const texts = UI_TRANSLATIONS[lang];
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Report | null>(null);

  const loadReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: queryError } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (queryError) {
      setError(queryError.message);
    } else {
      setReports(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const handleDelete = async (id: string) => {
    if (!confirm(texts.confirmDelete)) return;
    const { error: delError } = await supabase.from("reports").delete().eq("id", id);
    if (delError) {
      setError(delError.message);
      return;
    }
    setReports(prev => prev.filter(r => r.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const handleDownload = (report: Report) => {
    const result: AnalysisResult = {
      clarity: report.clarity_analysis ?? "",
      niche: report.niche_strategy ?? "",
      action: report.action_plan ?? "",
      strategy: report.business_strategy ?? "",
    };
    exportToPDF(report.business_idea, result, texts, new Date(report.created_at));
  };

  if (selected) {
    const result: AnalysisResult = {
      clarity: selected.clarity_analysis ?? "",
      niche: selected.niche_strategy ?? "",
      action: selected.action_plan ?? "",
      strategy: selected.business_strategy ?? "",
    };
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSelected(null)}
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-sky-600 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              {texts.backToAnalyzer}
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleDownload(selected)}
                className="flex items-center gap-2 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg transition"
              >
                <Download className="w-4 h-4" />
                {texts.downloadReport}
              </button>
              <button
                onClick={() => signOut()}
                className="text-sm text-slate-600 hover:text-red-600 transition px-3 py-1.5 rounded-lg hover:bg-slate-100"
              >
                {texts.logout}
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          <div className="bg-sky-50 border-l-4 border-sky-400 rounded-r-xl p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-sky-700 mb-2">{texts.businessIdeaLabel}</h3>
            <p className="text-sm text-slate-700 whitespace-pre-wrap">{selected.business_idea}</p>
            <p className="text-xs text-slate-400 mt-3">
              {texts.createdOn}: {new Date(selected.created_at).toLocaleDateString()} {new Date(selected.created_at).toLocaleTimeString()}
            </p>
          </div>

          {([
            ["clarity", texts.clarityAnalysis, result.clarity],
            ["niche", texts.nicheStrategy, result.niche],
            ["action", texts.actionPlan, result.action],
            ["strategy", texts.businessStrategy, result.strategy],
          ] as const).map(([key, title, content]) => (
            <div key={key} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <h2 className="text-lg font-bold text-slate-800">{title}</h2>
              </div>
              <div className="p-6">
                <Markdown content={content} />
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md shadow-sky-200">
              <Building2 className="w-5 h-5 text-white" strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-none">{texts.appTitle}</h1>
              <p className="text-xs text-slate-400 mt-0.5">{texts.reportHistory}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="text-sm text-sky-600 hover:text-sky-700 font-medium transition px-3 py-1.5 rounded-lg hover:bg-sky-50"
            >
              {texts.analyzer}
            </button>
            <button
              onClick={() => signOut()}
              className="text-sm text-slate-600 hover:text-red-600 transition px-3 py-1.5 rounded-lg hover:bg-slate-100"
            >
              {texts.logout}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex justify-center mb-6">
          <LangToggle lang={lang} onLangChange={onLangChange} texts={texts} />
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && reports.length === 0 && (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-400">{texts.noReports}</p>
            <button
              onClick={onBack}
              className="mt-4 text-sm text-sky-600 hover:text-sky-700 font-medium"
            >
              {texts.analyzer}
            </button>
          </div>
        )}

        {!loading && !error && reports.length > 0 && (
          <div className="space-y-3">
            {reports.map(report => (
              <div
                key={report.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center justify-between gap-4 hover:border-sky-200 transition group"
              >
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div className="w-10 h-10 bg-slate-100 group-hover:bg-sky-100 text-slate-400 group-hover:text-sky-600 rounded-lg flex items-center justify-center shrink-0 transition">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {report.business_idea}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(report.created_at).toLocaleDateString()} {new Date(report.created_at).toLocaleTimeString()}
                      </span>
                      <span className="uppercase">{report.language}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setSelected(report)}
                    className="flex items-center gap-1 text-sm text-sky-600 hover:bg-sky-50 px-3 py-1.5 rounded-lg transition"
                  >
                    {texts.viewReport}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                    title={texts.deleteReport}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
