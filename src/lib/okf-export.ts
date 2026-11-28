import {
  calculateContributionMargin,
  type WorkspaceSnapshot,
} from "./founder-workspace";
import { createZipBlob } from "./zip";

type Frontmatter = Record<string, unknown>;

function yamlValue(value: unknown): string {
  if (typeof value === "string") return JSON.stringify(value);
  if (value === null) return "null";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  const serialized = JSON.stringify(value);
  return serialized === undefined ? "null" : serialized;
}

function renderFrontmatter(data: Frontmatter): string {
  return [
    "---",
    ...Object.entries(data).map(([key, value]) => key + ": " + yamlValue(value)),
    "---",
  ].join("\n");
}

function slug(value: string): string {
  const result = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return result || "concept";
}

function money(pence: number): string {
  return (pence / 100).toFixed(2);
}

function makeConcept(
  type: string,
  title: string,
  description: string,
  id: string,
  recordVersion: number,
  extension: Record<string, unknown>,
  body: string,
  generatedAt: string,
  tags: string[] = ["staas-business-builder"],
  sources?: unknown[],
): string {
  const frontmatter: Frontmatter = {
    type,
    title,
    description,
    tags,
    generated: { by: "human:founder", at: generatedAt },
    status: "draft",
  };
  if (sources && sources.length > 0) frontmatter.sources = sources;
  frontmatter["x-staas"] = {
    profile_version: "0.1.0",
    id,
    record_version: recordVersion,
    ...extension,
  };
  return renderFrontmatter(frontmatter) + "\n\n" + body.trim() + "\n";
}

export interface OkfExportResult {
  blob: Blob;
  filename: string;
  conceptCount: number;
}

