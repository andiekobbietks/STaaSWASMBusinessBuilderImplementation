import { useState, useRef } from "react";
import {
  Building2, Lightbulb, Target, Map, FileText,
  Loader2, CheckCircle2, Download, Sparkles, RotateCcw, AlertCircle, ChevronDown
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UI_TRANSLATIONS, SAMPLE_IDEAS, type LangCode } from "@/lib/translations";
import { runAnalysis } from "@/lib/analysis";
import { exportToPDF } from "@/lib/pdf";
import { supabase } from "@/lib/supabase";
import { AGENT_STEPS, type AnalysisResult } from "@/lib/types";
import { Markdown } from "@/components/Markdown";
import { LangToggle } from "@/components/AuthScreen";

type StepStatus = "pending" | "running" | "done";

interface Props {
  lang: LangCode;
  onLangChange: (lang: LangCode) => void;
  onViewHistory: () => void;
  onViewWorkspace: () => void;
}

const AGENT_ICONS: Record<string, typeof Lightbulb> = {
  clarity: Lightbulb,
  niche: Target,
  action: Map,
  strategy: FileText,
};

export function Analyzer({ lang, onLangChange, onViewHistory, onViewWorkspace }: Props) {
  const { user, signOut } = useAuth();
  const texts = UI_TRANSLATIONS[lang];
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [steps, setSteps] = useState<StepStatus[]>(["pending", "pending", "pending", "pending"]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedReportId, setSavedReportId] = useState<string | null>(null);
  const [sampleOpen, setSampleOpen] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    if (!idea.trim()) {
      setError(texts.pleaseEnterIdea);
      return;
    }
    setError(null);
    setResult(null);
    setSavedReportId(null);
    setSteps(["pending", "pending", "pending", "pending"]);
    setRunning(true);

    try {
      const res = await runAnalysis(idea, lang, (step) => {
        const idx = AGENT_STEPS.findIndex(s => s.key === step);
        setSteps(prev => prev.map((s, i) => (i === idx ? "running" : i < idx ? "done" : s)));
      });
      setSteps(["done", "done", "done", "done"]);
      setResult(res);

      // Save to Supabase
      const { data, error: saveError } = await supabase
        .from("reports")
        .insert({
          business_idea: idea,
          language: lang,
          clarity_analysis: res.clarity,
          niche_strategy: res.niche,
          action_plan: res.action,
          business_strategy: res.strategy,
        })
        .select("id")
        .single();

      if (saveError) {
        console.error("Save error:", saveError);
      } else if (data) {
        setSavedReportId(data.id);
      }

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (e) {
      setError(`${texts.errorOccurred}: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setRunning(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setIdea("");
    setSteps(["pending", "pending", "pending", "pending"]);
    setError(null);
    setSavedReportId(null);
  };

  const handleDownload = () => {
    if (!result) return;
    exportToPDF(idea, result, texts);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md shadow-sky-200">
              <Building2 className="w-5 h-5 text-white" strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-none">{texts.appTitle}</h1>
              <p className="text-xs text-slate-400 mt-0.5">{texts.analyzer}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-slate-500">
              {texts.welcome}, <span className="font-medium text-slate-700">{user?.email}</span>
            </span>
            <button
              onClick={onViewWorkspace}
              className="text-sm text-sky-700 hover:text-sky-900 transition px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100"
            >
              Intelligence workspace
            </button>
            <button
              onClick={onViewHistory}
              className="text-sm text-slate-600 hover:text-sky-600 transition px-3 py-1.5 rounded-lg hover:bg-slate-100"
            >
              {texts.reportHistory}
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
        {/* Language toggle */}
        <div className="flex justify-center mb-6">
          <LangToggle lang={lang} onLangChange={onLangChange} texts={texts} />
        </div>

        {/* Input card */}
        {!result && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-sky-500" />
              <h2 className="text-xl font-bold text-slate-800">{texts.businessIdeaLabel}</h2>
            </div>
            <p className="text-sm text-slate-500 mb-4">{texts.appTagline}</p>

            {/* Sample ideas dropdown */}
            <div className="relative mb-4">
              <button
                type="button"
                onClick={() => setSampleOpen(prev => !prev)}
                disabled={running}
                className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-sm text-slate-600 transition disabled:opacity-50"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  {texts.sampleIdeasLabel}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${sampleOpen ? "rotate-180" : ""}`} />
              </button>
              {sampleOpen && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200/60 overflow-hidden">
                  {SAMPLE_IDEAS[lang].map((sample, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setIdea(sample.text);
                        setSampleOpen(false);
                        setError(null);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition border-b border-slate-50 last:border-b-0"
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <textarea
              value={idea}
              onChange={e => setIdea(e.target.value)}
              rows={6}
              disabled={running}
              placeholder={texts.businessIdeaPlaceholder}
              className="w-full p-4 rounded-xl border border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none transition text-sm resize-none disabled:bg-slate-50"
            />
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2.5 mt-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <button
              onClick={handleAnalyze}
              disabled={running}
              className="mt-4 w-full sm:w-auto bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white font-medium px-6 py-2.5 rounded-xl transition shadow-lg shadow-sky-200 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {running ? texts.processing : texts.analyzeButton}
            </button>
          </div>
        )}

        {/* Agent progress */}
        {running && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AGENT_STEPS.map((step, i) => {
              const Icon = AGENT_ICONS[step.key];
              const status = steps[i];
              return (
                <div
                  key={step.key}
                  className={`bg-white rounded-xl border p-5 transition-all duration-300 ${
                    status === "running"
                      ? "border-sky-300 shadow-md shadow-sky-100 scale-[1.02]"
                      : status === "done"
                      ? "border-green-200 bg-green-50/30"
                      : "border-slate-200 opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition ${
                      status === "running" ? "bg-sky-100 text-sky-600" :
                      status === "done" ? "bg-green-100 text-green-600" :
                      "bg-slate-100 text-slate-400"
                    }`}>
                      {status === "running" ? <Loader2 className="w-5 h-5 animate-spin" /> :
                       status === "done" ? <CheckCircle2 className="w-5 h-5" /> :
                       <Icon className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-slate-800">{texts[step.labelKey]}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{texts[step.descKey]}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Results */}
        {result && (
          <div ref={resultRef} className="mt-6 space-y-6">
            {/* Action bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-slate-700">
                  {savedReportId ? texts.reportSaved : texts.success}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg transition"
                >
                  <Download className="w-4 h-4" />
                  {texts.downloadReport}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  {texts.newAnalysis}
                </button>
              </div>
            </div>

            {/* Idea recap */}
            <div className="bg-sky-50 border-l-4 border-sky-400 rounded-r-xl p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-sky-700 mb-2">{texts.businessIdeaLabel}</h3>
              <p className="text-sm text-slate-700 whitespace-pre-wrap">{idea}</p>
            </div>

            {/* Agent results */}
            {AGENT_STEPS.map((step, i) => {
              const Icon = AGENT_ICONS[step.key];
              const content = [result.clarity, result.niche, result.action, result.strategy][i];
              return (
                <div key={step.key} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                    <div className="w-9 h-9 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">{texts[step.labelKey]}</h2>
                  </div>
                  <div className="p-6">
                    <Markdown content={content} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
