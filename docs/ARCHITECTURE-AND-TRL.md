# Architecture and Technology Readiness Assessment

- **Status:** proposed architecture and provisional assessment.
- **Assessment date:** 25 November 2026.
- **Scope:** STaaS Business Builder, OKF knowledge interchange, business-intelligence DWH/catalogue and model-assisted workflows.

## 1. System boundary

STaaS is the founder-facing strategy-to-execution product. The Bolt.new-generated React/TypeScript/Vite application is the current prototype. The intended system extends it with persistent founder state, research and evidence ingestion, an OKF interchange layer, a DWH, a knowledge catalogue, retrieval, model orchestration and controlled workflows.

### Logical architecture

~~~text
┌──────────────────────────────────────────────────────────────────┐
│ FOUNDER EXPERIENCE: analyzer · learning · cases · strategy       │
└───────────────────────────────┬──────────────────────────────────┘
                                │
┌───────────────────────────────▼──────────────────────────────────┐
│ PLATFORM-OWNED FOUNDER STATE: goals · assumptions · evidence      │
│ decisions · experiments · metrics · outcomes · consent            │
└───────────────────────────────┬──────────────────────────────────┘
                                │
┌───────────────────────────────▼──────────────────────────────────┐
│ REASONING / WORKFLOW: retrieval · model · deterministic checks    │
│ permissions · human approval · audit                              │
└───────────────┬─────────────────────────────┬────────────────────┘
                │                             │
┌───────────────▼────────────────┐  ┌─────────▼────────────────────┐
│ CATALOGUE & RETRIEVAL           │  │ LEARNING & EVALUATION       │
│ cases · frameworks · evidence  │  │ recall · scenarios · skill  │
└───────────────┬────────────────┘  └──────────────────────────────┘
                │
┌───────────────▼──────────────────────────────────────────────────┐
│ SOURCES → rights → OCR/parsing → entity/event validation          │
│              → OKF interchange → DWH → search projections         │
└───────────────────────────────┬──────────────────────────────────┘
                                │
┌───────────────────────────────▼──────────────────────────────────┐
│ Public records · surveys · research · cases · founder uploads     │
└──────────────────────────────────────────────────────────────────┘

Cross-cutting: provenance · licensing · privacy · security · portability
~~~

The current application implements only the analyzer and Supabase report/authentication path. The remaining layers are target architecture, not existing deployed services.

1. **Experience layer:** current React/Vite application; future Next.js migration is an option, not an existing fact. Vercel AI SDK is a candidate orchestration library, not currently present in package.json.
2. **Founder state:** goals, stage, constraints, capabilities, preferences and consented context.
3. **Evidence ingestion:** source acquisition, OCR/document parsing, extraction, entity resolution, validation, licensing and provenance.
4. **OKF layer:** canonical portable knowledge artefacts with stable IDs, timestamps, source references, versions and validation metadata. Exact schema contract must reference the authoritative OKF repository/specification; do not invent fields or claim conformance until tested.
5. **DWH:** governed analytical store for dimensions/facts such as company, geography, sector, time, funding events, acquisitions, operating conditions, outcomes and provenance. Preserve source-grain records and avoid destructive aggregation.
6. **Catalogue/retrieval:** browse/search business cases, frameworks, reports and founder evidence; keyword and vector indexes are rebuildable projections.
7. **Reasoning/orchestration:** model plus retrieval, deterministic calculations, explicit workflow/state transitions, tool permissions and human approval.
8. **Learning:** retrieval practice inspired by FSRS/Anki, separately measuring recall and applied competence.
9. **Agent interoperability:** MCP or other adapters expose approved read/write operations to compatible harnesses such as OpenCode. Provider-specific thought signatures are not the system's durable memory.
10. **Operations/infrastructure:** deployment, observability, backup, access control, incident response and portability. AKCloud may provide infrastructure enablement; it cannot guarantee third-party startup credits.

## 2. OKF, DWH and catalogue responsibilities

