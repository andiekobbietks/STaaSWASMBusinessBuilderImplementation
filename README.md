# STaaS Business Builder

> **Working product definition:** a business-building workspace that helps founders turn an early-stage idea into a clearer, testable strategy and an actionable plan. The longer-term direction is to evolve this into a **Strategy as a Service (STaaS)** operating model: strategy is continuously translated into prioritised work, measurable outcomes and evidence-led adaptation, rather than delivered as a one-off report.

[Product requirements](docs/PRODUCT-REQUIREMENTS.md) · [STaaS operating model](docs/STAAS-OPERATING-MODEL.md)

## What STaaS means here

**STaaS means Strategy as a Service.** It is a recurring, structured capability for helping a business decide what to do next, why it matters, how to execute it, and whether the work is producing the intended result.

It is not simply:
- a one-off business plan;
- generic AI-generated advice;
- a strategy presentation that is never implemented; or
- an automated promise that a business idea will succeed.

A credible STaaS service connects six activities:

1. **Discover** the founder's goals, constraints, resources, customers and current position.
2. **Diagnose** the idea, customer problem, market assumptions, risks and capability gaps.
3. **Strategise** define a differentiated direction, value proposition, business model and priorities.
4. **Prioritise** translate the strategy into sequenced experiments, decisions, milestones and an owned backlog.
5. **Execute** support implementation, track decisions and surface blockers, with the founder retaining approval and ownership.
6. **Measure and adapt** review evidence, outcomes, costs and assumptions, then revise priorities.

The service should make the link between strategic intent and day-to-day execution visible. Each recommendation should have a rationale, an owner, a next action, an expected outcome and a way to review whether it worked.

## Product at a glance

The current application is an early **Business Idea Analyzer**, not yet a complete STaaS platform.

It accepts a business idea and produces four structured sections through a deterministic, browser-side analysis engine:

| Analysis stage | Current purpose |
|---|---|
| Clarity | Clarify the core concept, customer problem and business model |
| Niche | Explore target segments and positioning |
| Action | Suggest an initial action plan |
| Strategy | Synthesize a broader business strategy |

The application currently includes:
- React, TypeScript and Vite;
- a responsive Tailwind CSS interface and Lucide icons;
- English and Italian interface/output language selection;
- a rules-based analysis flow that runs in the browser;
- Supabase authentication and user-scoped report persistence;
- report history, deletion and browser print-based PDF export;
- progress states for the four analysis stages.

The current rules-based engine is deterministic and heuristic. It does **not** conduct live market research, validate demand, access authoritative financial data, or provide professional legal, tax, accounting or investment advice. Its outputs are hypotheses and prompts for founder validation, not verified facts or guaranteed outcomes.

## Product vision

Evolve the analyzer into a practical business-building workspace for independent founders, creators, consultants and small businesses. The product should help a user move from an idea to a validated direction and then maintain momentum through a transparent strategy-to-execution cycle.

The intended differentiator is not simply generating more text. It is maintaining a coherent thread between:
- the founder's goals and constraints;
- evidence about customers and the market;
- strategic choices and rejected alternatives;
- assumptions and experiments;
- prioritised work and accountable owners;
- milestones, metrics and observed outcomes; and
- periodic strategy reviews and changes.

The product should be useful as a self-serve tool first, with a possible human-supported or managed STaaS service layered on later. Any managed service must be clearly distinguished from software features and priced transparently.

## Intended users

**Primary users**
- aspiring founders exploring and comparing business ideas;
- early-stage founders who need to turn a concept into a practical plan;
- independent creators, coaches, consultants and micro-business owners who need joined-up business planning.

**Secondary users**
- business advisers, mentors and incubator teams supporting founders;
- delivery partners who may help implement agreed work, where explicitly authorised.

## Problem statement

Early-stage founders often have fragmented advice, uncertain priorities and limited time. A conventional business-plan generator can produce a document without helping the founder test assumptions, make trade-offs or carry the work forward.

The product aims to reduce that gap by guiding users through structured analysis and, over time, connecting the resulting strategy to evidence, decisions, tasks and reviews.

