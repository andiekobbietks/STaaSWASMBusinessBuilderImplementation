import { useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  Activity, ArrowUpRight, BookOpen, Bot, Check,
  CircleHelp, FileSearch, Gauge, Layers3, Menu,
  Plus, Search, Send, ShieldCheck, Sparkles, Target,
  TrendingUp, Wallet, Workflow, X
} from "lucide-react";

type Journey = "overview" | "market" | "model" | "validation";

const journeys: Record<Journey, { title: string; subtitle: string; score: number; label: string; metrics: { name: string; value: string; change: string }[]; gaps: string[] }> = {
  overview: {
    title: "Founder opportunity brief",
    subtitle: "A first-pass view of the opportunity, its assumptions and the next evidence to collect.",
    score: 72, label: "Promising · evidence incomplete",
    metrics: [{ name: "Problem clarity", value: "8.1/10", change: "+12%" }, { name: "Market access", value: "6.4/10", change: "Needs evidence" }, { name: "Revenue logic", value: "7.2/10", change: "Assumption-led" }],
    gaps: ["Interview 8–12 target customers", "Verify willingness to pay", "Map 5 direct alternatives"]
  },
  market: {
    title: "Market discovery",
    subtitle: "Segment the market, compare alternatives and identify the assumptions that need primary research.",
    score: 64, label: "Early signal · validate demand",
    metrics: [{ name: "Segment definition", value: "7.8/10", change: "+8%" }, { name: "Competitive map", value: "5.9/10", change: "3 gaps found" }, { name: "Demand evidence", value: "4.2/10", change: "Primary research needed" }],
    gaps: ["Build a 10-company competitor set", "Collect pricing pages with dates", "Run 5 problem interviews"]
  },
  model: {
    title: "Business model studio",
    subtitle: "Change the assumptions and see how they affect a simple illustrative revenue scenario.",
    score: 78, label: "Model coherent · assumptions unverified",
    metrics: [{ name: "Monthly customers", value: "120", change: "Scenario input" }, { name: "Average revenue", value: "£39", change: "Scenario input" }, { name: "Monthly revenue", value: "£4,680", change: "Calculated" }],
    gaps: ["Validate conversion rate", "Estimate support and delivery costs", "Test annual vs monthly pricing"]
  },
  validation: {
    title: "Validation workbench",
    subtitle: "Turn the most consequential assumptions into experiments with measurable outcomes.",
    score: 58, label: "Validation required",
    metrics: [{ name: "Assumptions logged", value: "12", change: "4 high risk" }, { name: "Evidence attached", value: "7", change: "3 need review" }, { name: "Experiments ready", value: "3", change: "2 in progress" }],
    gaps: ["Attach evidence to the top 4 assumptions", "Define pass/fail thresholds", "Schedule the next review"]
  }
};

const starters = [
  "Challenge the three riskiest assumptions in this opportunity.",
  "Build a competitor research plan with evidence requirements.",
  "Compare monthly and annual pricing scenarios.",
];

interface Props {
  demo?: boolean;
  onOpenAnalyzer?: () => void;
}

