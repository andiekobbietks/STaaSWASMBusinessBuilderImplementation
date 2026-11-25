import { useState } from "react";
import { Building2, Mail, Lock, User, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UI_TRANSLATIONS, type LangCode, type UITranslations } from "@/lib/translations";

const DEMO_EMAIL = "demo@businessbuilder.app";
const DEMO_PASSWORD = "demo123456";

interface Props {
  lang: LangCode;
  onLangChange: (lang: LangCode) => void;
}

export function AuthScreen({ lang, onLangChange }: Props) {
  const { signIn, signUp } = useAuth();
  const texts = UI_TRANSLATIONS[lang];
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const result = mode === "login"
      ? await signIn(email, password)
      : await signUp(email, password, name);
    setBusy(false);
    if (result.error) {
      setError(result.error);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setBusy(true);
    const result = await signIn(DEMO_EMAIL, DEMO_PASSWORD);
    setBusy(false);
    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Language toggle */}
        <div className="flex justify-center mb-6">
          <LangToggle lang={lang} onLangChange={onLangChange} texts={texts} />
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-200 mb-4">
            <Building2 className="w-8 h-8 text-white" strokeWidth={2.2} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">{texts.appTitle}</h1>
          <p className="text-sm text-slate-500 mt-1 text-center">{texts.appTagline}</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6">
            <TabButton active={mode === "login"} onClick={() => { setMode("login"); setError(null); }}>
              {texts.login}
            </TabButton>
            <TabButton active={mode === "signup"} onClick={() => { setMode("signup"); setError(null); }}>
              {texts.signup}
            </TabButton>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <Field icon={<User className="w-4 h-4" />} label={texts.nameLabel}>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none transition text-sm"
                  placeholder={texts.nameLabel}
                />
              </Field>
            )}
            <Field icon={<Mail className="w-4 h-4" />} label={texts.emailLabel}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none transition text-sm"
                placeholder="you@example.com"
              />
            </Field>
            <Field icon={<Lock className="w-4 h-4" />} label={texts.passwordLabel}>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none transition text-sm"
                placeholder="••••••••"
              />
            </Field>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white font-medium py-2.5 rounded-xl transition shadow-lg shadow-sky-200 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "login" ? texts.loginButton : texts.signupButton}
            </button>
          </form>

          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); }}
            className="w-full text-center text-sm text-sky-600 hover:text-sky-700 mt-4 transition"
          >
            {mode === "login" ? texts.switchToSignup : texts.switchToLogin}
          </button>
        </div>

        {/* Demo account */}
        {mode === "login" && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="text-center mb-3">
              <span className="text-xs text-slate-400">{texts.demoDescription}</span>
            </div>
            <button
              onClick={handleDemoLogin}
              disabled={busy}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 py-2.5 rounded-xl transition disabled:opacity-60"
            >
              <Sparkles className="w-4 h-4" />
              {texts.demoAccount}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
        active ? "bg-white text-sky-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {children}
    </button>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
        {children}
      </div>
    </div>
  );
}

export function LangToggle({ lang, onLangChange, texts }: { lang: LangCode; onLangChange: (l: LangCode) => void; texts: UITranslations }) {
  return (
    <div className="inline-flex bg-slate-100 rounded-full p-1">
      {(["en", "it"] as LangCode[]).map(code => (
        <button
          key={code}
          onClick={() => onLangChange(code)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
            lang === code ? "bg-white text-sky-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          {code === "en" ? "English" : "Italiano"}
        </button>
      ))}
    </div>
  );
}
