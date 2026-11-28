import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Check,
  Download,
  FileArchive,
  Lightbulb,
  Plus,
  Save,
  ShieldCheck,
  Target,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  createEmptySnapshot,
  createFounderWorkspace,
  createId,
  deleteFounderWorkspace,
  listFounderWorkspaces,
  loadFounderWorkspaceVersion,
  saveFounderWorkspaceVersion,
  calculateContributionMargin,
  type FounderWorkspace,
  type WorkspaceSnapshot,
} from "@/lib/founder-workspace";
import { buildOkfBundle, downloadOkfBundle } from "@/lib/okf-export";

type Language = "en" | "it";
type Section =
  | "overview"
  | "assumptions"
  | "evidence"
  | "strategy"
  | "experiments"
  | "learning"
  | "outcomes"
  | "metrics";

const COPY = {
  en: {
    title: "Founder workspace",
    subtitle: "Turn business uncertainty into evidence, learning and testable decisions.",
    overview: "Venture context",
    assumptions: "Assumptions",
    evidence: "Evidence",
    strategy: "Options and decisions",
    experiments: "Experiments",
    learning: "Learning",
    outcomes: "Outcomes",
    metrics: "Metrics",
    create: "Create venture",
    createFirst: "Start with your venture",
    ventureName: "Venture name",
    stage: "Stage",
    sector: "Sector",
    geography: "Geography",
    customer: "Target customer",
    problem: "Customer problem",
    offer: "Your offer",
    goals: "Goals",
    constraints: "Constraints",
    save: "Save version",
    saving: "Saving…",
    saved: "Saved as version",
    export: "Export OKF bundle",
    exporting: "Preparing export…",
    exportReady: "OKF bundle prepared",
    history: "Reports",
    analyzer: "Idea analyser",
    signOut: "Sign out",
    chooseVenture: "Choose venture",
    newVenture: "New venture",
    deleteVenture: "Delete venture",
    confirmDelete: "Delete this venture and all its saved versions?",
    discardUnsaved: "This workspace has unsaved changes. Discard them and switch?",
    noVenture: "Create a venture to start recording context and decisions.",
    loading: "Loading workspace…",
    loadError: "Could not load your workspace.",
    saveError: "Could not save this version. Refresh and try again.",
    createError: "Could not create the venture.",
    deleteError: "Could not delete the venture.",
    unsaved: "Unsaved changes",
    clean: "All changes saved",
    nextAction: "Suggested next action",
    nextActionText: "Identify one high-impact assumption and decide what evidence could change your mind.",
    assumptionTitle: "Add an assumption",
    assumptionStatement: "Assumption",
    impact: "Impact",
    uncertainty: "Uncertainty",
    confidence: "Your confidence (0–1)",
    validationMethod: "How will you test it?",
    reviewAt: "Review date",
    addAssumption: "Add assumption",
    noAssumptions: "No assumptions recorded yet.",
    evidenceTitle: "Record an evidence claim",
    claim: "Claim",
    claimKind: "Claim kind",
    sourceUrl: "Source URL",
    sourceTitle: "Source title",
    author: "Author or publisher",
    publishedAt: "Publication date",
    accessBasis: "Access basis",
    redistribution: "Redistribution rights",
    limitations: "Limitations and comparability",
    reviewState: "Review state",
    addEvidence: "Add evidence",
    noEvidence: "No evidence claims recorded yet.",
    optionTitle: "Add a strategic option",
    optionName: "Option",
    benefits: "Benefits",
    risks: "Risks and trade-offs",
    evidenceFor: "Supporting evidence",
    evidenceAgainst: "Contradicting evidence",
    addOption: "Add option",
    decisionTitle: "Record a founder decision",
    decisionQuestion: "Decision question",
    selectedOption: "Selected option",
    rationale: "Your rationale",
    rejectedOptions: "Options rejected or deferred",
    unresolved: "Unresolved uncertainty",
    reviewTrigger: "When will you review this decision?",
    addDecision: "Record decision",
    noOptions: "Add at least one option before recording a decision.",
    noDecisions: "No decisions recorded yet.",
    experimentTitle: "Design an experiment",
    assumptionLink: "Assumption being tested",
    hypothesis: "Hypothesis",
    method: "Method",
    target: "Who or what will you test?",
    duration: "Duration (days)",
    budget: "Budget ceiling (£)",
    success: "Success criteria (one per line)",
    failure: "Failure criteria (one per line)",
    addExperiment: "Add experiment",
    noExperiments: "No experiments recorded yet.",
    learningTitle: "Create a learning concept",
    concept: "Concept",
    objective: "Learning objective",
    workedExample: "Worked example",
    counterexample: "Counterexample",
    retrieval: "Retrieval prompt",
    application: "Application prompt",
    reflection: "Reflection prompt",
    addLearning: "Add learning concept",
    noLearning: "No learning concepts recorded yet.",
    learningSequence: "Learning sequence",
    outcomeTitle: "Record an outcome",
    experiment: "Related experiment",
    summary: "What happened?",
    measuredAt: "Measured at",
    metricValue: "Observed value",
    metricUnit: "Unit",
    addOutcome: "Record outcome",
    noOutcomes: "No outcomes recorded yet.",
    metricTitle: "Contribution margin calculator",
    unitsSold: "Units sold",
    sellingPrice: "Selling price per unit (£)",
    variableCost: "Variable cost per unit (£)",
    calculate: "Calculate and save metric",
    revenue: "Revenue",
    variableCosts: "Variable costs",
    contribution: "Contribution",
    margin: "Contribution margin",
    metricLimit: "This excludes fixed costs, tax, waste, refunds, payment fees and any costs not entered as variable costs. It is not overall profitability.",
    noMetric: "Enter values to calculate contribution margin.",
    exportTitle: "Portable knowledge bundle",
    exportDescription: "Export your founder context, evidence, assumptions, options, decisions, experiments, learning and outcomes as an OKF v0.3 bundle.",
    exportRights: "The export does not grant a bundle-wide licence. Source rights remain attached to individual source records.",
    exportCount: "concepts included",
    noExport: "Add venture context and records before exporting.",
    required: "Complete the required fields.",
    sourceRequired: "Provide a source URL for source-based claims. Use founder assertion or hypothesis when no external source is available.",
    confidenceNote: "This is your subjective belief, not evidence quality or a calibrated probability.",
    learningNote: "These prompts support learning; they do not prove recall, understanding or transfer.",
    delete: "Delete",
    planned: "Planned",
    running: "Running",
    completed: "Completed",
    cancelled: "Cancelled",
    idea: "Idea",
    validation: "Validation",
    launch: "Launch",
    operating: "Operating",
    scaling: "Scaling",
    low: "Low",
    medium: "Medium",
    high: "High",
    observed: "Observed fact",
    sourceClaim: "Source claim",
    founderAssertion: "Founder assertion",
    modelInference: "Model inference",
    hypothesisKind: "Hypothesis",
    unreviewed: "Unreviewed",
    humanReviewed: "Human reviewed",
    disputed: "Disputed",
    public: "Public",
    customerProvided: "Customer-provided",
    licensed: "Licensed",
    permissioned: "Permissioned",
    synthetic: "Synthetic",
    other: "Other",
    permitted: "Permitted",
    prohibited: "Prohibited",
    unknown: "Unknown",
    provisional: "Provisional",
  },
  it: {
    title: "Spazio del fondatore",
    subtitle: "Trasforma l'incertezza aziendale in prove, apprendimento e decisioni verificabili.",
    overview: "Contesto dell'impresa",
    assumptions: "Ipotesi",
    evidence: "Evidenze",
    strategy: "Opzioni e decisioni",
    experiments: "Esperimenti",
    learning: "Apprendimento",
    outcomes: "Risultati",
    metrics: "Metriche",
    create: "Crea impresa",
    createFirst: "Inizia con la tua impresa",
    ventureName: "Nome dell'impresa",
    stage: "Fase",
    sector: "Settore",
    geography: "Area geografica",
    customer: "Cliente target",
    problem: "Problema del cliente",
    offer: "La tua offerta",
    goals: "Obiettivi",
    constraints: "Vincoli",
    save: "Salva versione",
    saving: "Salvataggio…",
    saved: "Salvato come versione",
    export: "Esporta bundle OKF",
    exporting: "Preparazione esportazione…",
    exportReady: "Bundle OKF preparato",
    history: "Report",
    analyzer: "Analizzatore di idee",
    signOut: "Esci",
    chooseVenture: "Scegli impresa",
    newVenture: "Nuova impresa",
    deleteVenture: "Elimina impresa",
    confirmDelete: "Eliminare questa impresa e tutte le versioni salvate?",
    discardUnsaved: "Ci sono modifiche non salvate. Vuoi scartarle e cambiare impresa?",
    noVenture: "Crea un'impresa per iniziare a registrare contesto e decisioni.",
    loading: "Caricamento spazio di lavoro…",
    loadError: "Impossibile caricare lo spazio di lavoro.",
    saveError: "Impossibile salvare questa versione. Aggiorna e riprova.",
    createError: "Impossibile creare l'impresa.",
    deleteError: "Impossibile eliminare l'impresa.",
    unsaved: "Modifiche non salvate",
    clean: "Tutte le modifiche sono salvate",
    nextAction: "Prossima azione suggerita",
    nextActionText: "Individua un'ipotesi ad alto impatto e stabilisci quali prove potrebbero farti cambiare idea.",
    assumptionTitle: "Aggiungi un'ipotesi",
    assumptionStatement: "Ipotesi",
    impact: "Impatto",
    uncertainty: "Incertezza",
    confidence: "La tua fiducia (0–1)",
    validationMethod: "Come la verificherai?",
    reviewAt: "Data di revisione",
    addAssumption: "Aggiungi ipotesi",
    noAssumptions: "Nessuna ipotesi registrata.",
    evidenceTitle: "Registra un'affermazione basata su evidenze",
    claim: "Affermazione",
    claimKind: "Tipo di affermazione",
    sourceUrl: "URL della fonte",
    sourceTitle: "Titolo della fonte",
    author: "Autore o editore",
    publishedAt: "Data di pubblicazione",
    accessBasis: "Base di accesso",
    redistribution: "Diritti di ridistribuzione",
    limitations: "Limiti e comparabilità",
    reviewState: "Stato della revisione",
    addEvidence: "Aggiungi evidenza",
    noEvidence: "Nessuna evidenza registrata.",
    optionTitle: "Aggiungi un'opzione strategica",
    optionName: "Opzione",
    benefits: "Vantaggi",
    risks: "Rischi e compromessi",
    evidenceFor: "Evidenze a favore",
    evidenceAgainst: "Evidenze contrarie",
    addOption: "Aggiungi opzione",
    decisionTitle: "Registra una decisione del fondatore",
    decisionQuestion: "Domanda decisionale",
    selectedOption: "Opzione scelta",
    rationale: "La tua motivazione",
    rejectedOptions: "Opzioni rifiutate o rinviate",
    unresolved: "Incertezze irrisolte",
    reviewTrigger: "Quando rivedrai questa decisione?",
    addDecision: "Registra decisione",
    noOptions: "Aggiungi almeno un'opzione prima di registrare una decisione.",
    noDecisions: "Nessuna decisione registrata.",
    experimentTitle: "Progetta un esperimento",
    assumptionLink: "Ipotesi da verificare",
    hypothesis: "Ipotesi",
    method: "Metodo",
    target: "Chi o che cosa verificherai?",
    duration: "Durata (giorni)",
    budget: "Limite di budget (£)",
    success: "Criteri di successo (uno per riga)",
    failure: "Criteri di insuccesso (uno per riga)",
    addExperiment: "Aggiungi esperimento",
    noExperiments: "Nessun esperimento registrato.",
    learningTitle: "Crea un concetto di apprendimento",
    concept: "Concetto",
    objective: "Obiettivo di apprendimento",
    workedExample: "Esempio svolto",
    counterexample: "Controesempio",
    retrieval: "Domanda di richiamo",
    application: "Domanda di applicazione",
    reflection: "Domanda di riflessione",
    addLearning: "Aggiungi concetto",
    noLearning: "Nessun concetto di apprendimento registrato.",
    learningSequence: "Sequenza di apprendimento",
    outcomeTitle: "Registra un risultato",
    experiment: "Esperimento collegato",
    summary: "Che cosa è successo?",
    measuredAt: "Misurato il",
    metricValue: "Valore osservato",
    metricUnit: "Unità",
    addOutcome: "Registra risultato",
    noOutcomes: "Nessun risultato registrato.",
    metricTitle: "Calcolatore del margine di contribuzione",
    unitsSold: "Unità vendute",
    sellingPrice: "Prezzo di vendita per unità (£)",
    variableCost: "Costo variabile per unità (£)",
    calculate: "Calcola e salva metrica",
    revenue: "Ricavi",
    variableCosts: "Costi variabili",
    contribution: "Contribuzione",
    margin: "Margine di contribuzione",
    metricLimit: "Esclude costi fissi, imposte, sprechi, rimborsi, commissioni di pagamento e costi non inseriti come variabili. Non rappresenta la redditività complessiva.",
    noMetric: "Inserisci i valori per calcolare il margine di contribuzione.",
    exportTitle: "Bundle di conoscenza portabile",
    exportDescription: "Esporta contesto, evidenze, ipotesi, opzioni, decisioni, esperimenti, apprendimento e risultati in un bundle OKF v0.3.",
    exportRights: "L'esportazione non concede una licenza globale al bundle. I diritti delle fonti restano associati ai singoli record.",
    exportCount: "concetti inclusi",
    noExport: "Aggiungi contesto e record prima di esportare.",
    required: "Completa i campi obbligatori.",
    sourceRequired: "Inserisci un URL per le affermazioni basate su fonti. Se non hai una fonte esterna, usa affermazione del fondatore o ipotesi.",
    confidenceNote: "È una valutazione soggettiva, non la qualità delle prove né una probabilità calibrata.",
    learningNote: "Queste domande supportano l’apprendimento, ma non ne dimostrano richiamo, comprensione o trasferimento.",
    delete: "Elimina",
    planned: "Pianificato",
    running: "In corso",
    completed: "Completato",
    cancelled: "Annullato",
    idea: "Idea",
    validation: "Validazione",
    launch: "Lancio",
    operating: "Operativo",
    scaling: "Espansione",
    low: "Basso",
    medium: "Medio",
    high: "Alto",
    observed: "Fatto osservato",
    sourceClaim: "Affermazione della fonte",
    founderAssertion: "Affermazione del fondatore",
    modelInference: "Inferenza del modello",
    hypothesisKind: "Ipotesi",
    unreviewed: "Non revisionato",
    humanReviewed: "Revisionato da una persona",
    disputed: "Contestato",
    public: "Pubblico",
    customerProvided: "Fornito dal cliente",
    licensed: "Concesso in licenza",
    permissioned: "Autorizzato",
    synthetic: "Sintetico",
    other: "Altro",
    permitted: "Consentito",
    prohibited: "Vietato",
    unknown: "Sconosciuto",
    provisional: "Provvisorio",
  },
} as const;