## Product principles

1. **Founder control:** the founder owns their business, data, decisions, accounts and expenditure.
2. **Evidence over confidence:** distinguish user-provided facts, external evidence, assumptions and generated suggestions.
3. **Explainable recommendations:** show why a recommendation was made and what would change it.
4. **Actionability:** recommendations should lead to specific next steps, not just narrative.
5. **Continuous improvement:** strategies are reviewed as evidence and circumstances change.
6. **Privacy by design:** collect the minimum information required; protect reports with user-scoped access controls.
7. **Honest capability claims:** label implemented, planned and experimental capabilities separately.
8. **Human accountability:** AI may assist analysis and drafting, but users approve consequential decisions and external actions.

## Functional requirements

### Current baseline
- **FR-01 Idea input:** a user can submit a free-text description of a business idea.
- **FR-02 Structured analysis:** the application produces Clarity, Niche, Action and Strategy sections.
- **FR-03 Progress feedback:** the interface shows progress through the four analysis stages.
- **FR-04 Language selection:** the interface supports English and Italian.
- **FR-05 Authentication:** users can sign in and create an account through Supabase Auth.
- **FR-06 Report persistence:** authenticated users can save and retrieve their own reports.
- **FR-07 Report management:** users can view and delete their report history.
- **FR-08 Export:** users can print or save a report as PDF through the browser print dialog.

### Target STaaS capabilities (not yet implemented unless explicitly stated above)
- **FR-09 Business profile:** maintain goals, stage, sector, geography, resources, constraints and founder preferences.
- **FR-10 Evidence register:** capture customer interviews, research sources, competitor observations, test results and evidence dates.
- **FR-11 Assumption ledger:** record assumptions, confidence, impact, validation method and review status.
- **FR-12 Strategic options:** compare possible directions, trade-offs, risks and reasons for selecting or rejecting an option.
- **FR-13 Roadmap and backlog:** convert selected priorities into milestones, tasks, owners, dependencies and due dates.
- **FR-14 Experiment planning:** define hypotheses, target users, test methods, success criteria, cost limits and learning outcomes.
- **FR-15 Metrics:** connect strategic objectives to measurable leading and lagging indicators.
- **FR-16 Review cycle:** support recurring reviews that compare expected and observed outcomes and update priorities.
- **FR-17 Decision log:** preserve important decisions, their rationale, approver and date.
- **FR-18 Collaboration:** support explicit invitations and role-based access for advisers or delivery partners.
- **FR-19 Integrations:** add optional integrations only where they reduce friction and have clear permission, data-flow and revocation controls.
- **FR-20 Service delivery:** support a separately consented human-supported STaaS engagement, with scope, service levels, responsibilities and fees made explicit.

## Non-functional requirements

- **Security:** enforce server-side authorisation and row-level security; never rely on client-side filtering alone.
- **Privacy:** minimise collection, define retention and deletion behaviour, and document third-party processors.
- **Reliability:** provide clear loading, empty, error and retry states; avoid silent loss of user work.
- **Accessibility:** target WCAG 2.2 AA, including keyboard operation, visible focus, semantic structure and adequate contrast.
- **Responsive design:** support mobile, tablet and desktop layouts.
- **Maintainability:** keep analysis logic, persistence, presentation and integrations separated.
- **Portability:** document data export and avoid unnecessary lock-in.
- **Performance:** keep the current analysis path responsive on ordinary modern devices; measure before setting numerical service-level targets.
- **Observability:** log operational failures without unnecessarily logging sensitive business-idea content.

## User journey

1. A founder creates an account or uses an explicitly configured demo route.
2. They describe their idea and choose the output language.
3. The analyzer returns four structured sections.
4. The founder reviews, edits and exports or saves the report.
5. In the target product, the founder validates assumptions, records evidence and chooses priorities.
6. Priorities become a roadmap and actionable backlog.
7. Progress and outcomes are reviewed on an agreed cadence.
8. The strategy is adapted when evidence, resources or goals change.

## Current architecture

