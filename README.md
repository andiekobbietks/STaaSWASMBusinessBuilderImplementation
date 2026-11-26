# STaaS Business Builder

> **Reduce the friction between having an idea and acting on it.**

STaaS means **Strategy as a Service**. This project explores a founder-centred workspace that helps people understand a business opportunity, challenge assumptions, learn from relevant evidence, choose a direction and turn that direction into measurable action.

The ambition is bigger than generating a business plan. STaaS should help founders build and continuously improve the mental models they use to make decisions. It connects business education, global company intelligence, founder-specific evidence, strategic frameworks and execution in one traceable workflow.

**Current status:** an early React/TypeScript/Vite prototype with a deterministic, browser-side four-stage business-idea analysis flow and Supabase-backed authentication/report persistence. The parameterised assessment framework, external evidence acquisition, OKF interchange, DWH, knowledge catalogue, persistent strategic state, learning loop and agent integrations are architectural or roadmap items unless explicitly marked as implemented. This repository distinguishes working code from proposed capabilities.

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

### The intended parameter-based business assessment

The four-stage flow is the presentation and workflow structure. The next analytical step is to make the underlying assessment parameter-driven: every business is examined against a consistent set of dimensions, while the depth and relevance of each dimension adapt to the venture's sector, stage, geography and business model.

| Assessment dimension | Questions the platform should investigate |
|---|---|
| Problem and need | Is the problem specific, consequential and evidenced? Who experiences it, and how is it addressed today? |
| Customer and segment | Who is the buyer, user and decision-maker? Which segment is reachable first? |
| Market and context | What is the addressable market, geography, demand context and timing? Which claims have reliable sources? |
| Value proposition | What measurable value is offered, to whom, and compared with which alternatives? |
| Competition and positioning | What direct, indirect and substitute solutions exist? What is genuinely differentiated? |
| Business and revenue model | How is value delivered and captured? Are pricing, purchasing behaviour and recurring revenue assumptions credible? |
| Financial viability | What are the cost drivers, gross margin, cash requirements, break-even assumptions and unit economics? |
| Operations and delivery | What people, partners, processes, supply chains and service capabilities are required? |
| Technology and data | What must be built or integrated? What data, infrastructure, security and maintenance requirements apply? |
| Regulation, rights and risk | Which legal, regulatory, privacy, IP, safety and contractual obligations need specialist review? |
| Feasibility and resources | What capabilities, funding, time and dependencies are available or missing? |
| Growth and resilience | What could constrain scale? How sensitive is the model to market, supplier, platform or funding changes? |

A parameter assessment should not collapse these dimensions into an unexplained pass/fail score. The intended record for each parameter is:

- **Assessment:** what the current information suggests.
- **Evidence:** source-linked facts, founder-provided information and relevant case comparisons.
- **Evidence quality:** provenance, date, rights, relevance and validation status.
- **Confidence:** how strongly the available evidence supports the assessment, with uncertainty stated.
- **Assumptions and gaps:** what is unknown, disputed or not yet tested.
- **Validation action:** the smallest useful research task or experiment to reduce uncertainty.
- **Strategic implication:** how the finding affects the founder's choices and priorities.

The assessment framework is a product design target, not a claim that the current heuristic engine already performs these checks. Until evidence ingestion and validation exist, the current prototype can structure an initial diagnostic but cannot substantiate market, financial, regulatory or competitive conclusions.

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

### Why browser-first, and why consider WebAssembly (WASM)?

The current prototype executes its deterministic TypeScript/JavaScript analysis in the browser. That is a deliberate low-friction starting point, but it is important not to overstate the implementation: **the current repository does not establish that the analysis engine is compiled to or running as a WebAssembly module.**

The browser-first direction is useful because it can provide:

- **Fast feedback:** deterministic analysis can run locally without a model-inference round trip.
- **Lower service dependency:** the basic diagnostic does not need a continuously available analysis API.
- **Cost control:** routine rule-based processing does not incur per-request hosted-model inference costs.
- **Data minimisation:** initial idea text can be processed in the browser before any optional persistence or external processing, subject to the actual application flow and user consent.
- **Portability:** a browser-delivered application can run across supported operating systems without a native desktop installation.

