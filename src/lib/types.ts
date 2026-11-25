import type { LangCode } from "./translations";

export interface AnalysisResult {
  clarity: string;
  niche: string;
  action: string;
  strategy: string;
}

export interface Report {
  id: string;
  user_id: string;
  business_idea: string;
  language: string;
  clarity_analysis: string | null;
  niche_strategy: string | null;
  action_plan: string | null;
  business_strategy: string | null;
  created_at: string;
}

export interface AgentStep {
  key: "clarity" | "niche" | "action" | "strategy";
  labelKey: "clarityAnalysis" | "nicheStrategy" | "actionPlan" | "businessStrategy";
  descKey: "clarityDesc" | "nicheDesc" | "actionDesc" | "strategyDesc";
}

export const AGENT_STEPS: AgentStep[] = [
  { key: "clarity", labelKey: "clarityAnalysis", descKey: "clarityDesc" },
  { key: "niche", labelKey: "nicheStrategy", descKey: "nicheDesc" },
  { key: "action", labelKey: "actionPlan", descKey: "actionDesc" },
  { key: "strategy", labelKey: "businessStrategy", descKey: "strategyDesc" },
];

export type AnalysisLang = LangCode;