```text
React + TypeScript + Vite
        |
        +-- Analyzer UI
        |     +-- deterministic browser-side analysis engine
        |     +-- English / Italian translations
        |     +-- Markdown report rendering
        |     +-- browser print / PDF workflow
        |
        +-- Supabase client
              +-- Supabase Auth
              +-- reports table
              +-- owner-scoped Row Level Security
```

The current analysis engine is local and rules-based. Supabase is used for authentication and report storage. No claim is made here that the application currently has a server-side AI agent system, live research pipeline, CRM, task manager, project-management integration or managed strategy service.

## Data and trust model

- Reports belong to the authenticated user identified by `auth.uid()`.
- Row Level Security policies should restrict select, insert, update and delete operations to the owning user.
- The browser Supabase key is a public client key, not a substitute for database policies.
- Service-role credentials must never be placed in client code or committed to the repository.
- Demo-account provisioning must not expose privileged administrative operations through an unauthenticated public endpoint.
- User-provided business information should be treated as confidential business data. Do not use it for model training or external processing without clear disclosure and an appropriate lawful basis/consent.

**Security review required before production:** the imported project includes a demo-account setup Edge Function configured with JWT verification disabled and privileged Supabase administrative operations. Review and redesign or remove this endpoint before operating the app publicly. Do not deploy it with a service-role secret exposed or allow an unauthenticated caller to delete/recreate accounts. Rotate any credentials that may have been exposed. The repository also contains a demo sign-in flow that needs an explicit abuse and access-control review.

## Roadmap

| Phase | Outcome | Status |
|---|---|---|
| 0. Imported baseline | Existing Bolt/Vite application and four-stage analyzer | Present in imported source; requires local verification |
| 1. Product foundation | Accurate product documentation, requirements and security review | Documentation defined here; security work outstanding |
| 2. Strategy workspace | Business profile, evidence register, assumption ledger and decision log | Planned |
| 3. Execution workspace | Prioritised roadmap, experiments, owners and milestones | Planned |
| 4. Measurement loop | Objectives, metrics, review cadence and strategy adaptation | Planned |
| 5. STaaS service layer | Optional human-supported delivery model, permissions and transparent service terms | Exploratory |

## Success measures

Measure whether users make better-informed decisions and take useful action, not simply whether the system generates long reports.

Candidate measures to validate:
- time from idea submission to a first prioritised next action;
- proportion of recommendations converted into user-approved actions;
- proportion of key assumptions with recorded validation evidence;
- experiment completion and learning capture rates;
- milestone progress and review completion;
- user-reported clarity and usefulness;
- retention attributable to ongoing planning and review, not notification volume;
- trust indicators such as successful export, data deletion and permission revocation.

Targets should be set only after baseline usage and user research. Do not invent conversion, revenue or business-success claims.

## Commercial model hypotheses

Potential models to validate with users:
- **Self-serve:** free entry-level analysis with clearly defined limits.
- **Subscription:** recurring access to planning, evidence, roadmap and review capabilities.
- **Adviser-supported:** paid sessions or packages with an independent adviser.
- **Managed STaaS:** a scoped recurring service with an accountable delivery contact, agreed backlog, approvals, reporting and transparent fees.
- **Implementation work:** separately scoped projects or specialist work, never implied to be included in a subscription unless the contract says so.

Pricing, willingness to pay, retention and delivery economics are unvalidated hypotheses. Test them before committing to tiers or revenue forecasts.

## Development

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

Available scripts:

```bash
npm run dev       # Start Vite development server
npm run build     # Create production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run typecheck # Run TypeScript checks
```

### Environment

Configure the Supabase project URL and public anon key using the environment variable names referenced in `src/lib/supabase.ts`. Keep local secrets in an ignored `.env` file and configure deployment secrets through the hosting platform. Never commit service-role keys.

The Supabase schema and access policies are defined in `supabase/migrations/`. Apply and verify migrations against a non-production project before production.

## Project status and limitations

This repository is an imported application baseline, not evidence that every requirement in this document has been delivered. The current four-stage analyzer is the implemented product direction visible in the imported source. The broader STaaS workspace and managed service are proposed evolution.

