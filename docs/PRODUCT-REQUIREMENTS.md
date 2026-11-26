# Product Requirements Document: STaaS Business Builder

- **Document status:** Product definition and proposed requirements
- **Product name:** STaaS Business Builder
- **Expanded term:** Strategy as a Service Business Builder
- **Current product maturity:** Early imported prototype / business-idea analyzer
- **Audience:** Founders, independent creators, consultants, micro-businesses and business-support practitioners
- **Last reviewed:** 25 November 2026

## 1. Executive summary

STaaS Business Builder is intended to help people move from a business idea to a reasoned, evidence-informed and executable business strategy. Its current implementation is a browser-based idea analyzer that generates four deterministic sections: Clarity, Niche, Action and Strategy.

The product vision extends beyond idea analysis. It is to become a strategy-to-execution workspace in which business context, assumptions, evidence, decisions, priorities, delivery work and outcome reviews remain connected over time. A possible managed service can add human accountability and implementation support, but it must remain distinct from the software product.

**The central promise to validate:** help a founder understand what matters next, why it matters, what to do about it, and what evidence will show whether the chosen direction is working.

## 2. Terminology and positioning

### Strategy as a Service (STaaS)

STaaS is a recurring operating model for strategic direction and execution support. It combines discovery, diagnosis, strategic choices, prioritisation, delivery coordination, measurement and adaptation.

It is not synonymous with Software as a Service (SaaS), and this project should not use the two terms interchangeably. SaaS describes a software delivery/commercial model. STaaS describes the strategy capability and service model. The product may itself be delivered as SaaS, but that does not make the underlying service strategy-as-a-service.

### What the service is accountable for

A STaaS engagement should make explicit:
- the business outcomes being pursued;
- the agreed scope and exclusions;
- the decisions reserved to the customer;
- the work and deliverables the provider is responsible for;
- the evidence and metrics used to review progress;
- the cadence for review and reprioritisation;
- fees, third-party costs and change control;
- data ownership, access, portability and exit arrangements.

A provider can be accountable for the quality, transparency and agreed delivery of its work. It cannot guarantee market demand, revenue, investment, profitability or business success.

## 3. Problem and opportunity

Founders commonly encounter disconnected tools, generic templates, conflicting advice and recommendations that are not converted into action. A business plan can become stale as soon as customer feedback, costs or available resources change.

The opportunity is to provide a guided process that preserves context and learning across the business-building lifecycle. The product should help users test the riskiest assumptions before investing heavily, and help them focus on a manageable set of priorities.

This opportunity remains a hypothesis. Discovery interviews and willingness-to-pay tests are required before making market-size or commercial claims.

## 4. Goals

1. Help users articulate a business idea and its intended customer problem.
2. Make the difference between facts, assumptions and generated recommendations explicit.
3. Help users identify and prioritise the most important unknowns.
4. Convert a selected strategy into experiments, milestones and next actions.
5. Preserve decisions, evidence and learning over time.
6. Support regular review and adaptation.
7. Protect founder autonomy, data ownership and control of spending.
8. Provide a credible path from self-serve software to optional human-supported strategy delivery.

## 5. Non-goals

- Guaranteeing business success, revenue, funding or profitability.
- Replacing legal, tax, accounting, regulated financial or other professional advice.
- Automatically incorporating companies, filing tax returns, spending money or entering contracts.
- Making consequential business decisions without user approval.
- Claiming to perform live market research when no external sources were queried.
- Becoming a generic project-management suite before validating the strategy workflow.
- Selling customer data or using confidential idea submissions for unrelated purposes.
- Presenting AI-generated content as verified research or expert review.

## 6. Users and jobs to be done

### Founder / aspiring entrepreneur
"When I have an idea, help me understand the customer problem, what is uncertain and what I should test first."

### Independent creator or consultant
"Help me connect my offer, positioning, audience, channels, operations and digital setup into a coherent plan."

### Early-stage small-business owner
"Help me decide which improvements matter most given my time, budget and capacity."

### Adviser or mentor
"Help me review a founder's assumptions and progress without losing the rationale behind earlier decisions."

### Delivery partner
"Show me the approved work, boundaries, dependencies and evidence of completion without granting unnecessary access to the customer's business."

## 7. Product lifecycle