type CopyKey = keyof typeof COPY.en;

interface Props {
  lang: Language;
  onLangChange: (language: Language) => void;
  onBack: () => void;
  onHistory: () => void;
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  min?: string;
  max?: string;
  step?: string;
  required?: boolean;
}

function Field(props: FieldProps) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium text-foreground">{props.label}</span>
      <input
        type={props.type || "text"}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        step={props.step}
        required={props.required}
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
      />
    </label>
  );
}

interface AreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

function Area(props: AreaProps) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium text-foreground">{props.label}</span>
      <textarea
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        placeholder={props.placeholder}
        rows={props.rows || 3}
        className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
      />
    </label>
  );
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

function SelectField(props: SelectProps) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium text-foreground">{props.label}</span>
      <select
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function SectionCard(props: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold">{props.title}</h2>
      {props.children}
    </section>
  );
}

function EmptyState(props: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
      {props.children}
    </p>
  );
}

function moneyLabel(pence: number, lang: Language): string {
  return new Intl.NumberFormat(lang === "it" ? "it-IT" : "en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(pence / 100);
}

function toPence(value: string): number {
  const amount = Number(value);
  return Number.isFinite(amount) ? Math.round(amount * 100) : 0;
}

export function FounderWorkspace({ lang, onLangChange, onBack, onHistory }: Props) {
  const { user, signOut } = useAuth();
  const t = COPY[lang];
  const [workspaces, setWorkspaces] = useState<FounderWorkspace[]>([]);
  const [workspaceId, setWorkspaceId] = useState("");
  const [snapshot, setSnapshot] = useState<WorkspaceSnapshot | null>(null);
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [section, setSection] = useState<Section>("overview");
  const [form, setForm] = useState<Record<string, string>>({});

  const text = useCallback((key: CopyKey) => t[key], [t]);

  const updateForm = (key: string, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const updateSnapshot = (updater: (current: WorkspaceSnapshot) => WorkspaceSnapshot) => {
    setSnapshot((current) => (current ? updater(current) : current));
    setDirty(true);
    setNotice("");
  };

  const loadWorkspace = useCallback(async (id: string) => {
    const selected = workspaces.find((item) => item.id === id);
    const latest = await loadFounderWorkspaceVersion(id);
    setWorkspaceId(id);
    setSnapshot(latest?.snapshot || createEmptySnapshot(selected?.name || "My venture"));
    setVersion(latest?.version || 0);
    setDirty(false);
    setError("");
    setNotice("");
  }, [workspaces]);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const found = await listFounderWorkspaces(user.id);
        if (!active) return;
        setWorkspaces(found);
        if (found.length > 0) {
          const latest = await loadFounderWorkspaceVersion(found[0].id);
          if (!active) return;
          setWorkspaceId(found[0].id);
          setSnapshot(latest?.snapshot || createEmptySnapshot(found[0].name));
          setVersion(latest?.version || 0);
        } else {
          setSnapshot(null);
          setWorkspaceId("");
        }
      } catch {
        if (active) setError(text("loadError"));
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, [user, text]);

  const createWorkspace = async () => {
    if (!user || !newName.trim()) {
      setError(text("required"));
      return;
    }
    setSaving(true);
    setError("");
    try {
      const created = await createFounderWorkspace(user.id, newName.trim());
      const initial = createEmptySnapshot(newName.trim());
      const initialVersion = await saveFounderWorkspaceVersion(created.id, initial);
      setWorkspaces((current) => [created, ...current]);
      setWorkspaceId(created.id);
      setSnapshot(initial);
      setVersion(initialVersion);
      setDirty(false);
      setNewName("");
      setShowCreate(false);
      setSection("overview");
      setNotice(text("saved") + " " + initialVersion);
    } catch {
      setError(text("createError"));
    } finally {
      setSaving(false);
    }
  };

  const save = async () => {
    if (!user || !workspaceId || !snapshot) return;
    setSaving(true);
    setError("");
    try {
      const { error: renameError } = await supabase
        .from("founder_workspaces")
        .update({ name: snapshot.context.name.trim() || "My venture" })
        .eq("id", workspaceId);
      if (renameError) throw renameError;
      const nextVersion = await saveFounderWorkspaceVersion(workspaceId, snapshot);
      setVersion(nextVersion);
      setDirty(false);
      setNotice(text("saved") + " " + nextVersion);
      const refreshed = await listFounderWorkspaces(user.id);
      setWorkspaces(refreshed);
    } catch {
      setError(text("saveError"));
    } finally {
      setSaving(false);
    }
  };

  const removeWorkspace = async () => {
    if (!workspaceId || !window.confirm(text("confirmDelete"))) return;
    try {
      await deleteFounderWorkspace(workspaceId);
      const refreshed = workspaces.filter((item) => item.id !== workspaceId);
      setWorkspaces(refreshed);
      setSnapshot(null);
      setWorkspaceId("");
      setVersion(0);
      setDirty(false);
      setNotice("");
      if (refreshed.length === 0) setShowCreate(true);
      else await loadWorkspace(refreshed[0].id);
    } catch {
      setError(text("deleteError"));
    }
  };

  const addAssumption = () => {
    if (!snapshot || !form.assumptionStatement?.trim()) {
      setError(text("required"));
      return;
    }
    const confidence = Number(form.confidence || "0.5");
    if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) {
      setError(text("required"));
      return;
    }
    const now = new Date().toISOString();
    updateSnapshot((current) => ({
      ...current,
      assumptions: [
        ...current.assumptions,
        {
          id: createId(),
          statement: form.assumptionStatement.trim(),
          impact: (form.impact || "high") as "low" | "medium" | "high",
          uncertainty: (form.uncertainty || "high") as "low" | "medium" | "high",
          confidence,
          validationMethod: form.validationMethod || "",
          reviewAt: form.reviewAt || "",
          createdAt: now,
        },
      ],
    }));
    setForm({});
    setError("");
  };

  const addEvidence = () => {
    if (!snapshot || !form.claim?.trim()) {
      setError(text("required"));
      return;
    }
    const sourceUrl = (form.sourceUrl || "").trim();
    const claimKind = form.claimKind || "founder_assertion";
    if (!sourceUrl && (claimKind === "observed_fact" || claimKind === "source_claim")) {
      setError(text("sourceRequired"));
      return;
    }
    if (sourceUrl) {
      try {
        const parsed = new URL(sourceUrl);
        if (parsed.protocol !== "https:" && parsed.protocol !== "http:") throw new Error("Unsupported protocol");
      } catch {
        setError("Enter a valid HTTP or HTTPS source URL, or leave it blank.");
        return;
      }
    }
    const now = new Date().toISOString();
    const reviewState = (form.reviewState || "unreviewed") as WorkspaceSnapshot["evidence"][number]["reviewState"];
    updateSnapshot((current) => ({
      ...current,
      evidence: [
        ...current.evidence,
        {
          id: createId(),
          claim: form.claim.trim(),
          claimKind: claimKind as WorkspaceSnapshot["evidence"][number]["claimKind"],
          sourceUrl,
          sourceTitle: form.sourceTitle || "",
          author: form.author || "",
          publishedAt: form.publishedAt || "",
          retrievedAt: now,
          accessBasis: (form.accessBasis || "other") as WorkspaceSnapshot["evidence"][number]["accessBasis"],
          redistribution: (form.redistribution || "unknown") as WorkspaceSnapshot["evidence"][number]["redistribution"],
          limitations: form.limitations || "",
          reviewState,
          ...(reviewState === "human_reviewed" ? { reviewedBy: "human:workspace-owner", reviewedAt: now } : {}),
          createdAt: now,
        },
      ],
    }));
    setForm({});
    setError("");
  };

  const addOption = () => {
    if (!snapshot || !form.optionName?.trim()) {
      setError(text("required"));
      return;
    }
    updateSnapshot((current) => ({
      ...current,
      options: [
        ...current.options,
        {
          id: createId(),
          title: form.optionName.trim(),
          benefits: form.benefits || "",
          risks: form.risks || "",
          evidenceFor: form.evidenceFor || "",
          evidenceAgainst: form.evidenceAgainst || "",
          createdAt: new Date().toISOString(),
        },
      ],
    }));
    setForm({});
    setError("");
  };

  const addDecision = () => {
    if (!snapshot || !form.decisionQuestion?.trim() || !form.selectedOptionId) {
      setError(text("required"));
      return;
    }
    updateSnapshot((current) => ({
      ...current,
      decisions: [
        ...current.decisions,
        {
          id: createId(),
          question: form.decisionQuestion.trim(),
          selectedOptionId: form.selectedOptionId,
          rationale: form.rationale || "",
          rejectedOptions: form.rejectedOptions || "",
          unresolvedUncertainty: form.unresolved || "",
          reviewTrigger: form.reviewTrigger || "",
          createdAt: new Date().toISOString(),
        },
      ],
    }));
    setForm({});
    setError("");
  };

  const addExperiment = () => {
    if (!snapshot || !form.hypothesis?.trim() || !form.method?.trim() || !form.assumptionId || !form.successCriteria?.trim()) {
      setError(text("required"));
      return;
    }
    const durationDays = Number(form.durationDays || "7");
    const budgetPence = toPence(form.budget || "0");
    if (!Number.isSafeInteger(durationDays) || durationDays < 1 || !Number.isSafeInteger(budgetPence) || budgetPence < 0) {
      setError(text("required"));
      return;
    }
    updateSnapshot((current) => ({
      ...current,
      experiments: [
        ...current.experiments,
        {
          id: createId(),
          assumptionId: form.assumptionId,
          hypothesis: form.hypothesis.trim(),
          method: form.method.trim(),
          target: form.target || "",
          durationDays,
          budgetPence,
          successCriteria: form.successCriteria || "",
          failureCriteria: form.failureCriteria || "",
          status: (form.status || "planned") as "planned" | "running" | "completed" | "cancelled",
          createdAt: new Date().toISOString(),
        },
      ],
    }));
    setForm({});
    setError("");
  };

  const addLearning = () => {
    if (!snapshot || !form.concept?.trim() || !form.objective?.trim()) {
      setError(text("required"));
      return;
    }
    updateSnapshot((current) => ({
      ...current,
      learning: [
        ...current.learning,
        {
          id: createId(),
          concept: form.concept.trim(),
          objective: form.objective.trim(),
          workedExample: form.workedExample || "",
          counterexample: form.counterexample || "",
          retrievalPrompt: form.retrievalPrompt || "",
          applicationPrompt: form.applicationPrompt || "",
          reflection: form.reflection || "",
          learningSteps: ["orient", "model", "contrast", "retrieve", "apply", "reflect", "revisit"],
          createdAt: new Date().toISOString(),
        },
      ],
    }));
    setForm({});
    setError("");
  };

  const addOutcome = () => {
    if (!snapshot || !form.outcomeSummary?.trim() || !form.experimentId) {
      setError(text("required"));
      return;
    }
    updateSnapshot((current) => ({
      ...current,
      outcomes: [
        ...current.outcomes,
        {
          id: createId(),
          experimentId: form.experimentId,
          summary: form.outcomeSummary.trim(),
          measuredAt: form.measuredAt || new Date().toISOString().slice(0, 10),
          metricValue: form.metricValue || "",
          metricUnit: form.metricUnit || "",
          limitations: form.outcomeLimitations || "",
          createdAt: new Date().toISOString(),
        },
      ],
    }));
    setForm({});
    setError("");
  };

  const saveMetric = () => {
    if (!snapshot) return;
    try {
      const units = Number(form.unitsSold || "0");
      const price = toPence(form.sellingPrice || "0");
      const cost = toPence(form.variableCost || "0");
      calculateContributionMargin(units, price, cost);
      updateSnapshot((current) => ({
        ...current,
        contributionMetric: {
          id: current.contributionMetric?.id || createId(),
          unitsSold: units,
          sellingPricePence: price,
          variableCostPence: cost,
          updatedAt: new Date().toISOString(),
        },
      }));
      setError("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : text("required"));
    }
  };

  const exportBundle = () => {
    if (!snapshot) return;
    try {
      const result = buildOkfBundle(snapshot, Math.max(version, 1));
      downloadOkfBundle(result);
      setNotice(text("exportReady") + ": " + result.conceptCount + " " + text("exportCount"));
      setError("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Export failed.");
    }
  };

  const metricResult = useMemo(() => {
    if (!snapshot?.contributionMetric) return null;
    try {
      return calculateContributionMargin(
        snapshot.contributionMetric.unitsSold,
        snapshot.contributionMetric.sellingPricePence,
        snapshot.contributionMetric.variableCostPence,
      );
    } catch {
      return null;
    }
  }, [snapshot?.contributionMetric]);

  const sections: Array<{ id: Section; label: string; icon: ReactNode }> = [
    { id: "overview", label: text("overview"), icon: <Target className="h-4 w-4" /> },
    { id: "assumptions", label: text("assumptions"), icon: <Lightbulb className="h-4 w-4" /> },
    { id: "evidence", label: text("evidence"), icon: <ShieldCheck className="h-4 w-4" /> },
    { id: "strategy", label: text("strategy"), icon: <Target className="h-4 w-4" /> },
    { id: "experiments", label: text("experiments"), icon: <Check className="h-4 w-4" /> },
    { id: "learning", label: text("learning"), icon: <BookOpen className="h-4 w-4" /> },
    { id: "outcomes", label: text("outcomes"), icon: <Check className="h-4 w-4" /> },
    { id: "metrics", label: text("metrics"), icon: <FileArchive className="h-4 w-4" /> },
  ];

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">{text("loading")}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label={text("analyzer")}>
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">{text("title")}</h1>
              <p className="text-xs text-muted-foreground">{text("subtitle")}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => onLangChange(lang === "en" ? "it" : "en")} className="rounded-md border border-border px-2.5 py-2 text-xs font-semibold">
              {lang === "en" ? "IT" : "EN"}
            </button>
            <button onClick={onHistory} className="rounded-md border border-border px-3 py-2 text-xs font-medium">{text("history")}</button>
            <button onClick={onBack} className="rounded-md border border-border px-3 py-2 text-xs font-medium">{text("analyzer")}</button>
            <button onClick={() => void signOut()} className="rounded-md border border-border px-3 py-2 text-xs font-medium">{text("signOut")}</button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{text("chooseVenture")}</label>
            {workspaces.length > 0 ? (
              <select
                value={workspaceId}
                onChange={(event) => {
                  if (dirty && !window.confirm(text("discardUnsaved"))) return;
                  void loadWorkspace(event.target.value);
                }}
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
              >
                {workspaces.map((workspace) => <option key={workspace.id} value={workspace.id}>{workspace.name}</option>)}
              </select>
            ) : (
              <p className="text-sm text-muted-foreground">{text("noVenture")}</p>
            )}
            <button onClick={() => setShowCreate((value) => !value)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-sm font-medium hover:bg-muted">
              <Plus className="h-4 w-4" /> {text("newVenture")}
            </button>
            {showCreate && (
              <div className="mt-3 space-y-2">
                <Field label={text("ventureName")} value={newName} onChange={setNewName} />
                <button onClick={() => void createWorkspace()} disabled={saving} className="w-full rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50">
                  {text("create")}
                </button>
              </div>
            )}
          </div>

          {snapshot && (
            <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1" aria-label="Founder workspace sections">
              {sections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id)}
                  className={
                    "flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition " +
                    (section === item.id ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-muted")
                  }
                >
                  {item.icon}<span>{item.label}</span>
                </button>
              ))}
            </nav>
          )}

          {snapshot && workspaceId && (
            <button onClick={() => void removeWorkspace()} className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs text-destructive hover:bg-destructive/10">
              <Trash2 className="h-3.5 w-3.5" /> {text("deleteVenture")}
            </button>
          )}
        </aside>

        <div className="min-w-0 space-y-5">
          {error && (
            <div role="alert" className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
            </div>
          )}
          {notice && (
            <div role="status" className="flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm text-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {notice}
            </div>
          )}

          {!snapshot ? (
            <SectionCard title={text("createFirst")}>
              <p className="mb-4 text-sm text-muted-foreground">{text("noVenture")}</p>
              {!showCreate && <button onClick={() => setShowCreate(true)} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">{text("create")}</button>}
            </SectionCard>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className={dirty ? "h-2 w-2 rounded-full bg-amber-500" : "h-2 w-2 rounded-full bg-emerald-500"} />
                  <span className="text-muted-foreground">{dirty ? text("unsaved") : text("clean")}</span>
                  <span className="text-xs text-muted-foreground">v{version}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={exportBundle} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted">
                    <Download className="h-4 w-4" /> {text("export")}
                  </button>
                  <button onClick={() => void save()} disabled={!dirty || saving} className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">
                    <Save className="h-4 w-4" /> {saving ? text("saving") : text("save")}
                  </button>
                </div>
              </div>

              {section === "overview" && (
                <div className="space-y-5">
                  <SectionCard title={text("overview")}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label={text("ventureName")} value={snapshot.context.name} onChange={(value) => updateSnapshot((current) => ({ ...current, context: { ...current.context, name: value } }))} required />
                      <SelectField label={text("stage")} value={snapshot.context.stage} onChange={(value) => updateSnapshot((current) => ({ ...current, context: { ...current.context, stage: value } }))} options={["idea","validation","launch","operating","scaling"].map((value) => ({ value, label: text(value as CopyKey) }))} />
                      <Field label={text("sector")} value={snapshot.context.sector} onChange={(value) => updateSnapshot((current) => ({ ...current, context: { ...current.context, sector: value } }))} />
                      <Field label={text("geography")} value={snapshot.context.geography} onChange={(value) => updateSnapshot((current) => ({ ...current, context: { ...current.context, geography: value } }))} />
                      <Field label={text("customer")} value={snapshot.context.customer} onChange={(value) => updateSnapshot((current) => ({ ...current, context: { ...current.context, customer: value } }))} />
                      <Field label={text("problem")} value={snapshot.context.problem} onChange={(value) => updateSnapshot((current) => ({ ...current, context: { ...current.context, problem: value } }))} />
                      <div className="md:col-span-2">
                        <Area label={text("offer")} value={snapshot.context.offer} onChange={(value) => updateSnapshot((current) => ({ ...current, context: { ...current.context, offer: value } }))} />
                      </div>
                      <Area label={text("goals")} value={snapshot.context.goals} onChange={(value) => updateSnapshot((current) => ({ ...current, context: { ...current.context, goals: value } }))} />
                      <Area label={text("constraints")} value={snapshot.context.constraints} onChange={(value) => updateSnapshot((current) => ({ ...current, context: { ...current.context, constraints: value } }))} />
                    </div>
                  </SectionCard>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                      [text("assumptions"), snapshot.assumptions.length],
                      [text("evidence"), snapshot.evidence.length],
                      [text("decisions"), snapshot.decisions.length],
                      [text("experiments"), snapshot.experiments.length],
                    ].map(([label, count]) => (
                      <div key={String(label)} className="rounded-xl border border-border bg-card p-4">
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="mt-1 text-2xl font-semibold tabular-nums">{count}</p>
                      </div>
                    ))}
                  </div>
                  <SectionCard title={text("nextAction")}>
                    <p className="text-sm text-muted-foreground">{text("nextActionText")}</p>
                  </SectionCard>
                </div>
              )}

              {section === "assumptions" && (
                <div className="space-y-5">
                  <SectionCard title={text("assumptionTitle")}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="md:col-span-2"><Area label={text("assumptionStatement")} value={form.assumptionStatement || ""} onChange={(value) => updateForm("assumptionStatement", value)} /></div>
                      <SelectField label={text("impact")} value={form.impact || "high"} onChange={(value) => updateForm("impact", value)} options={["low","medium","high"].map((value) => ({ value, label: text(value as CopyKey) }))} />
                      <SelectField label={text("uncertainty")} value={form.uncertainty || "high"} onChange={(value) => updateForm("uncertainty", value)} options={["low","medium","high"].map((value) => ({ value, label: text(value as CopyKey) }))} />
                      <div><Field label={text("confidence")} type="number" min="0" max="1" step="0.05" value={form.confidence || "0.5"} onChange={(value) => updateForm("confidence", value)} /><p className="mt-1 text-xs text-muted-foreground">{text("confidenceNote")}</p></div>
                      <Field label={text("reviewAt")} type="date" value={form.reviewAt || ""} onChange={(value) => updateForm("reviewAt", value)} />
                      <div className="md:col-span-2"><Area label={text("validationMethod")} value={form.validationMethod || ""} onChange={(value) => updateForm("validationMethod", value)} /></div>
                    </div>
                    <button onClick={addAssumption} className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> {text("addAssumption")}</button>
                  </SectionCard>
                  <SectionCard title={text("assumptions")}>
                    {snapshot.assumptions.length === 0 ? <EmptyState>{text("noAssumptions")}</EmptyState> : (
                      <div className="space-y-3">
                        {snapshot.assumptions.map((item) => (
                          <div key={item.id} className="rounded-lg border border-border p-4">
                            <p className="font-medium">{item.statement}</p>
                            <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                              <span>{text("impact")}: {text(item.impact)}</span>
                              <span>•</span>
                              <span>{text("uncertainty")}: {text(item.uncertainty)}</span>
                              <span>•</span>
                              <span>{text("confidence")}: {item.confidence.toFixed(2)}</span>
                            </div>
                            {item.validationMethod && <p className="mt-2 text-sm text-muted-foreground">{item.validationMethod}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                  </SectionCard>
                </div>
              )}

              {section === "evidence" && (
                <div className="space-y-5">
                  <SectionCard title={text("evidenceTitle")}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="md:col-span-2"><Area label={text("claim")} value={form.claim || ""} onChange={(value) => updateForm("claim", value)} /></div>
                      <SelectField label={text("claimKind")} value={form.claimKind || "founder_assertion"} onChange={(value) => updateForm("claimKind", value)} options={[
                        ["observed_fact", text("observed")], ["source_claim", text("sourceClaim")], ["founder_assertion", text("founderAssertion")], ["model_inference", text("modelInference")], ["hypothesis", text("hypothesisKind")],
                      ].map(([value,label]) => ({ value: String(value), label: String(label) }))} />
                      <Field label={text("sourceUrl")} value={form.sourceUrl || ""} onChange={(value) => updateForm("sourceUrl", value)} placeholder="https://…" />
                      <Field label={text("sourceTitle")} value={form.sourceTitle || ""} onChange={(value) => updateForm("sourceTitle", value)} />
                      <Field label={text("author")} value={form.author || ""} onChange={(value) => updateForm("author", value)} />
                      <Field label={text("publishedAt")} type="date" value={form.publishedAt || ""} onChange={(value) => updateForm("publishedAt", value)} />
                      <SelectField label={text("accessBasis")} value={form.accessBasis || "other"} onChange={(value) => updateForm("accessBasis", value)} options={[
                        ["public", text("public")], ["customer_provided", text("customerProvided")], ["licensed", text("licensed")], ["permissioned", text("permissioned")], ["synthetic", text("synthetic")], ["other", text("other")],
                      ].map(([value,label]) => ({ value: String(value), label: String(label) }))} />
                      <SelectField label={text("redistribution")} value={form.redistribution || "unknown"} onChange={(value) => updateForm("redistribution", value)} options={[
                        ["permitted", text("permitted")], ["prohibited", text("prohibited")], ["unknown", text("unknown")],
                      ].map(([value,label]) => ({ value: String(value), label: String(label) }))} />
                      <SelectField label={text("reviewState")} value={form.reviewState || "unreviewed"} onChange={(value) => updateForm("reviewState", value)} options={[
                        ["unreviewed", text("unreviewed")], ["human_reviewed", text("humanReviewed")], ["disputed", text("disputed")],
                      ].map(([value,label]) => ({ value: String(value), label: String(label) }))} />
                      <div className="md:col-span-2"><Area label={text("limitations")} value={form.limitations || ""} onChange={(value) => updateForm("limitations", value)} /></div>
                    </div>
                    <button onClick={addEvidence} className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> {text("addEvidence")}</button>
                  </SectionCard>
                  <SectionCard title={text("evidence")}>
                    {snapshot.evidence.length === 0 ? <EmptyState>{text("noEvidence")}</EmptyState> : (
                      <div className="space-y-3">
                        {snapshot.evidence.map((item) => (
                          <div key={item.id} className="rounded-lg border border-border p-4">
                            <p className="font-medium">{item.claim}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{item.sourceTitle || item.sourceUrl || text("founderAssertion")} · {text(item.reviewState === "human_reviewed" ? "humanReviewed" : item.reviewState === "disputed" ? "disputed" : "unreviewed")}</p>
                            <p className="mt-2 text-sm text-muted-foreground">{item.limitations}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </SectionCard>
                </div>
              )}

              {section === "strategy" && (
                <div className="space-y-5">
                  <SectionCard title={text("optionTitle")}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label={text("optionName")} value={form.optionName || ""} onChange={(value) => updateForm("optionName", value)} />
                      <Area label={text("benefits")} value={form.benefits || ""} onChange={(value) => updateForm("benefits", value)} />
                      <Area label={text("risks")} value={form.risks || ""} onChange={(value) => updateForm("risks", value)} />
                      <Area label={text("evidenceFor")} value={form.evidenceFor || ""} onChange={(value) => updateForm("evidenceFor", value)} />
                      <Area label={text("evidenceAgainst")} value={form.evidenceAgainst || ""} onChange={(value) => updateForm("evidenceAgainst", value)} />
                    </div>
                    <button onClick={addOption} className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> {text("addOption")}</button>
                  </SectionCard>
                  <SectionCard title={text("strategy")}>
                    {snapshot.options.length === 0 ? <EmptyState>{text("noOptions")}</EmptyState> : (
                      <div className="space-y-3">
                        {snapshot.options.map((item) => (
                          <div key={item.id} className="rounded-lg border border-border p-4">
                            <p className="font-medium">{item.title}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{item.benefits}</p>
                            {item.risks && <p className="mt-1 text-sm text-muted-foreground">{text("risks")}: {item.risks}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                  </SectionCard>
                  <SectionCard title={text("decisionTitle")}>
                    {snapshot.options.length === 0 ? <EmptyState>{text("noOptions")}</EmptyState> : (
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="md:col-span-2"><Area label={text("decisionQuestion")} value={form.decisionQuestion || ""} onChange={(value) => updateForm("decisionQuestion", value)} /></div>
                        <SelectField label={text("selectedOption")} value={form.selectedOptionId || ""} onChange={(value) => updateForm("selectedOptionId", value)} options={[{value:"",label:"—"}, ...snapshot.options.map((item) => ({value:item.id,label:item.title}))]} />
                        <Area label={text("rationale")} value={form.rationale || ""} onChange={(value) => updateForm("rationale", value)} />
                        <Area label={text("rejectedOptions")} value={form.rejectedOptions || ""} onChange={(value) => updateForm("rejectedOptions", value)} />
                        <Area label={text("unresolved")} value={form.unresolved || ""} onChange={(value) => updateForm("unresolved", value)} />
                        <Area label={text("reviewTrigger")} value={form.reviewTrigger || ""} onChange={(value) => updateForm("reviewTrigger", value)} />
                      </div>
                    )}
                    {snapshot.options.length > 0 && <button onClick={addDecision} className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> {text("addDecision")}</button>}
                  </SectionCard>
                  <SectionCard title={text("strategy")}>
                    {snapshot.decisions.length === 0 ? <EmptyState>{text("noDecisions")}</EmptyState> : (
                      <div className="space-y-3">
                        {snapshot.decisions.map((item) => (
                          <div key={item.id} className="rounded-lg border border-border p-4">
                            <p className="font-medium">{item.question}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{item.rationale}</p>
                            <p className="mt-2 text-xs text-muted-foreground">{text("provisional")}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </SectionCard>
                </div>
              )}

              {section === "experiments" && (
                <div className="space-y-5">
                  <SectionCard title={text("experimentTitle")}>
                    {snapshot.assumptions.length === 0 ? <EmptyState>{text("noAssumptions")}</EmptyState> : (
                      <div className="grid gap-4 md:grid-cols-2">
                        <SelectField label={text("assumptionLink")} value={form.assumptionId || ""} onChange={(value) => updateForm("assumptionId", value)} options={[{value:"",label:"—"}, ...snapshot.assumptions.map((item) => ({value:item.id,label:item.statement}))]} />
                        <Field label={text("hypothesis")} value={form.hypothesis || ""} onChange={(value) => updateForm("hypothesis", value)} />
                        <Area label={text("method")} value={form.method || ""} onChange={(value) => updateForm("method", value)} />
                        <Area label={text("target")} value={form.target || ""} onChange={(value) => updateForm("target", value)} />
                        <Field label={text("duration")} type="number" min="1" value={form.durationDays || "7"} onChange={(value) => updateForm("durationDays", value)} />
                        <Field label={text("budget")} type="number" min="0" step="0.01" value={form.budget || "0"} onChange={(value) => updateForm("budget", value)} />
                        <Area label={text("success")} value={form.successCriteria || ""} onChange={(value) => updateForm("successCriteria", value)} />
                        <Area label={text("failure")} value={form.failureCriteria || ""} onChange={(value) => updateForm("failureCriteria", value)} />
                      </div>
                    )}
                    {snapshot.assumptions.length > 0 && <button onClick={addExperiment} className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> {text("addExperiment")}</button>}
                  </SectionCard>
                  <SectionCard title={text("experiments")}>
                    {snapshot.experiments.length === 0 ? <EmptyState>{text("noExperiments")}</EmptyState> : (
                      <div className="space-y-3">
                        {snapshot.experiments.map((item) => (
                          <div key={item.id} className="rounded-lg border border-border p-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p className="font-medium">{item.hypothesis}</p>
                              <span className="rounded-full bg-muted px-2 py-1 text-xs">{text(item.status)}</span>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{item.method}</p>
                            <p className="mt-2 text-xs text-muted-foreground">{item.durationDays} days · {moneyLabel(item.budgetPence, lang)}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </SectionCard>
                </div>
              )}

              {section === "learning" && (
                <div className="space-y-5">
                  <SectionCard title={text("learningTitle")}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label={text("concept")} value={form.concept || ""} onChange={(value) => updateForm("concept", value)} />
                      <Area label={text("objective")} value={form.objective || ""} onChange={(value) => updateForm("objective", value)} />
                      <Area label={text("workedExample")} value={form.workedExample || ""} onChange={(value) => updateForm("workedExample", value)} />
                      <Area label={text("counterexample")} value={form.counterexample || ""} onChange={(value) => updateForm("counterexample", value)} />
                      <Area label={text("retrieval")} value={form.retrievalPrompt || ""} onChange={(value) => updateForm("retrievalPrompt", value)} />
                      <Area label={text("application")} value={form.applicationPrompt || ""} onChange={(value) => updateForm("applicationPrompt", value)} />
                      <div className="md:col-span-2"><Area label={text("reflection")} value={form.reflection || ""} onChange={(value) => updateForm("reflection", value)} /></div>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">{text("learningSequence")}: Orient → Model → Contrast → Retrieve → Apply → Reflect → Revisit. {text("learningNote")}</p>
                    <button onClick={addLearning} className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> {text("addLearning")}</button>
                  </SectionCard>
                  <SectionCard title={text("learning")}>
                    {snapshot.learning.length === 0 ? <EmptyState>{text("noLearning")}</EmptyState> : (
                      <div className="space-y-3">
                        {snapshot.learning.map((item) => (
                          <div key={item.id} className="rounded-lg border border-border p-4">
                            <p className="font-medium">{item.concept}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{item.objective}</p>
                            <p className="mt-2 text-xs text-muted-foreground">{item.learningSteps.join(" → ")}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </SectionCard>
                </div>
              )}

              {section === "outcomes" && (
                <div className="space-y-5">
                  <SectionCard title={text("outcomeTitle")}>
                    {snapshot.experiments.length === 0 ? <EmptyState>{text("noExperiments")}</EmptyState> : (
                      <div className="grid gap-4 md:grid-cols-2">
                        <SelectField label={text("experiment")} value={form.experimentId || ""} onChange={(value) => updateForm("experimentId", value)} options={[{value:"",label:"—"}, ...snapshot.experiments.map((item) => ({value:item.id,label:item.hypothesis}))]} />
                        <Field label={text("measuredAt")} type="date" value={form.measuredAt || ""} onChange={(value) => updateForm("measuredAt", value)} />
                        <div className="md:col-span-2"><Area label={text("summary")} value={form.outcomeSummary || ""} onChange={(value) => updateForm("outcomeSummary", value)} /></div>
                        <Field label={text("metricValue")} value={form.metricValue || ""} onChange={(value) => updateForm("metricValue", value)} />
                        <Field label={text("metricUnit")} value={form.metricUnit || ""} onChange={(value) => updateForm("metricUnit", value)} />
                        <div className="md:col-span-2"><Area label={text("limitations")} value={form.outcomeLimitations || ""} onChange={(value) => updateForm("outcomeLimitations", value)} /></div>
                      </div>
                    )}
                    {snapshot.experiments.length > 0 && <button onClick={addOutcome} className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> {text("addOutcome")}</button>}
                  </SectionCard>
                  <SectionCard title={text("outcomes")}>
                    {snapshot.outcomes.length === 0 ? <EmptyState>{text("noOutcomes")}</EmptyState> : (
                      <div className="space-y-3">
                        {snapshot.outcomes.map((item) => (
                          <div key={item.id} className="rounded-lg border border-border p-4">
                            <p className="font-medium">{item.summary}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{item.metricValue} {item.metricUnit} · {item.measuredAt}</p>
                            {item.limitations && <p className="mt-2 text-xs text-muted-foreground">{item.limitations}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                  </SectionCard>
                </div>
              )}

              {section === "metrics" && (
                <div className="space-y-5">
                  <SectionCard title={text("metricTitle")}>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Field label={text("unitsSold")} type="number" min="0" step="1" value={form.unitsSold || (snapshot.contributionMetric ? String(snapshot.contributionMetric.unitsSold) : "")} onChange={(value) => updateForm("unitsSold", value)} />
                      <Field label={text("sellingPrice")} type="number" min="0.01" step="0.01" value={form.sellingPrice || (snapshot.contributionMetric ? money(snapshot.contributionMetric.sellingPricePence) : "")} onChange={(value) => updateForm("sellingPrice", value)} />
                      <Field label={text("variableCost")} type="number" min="0" step="0.01" value={form.variableCost || (snapshot.contributionMetric ? money(snapshot.contributionMetric.variableCostPence) : "")} onChange={(value) => updateForm("variableCost", value)} />
                    </div>
                    <button onClick={saveMetric} className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">{text("calculate")}</button>
                    {!snapshot.contributionMetric && <p className="mt-3 text-sm text-muted-foreground">{text("noMetric")}</p>}
                    {metricResult && snapshot.contributionMetric && (
                      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {[
                          [text("revenue"), moneyLabel(metricResult.revenuePence, lang)],
                          [text("variableCosts"), moneyLabel(metricResult.variableCostTotalPence, lang)],
                          [text("contribution"), moneyLabel(metricResult.contributionPence, lang)],
                          [text("margin"), metricResult.marginPercent.toFixed(2) + "%"],
                        ].map(([label, value]) => (
                          <div key={String(label)} className="rounded-lg bg-muted/60 p-3">
                            <p className="text-xs text-muted-foreground">{label}</p>
                            <p className="mt-1 text-lg font-semibold tabular-nums">{value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{text("metricLimit")}</p>
                  </SectionCard>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">{text("exportRights")}</p>
                <button onClick={exportBundle} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted">
                  <FileArchive className="h-4 w-4" /> {text("export")}
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