export function buildOkfBundle(
  snapshot: WorkspaceSnapshot,
  workspaceVersion: number,
  exportedAt = new Date(),
): OkfExportResult {
  const generatedAt = exportedAt.toISOString();
  const files: Record<string, string> = {};
  const contextPath = "business/context.md";
  const assumptionPaths = new Map<string, string>();
  const evidencePaths = new Map<string, string>();
  const optionPaths = new Map<string, string>();
  const decisionPaths = new Map<string, string>();
  const experimentPaths = new Map<string, string>();
  const outcomePaths = new Map<string, string>();
  const learningPaths = new Map<string, string>();

  const pathFor = (
    target: Map<string, string>,
    id: string,
    title: string,
    folder: string,
  ) => {
    const path = folder + "/" + slug(title) + "-" + id.slice(0, 8) + ".md";
    target.set(id, path);
    return path;
  };

  snapshot.assumptions.forEach((item) => pathFor(assumptionPaths, item.id, item.statement, "assumptions"));
  snapshot.evidence.forEach((item) => pathFor(evidencePaths, item.id, item.claim, "evidence"));
  snapshot.options.forEach((item) => pathFor(optionPaths, item.id, item.title, "options"));
  snapshot.decisions.forEach((item) => pathFor(decisionPaths, item.id, item.question, "decisions"));
  snapshot.experiments.forEach((item) => pathFor(experimentPaths, item.id, item.hypothesis, "experiments"));
  snapshot.outcomes.forEach((item) => pathFor(outcomePaths, item.id, item.summary, "outcomes"));
  snapshot.learning.forEach((item) => pathFor(learningPaths, item.id, item.concept, "learning"));

  const contextLinks: string[] = [];
  snapshot.assumptions.forEach((item) => contextLinks.push("- [Assumption: " + item.statement + "](../" + assumptionPaths.get(item.id) + ")"));
  snapshot.evidence.forEach((item) => contextLinks.push("- [Evidence: " + item.claim + "](../" + evidencePaths.get(item.id) + ")"));
  snapshot.decisions.forEach((item) => contextLinks.push("- [Decision: " + item.question + "](../" + decisionPaths.get(item.id) + ")"));

  const context = snapshot.context;
  files[contextPath] = makeConcept(
    "Business Context",
    context.name || "Founder venture",
    "Founder-owned business context exported from STaaS Business Builder.",
    context.id,
    workspaceVersion,
    {},
    [
      "# Venture context",
      "",
      "## Stage",
      context.stage || "Not recorded",
      "",
      "## Sector and geography",
      (context.sector || "Not recorded") + " | " + (context.geography || "Not recorded"),
      "",
      "## Customer",
      context.customer || "Not recorded",
      "",
      "## Problem",
      context.problem || "Not recorded",
      "",
      "## Offer",
      context.offer || "Not recorded",
      "",
      "## Goals",
      context.goals || "Not recorded",
      "",
      "## Constraints",
      context.constraints || "Not recorded",
      "",
      "## Related concepts",
      contextLinks.length ? contextLinks.join("\n") : "No linked concepts have been added yet.",
    ].join("\n"),
    generatedAt,
    ["business-context", "founder-workspace"],
  );

  snapshot.assumptions.forEach((item) => {
    const evidenceLinks = (item.evidenceIds || [])
      .map((id) => evidencePaths.get(id))
      .filter((path): path is string => Boolean(path))
      .map((path) => "- [Evidence](../" + path + ")");
    files[assumptionPaths.get(item.id)!] = makeConcept(
      "Assumption",
      item.statement,
      "Founder assumption requiring validation.",
      item.id,
      1,
      {
        impact: item.impact,
        uncertainty: item.uncertainty,
        confidence: {
          value: item.confidence,
          actor: "human:founder",
          at: item.createdAt,
          scale: "subjective-belief",
        },
      },
      [
        "# Assumption",
        "",
        item.statement,
        "",
        "## Validation method",
        item.validationMethod || "Not recorded",
        "",
        "## Review date",
        item.reviewAt || "Not scheduled",
        "",
        "## Evidence links",
        evidenceLinks.length ? evidenceLinks.join("\n") : "No evidence linked to this assumption yet.",
      ].join("\n"),
      generatedAt,
      ["assumption"],
    );
  });

  snapshot.evidence.forEach((item) => {
    const sources = item.sourceUrl
      ? [{
          id: "source-" + item.id.slice(0, 8),
          resource: item.sourceUrl,
          title: item.sourceTitle || item.sourceUrl,
          ...(item.author ? { author: item.author } : {}),
          "x-staas": {
            access_basis: item.accessBasis,
            redistribution: item.redistribution,
          },
        }]
      : [];
    files[evidencePaths.get(item.id)!] = makeConcept(
      "Evidence Claim",
      item.claim,
      "A bounded evidence claim recorded by the founder.",
      item.id,
      1,
      {
        claim_kind: item.claimKind,
        review_state: item.reviewState,
        ...(item.reviewedBy ? { reviewed_by: item.reviewedBy } : {}),
        ...(item.reviewedAt ? { reviewed_at: item.reviewedAt } : {}),
      },
      [
        "# Claim",
        "",
        item.claim + (item.sourceUrl ? "[^source-" + item.id.slice(0, 8) + "]" : ""),
        "",
        "## Source",
        item.sourceUrl ? "[" + (item.sourceTitle || item.sourceUrl) + "](" + item.sourceUrl + ")" : "No external source URL was supplied.",
        "",
        "## Source dates",
        "- Published: " + (item.publishedAt || "Unknown"),
        "- Retrieved: " + (item.retrievedAt || "Not recorded"),
        "",
        "## Limitations",
        item.limitations || "No limitations recorded. This must not be interpreted as proof of source quality.",
        "",
        "## Rights",
        "- Access basis: " + item.accessBasis,
        "- Redistribution: " + item.redistribution,
        "",
        item.sourceUrl ? "[^source-" + item.id.slice(0, 8) + "]: " + (item.sourceTitle || item.sourceUrl) : "This claim has no external source citation and should be treated accordingly.",
      ].join("\n"),
      generatedAt,
      ["evidence-claim"],
      sources,
    );
  });

  snapshot.options.forEach((item) => {
    files[optionPaths.get(item.id)!] = makeConcept(
      "Strategic Option",
      item.title,
      "A candidate course of action considered by the founder.",
      item.id,
      1,
      {},
      [
        "# Option",
        "",
        item.title,
        "",
        "## Benefits",
        item.benefits || "Not recorded",
        "",
        "## Risks and trade-offs",
        item.risks || "Not recorded",
        "",
        "## Supporting evidence",
        item.evidenceFor || "Not recorded",
        "",
        "## Contradicting evidence",
        item.evidenceAgainst || "Not recorded",
      ].join("\n"),
      generatedAt,
      ["strategic-option"],
    );
  });

  snapshot.decisions.forEach((item) => {
    const selectedPath = optionPaths.get(item.selectedOptionId);
    files[decisionPaths.get(item.id)!] = makeConcept(
      "Decision",
      item.question,
      "A founder-owned decision with a recorded rationale and review trigger.",
      item.id,
      1,
      {
        decision_state: "provisional",
        ...(item.selectedOptionId ? { selected_option_id: item.selectedOptionId } : {}),
      },
      [
        "# Decision question",
        "",
        item.question,
        "",
        "## Selected option",
        selectedPath ? "[Selected option](../" + selectedPath + ")" : "No option selected.",
        "",
        "## Rationale",
        item.rationale || "Not recorded",
        "",
        "## Rejected options",
        item.rejectedOptions || "Not recorded",
        "",
        "## Unresolved uncertainty",
        item.unresolvedUncertainty || "Not recorded",
        "",
        "## Review trigger",
        item.reviewTrigger || "Not scheduled",
      ].join("\n"),
      generatedAt,
      ["founder-decision"],
    );
  });

  snapshot.experiments.forEach((item) => {
    const assumptionPath = assumptionPaths.get(item.assumptionId);
    files[experimentPaths.get(item.id)!] = makeConcept(
      "Experiment",
      item.hypothesis,
      "A bounded test designed to evaluate a founder assumption.",
      item.id,
      1,
      {
        execution_status: item.status,
        hypothesis: item.hypothesis,
        method: item.method,
        success_criteria: item.successCriteria.split("\n").map((value) => value.trim()).filter(Boolean),
        failure_criteria: item.failureCriteria.split("\n").map((value) => value.trim()).filter(Boolean),
      },
      [
        "# Experiment protocol",
        "",
        "## Hypothesis",
        item.hypothesis,
        "",
        "## Method",
        item.method,
        "",
        "## Target",
        item.target || "Not recorded",
        "",
        "## Duration",
        String(item.durationDays) + " days",
        "",
        "## Budget ceiling",
        "£" + money(item.budgetPence),
        "",
        "## Success criteria",
        item.successCriteria || "Not defined",
        "",
        "## Failure criteria",
        item.failureCriteria || "Not defined",
        "",
        "## Related assumption",
        assumptionPath ? "[Assumption](../" + assumptionPath + ")" : "No linked assumption.",
        "",
        "## Result",
        item.status === "completed" ? "Completed; record the outcome as a separate concept." : "Not yet completed.",
      ].join("\n"),
      generatedAt,
      ["experiment"],
    );
  });

  snapshot.outcomes.forEach((item) => {
    const experimentPath = experimentPaths.get(item.experimentId);
    files[outcomePaths.get(item.id)!] = makeConcept(
      "Outcome",
      item.summary,
      "An observed result recorded after an experiment or operating period.",
      item.id,
      1,
      {},
      [
        "# Outcome",
        "",
        item.summary,
        "",
        "## Measured at",
        item.measuredAt,
        "",
        "## Metric value",
        item.metricValue + " " + item.metricUnit,
        "",
        "## Limitations",
        item.limitations || "Not recorded",
        "",
        "## Related experiment",
        experimentPath ? "[Experiment](../" + experimentPath + ")" : "No linked experiment.",
      ].join("\n"),
      generatedAt,
      ["outcome"],
    );
  });

  snapshot.learning.forEach((item) => {
    files[learningPaths.get(item.id)!] = makeConcept(
      "Learning Concept",
      item.concept,
      "A concept the founder is learning in order to make and review a business decision.",
      item.id,
      1,
      { learning_steps: item.learningSteps },
      [
        "# Learning objective",
        "",
        item.objective,
        "",
        "## Orient",
        "Why this concept matters to the current decision.",
        "",
        "## Model: worked example",
        item.workedExample || "Not recorded",
        "",
        "## Contrast: counterexample",
        item.counterexample || "Not recorded",
        "",
        "## Retrieve",
        item.retrievalPrompt || "Not recorded",
        "",
        "## Apply",
        item.applicationPrompt || "Not recorded",
        "",
        "## Reflect",
        item.reflection || "Not recorded",
        "",
        "## Revisit",
        "Revisit this concept after new evidence or an experiment outcome is available.",
      ].join("\n"),
      generatedAt,
      ["learning-concept"],
    );
  });

  if (snapshot.contributionMetric) {
    const metric = snapshot.contributionMetric;
    const result = calculateContributionMargin(
      metric.unitsSold,
      metric.sellingPricePence,
      metric.variableCostPence,
    );
    files["metrics/contribution-margin.md"] = makeConcept(
      "Metric",
      "Contribution margin per sale",
      "The proportion of each sale's revenue remaining after variable costs attributable to that sale.",
      metric.id,
      1,
      { unit: "percent", scope: "per_sale" },
      [
        "# Metric definition",
        "",
        "Contribution margin (%) = ((selling price - variable cost) / selling price) × 100",
        "",
        "## Recorded inputs",
        "- Units sold: " + metric.unitsSold,
        "- Selling price per unit: £" + money(metric.sellingPricePence),
        "- Variable cost per unit: £" + money(metric.variableCostPence),
        "",
        "## Deterministic result",
        "- Revenue: £" + money(result.revenuePence),
        "- Variable cost total: £" + money(result.variableCostTotalPence),
        "- Contribution: £" + money(result.contributionPence),
        "- Contribution margin: " + result.marginPercent.toFixed(2) + "%",
        "",
        "## Limitations",
        "This calculation excludes fixed costs, tax, waste, refunds, payment fees and any other costs not entered as variable cost. It is not a statement of overall profitability.",
        "",
        "The calculation is deterministic in the application. A portable OKF Attested Computation with independently executable receipt and attester is a subsequent integration milestone.",
      ].join("\n"),
      generatedAt,
      ["metric", "unit-economics"],
    );
  }

  const indexLinks = [
    "- [Business context](" + contextPath + ")",
    ...Array.from(assumptionPaths.values()).map((path) => "- [Assumption](" + path + ")"),
    ...Array.from(evidencePaths.values()).map((path) => "- [Evidence claim](" + path + ")"),
    ...Array.from(optionPaths.values()).map((path) => "- [Strategic option](" + path + ")"),
    ...Array.from(decisionPaths.values()).map((path) => "- [Decision](" + path + ")"),
    ...Array.from(experimentPaths.values()).map((path) => "- [Experiment](" + path + ")"),
    ...Array.from(outcomePaths.values()).map((path) => "- [Outcome](" + path + ")"),
    ...Array.from(learningPaths.values()).map((path) => "- [Learning concept](" + path + ")"),
    ...(snapshot.contributionMetric ? ["- [Contribution margin metric](metrics/contribution-margin.md)"] : []),
  ];

  files["index.md"] = [
    "---",
    'okf_version: "0.3"',
    "title: " + JSON.stringify(context.name || "STaaS founder workspace"),
    'description: "Founder-owned business knowledge exported from STaaS Business Builder."',
    "---",
    "",
    "# STaaS founder workspace",
    "",
    "This bundle contains founder-provided context and records. Source rights and redistribution permissions remain attached to their individual source records. No bundle-wide content licence is granted by this export.",
    "",
    "## Concepts",
    "",
    ...indexLinks,
    "",
    "Exported at: " + generatedAt,
    "Workspace snapshot version: " + workspaceVersion,
    "",
  ].join("\n");

  const blob = createZipBlob(files);
  const filename = slug(context.name || "staas-workspace") + "-okf-v0.3.zip";
  return { blob, filename, conceptCount: Object.keys(files).length - 1 };
}

export function downloadOkfBundle(result: OkfExportResult): void {
  const url = URL.createObjectURL(result.blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = result.filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