| Component | Canonical responsibility | Must not be confused with |
|---|---|---|
| OKF | Portable, versioned, provenance-aware knowledge exchange artefacts. | Chat transcripts, embeddings or a particular model's hidden reasoning state. |
| DWH | Analytical integration and historical querying over harmonised records. | The authoritative source document or portable interchange format. |
| Catalogue | Discovery and navigation across cases, datasets, frameworks and founder records. | A licence to copy source content or a guarantee that a search result is true. |
| Vector index | Similarity retrieval projection, rebuildable from governed source records. | Canonical knowledge or evidence provenance. |

## 3. Proposed end-to-end data flow

Source register and rights review → fetch/import → immutable source capture where permitted → OCR/parsing → entity and event resolution → validation and human review → OKF records → DWH ingestion → catalogue and search projections → retrieval → model/workflow → founder-approved decisions and actions → timestamped outcome/evidence updates.

Every item should retain source URL/identifier, publisher, publication/event date, retrieval date, licence/terms, extraction method/version, confidence, validation status and links to the original where lawful. Distinguish facts, attributed claims, founder assertions, model-generated interpretations and unresolved hypotheses.

## 4. Persistent strategic state

The application—not the model provider—owns durable state. Initial domains:

- founder and business profile;
- market and industry context;
- knowledge and learning progress;
- evidence and provenance;
- strategy, assumptions and decisions;
- execution, experiments, metrics and outcomes.

Conversation history is an interaction record. Embeddings are retrieval aids. Provider thought signatures are provider-specific protocol artefacts. None substitutes for the platform's canonical state.

## 5. Model adaptation pipeline

Base model selection → baseline evaluation → licensed data curation → expert-reviewed task/example generation → SFT (LoRA/QLoRA) → optional DPO with preference pairs → experimental RL only with verifiable rewards → regression and held-out evaluation → quantisation/runtime benchmarking.

RAG remains the source of current market facts and case evidence. Deterministic code handles arithmetic, schema validation, permissions and workflow constraints. Humans approve consequential business decisions, spending and external actions.

A 3,000–5,000-example pilot is a proposed experiment for narrow task adaptation, not a proven threshold or an equivalent to Phi pretraining. Phi-3 and Phi-4 reports concern much larger training programmes and carefully controlled data recipes.

## 6. Conversational workspace, AI SDK and MCP Apps

### 6.1 Role of the Vercel AI SDK

The Vercel AI SDK is a candidate application-layer toolkit for a future STaaS conversational workspace. Its Core APIs provide model-provider abstraction, streaming generation, structured outputs, tool calling and agent/tool-loop patterns. AI SDK UI provides React-oriented chat state and streaming UI primitives. Its MCP package provides clients for connecting to MCP servers and using their tools, resources and prompts.

The SDK does not replace the STaaS domain model, database, policy enforcement, identity, tenancy, audit, durable workflow engine or source governance. STaaS-owned business tools should generally be implemented as typed application tools where this gives the project stronger schema control, predictable behaviour and lower latency. MCP is useful for interoperable external capabilities and user-selected integrations.

### 6.2 MCP Apps and generative UI

MCP Apps extend an MCP tool with a UI resource, typically referenced using a `ui://` URI. A compatible host advertises the relevant client capability, retrieves the resource and renders the returned interface in a sandboxed iframe. The UI communicates with its host through the MCP Apps bridge. The model-visible tool set and app-only tools must remain distinct.

The Vercel AI SDK documents an MCP Apps host pattern using `@ai-sdk/mcp` and `@ai-sdk/react`, including tool filtering, resource loading and an experimental React renderer. Because the renderer is documented as experimental, isolate it behind a host adapter and pin/test versions before production adoption.

STaaS should distinguish:
- **Native generative UI:** first-party React components selected/rendered by STaaS for structured results.
- **MCP Apps UI:** a third-party or STaaS MCP server's portable UI resource rendered by a compatible host.
- **ChatGPT Apps extensions:** optional ChatGPT-specific host capabilities. They are not required for MCP Apps interoperability and must not be treated as portable dependencies.

### 6.3 Logical interaction flow

~~~text
FOUNDER / ADVISER
       |
       v
STaaS CHAT UI (React)
  streaming · typed message parts · native components
       |
       v