export function ChatWorkspace({ demo = false, onOpenAnalyzer }: Props) {
  const [journey, setJourney] = useState<Journey>("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [customers, setCustomers] = useState(120);
  const [price, setPrice] = useState(39);
  const [input, setInput] = useState("");
  const active = journeys[journey];
  // Keep inference unavailable until the authenticated server-side gateway is implemented.
  const chatEnabled = false;
  const monthlyRevenue = customers * price;
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, error } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  const submit = (text = input) => {
    if (!chatEnabled || !text.trim() || busy) return;
    sendMessage({ text: text.trim() });
    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-800">
      <div className="flex min-h-screen">
        <aside className={`${mobileNav ? "fixed inset-y-0 left-0 z-40 flex" : "hidden"} lg:flex lg:static lg:z-auto w-[250px] shrink-0 flex-col border-r border-slate-200 bg-white`}>
          <div className="flex h-[76px] items-center gap-3 border-b border-slate-100 px-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white"><Layers3 size={20}/></div>
            <div><div className="font-bold tracking-tight">STaaS</div><div className="text-[11px] text-slate-400">Strategy workspace</div></div>
            <button className="ml-auto lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={18}/></button>
          </div>
          <div className="px-4 pt-5">
            <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[.16em] text-slate-400">Workspace</div>
            {[
              { id: "overview" as const, label: "Opportunity brief", icon: Target },
              { id: "market" as const, label: "Market discovery", icon: Search },
              { id: "model" as const, label: "Business model", icon: Wallet },
              { id: "validation" as const, label: "Validation lab", icon: ShieldCheck },
            ].map(item => {
              const Icon = item.icon;
              return <button key={item.id} onClick={() => { setJourney(item.id); setMobileNav(false); }} className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${journey === item.id ? "bg-slate-100 font-semibold text-slate-950" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}><Icon size={17}/>{item.label}{journey === item.id && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-500"/>}</button>;
            })}
          </div>
          <div className="mt-7 px-4">
            <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[.16em] text-slate-400">Intelligence</div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500"><FileSearch size={17}/> Evidence library</div>
              <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500"><Workflow size={17}/> Decision log</div>
              <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500"><BookOpen size={17}/> Learning path</div>
            </div>
          </div>
          <div className="mt-auto p-4">
            {onOpenAnalyzer && <button onClick={onOpenAnalyzer} className="mb-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">Open original idea analyser ↗</button>}
            <div className="rounded-2xl bg-slate-950 p-4 text-white">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold"><Sparkles size={14} className="text-cyan-300"/> Knowledge advantage</div>
              <p className="text-xs leading-5 text-slate-300">Don't start from scratch. Start from what humanity has already learned.</p>
              <div className="mt-3 h-1 rounded-full bg-slate-700"><div className="h-1 w-2/3 rounded-full bg-cyan-400"/></div>
              <div className="mt-2 text-[10px] text-slate-400">Evidence workflow preview</div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-7">
            <div className="flex items-center gap-3">
              <button className="lg:hidden" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={20}/></button>
              <div><div className="text-sm font-semibold">Founder workspace</div><div className="text-[11px] text-slate-400">Venture / New opportunity</div></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700 sm:inline-flex"><span className="mr-1.5 mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500"/> {demo ? "Demo environment" : "Workspace ready"}</span>
              <button className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500"><CircleHelp size={17}/></button>
              <div className="grid h-9 w-9 place-items-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-900">AK</div>
            </div>
          </header>

          <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-5 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_390px]">
            <section className="min-w-0 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div><div className="mb-1 flex items-center gap-2 text-xs font-medium text-cyan-700"><Activity size={14}/> STRATEGY INTELLIGENCE</div><h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{active.title}</h1><p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">{active.subtitle}</p></div>
                <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm"><Plus size={15}/> New analysis</button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {active.metrics.map((metric, i) => <div key={metric.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,.025)]"><div className="text-xs text-slate-500">{metric.name}</div><div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{journey === "model" && i === 2 ? `£${monthlyRevenue.toLocaleString("en-GB")}` : metric.value}</div><div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400"><TrendingUp size={12} className="text-cyan-600"/>{metric.change}</div></div>)}
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between"><div><div className="text-sm font-semibold">Opportunity signal</div><div className="mt-1 text-xs text-slate-400">Heuristic assessment · not a validated market score</div></div><Gauge className="text-cyan-600" size={19}/></div>
                  <div className="mt-5 flex items-center gap-5">
                    <div className="relative grid h-28 w-28 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(#0891b2 ${active.score * 3.6}deg, #e8eef3 0deg)` }}><div className="grid h-[84px] w-[84px] place-items-center rounded-full bg-white"><div className="text-center"><div className="text-2xl font-semibold text-slate-950">{active.score}</div><div className="text-[9px] uppercase tracking-wider text-slate-400">Signal</div></div></div></div>
                    <div><div className="text-sm font-semibold text-slate-800">{active.label}</div><p className="mt-1 text-xs leading-5 text-slate-500">A navigation aid for prioritising research. This score is illustrative and should not be treated as investment advice or external market evidence.</p></div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between"><div className="text-sm font-semibold">Evidence coverage</div><FileSearch size={18} className="text-slate-400"/></div>
                  <div className="mt-5 space-y-4">{[{n:"Customer problem",v:76},{n:"Market size",v:42},{n:"Competition",v:58},{n:"Economics",v:64}].map(x=><div key={x.n}><div className="mb-1.5 flex justify-between text-xs"><span className="text-slate-600">{x.n}</span><span className="font-medium text-slate-800">{x.v}%</span></div><div className="h-1.5 rounded-full bg-slate-100"><div className="h-1.5 rounded-full bg-cyan-600" style={{width:`${x.v}%`}}/></div></div>)}</div>
                </div>
              </div>

              {journey === "model" && <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between"><div><div className="text-sm font-semibold">Revenue scenario builder</div><div className="mt-1 text-xs text-slate-400">Change assumptions to explore sensitivity</div></div><Wallet size={18} className="text-cyan-700"/></div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="text-xs text-slate-600">Monthly customers <strong className="float-right text-slate-950">{customers}</strong><input aria-label="Monthly customers" className="mt-3 w-full accent-cyan-700" type="range" min="10" max="500" step="10" value={customers} onChange={e=>setCustomers(Number(e.target.value))}/></label>
                  <label className="text-xs text-slate-600">Average monthly price <strong className="float-right text-slate-950">£{price}</strong><input aria-label="Average monthly price" className="mt-3 w-full accent-cyan-700" type="range" min="5" max="150" step="1" value={price} onChange={e=>setPrice(Number(e.target.value))}/></label>
                </div>
                <div className="mt-5 rounded-xl bg-slate-950 p-4 text-white"><div className="text-xs text-slate-400">Illustrative monthly recurring revenue</div><div className="mt-1 text-3xl font-semibold">£{monthlyRevenue.toLocaleString("en-GB")}</div><div className="mt-1 text-[11px] text-slate-400">{customers} customers × £{price} · excludes churn, tax, costs and refunds</div></div>
              </div>}

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between"><div><div className="text-sm font-semibold">Priority evidence gaps</div><div className="mt-1 text-xs text-slate-400">Recommended next research actions</div></div><button className="text-xs font-medium text-cyan-700">View register <ArrowUpRight size={13} className="inline"/></button></div>
                <div className="space-y-3">{active.gaps.map((gap,i)=><div key={gap} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"><div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-50 text-xs font-semibold text-amber-700">{i+1}</div><div className="min-w-0 flex-1"><div className="text-xs font-medium text-slate-700">{gap}</div><div className="mt-1 text-[10px] text-slate-400">Evidence task · not yet verified</div></div><button aria-label={`Mark ${gap} complete`} className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:border-emerald-300 hover:text-emerald-600"><Check size={14}/></button></div>)}</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-2 text-sm font-semibold"><Sparkles size={16} className="text-cyan-600"/> Start with a question</div>
                <div className="mt-3 flex flex-wrap gap-2">{starters.map(s=><button key={s} onClick={()=>submit(s)} disabled={!chatEnabled} className="rounded-full border border-slate-200 px-3 py-2 text-left text-[11px] text-slate-600 hover:border-cyan-300 hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-50">{s}</button>)}</div>
              </div>
            </section>

            <aside className="min-w-0">
              <div className="flex h-[calc(100vh-112px)] min-h-[620px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,.04)] xl:sticky xl:top-[96px]">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4"><div className="flex items-center gap-2.5"><div className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-50 text-cyan-700"><Bot size={19}/></div><div><div className="text-sm font-semibold">STaaS copilot</div><div className="text-[10px] text-slate-400">Evidence-led founder assistant</div></div></div><span className="rounded-full bg-amber-50 px-2 py-1 text-[9px] font-semibold text-amber-800">CHAT DISABLED · AUTH GATE REQUIRED</span></div>
                <div className="flex-1 space-y-4 overflow-y-auto p-4" data-testid="chat-thread">
                  {!chatEnabled && <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">Chat inference is disabled until an authenticated gateway is available. This workspace preview does not send prompts to a model.</div>}
                  <div className="rounded-2xl rounded-tl-sm bg-slate-50 p-3.5"><div className="mb-2 flex items-center gap-2 text-[10px] font-semibold text-cyan-800"><Sparkles size={12}/> STaaS INSIGHT</div><p className="text-xs leading-5 text-slate-600">I can help you investigate an opportunity, challenge assumptions and turn evidence into a practical next step. I will distinguish supplied facts from hypotheses.</p></div>
                  {messages.map(message=><div key={message.id} className={`rounded-2xl p-3.5 text-xs leading-5 ${message.role === "user" ? "ml-7 rounded-tr-sm bg-slate-950 text-white" : "mr-2 rounded-tl-sm bg-cyan-50 text-slate-700"}`}><div className="mb-1 text-[9px] font-semibold uppercase tracking-wider opacity-60">{message.role === "user" ? "You" : "STaaS copilot"}</div>{message.parts.map((part,i)=>part.type === "text" ? <p key={i} className="whitespace-pre-wrap">{part.text}</p> : null)}</div>)}
                  {busy && <div className="mr-8 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-500"><span className="h-2 w-2 animate-pulse rounded-full bg-cyan-600"/> Model is generating a response…</div>}
                  {error && <div className="rounded-xl bg-rose-50 p-3 text-xs text-rose-700">{error.message}. Check the model endpoint and try again.</div>}
                </div>
                <div className="border-t border-slate-100 p-3">
                  <div className="mb-2 flex items-center justify-between text-[9px] text-slate-400"><span className="flex items-center gap-1"><ShieldCheck size={11}/> Responses require evidence review</span><span>AI SDK streaming</span></div>
                  <form onSubmit={e=>{e.preventDefault();submit();}} className="flex items-end gap-2 rounded-xl border border-slate-200 bg-white p-2 focus-within:border-cyan-400">
                    <textarea aria-label="Ask STaaS" rows={2} disabled={!chatEnabled} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();submit();}}} placeholder="Ask about your opportunity…" className="max-h-28 min-h-[42px] flex-1 resize-none bg-transparent px-2 py-2 text-xs outline-none placeholder:text-slate-400"/>
                    <button aria-label="Send message" type="submit" disabled={!chatEnabled||!input.trim()||busy} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-950 text-white transition hover:bg-cyan-800 disabled:opacity-30"><Send size={15}/></button>
                  </form>
                  <div className="mt-2 text-center text-[9px] text-slate-400">AI output can be incomplete or incorrect. Verify important claims.</div>
                </div>
              </div>
            </aside>
          </div>
          <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-[10px] text-slate-400">STaaS · Strategy as a Service · Evidence before certainty</footer>
        </main>
      </div>
    </div>
  );
}
