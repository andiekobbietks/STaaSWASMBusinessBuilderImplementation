# STaaS Business Builder

> **Reduce the friction between having an idea and acting on it.**

STaaS means **Strategy as a Service**. This project explores a founder-centred workspace that helps people understand a business opportunity, challenge assumptions, learn from relevant evidence, choose a direction and turn that direction into measurable action.

The ambition is bigger than generating a business plan. STaaS should help founders build and continuously improve the mental models they use to make decisions. It connects business education, global company intelligence, founder-specific evidence, strategic frameworks and execution in one traceable workflow.

**Current status:** an early React/TypeScript/Vite Business Idea Analyzer with deterministic browser-side analysis and Supabase-backed authentication/report persistence. The broader knowledge, learning, data-warehouse, catalogue and agent architecture described below is proposed, not implemented functionality.

- [Research contributions, bibliography and open questions](RESEARCH.md)
- [Product requirements](docs/PRODUCT-REQUIREMENTS.md)
- [STaaS operating model](docs/STAAS-OPERATING-MODEL.md)
- [Architecture and provisional TRL assessment](docs/ARCHITECTURE-AND-TRL.md)
- [Architecture decision records](docs/adr/README.md)

---

## Why build STaaS?

Founders can find articles, watch talks, use a business-plan generator and ask a general-purpose chatbot for advice. Those activities often remain disconnected. They may produce information without helping the founder understand which evidence applies, what is uncertain, what to test next or how new learning should change the plan.

STaaS is intended to close that gap. It should help a founder:

1. **Understand** their idea, customer problem, market and constraints.
2. **Learn** the concepts and frameworks needed to reason about the business.
3. **Compare** relevant company cases, including failures, pivots, acquisitions, financing and operational challenges.
4. **Challenge** assumptions through respectful, evidence-grounded dialogue.
5. **Decide** between strategic options while retaining ownership of the decision.
6. **Act** through experiments, milestones and prioritised work.
7. **Review** outcomes and adapt the strategy as evidence changes.

The platform should not assume that a founder has access to a large local network, nearby incubator or obvious precedent. It should surface relevant knowledge across the US, UK, Europe, Africa, Asia and diaspora markets while making contextual differences explicit.

## Product at a glance

### Current application

The imported application is an early **Business Idea Analyzer**. It accepts a free-text business idea and produces four structured sections through a deterministic, heuristic, browser-side analysis engine:

| Stage | Current purpose |
|---|---|
| Clarity | Clarify the concept, customer problem and business model |
| Niche | Explore target segments and positioning |
| Action | Suggest initial actions |
| Strategy | Synthesize a broader strategic direction |

The documented application baseline includes React, TypeScript and Vite; responsive Tailwind CSS and Lucide icons; English and Italian interface/output language selection; deterministic browser-side analysis; Supabase authentication and user-scoped report persistence; report history, deletion and browser print-based PDF export; and progress feedback across the four stages.

The current engine does **not** conduct live market research, validate demand, access authoritative financial data or provide professional legal, tax, accounting or investment advice. Outputs are hypotheses and prompts for founder validation, not verified facts or guaranteed outcomes.

### Intended STaaS service cycle

~~~text
DISCOVER → DIAGNOSE → LEARN → STRATEGISE → PRIORITISE
    ↑                                           ↓
 REVIEW ← MEASURE ← EXECUTE ← EXPERIMENT ← DECIDE
~~~

Each recommendation should have a visible rationale, evidence basis, owner, next action, expected outcome and review point. A plan should evolve when new evidence arrives.

## Research-informed design

Three connected ideas shape the proposed product:

1. **Business intelligence as reusable knowledge.** Preserve source provenance and context so a founder can learn from companies beyond their immediate geography or network. Do not reduce a business to a success/failure label: preserve events, constraints, decisions, pivots and outcomes over time.
2. **Reflective, evidence-led dialogue.** Research on personalised LLM dialogue and belief revision motivates a testable design in which the system elicits assumptions, presents relevant evidence and counterexamples, invites reflection and records the founder's own reasoning. This is a design hypothesis for entrepreneurship education, not proof of STaaS effectiveness. The 2024 Science study has a subsequent expression-of-concern and erratum; see the [publication-history note in RESEARCH.md](RESEARCH.md#1-personalised-evidence-based-dialogue-and-belief-revision).
3. **Learning is not the same as recall.** Spaced retrieval may help founders remember concepts, but applied competence must be evaluated separately through scenarios, decisions, experiments and observed follow-through.