SERVER-SIDE AI SDK ORCHESTRATION
  provider selection · model request · tool loop
       |
       +-------------------+--------------------+
       |                   |                    |
       v                   v                    v
STaaS DOMAIN TOOLS     MCP CLIENTS          KNOWLEDGE SERVICES
typed schemas          scoped connectors   catalogue · retrieval
calculations           OAuth / transport   evidence · DWH
       |                   |                    |
       +-------------------+--------------------+
                           |
                           v
                  POLICY / VALIDATION LAYER
             identity · tenancy · schema · audit
             rate limits · approval · idempotency
                           |
              +------------+-------------+
              |                          |
              v                          v
       STRUCTURED RESULT           APPROVAL REQUIRED
              |                          |
              v                          v
       NATIVE REACT UI             FOUNDER CONFIRMS
       OR MCP APP IFRAME                 |
              |                          v
              +----------------> EXECUTE ALLOWED ACTION
                                         |
                                         v
                             AUDIT + STATE + OUTCOME
~~~

### 6.4 Tool classes and approval policy

| Tool class | Examples | Default policy |
|---|---|---|
| Read-only STaaS | Retrieve evidence, inspect founder-owned plans, query approved metrics | Authenticated, tenant-scoped access |
| Deterministic analysis | Unit economics, scoring, scenario arithmetic, schema checks | Server-side validation and reproducible outputs |
| External read | Search an approved provider, fetch a permitted document or CRM record | Connector allowlist, OAuth scopes and rate limits |
| Reversible write | Create a draft task or update a staged plan | Show intended change; user confirmation according to risk |
| Consequential write | Send a message, publish content, change billing, spend money, sign/submit or delete records | Explicit, contextual confirmation immediately before execution |
| Long-running workflow | Research collection, report generation, multi-step validation | Durable job state, progress, cancellation, retries and audit |

Tool descriptions and model instructions are not security controls. Every call must be independently authorised by the server. A model request to perform an action is not user consent.

### 6.5 Multimodal support

The AI SDK can pass supported content to compatible providers, but modality support depends on the selected model, provider adapter, transport and UI. STaaS should not promise universal image, audio, video or document understanding. Define a capability matrix per provider/model and test file-size limits, accepted formats, extraction quality, retention, cost and privacy before enabling a modality.

### 6.6 Operational and security requirements

- Server-side provider credentials; never ship privileged secrets to the browser.
- Per-user and per-venture authorisation for every tool call and resource.
- Explicit MCP server allowlist and connector registration/revocation.
- Least-privilege OAuth scopes and secure token storage/refresh.
- Schema validation, output-size limits, timeouts, rate limits and circuit breakers.
- Prompt-injection treatment for retrieved content and tool results; external content is data, never trusted instruction.
- Sandboxed MCP App rendering and a constrained host bridge; no ambient credentials or unrestricted browser access.
- Human confirmation for consequential writes, with clear preview of target, fields and impact.
- Idempotency keys, correlation IDs, retries and cancellation for long-running workflows.
- Audit events and redaction policies; avoid storing secrets or unnecessary sensitive tool arguments.
- Text/structured fallback if an interactive app cannot render.
- Export, connector revocation, deletion and provider exit procedures.

### 6.7 Adoption sequence

1. Verify the existing app framework and package manifest; do not assume a Next.js migration is necessary.
2. Introduce a server-side AI SDK proof of concept for streaming text and typed message parts, with no external tools.
3. Add one or two first-party, read-only STaaS tools with schemas and server-side authorisation.
4. Add structured outputs and first-party React generative UI for an evidence card, parameter scorecard and comparison view.
5. Connect one test MCP server using a restricted identity and read-only tools.
6. Prototype an MCP Apps host using the documented Vercel integration; assess the experimental renderer, sandbox and fallback.
7. Add explicit approval workflows and audit events before enabling any write-capable connector.
8. Evaluate provider switching, multimodal input and long-running workflows only against validated user needs.

No production capability should be marked implemented until its acceptance tests and security controls pass.

## 7. Provisional TRL assessment

