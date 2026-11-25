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

## 6. Provisional TRL assessment

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
| MCP/OpenCode integration | 1–2 | Integration concept described; no verified adapter or interoperability test in this repository. | Working MCP server/client test, permissions, read/write audit and harness compatibility. |
| AKCloud founder infrastructure enablement | 2–3 (concept) | Service proposition discussed; no verified STaaS-to-cloud-credit workflow or partner outcome. | Documented eligibility process, founder consent, tested deployment patterns and measured support outcomes. |

**Overall product maturity must not be represented as the highest component TRL.** The integrated STaaS product remains an early prototype/concept until the core workflow is implemented and tested end to end.

## 7. Validation gates

- **Gate A — Baseline:** reproduce build, lint, typecheck, auth, RLS and current analyzer tests.
- **Gate B — Knowledge integrity:** validate OKF schema, round-trip fidelity, provenance, versioning and export/import.
- **Gate C — Data governance:** rights register, deduplication, entity resolution, lineage, retention and deletion tests.
- **Gate D — Intelligence:** benchmark retrieval and model outputs against held-out business cases; score citations, factuality, numerical accuracy, calibration and transferability.
- **Gate E — Founder workflow:** pilot discovery-to-experiment-to-review with consented founders; measure usefulness and decision/action outcomes.
- **Gate F — Operations:** security assessment, backup/restore, observability, incident process and provider exit tests.

## 8. Explicit non-claims

- No claim that STaaS currently performs live market intelligence or maintains a DWH/catalogue.
- No claim that Phi-level reasoning can be reproduced with a small number of fine-tuning examples.
- No claim that an OpenVINO tokens/second benchmark proves business reasoning quality.
- No claim of OKF conformance until the exact specification and conformance tests are linked and passed.
- No claim that AKCloud can secure Google Cloud credits; it may help founders prepare and apply, while Google decides eligibility and awards.
- No claim that generated strategy guarantees revenue, funding or business success.