The ethical objective is informed founder agency, not persuasion or agreement with the model. Founders must be able to disagree, inspect sources and retain control of consequential decisions.

## Proposed system architecture

The diagrams distinguish the current application from the proposed knowledge and intelligence services.

### Current prototype boundary

~~~text
┌──────────────────────────────────────────────────────────┐
│             React + TypeScript + Vite UI                 │
│                                                          │
│  Idea input → Clarity → Niche → Action → Strategy        │
│                     │                                    │
│             Deterministic browser-side engine            │
│                     │                                    │
│        Report view / print-to-PDF / history UI           │
└─────────────────────┬────────────────────────────────────┘
                      │ Supabase client
          ┌───────────┴────────────┐
          │                       │
     Supabase Auth          Reports storage
          │                       │
          └──── user-scoped RLS ──┘
~~~

This is the documented current baseline. It is not a live research agent, DWH, vector database, knowledge catalogue or managed strategy service.

### Target STaaS architecture (proposed)

~~~text
┌──────────────────────────────────────────────────────────────────────┐
│                         FOUNDER EXPERIENCE                           │
│ Idea workspace · Learning coach · Case explorer · Strategy · Tasks  │
│ Evidence register · Assumption ledger · Decision log · Review       │
└───────────────────────────────┬──────────────────────────────────────┘
                                │
┌───────────────────────────────▼──────────────────────────────────────┐
│                 FOUNDER & BUSINESS STRATEGIC STATE                   │
│ Goals · Stage · Sector · Geography · Constraints · Capabilities     │
│ Assumptions · Confidence · Decisions · Experiments · Outcomes       │
│ Consent · Access policy · Version history                           │
└───────────────────────────────┬──────────────────────────────────────┘
                                │
┌───────────────────────────────▼──────────────────────────────────────┐
│                  REASONING & WORKFLOW ORCHESTRATION                  │
│ Retrieval-augmented dialogue · Framework selection · Planning       │
│ Deterministic finance/schema checks · Tool permissions              │
│ Human approval for consequential actions                            │
└───────────────┬─────────────────────────────┬────────────────────────┘
                │                             │
┌───────────────▼────────────────┐  ┌─────────▼────────────────────────┐
│       KNOWLEDGE CATALOGUE      │  │       LEARNING & EVALUATION      │
│ Company cases · Frameworks     │  │ Spaced recall · Scenario tasks   │
│ Datasets · Founder evidence    │  │ Calibration · Competence         │
│ Search · Filters · Discovery   │  │ Held-out benchmark · Feedback    │
└───────────────┬────────────────┘  └──────────────────────────────────┘
                │
┌───────────────▼──────────────────────────────────────────────────────┐
│                    DATA & KNOWLEDGE FOUNDATION                       │
│ Source register → rights review → fetch/import → OCR/parsing         │
│      → entity/event resolution → validation & human review           │
│                                                                      │
│   ┌────────────────┐  ┌────────────────┐  ┌──────────────────────┐  │
│   │ OKF interchange│→ │ DWH / analytics│→ │ Search/vector index │  │
│   │ portable record│  │ history/metrics│  │ rebuildable view    │  │
│   └────────────────┘  └────────────────┘  └──────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
                │
┌───────────────▼──────────────────────────────────────────────────────┐
│                 SOURCES & CONNECTED KNOWLEDGE                        │
│ Public filings · Enterprise surveys · Research · Case studies        │
│ Founder uploads · Interviews · Product/market evidence               │
└──────────────────────────────────────────────────────────────────────┘

Cross-cutting: provenance · licensing · privacy · security · auditability
               portability · observability · backup · deletion controls
~~~

### The roles of OKF, DWH and catalogue