WASM is a potential next step where profiling shows a concrete benefit. It can provide a portable, sandboxed execution target for computationally intensive or reusable modules, and may allow selected components written in languages such as Rust to run in supported browsers. It is not automatically faster than JavaScript, does not itself provide offline persistence, and is not a substitute for application security, permissions, privacy controls or server-side authorisation.

The implementation decision should therefore be evidence-led: benchmark representative workloads, bundle size, startup time, memory use and browser compatibility before introducing WASM. Keep ordinary UI and workflow code in TypeScript unless a measured use case justifies a WASM module. Supabase remains a separate persistence/authentication dependency in the current prototype; browser-side execution does not mean all data stays on the device.

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

## Phased development approach

The phases are deliberately sequenced so that STaaS earns its intelligence claims through data quality, traceability and user validation. Each phase has an outcome and an evidence gate. Phases may overlap where useful, but later capabilities must not be presented as delivered before their gates are met.

| Phase | Focus | Intended deliverables | Exit evidence / status |
|---|---|---|---|
| 0. Prototype baseline | Establish the current application | React/TypeScript/Vite interface; Clarity → Niche → Action → Strategy flow; browser-side deterministic analysis; Supabase authentication and report history; PDF export | **Existing source baseline.** Reproducible build, lint, typecheck, RLS isolation and end-to-end tests still need to be run and recorded. |
| 1. Parameterised business diagnostic | Turn the four-stage flow into a transparent assessment model | Versioned parameter catalogue; sector/stage-aware applicability; structured assessments; explicit assumptions, evidence gaps, confidence and validation actions; explainable scoring only where justified | **Next product-engineering priority.** Unit tests for parameter coverage, deterministic outputs, edge cases and language handling; expert/founder review of assessment quality. |
| 2. Founder and venture workspace | Give each assessment context and continuity | Business profile; founder goals and constraints; evidence register; assumption ledger; decision log; consent and data controls; report versioning | User-scoped persistence, access-control tests, export/deletion tests and a usable founder workflow. |
| 3. Evidence acquisition and governance | Acquire information responsibly and make it inspectable | Source register; rights/licence and privacy review; source capture where lawful; document/table extraction; entity and event resolution; provenance; deduplication; validation and human review | Rights-cleared sample corpus, extraction-quality evaluation, lineage audit and repeatable refresh process. |
| 4. Knowledge foundation | Make evidence reusable across tools and analysis | Verified OKF interchange; governed DWH; knowledge catalogue; rebuildable keyword/vector retrieval projections | Canonical OKF schema/version linked and conformance tests passed; DWH lineage and quality checks; catalogue retrieval and export/import tests. |
| 5. Evidence-grounded reasoning and learning | Use evidence to challenge and improve founder understanding | Retrieval-augmented analysis; source-linked parameter assessments; comparable-case reasoning; counterexamples; reflective dialogue; spaced recall and applied scenarios | Held-out evaluation for factuality, citation quality, calibration, contextual transfer and learning outcomes; founder pilot. |
| 6. Strategy-to-execution loop | Turn decisions into measured work | Prioritised roadmap; experiments; owners; milestones; metrics; review cadence; outcome capture; strategy updates | Pilot evidence that founders complete experiments, record outcomes and make better-informed revisions; no unsupported business-success claims. |
| 7. Interoperability and managed STaaS | Make the platform portable and deliverable as a continuing service | Permissioned MCP/agent adapters; portable exports; operational controls; service onboarding, review and handover processes | Compatibility, security, backup/restore, provider-exit and service-delivery tests; repeatable customer outcomes. |

### How the phases fit together

~~~text
PHASE 0  Prototype
   ↓
PHASE 1  Parameterised diagnostic
   ↓
PHASE 2  Founder and venture context
   ↓
PHASE 3  Evidence acquisition + governance
   ↓
PHASE 4  OKF + DWH + knowledge catalogue
   ↓
PHASE 5  Evidence-grounded reasoning + learning
   ↓
PHASE 6  Strategy + experiments + measured outcomes
   ↓
PHASE 7  Interoperability + managed service
   ↺
New evidence and outcomes continuously update the founder's strategic state.
~~~

**Important sequencing principle:** do not use a language model to make an unsupported answer appear authoritative. First establish the assessment parameters, source rights, provenance, evidence quality and validation workflow. Then use retrieval and model-assisted reasoning to interpret that governed knowledge. Deterministic code should handle schemas, calculations, permissions and workflow rules; founders retain approval of consequential decisions.

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