| Stage | User question | Product output |
|---|---|---|
| Discover | What are you trying to build and what constraints matter? | Business profile and goals |
| Diagnose | What is clear, uncertain or risky? | Problem framing, gaps and risk register |
| Strategise | Which direction is most promising and why? | Strategic choices and business model hypotheses |
| Prioritise | What should happen first? | Ranked initiatives and decision rationale |
| Experiment | What evidence would validate or invalidate an assumption? | Test plan and success criteria |
| Execute | Who is doing what by when? | Approved tasks, owners and milestones |
| Measure | What changed and what did we learn? | Metrics and outcome review |
| Adapt | What should change next? | Updated strategy, backlog and decision log |

The current analyzer covers an initial portion of diagnosis and strategy generation. The remaining lifecycle is roadmap, not delivered functionality.

## 8. Functional requirements

### 8.1 Current baseline requirements

- **BB-001:** Accept a free-text business idea.
- **BB-002:** Generate four sections: Clarity, Niche, Action and Strategy.
- **BB-003:** Show progress through the four stages.
- **BB-004:** Support English and Italian.
- **BB-005:** Authenticate users using Supabase Auth.
- **BB-006:** Persist reports in Supabase.
- **BB-007:** Restrict report access to the owning authenticated user through database RLS.
- **BB-008:** List and delete the user's saved reports.
- **BB-009:** Support browser print / save-to-PDF.

These are reflected in the imported source; they still require build and runtime verification.

### 8.2 Target requirements

- **BB-010 Business profile:** user can maintain business stage, sector, geography, goals, resources, constraints and customer segments.
- **BB-011 Evidence register:** user can record sources, observations, interview notes, dates, confidence and relevance.
- **BB-012 Assumption ledger:** each assumption has impact, uncertainty, validation plan, owner and status.
- **BB-013 Strategic options:** compare options against explicit criteria and record why a direction was selected.
- **BB-014 Decision log:** record decision, date, rationale, alternatives, approver and review trigger.
- **BB-015 Objectives and metrics:** link each strategic objective to a measurable indicator, baseline, target and review period.
- **BB-016 Experiments:** define hypothesis, method, target participants, cost ceiling, success criteria and learning.
- **BB-017 Roadmap:** group initiatives into time horizons and milestones.
- **BB-018 Backlog:** create prioritised tasks with owner, status, dependencies and due date.
- **BB-019 Reviews:** run a recurring review of outcomes, assumptions, risks, costs and priorities.
- **BB-020 Collaboration:** invite advisers or delivery partners with least-privilege roles and revocable access.
- **BB-021 Data export:** allow users to export their profile, reports, decisions and evidence in a documented format.
- **BB-022 Data deletion:** allow users to delete data and understand backup/retention limitations.
- **BB-023 Service engagement:** optionally define a human-supported service scope, cadence, deliverables, approvals and fees.
- **BB-024 Audit trail:** record material changes and approvals without collecting unnecessary sensitive content.
- **BB-025 Integrations:** add integrations only after defining purpose, scopes, data flows, revocation and failure handling.

## 9. Core user stories and acceptance criteria

### Idea analysis
As a founder, I can submit an idea and receive structured feedback so that I can clarify the concept.

Acceptance:
- Empty input is rejected with an understandable message.
- The four sections are labelled consistently.
- Errors do not silently discard the submitted idea.
- The UI indicates that the result is heuristic guidance, not verified market research.

### Report privacy
As a signed-in founder, I can access only my own saved reports.

Acceptance:
- User A cannot read, update or delete User B's reports through direct API calls.
- RLS is enabled and tested for every CRUD operation.
- Unauthenticated access is denied.
- Service-role credentials never reach the browser.

### Assumption validation
As a founder, I can turn an uncertain statement into a testable assumption.

Acceptance:
- An assumption has a statement, impact, confidence, evidence, validation method and status.
- A completed experiment can update the assumption with dated evidence.
- The system preserves previous decisions and does not silently rewrite history.

### Strategy review
As a founder, I can compare current results with the intended outcome and reprioritise.

Acceptance:
- Review displays the selected objective, metric, baseline and current observation.
- The user can record what changed and why.
- Changes to priorities are reflected in the roadmap and decision history.

## 10. Information architecture