Before a production release:
- resolve the demo provisioning endpoint security issue;
- verify Supabase migrations, RLS policies and auth configuration;
- confirm language consistency (the current UI supports English and Italian);
- test account creation, sign-in, report isolation, deletion and export;
- run lint, typecheck, build and end-to-end security tests;
- add privacy, retention, terms and support documentation.

## Contributing

Changes should preserve the distinction between verified functionality and roadmap proposals. For substantial product changes, update the requirements, data-flow/security notes and user-facing documentation alongside the implementation.

## Licence

No licence is specified yet. Until a licence is added, the repository is not automatically open source merely because it is publicly visible. Confirm the intended ownership and reuse terms before adding a licence.


## Manifesto

> **Reduce the friction between having an idea and acting on it.**

An idea should not remain unrealised because someone lacks access to the knowledge, experience, resources or strategic guidance needed to develop it. Founders should not have to keep paying the cost of discovering every lesson independently.

STaaS (Strategy as a Service) is being developed as an evidence-led environment that helps founders understand what they are building, why it matters, who it serves, how it might become viable and what to do next. It connects business education, global company case studies, market and industry intelligence, strategic frameworks, founder-provided evidence and practical execution.

The platform is intended to learn from businesses across the US, UK, Europe, Africa, Asia and elsewhere—not only celebrated successes, but also failures, pivots, acquisitions, financing decisions and operational challenges. Lessons must be contextualised: a strategy that worked in one market is not automatically transferable to another.

A business plan is one possible output, not the destination. The intended journey is continuous discovery, diagnosis, strategy, prioritisation, experimentation, execution, measurement and adaptation.

**Don't start from scratch. Start from what has already been learned, test what applies, and build what comes next.**

This is an independent product direction. References to public entrepreneurial advocacy and research are inspiration, not endorsements or partnerships.

## Knowledge architecture: OKF, DWH and the catalogue

The proposed intelligence architecture separates three responsibilities:

- **OKF (Open Knowledge Format, as used by this project):** the portable, provenance-aware knowledge interchange layer. It is intended to preserve source-linked records, timestamps, versions and structured meaning so compatible tools and agent harnesses can exchange knowledge without depending on one model's conversation history. The exact schema/version and conformance tests must be linked to the canonical OKF specification before claiming interoperability.
- **DWH (Data Warehouse):** the analytical store for harmonised company, event, market, industry and founder data. It supports longitudinal analysis, comparisons, aggregation and reporting. It is not a substitute for source records or the portable OKF artefacts.
- **Knowledge catalogue:** the discoverable index connecting business cases, frameworks, research, datasets and founder-specific evidence. Search indexes and embeddings are derived retrieval aids; they do not replace source documents, licences or provenance.

The target flow is: source acquisition and rights review → extraction/OCR → entity resolution and validation → provenance-preserving OKF records → governed DWH models and catalogue indexes → retrieval and evaluation → STaaS workflows and compatible agents (including MCP-enabled harnesses such as OpenCode where implemented).

The application originated as a Bolt.new-generated React/TypeScript/Vite prototype. The current baseline described above remains the scope evidenced by the imported repository; the OKF/DWH/catalogue, research agents, model training and managed STaaS capabilities are proposed architecture, not claims of existing implementation.

## Research, architecture and decision records

- [Research register and literature findings](RESEARCH.md)
- [Architecture, technology readiness and validation plan](docs/ARCHITECTURE-AND-TRL.md)
- [Architecture Decision Records](docs/adr/README.md)
- [Product requirements](docs/PRODUCT-REQUIREMENTS.md)
- [STaaS operating model](docs/STAAS-OPERATING-MODEL.md)

## Technology readiness and evidence discipline

TRL statements in this repository are provisional, component-specific assessments—not a single maturity score for the whole product. The imported analyzer is an early prototype. Research papers establish feasibility of selected techniques, not that this product has reproduced their results. The OKF integration, business intelligence corpus, model fine-tuning, DWH and end-to-end founder outcomes require their own implementation evidence and validation.
