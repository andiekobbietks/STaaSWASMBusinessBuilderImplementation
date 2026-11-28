import { supabase } from "./supabase";

export type ImpactLevel = "low" | "medium" | "high";
export type UncertaintyLevel = "low" | "medium" | "high";
export type ClaimKind =
  | "observed_fact"
  | "source_claim"
  | "founder_assertion"
  | "model_inference"
  | "hypothesis";
export type ReviewState = "unreviewed" | "human_reviewed" | "disputed";
export type RedistributionState = "permitted" | "prohibited" | "unknown";
export type AccessBasis =
  | "public"
  | "customer_provided"
  | "licensed"
  | "permissioned"
  | "synthetic"
  | "other";

export interface VentureContext {
  id: string;
  name: string;
  stage: string;
  sector: string;
  geography: string;
  customer: string;
  problem: string;
  offer: string;
  goals: string;
  constraints: string;
}

export interface AssumptionRecord {
  id: string;
  statement: string;
  impact: ImpactLevel;
  uncertainty: UncertaintyLevel;
  confidence: number;
  validationMethod: string;
  reviewAt: string;
  createdAt: string;
}

export interface EvidenceRecord {
  id: string;
  claim: string;
  claimKind: ClaimKind;
  sourceUrl: string;
  sourceTitle: string;
  author: string;
  publishedAt: string;
  retrievedAt: string;
  accessBasis: AccessBasis;
  redistribution: RedistributionState;
  limitations: string;
  reviewState: ReviewState;
  createdAt: string;
}

export interface StrategicOption {
  id: string;
  title: string;
  benefits: string;
  risks: string;
  evidenceFor: string;
  evidenceAgainst: string;
  createdAt: string;
}

export interface DecisionRecord {
  id: string;
  question: string;
  selectedOptionId: string;
  rationale: string;
  rejectedOptions: string;
  unresolvedUncertainty: string;
  reviewTrigger: string;
  createdAt: string;
}

export interface ExperimentRecord {
  id: string;
  assumptionId: string;
  hypothesis: string;
  method: string;
  target: string;
  durationDays: number;
  budgetPence: number;
  successCriteria: string;
  failureCriteria: string;
  status: "planned" | "running" | "completed" | "cancelled";
  createdAt: string;
}

export interface OutcomeRecord {
  id: string;
  experimentId: string;
  summary: string;
  measuredAt: string;
  metricValue: string;
  metricUnit: string;
  limitations: string;
  createdAt: string;
}

export interface LearningRecord {
  id: string;
  concept: string;
  objective: string;
  workedExample: string;
  counterexample: string;
  retrievalPrompt: string;
  applicationPrompt: string;
  reflection: string;
  learningSteps: string[];
  createdAt: string;
}

export interface ContributionMetric {
  id: string;
  unitsSold: number;
  sellingPricePence: number;
  variableCostPence: number;
  updatedAt: string;
}

export interface WorkspaceSnapshot {
  schemaVersion: 1;
  context: VentureContext;
  assumptions: AssumptionRecord[];
  evidence: EvidenceRecord[];
  options: StrategicOption[];
  decisions: DecisionRecord[];
  experiments: ExperimentRecord[];
  outcomes: OutcomeRecord[];
  learning: LearningRecord[];
  contributionMetric: ContributionMetric | null;
}

export interface FounderWorkspace {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
}

export interface WorkspaceVersion {
  version: number;
  snapshot: WorkspaceSnapshot;
  created_at?: string;
}

export function createId(): string {
  return crypto.randomUUID();
}

export function createEmptySnapshot(name: string): WorkspaceSnapshot {
  return {
    schemaVersion: 1,
    context: {
      id: createId(),
      name,
      stage: "idea",
      sector: "",
      geography: "",
      customer: "",
      problem: "",
      offer: "",
      goals: "",
      constraints: "",
    },
    assumptions: [],
    evidence: [],
    options: [],
    decisions: [],
    experiments: [],
    outcomes: [],
    learning: [],
    contributionMetric: null,
  };
}

export async function listFounderWorkspaces(
  userId: string,
): Promise<FounderWorkspace[]> {
  const { data, error } = await supabase
    .from("founder_workspaces")
    .select("id,user_id,name,created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as FounderWorkspace[];
}

export async function createFounderWorkspace(
  userId: string,
  name: string,
): Promise<FounderWorkspace> {
  const { data, error } = await supabase
    .from("founder_workspaces")
    .insert({ user_id: userId, name: name.trim() })
    .select("id,user_id,name,created_at")
    .single();

  if (error) throw error;
  return data as FounderWorkspace;
}

export async function loadFounderWorkspaceVersion(
  workspaceId: string,
): Promise<WorkspaceVersion | null> {
  const { data, error } = await supabase
    .from("founder_workspace_versions")
    .select("version,snapshot,created_at")
    .eq("workspace_id", workspaceId)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return (data as WorkspaceVersion | null) ?? null;
}

export async function saveFounderWorkspaceVersion(
  workspaceId: string,
  snapshot: WorkspaceSnapshot,
): Promise<number> {
  const { data, error } = await supabase.rpc(
    "save_founder_workspace_version",
    {
      p_workspace_id: workspaceId,
      p_snapshot: snapshot,
    },
  );

  if (error) throw error;
  return Number(data);
}

export async function deleteFounderWorkspace(
  workspaceId: string,
): Promise<void> {
  const { error } = await supabase
    .from("founder_workspaces")
    .delete()
    .eq("id", workspaceId);

  if (error) throw error;
}

export interface ContributionMarginResult {
  revenuePence: number;
  variableCostTotalPence: number;
  contributionPence: number;
  marginPercent: number;
}

export function calculateContributionMargin(
  unitsSold: number,
  sellingPricePence: number,
  variableCostPence: number,
): ContributionMarginResult {
  if (!Number.isSafeInteger(unitsSold) || unitsSold < 0) {
    throw new Error("Units sold must be a non-negative whole number.");
  }
  if (!Number.isSafeInteger(sellingPricePence) || sellingPricePence <= 0) {
    throw new Error("Selling price must be greater than zero pence.");
  }
  if (!Number.isSafeInteger(variableCostPence) || variableCostPence < 0) {
    throw new Error("Variable cost must be a non-negative number of pence.");
  }

  const revenuePence = unitsSold * sellingPricePence;
  const variableCostTotalPence = unitsSold * variableCostPence;
  if (
    !Number.isSafeInteger(revenuePence) ||
    !Number.isSafeInteger(variableCostTotalPence)
  ) {
    throw new Error("The entered values exceed the supported calculation range.");
  }

  const contributionPence = revenuePence - variableCostTotalPence;
  const marginPercent =
    revenuePence === 0
      ? 0
      : Math.round((contributionPence / revenuePence) * 10000) / 100;

  return {
    revenuePence,
    variableCostTotalPence,
    contributionPence,
    marginPercent,
  };
}