These are separate responsibilities, not interchangeable names for one database.

| Layer | Intended responsibility | Not a substitute for |
|---|---|---|
| **OKF** | Portable, versioned, provenance-aware knowledge interchange artefacts. The canonical specification and schema must be verified before claiming conformance. | Conversation history, embeddings or hidden model reasoning. |
| **DWH** | Governed analytical integration of source-grain records, entities, events, geography, sector, time and outcomes. | Original documents or a portable exchange format. |
| **Catalogue** | Human- and machine-readable discovery across cases, datasets, frameworks and founder records. | Evidence validation, copyright permission or a guarantee that a result is true. |
| **Search/vector index** | Rebuildable keyword and semantic retrieval projections over governed records. | Canonical records, provenance or source rights. |

### Proposed evidence-to-learning data flow

~~~text
SOURCE REGISTER
   ↓
Rights / licence / privacy review
   ↓
Fetch or founder-authorised import
   ↓
Source capture and metadata (where lawful)
   ↓
OCR / parsing / extraction
   ↓
Entity resolution + event normalisation
   ↓
Validation, deduplication and human review
   ↓
OKF knowledge artefacts (schema verification required)
   ↓
DWH analytical history
   ↓
Catalogue + keyword/vector retrieval projections
   ↓
Contextual retrieval for founder question or decision
   ↓
Model + deterministic workflow + human approval
   ↓
Founder-approved decision / experiment / action
   ↓
Evidence and outcome captured; strategy reviewed
~~~

Every knowledge item should distinguish observed facts, attributed claims, founder assertions, model-generated interpretation and unresolved hypotheses. Preserve source identifiers, publisher, publication/event date, retrieval date, licence/terms, extraction method/version, validation status and lawful links to originals.

## Global business intelligence and contextual transfer

The catalogue is intended to learn from businesses across the US, UK, Europe, Africa, Asia and diaspora communities. It should include businesses that grew, survived, stalled or closed; pivots and failed experiments; acquisitions, mergers and ownership changes; funding rounds, bootstrapping and financing constraints; operational challenges, infrastructure constraints and regulatory changes; and customer discovery, distribution, pricing and business-model changes.

A case from another market is a comparison, not a prescription. Capture the conditions that shape transferability: infrastructure, capital access, regulation, purchasing power, informality, language, distribution, institutions, supply chains and customer behaviour. When no close precedent exists, say so rather than inventing one.

## Founder learning and mental-model development

A proposed learning loop:

1. Ask the founder to explain their current model of the business in their own words.
2. Identify assumptions, confidence levels and the decision currently blocked by uncertainty.
3. Retrieve relevant cases, evidence and framework concepts, including credible counterexamples.
4. Explain what is comparable and what differs; make the evidence trail inspectable.
5. Invite the founder to revise, retain or reject their view and explain why.
6. Record the founder's decision and rationale, not merely the model's preferred answer.
7. Revisit the assumption after experiments or new evidence.
8. Use spaced retrieval for concept recall and separate applied tasks to assess competence.

Potential measures include comprehension, calibration, quality of reasoning, experiment design, decision quality and follow-through. Do not optimise for agreement, confidence inflation or a predetermined business outcome.

## Agent interoperability and infrastructure

The longer-term architecture may expose permissioned capabilities through MCP or other adapters so compatible agent harnesses (for example, OpenCode) can read approved knowledge and update authorised work items. The platform must own durable strategic state; provider-specific conversation formats and thought signatures are not portable business memory.

AKCloud may help founders assess deployment readiness, hosting options and applications for third-party startup programmes. It cannot guarantee Google Cloud credits or any provider award. External integrations must be optional, scoped, auditable and revocable.

## Security, privacy and trust

- Enforce authorisation server-side and test Supabase Row Level Security for every user-owned record.
- Treat business ideas, uploaded documents, interviews and financial data as confidential.
- Minimise collection; document retention, export, deletion and third-party processing.
- Keep service-role credentials out of browser code and Git history.
- Require explicit permission before sending founder data to external models or connected services.
- Log operational events without unnecessarily logging sensitive business content.
- Require founder approval for spending, publication, external communication and other consequential actions.
- Preserve evidence provenance and distinguish source facts from generated analysis.