Proposed primary navigation:
1. **Overview** - current business position, objectives and next actions.
2. **Analyze** - idea and business diagnosis.
3. **Strategy** - positioning, business model, strategic options and decisions.
4. **Evidence** - assumptions, research and experiments.
5. **Roadmap** - initiatives, milestones and tasks.
6. **Reviews** - metrics, learning and reprioritisation.
7. **Reports** - generated and saved outputs.
8. **Settings** - profile, access, language, integrations, export and deletion.

Do not expose all target navigation as functional until the underlying capabilities exist.

## 11. Data model direction

Candidate entities:
- User and BusinessProfile
- Goal and Objective
- IdeaAnalysis and Report
- Assumption and EvidenceItem
- Experiment and ExperimentResult
- StrategicOption and Decision
- Initiative, Milestone and Task
- Metric and MetricObservation
- Review
- ServiceEngagement, ScopeItem and Approval
- CollaborationMembership and AuditEvent

Every tenant-owned record must have an explicit ownership boundary. Access rules must be enforced server-side and tested for cross-user and cross-tenant leakage. Avoid introducing a complex multi-tenant model until the product has validated collaboration requirements.

## 12. AI and automation policy

The current engine is deterministic and runs in the browser. Future AI-assisted capabilities may support drafting, summarisation, classification and research synthesis, but must follow these rules:

- Identify when content is generated and when sources are external.
- Cite external evidence and preserve retrieval dates.
- Do not fabricate market statistics, competitor facts or financial projections.
- Separate source material from inference and recommendation.
- Require user approval before external actions, spending, messages or changes to connected systems.
- Keep an audit record of material agent actions and approvals.
- Provide a non-AI or export fallback for core user data.
- Never put privileged API keys in client-side code.

## 12.1 Conversational workspace and connected capabilities

The target conversational interface should support more than free-form text. It may coordinate first-party STaaS tools, approved external integrations and interactive components while preserving the founder's control over business data and consequential actions.

### Functional requirements

- **BB-026 Streaming chat:** stream assistant output and tool progress; preserve typed message parts and recoverable error states.
- **BB-027 First-party tools:** expose selected STaaS analysis operations through typed, versioned schemas and server-side execution.
- **BB-028 MCP integrations:** connect only approved MCP servers; display the connector identity and permissions; allow users to revoke access.
- **BB-029 Interactive tool UI:** render native STaaS components and, where compatible, MCP Apps UI resources inside a constrained host.
- **BB-030 Structured outputs:** render validated business scorecards, evidence lists, comparisons, charts and action plans from typed data.
- **BB-031 Human approval:** preview and obtain explicit confirmation for consequential external writes, messages, publication, spending and deletion.
- **BB-032 Multimodal input:** accept only documented file/image/audio modalities supported by the selected provider/model and current privacy policy.
- **BB-033 Long-running work:** show status, allow cancellation and recover from failure for multi-step research or analysis jobs.
- **BB-034 Auditability:** record tool identity, actor, venture scope, approval and outcome for material operations, with sensitive arguments redacted.
- **BB-035 Fallback:** ensure core results remain understandable without a widget renderer or external MCP host capability.

### Acceptance criteria

- A model cannot invoke a tool outside the authenticated user's authorised scope.
- A tool's input is schema-validated and independently authorised on the server.
- A prompt or tool description cannot grant permissions.
- Read-only and write-capable tools are distinguishable.
- Consequential writes show the target and proposed changes before confirmation.
- MCP Apps content is isolated in a sandbox and cannot read application secrets.
- Tool results preserve source/provenance references where applicable.
- The UI degrades to text or structured data when an interactive component is unsupported.
- Provider/model modality support is tested and documented rather than inferred from the SDK.
- Connector access can be revoked and the revocation is enforced on subsequent calls.

## 13. Security, privacy and governance

Minimum requirements:
- Supabase RLS for every user-owned table.
- Automated tests for anonymous access and cross-user access.
- Least-privilege Edge Function permissions.
- No service-role keys in source, browser bundles or logs.
- Rate limits and abuse protection for public endpoints.
- Safe demo-account design that cannot delete or recreate unrelated accounts.
- Secrets stored in deployment secret managers.
- Data minimisation, retention and deletion policies.
- Documented subprocessors and external AI data flows.
- Incident response and vulnerability reporting process.

**Known inherited issue:** the imported repository includes an Edge Function for demo setup with JWT verification disabled and privileged administrative account operations. This is a release blocker until reviewed, constrained or removed. The endpoint must not be exposed in its current privileged form.