TRL is assessed per component. These are conservative planning estimates using a NASA/EU-style 1–9 interpretation; they are not certification and must be updated with test artefacts.

| Component | Provisional TRL | Evidence currently available | Evidence needed to advance |
|---|---:|---|---|
| Bolt/Vite idea-analyser prototype | 3–4 | Imported runnable application source and documented four-stage deterministic flow; no build/test run recorded in this work. | Reproducible build, test suite, user validation and deployed operational evidence. |
| Supabase auth/report persistence | 3 | Source and migrations described in repository docs; security and RLS require verification. | Automated isolation tests, migration verification, threat model and security review. |
| STaaS product/operating model | 2–3 | Defined workflow, requirements and manifesto; no validated service outcomes or commercial model. | Founder interviews, pilots, measured outcomes and repeatable delivery evidence. |
| OKF interchange layer | 2–3 (provisional) | Prior project discussion and user-reported repeated validation; canonical specification and test artefacts not inspected in this repository update. | Link exact OKF repo/spec/version, fixtures, schema validation, round-trip/losslessness tests, compatibility matrix and independent consumer test. |
 | DWH and catalogue | 2 | Architecture and data-source leads identified; no verified integrated warehouse/catalogue in this repository. | Implemented ingestion, lineage, deduplication, quality checks, query tests and production-like dataset. |
| Business research/ingestion pipeline | 2 | Candidate sources and methods identified; licensing and data-quality checks outstanding. | Rights-cleared sample ingestion, provenance audit, extraction evaluation and repeatable refresh. |
| Domain-adapted language model | 1–2 | Research supports a plausible recipe; no STaaS fine-tuned model or benchmark reported. | Reproducible training run, model card, held-out evaluation and baseline comparison. |
| Persistent strategic state and learning engine | 2 | Architecture defined; no implemented end-to-end state lifecycle evidenced. | Schema, migrations, consent/deletion, event history, retrieval/application assessment and user pilot. |
| MCP/OpenCode integration | 1–2 | Integration concept described; no verified adapter or interoperability test in this repository. | Working MCP server/client test, permissions, read/write audit and harness compatibility. |\n| AI SDK chat / MCP Apps host | 1–2 (proposed) | Candidate SDK and documented MCP Apps host pattern identified; not present as an implemented integration in the current prototype. | Streaming chat proof of concept, typed tool tests, MCP auth, sandbox review, approval/audit tests and compatible-host interoperability. |
| AKCloud founder infrastructure enablement | 2–3 (concept) | Service proposition discussed; no verified STaaS-to-cloud-credit workflow or partner outcome. | Documented eligibility process, founder consent, tested deployment patterns and measured support outcomes. |

**Overall product maturity must not be represented as the highest component TRL.** The integrated STaaS product remains an early prototype/concept until the core workflow is implemented and tested end to end.

## 8. Validation gates

- **Gate A — Baseline:** reproduce build, lint, typecheck, auth, RLS and current analyzer tests.
- **Gate B — Knowledge integrity:** validate OKF schema, round-trip fidelity, provenance, versioning and export/import.
- **Gate C — Data governance:** rights register, deduplication, entity resolution, lineage, retention and deletion tests.
- **Gate D — Intelligence:** benchmark retrieval and model outputs against held-out business cases; score citations, factuality, numerical accuracy, calibration and transferability.
- **Gate E — Founder workflow:** pilot discovery-to-experiment-to-review with consented founders; measure usefulness and decision/action outcomes.
- **Gate F — Operations:** security assessment, backup/restore, observability, incident process and provider exit tests.

## 9. Explicit non-claims

- No claim that STaaS currently performs live market intelligence or maintains a DWH/catalogue.
- No claim that Phi-level reasoning can be reproduced with a small number of fine-tuning examples.
- No claim that an OpenVINO tokens/second benchmark proves business reasoning quality.
- No claim of OKF conformance until the exact specification and conformance tests are linked and passed.
- No claim that AKCloud can secure Google Cloud credits; it may help founders prepare and apply, while Google decides eligibility and awards.
- No claim that generated strategy guarantees revenue, funding or business success.