**Known security blocker:** the imported project includes a demo-account setup Edge Function described as having JWT verification disabled and privileged Supabase administrative operations. Review, redesign or remove it before public production use. Do not expose a service-role secret or allow unauthenticated callers to delete/recreate accounts. Rotate credentials if exposure is suspected. The demo sign-in flow also requires abuse and access-control review.

## Roadmap and maturity

| Phase | Outcome | Status |
|---|---|---|
| 0. Imported baseline | Four-stage Business Idea Analyzer | Present in imported source; local build/test verification still required |
| 1. Product foundation | Requirements, research register, architecture, ADRs and security review | Documentation in progress; security blocker outstanding |
| 2. Founder workspace | Business profile, evidence register, assumption ledger and decision log | Planned |
| 3. Knowledge foundation | Rights-cleared ingestion, verified OKF, DWH and catalogue | Proposed; not implemented |
| 4. Learning and reasoning | Retrieval, reflective dialogue, spaced recall and applied assessment | Research-informed hypothesis; not implemented end to end |
| 5. Execution loop | Experiments, roadmap, metrics and recurring strategy reviews | Planned |
| 6. Interoperability and service | Permissioned agent adapters and optional managed STaaS delivery | Exploratory |

See [ARCHITECTURE-AND-TRL.md](docs/ARCHITECTURE-AND-TRL.md) for component-level provisional TRLs and evidence gates. Do not represent the integrated product at the highest TRL of any individual component.

## Success measures to validate

- time from idea submission to a founder-approved next action;
- proportion of key assumptions with recorded validation evidence;
- experiment completion and learning capture;
- decision quality and calibrated confidence;
- comprehension of relevant business concepts;
- usefulness of retrieved cases and quality of contextual comparisons;
- milestone progress and review completion;
- successful data export, deletion and permission revocation.

Set numerical targets only after baseline research and user pilots. Do not claim improved revenue, funding, survival or venture success without suitable evidence.

## Development

Install dependencies and run the Vite development server:

~~~bash
npm install
npm run dev
~~~

Available scripts:

~~~bash
npm run dev       # Start Vite development server
npm run build     # Create production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run typecheck # Run TypeScript checks
~~~

Configure the Supabase project URL and public anon key using the variable names referenced in src/lib/supabase.ts. Keep local secrets in an ignored .env file and configure deployment secrets through the hosting platform. Never commit service-role keys. Apply and verify migrations in a non-production Supabase project before production.

## Research and evidence

The [research register](RESEARCH.md) documents model-training literature, data-source leads, evidence on reflective LLM dialogue, evaluation design, open problems and limitations. It distinguishes published findings from STaaS hypotheses and engineering observations.

Important limits:

- A 3,000–5,000-example pilot is an experiment for a narrow task, not a proven threshold for business reasoning.
- A reported local tokens-per-second result is not evidence of reasoning quality.
- Dataset record counts are not unique business counts or training-example counts.
- Public availability does not automatically grant commercial reuse or model-training rights.
- Belief-revision studies do not validate entrepreneurship education or outcomes for African founders.
- No OKF conformance claim is justified until the canonical specification, version and round-trip tests are verified.

## Manifesto

> **Don't start from scratch. Start from what has already been learned, test what applies, and build what comes next.**

A founder should not have to rediscover every lesson independently. STaaS aims to make knowledge discoverable, contextual and actionable while respecting the limits of analogy and evidence.

We do not simply generate business plans. We aim to help founders build the mental models to understand, challenge, validate and evolve their businesses.

This is an independent product direction. References to public research, frameworks and organisations are not endorsements, partnerships or claims of affiliation.

## Contributing

Keep implementation claims aligned with the code. For substantial changes, update requirements, architecture, threat/data-flow notes, tests and the research register together. Mark proposed capabilities as proposed until code and validation evidence demonstrate otherwise.

## Licence

No licence is specified yet. A public repository is not automatically open source. Confirm ownership and reuse terms before adding a licence.