## 14. UX and accessibility

- Responsive layouts for mobile, tablet and desktop.
- Keyboard access and visible focus for all interactive controls.
- Semantic headings, labels and form errors.
- WCAG 2.2 AA target.
- Clear empty, loading, error and success states.
- Explain jargon in context.
- Let users edit generated text and export their work.
- Avoid presenting heuristic confidence as statistical certainty.
- Provide progressive disclosure so new founders are not overwhelmed.

## 15. Commercial and service model hypotheses

Potential offers to validate:
- Free or limited self-serve idea analysis.
- Paid subscription for ongoing strategy, evidence and execution workspace.
- Adviser-supported review sessions.
- Managed STaaS retainer with a defined backlog, cadence, approvals, outcomes and accountable contact.
- Separately scoped implementation projects and specialist services.

The managed service should use a clear responsibility matrix. The customer retains ownership of accounts, data, assets, subscriptions and spending approvals. The provider is accountable for the agreed work, documentation, status reporting and transparent change control. Third-party costs must be visible and separately authorised.

No pricing, margin, market-size or conversion assumptions are validated in this document.

## 16. Metrics and validation plan

Initial product discovery should measure:
- whether users understand the four analysis sections;
- whether outputs identify genuinely useful next questions;
- whether users act on recommendations;
- which assumptions founders most need help validating;
- whether they return for reviews;
- whether users prefer self-serve, adviser-supported or managed delivery;
- willingness to pay and acceptable service boundaries.

Avoid vanity metrics such as generated word count. Establish baselines before setting numerical targets.

## 17. Delivery roadmap

### Phase 0 - imported baseline
Inventory the app, confirm dependencies, build and lint, inspect database migrations, verify auth and identify security blockers.

### Phase 1 - trustworthy analyzer
Improve output clarity, explain heuristics, validate language consistency, test report ownership and deletion, resolve demo provisioning risk, add privacy and setup documentation.

### Phase 2 - business context
Add business profiles, goals, assumptions, evidence register and decision log.

### Phase 3 - strategy execution
Add objectives, initiatives, experiments, roadmap, owners, dependencies and milestones.

### Phase 4 - measurement and adaptation
Add metric observations, review cadence, outcome summaries and strategy revision.

### Phase 5 - conversational and integration foundation
Prototype streaming chat; add first-party read-only tools; structured generative UI; one scoped MCP integration; sandboxed MCP Apps proof of concept; approval and audit controls. Do not enable consequential writes until security acceptance criteria pass.

### Phase 6 - optional STaaS service layer
Validate service demand, operating cadence, service agreements, customer approvals, delivery reporting, transparent pricing and exit process.

Phase gates require user research, security review and working acceptance tests. Do not infer completion from a roadmap entry.

## 18. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Generic or misleading recommendations | Show assumptions, limitations and validation steps |
| Users mistake generated analysis for market research | Label deterministic outputs and cite external research when introduced |
| Sensitive business ideas are exposed | Minimise data, enforce RLS, document processing and test access boundaries |
| Demo endpoint abused | Remove or redesign privileged unauthenticated provisioning; add rate limits |
| Product scope expands into a generic business suite | Prioritise the strategy-to-execution loop and validate each module |
| Managed service economics do not work | Pilot a narrowly scoped offer and measure delivery effort and retention |
| AI automation takes consequential action | Human approval, least privilege and audit trail |

## 19. Open questions

1. Which initial founder segment has the most urgent unmet need?
2. Is the first valuable recurring workflow assumption validation, roadmap accountability or periodic strategy review?
3. What is the smallest repeatable managed service that can be delivered profitably?
4. Which evidence sources are reliable, affordable and appropriate for the initial markets?
5. What data should remain local to the browser and what needs cloud persistence?
6. What collaboration model is genuinely needed by advisers and delivery partners?
7. What does a user need to export to leave the service without losing their work?

## 20. Definition of done

A capability is complete only when:
- the user story and acceptance criteria are met;
- implementation and error states are tested;
- permissions and data boundaries are tested;
- accessibility and responsive behaviour are checked;
- documentation matches the shipped behaviour;
- CI checks pass;
- no secrets or unsafe privileged endpoints are introduced; and
- product status is updated from planned to implemented with evidence.
