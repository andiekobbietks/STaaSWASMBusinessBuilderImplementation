# STaaS open foundation and commercial Business Builder strategy

- **Status:** recommended product and licensing architecture; implementation not yet approved or shipped
- **Review date:** 28 November 2026
- **Scope:** STaaS Foundation, STaaS Business Builder and the optional Strategy as a Service delivery model
- **Important:** this is a technical and product strategy, not legal advice or a completed IP clearance.

## 1. Executive decision

Adopt an **open, provider-neutral STaaS Foundation with a commercially differentiated Business Builder and optional human-delivered Strategy Service**.

Do not relicense the current repository wholesale. The current root `LICENSE` is a proprietary rights notice, and the repository records inherited MIT-licensed Business Builder material, third-party dependencies, AI-assisted generation and unresolved provenance questions. A blanket root Apache-2.0 change would create an inaccurate or ambiguous licensing statement.

The preferred long-term boundary is:

1. **STaaS Foundation (new, dedicated public repository):** a cleanly scoped STaaS profile and integration layer over the canonical Open Knowledge Format (OKF) v0.3, plus business-domain examples, AgentSON interoperability, validation/conformance fixtures and export/import tooling. Target licence: Apache-2.0 for eligible original STaaS code, after file-level provenance and rights review. Do not fork or redefine OKF itself.
2. **STaaS Business Builder (commercial application):** founder experience, guided strategic workflows, advanced orchestration, managed evidence acquisition, proprietary operational tooling, commercial integrations and hosted capabilities. Keep commercially differentiated components in a separately governed repository. Reuse Apache-licensed Foundation components in compliance with their licence.
3. **STaaS Strategy Service (human-delivered service):** discovery, strategy reviews, implementation support, delivery coordination, measurement and handover under a separately scoped customer agreement.

This is more accurately described as an **open foundation plus commercial product and service** than as a conventional open-core application today. Revisit the label if a substantial part of the actual Business Builder application is later released as an open-source core.

## 2. Why this boundary fits STaaS

The durable value should not depend on trapping a founder's business context inside one model, vendor, chat history or proprietary database.

The Foundation should make it possible to represent, validate, exchange and preserve the artefacts that connect knowledge to action:

- business context and goals;
- source and evidence records;
- assumptions and uncertainty;
- strategic options and decisions;
- experiments and success criteria;
- measures, outcomes and reviews;
- transformations, revisions and provenance links.

The same structural principle can recur across different scales, but the mechanism and meaning must be specified separately at each scale. A source document, an extracted evidence claim, a founder assumption, a strategic decision and an observed outcome are not interchangeable records. Each transformation must preserve the relationship to its inputs and disclose what was added, removed, inferred or changed.

The Foundation should therefore make **continuity without sameness** operational: preserve identity, lineage and meaning across transformation without pretending that a transformed representation is identical to its source.

## 3. Current repository findings

The audit of the current default branch and the retained AI-workspace branch establishes the following:

| Area | Verified position | Consequence |
|---|---|---|
| Root licence | Proprietary rights notice, not an OSI-approved open-source licence | Do not describe the whole repository as open source or replace the root licence without a scope decision |
| Upstream origin | `JeffvonD-coder/business-builder` is recorded as the MIT-licensed Python/Streamlit origin | Preserve the upstream MIT notice wherever inherited code or substantial portions remain |
| Source comparison | Existing register reports low literal-line overlap for selected file pairs, but explicitly says the comparison is targeted | It is not a complete semantic, historical, asset or ownership clearance |
| Main application | React/TypeScript/Vite; deterministic four-stage browser analysis; Supabase authentication and report persistence | Current working product is an early idea-analyser, not the complete STaaS platform |
| Analysis logic | `src/lib/analysis.ts` uses keyword/context heuristics and deterministic text generation | Do not market current outputs as verified market research or model reasoning |
| AI workspace branch | Contains a chat-oriented UI and AI SDK packages, but `api/chat.ts` deliberately returns HTTP 503 and the UI disables inference | The workspace is not a working AI agent or live research system; keep it out of shipped claims until implemented and tested |
| Roadmap architecture | Evidence ingestion, a STaaS profile over OKF, DWH, catalogue, persistent strategic state, learning loop and agent integrations are documented as proposed | Build these as explicit increments with acceptance evidence |
| Dependencies | Main and feature branches have different dependency graphs | Generate separate complete SBOM and licence inventories for every release branch |
| Historical exposure | The migration runbook records prior `.bolt/` content in historical commits | Current-tree checks do not erase or clear historical disclosure; review history and rotate any exposed credentials |
| Contributor terms | External contributions currently require written approval; no blanket assignment or contribution licence is in place | Establish an explicit contribution policy before inviting public Foundation contributions |
| Repository visibility | Current repository is public and forkable | A proprietary notice does not make published code confidential or prevent forks |

This is a repository-level review of the inspected trees and files, not a complete legal opinion, full commit-history audit, dependency clearance, or freedom-to-operate analysis.

## 4. Licensing architecture

### 4.1 Foundation: Apache License 2.0

Apache-2.0 is the recommended target for the new Foundation because it supports broad reuse, including commercial use, while providing express copyright and patent licence terms and conditions for redistribution, attribution and NOTICE handling.

The licence must be applied only to files for which the project has the rights to grant it. Do not include upstream MIT-derived code, third-party assets, datasets, model weights or contributed material under a blanket Foundation licence without checking the relevant licence and provenance.

A dedicated repository is preferred over putting a nested Apache package inside the existing repository. It gives contributors, users, package managers and automated licence scanners a much clearer boundary.

Before the first public Apache release:

- complete file-level provenance and ownership review;
- identify all copied, adapted, generated and third-party materials;
- preserve required upstream and third-party notices;
- create a complete dependency SBOM and licence inventory;
- confirm that examples and test fixtures contain synthetic or appropriately licensed data;
- include the full Apache-2.0 text and a Foundation-specific NOTICE file;
- add SPDX identifiers and copyright notices to new Foundation files where appropriate;
- document the exact directory/package scope covered by Apache-2.0;
- obtain legal review for any uncertain ownership, patent or contributor questions.

Apache-2.0 does not require downstream modifications to be contributed back. A company can fork, modify and commercially host the Foundation. That is an intentional trade-off for adoption and interoperability, not a defect to conceal.

### 4.2 Business Builder: commercial differentiation

The commercial application may depend on Apache-licensed Foundation packages while retaining its own independently authored application code, hosted service, proprietary datasets, connectors and operational workflows under commercial terms.

Candidate differentiated capabilities include:

- managed, continuously maintained evidence acquisition and source-quality operations;
- curated and licensed company, sector, market and contextual case collections;
- advanced founder-specific analysis and longitudinal strategic-state workflows;
- multi-venture workspaces, adviser collaboration and role-based access;
- private or organisation-specific knowledge catalogues;
- managed deployments, tenancy, backups, retention and service-level commitments;
- advanced reporting, evaluation and governance dashboards;
- integrations and implementation support;
- human review and Strategy Service delivery.

These are candidate value propositions, not claims that they already exist or that customers will pay for them. Validate demand, delivery cost, support burden, data rights and gross margin before setting prices.

Do not attempt to make the free Foundation artificially incomplete. A user should be able to create, validate, export and reuse portable STaaS artefacts without buying the hosted product. Paid value should come from convenience, maintained infrastructure, trusted data operations, collaboration, advanced workflows and accountable service.

### 4.3 Existing repository and third-party components

Keep the current root rights notice in place until a deliberate repository split and complete rights review are approved. Its scope must not be represented as covering third-party materials whose rights belong elsewhere.

The existing upstream MIT notice must remain with any inherited MIT material. MIT and Apache-2.0 are both permissive, but their notices and terms are not interchangeable. A file-by-file boundary is required; do not simply replace MIT attribution with an STaaS copyright header.

Do not claim exclusive ownership of ideas, frameworks, facts, public datasets, upstream code, third-party models or material whose ownership has not been established. Copyright protects original expression, not an abstract product idea or method by itself.

### 4.4 Contributions and future relicensing

For the Foundation, prefer a clear inbound-equals-outbound model: contributions accepted for the Foundation are made available under Apache-2.0, with a Developer Certificate of Origin (DCO) sign-off and documented provenance.

Do not promise that Foundation contributions can later be relicensed into a proprietary product. Apache-2.0 does not give the maintainer ownership of contributors' copyright. If future dual licensing is desired, obtain explicit, separately documented rights from every relevant contributor before accepting contributions on that basis. A DCO is not a copyright assignment.

Keep the commercial application repository closed to unsolicited code contributions unless a suitable contributor agreement and review process are in place.

## 5. Existing standards and the STaaS Foundation

### 5.1 OKF is the knowledge format; STaaS must not reinvent it

The canonical Open Knowledge Format repository is:

- **Canonical repository:** https://github.com/open-knowledge-format/open-knowledge-format
- **Specification:** `SPEC.md`
- **Version inspected:** 0.3
- **Licence:** Apache-2.0
- **Review date:** 28 November 2026

The earlier `GoogleCloudPlatform/knowledge-catalog` repository and its `okf/` directory are deprecated/frozen snapshots. The intermediate `GoogleCloudPlatform/open-knowledge-format` repository also directs readers to the current canonical repository. Do not build new STaaS integrations against those frozen copies.

OKF v0.3 defines a vendor-neutral knowledge bundle: a directory of Markdown concept documents with YAML frontmatter, optional `index.md` and `log.md`, directory hierarchy and Markdown links. It deliberately has no schema registry, central authority, required runtime or prescribed storage/query infrastructure. It refers to domain-specific schemas rather than replacing them.

The base format provides:
- a required `type` field and optional `title`, `description`, `resource` and `tags`;
- source provenance through `sources`, with per-claim Markdown footnote attribution;
- producer identity and time through `generated`;
- verification events through `verified`, from which consumers derive unverified, machine-confirmed or human-reviewed trust tiers;
- lifecycle metadata such as `status`, `stale_after` and supersession;
- bundle-level metadata including `okf_version`, title, description and content licence;
- graph relationships through Markdown links and path-valued fields;
- `Attested Computation` concepts with declared runtime, parameters, executor receipts and deterministic attesters.

OKF's concept ID is the bundle-relative file path without `.md`. It is not a globally assigned immutable UUID. If STaaS needs stable identity across renames, it must define and test that behaviour in a separate STaaS profile or maintain an explicit identity mapping. Do not claim that base OKF supplies a stronger identity guarantee than it does.

**Decision for STaaS:** use OKF v0.3 as the portable knowledge-bundle envelope. Do not design a competing Markdown/YAML interchange format or duplicate OKF's provenance, trust, lifecycle, link or attestation semantics.

### 5.2 STaaS business-strategy profile

STaaS should define a small, separately versioned profile that explains how to represent business-strategy knowledge using OKF concepts. Candidate `type` values include:

- `Business Context`
- `Customer Segment`
- `Market Observation`
- `Evidence Claim`
- `Assumption`
- `Strategic Option`
- `Decision`
- `Experiment`
- `Metric`
- `Outcome`
- `Learning Concept`

These are STaaS profile conventions, not types registered by OKF. The profile must define:
- required and optional STaaS-specific metadata;
- how a concept links to sources, claims, assumptions, decisions and outcomes;
- how facts, attributed claims, founder assertions, model interpretations and hypotheses are distinguished;
- how application-level stable IDs map to path-based OKF concept IDs;
- how corrections, supersession and history are represented without silently overwriting prior decisions;
- how unknown OKF extension keys are preserved during import/export;
- version compatibility and migration behaviour.

Keep the profile minimal. Prefer standard OKF fields and body structure where they are sufficient. Use extension keys only when a STaaS-specific requirement cannot be represented cleanly through the base format. Keep domain-specific validation schemas separate and link to them as resources where appropriate.

Not every transactional row or analytical fact needs to become a Markdown concept. The application database remains responsible for transactional state and access control. The DWH remains responsible for analytical integration and source-grain historical facts. OKF bundles provide a portable, human-readable knowledge and context layer. Catalogue and vector indexes remain rebuildable discovery projections.

### 5.3 Relationship to AgentSON

OKF and AgentSON solve different problems and should remain separate:

| Layer | Primary question | Representation |
|---|---|---|
| OKF | What knowledge was captured, what does it mean, where did it come from, and how current/verified is it? | Markdown knowledge bundle with YAML frontmatter |
| AgentSON | What did the agent/tool do, observe, hand off or change over time? | Typed NDJSON execution-event stream |

AgentSON's `spec/okf-digest.md` and architect skill describe a bridge in which an adapter reads OKF bundles and an exporter writes OKF concepts from AgentSON traces. The inspected AgentSON tree did not contain the named `okf_adapter.py` and `okf_export.py` modules, so treat that bridge as a proposed integration until the implementation is located, tested and version-pinned.

The intended relationship is complementary: AgentSON can provide execution provenance for the process that produced or transformed a knowledge concept; OKF carries the resulting knowledge artefact. A future bridge must preserve trace IDs, concept paths, timestamps, actors, source references and transformation relationships without pretending that a trace is itself the knowledge document. Any extra OKF frontmatter used for AgentSON linkage must be explicitly documented as a STaaS profile extension, not described as a base OKF field.

### 5.4 Attested business computations

OKF v0.3's Attested Computation concept is particularly relevant to the Business Builder. Use it as the contract for calculations that should be reproducible and inspectable, such as:
- gross margin and contribution margin;
- unit economics and customer acquisition cost;
- recurring revenue scenarios;
- break-even and cash runway calculations;
- sensitivity analysis and pricing scenarios.

The model may explain a calculation or propose parameter values, but it must not author or silently replace the sanctioned formula. The computation should have typed parameters, a declared runtime, an execution receipt and a deterministic attester. The UI should label the result as attested only when the attester succeeds. A hash alone does not establish that the formula is correct or the input data is true.

### 5.5 STaaS Foundation release scope

The Foundation should add value around OKF, not reproduce it. Its first release should contain:

- a versioned STaaS business-strategy profile for OKF v0.3;
- synthetic sample bundles for founder journeys;
- TypeScript utilities to read/write the STaaS profile while preserving unknown OKF fields;
- validators and conformance fixtures for the STaaS profile;
- import/export and round-trip tests;
- an optional AgentSON bridge only after the trace-to-knowledge mapping is implemented and tested;
- documentation, compatibility policy and migration guidance.

Reuse the canonical OKF specification and tooling under its Apache-2.0 terms where appropriate. Preserve required upstream notices for any code or assets reused. Do not copy upstream implementation code into the Foundation merely to create a new project identity.

## 6. How the Business Builder should learn from the Foundation

The Business Builder should turn the Foundation's records into a founder-facing learning and execution cycle.

### 6.1 Founder journey

| Stage | Product behaviour | Durable artefact |
|---|---|---|
| Discover | Elicit the founder's goals, customer, constraints and context | Business context |
| Diagnose | Separate known facts, assumptions, gaps and risks | Evidence register and assumption ledger |
| Learn | Explain relevant concepts with examples, counterexamples and context | Learning objectives and progress |
| Compare | Retrieve comparable cases and explain important differences | Evidence-backed options |
| Decide | Present trade-offs and invite the founder to choose | Decision record |
| Test | Convert the riskiest assumptions into bounded experiments | Experiment and success criteria |
| Execute | Turn approved experiments into tasks and milestones | Roadmap and delivery records |
| Review | Compare outcomes with intended results | Outcome and review records |
| Adapt | Preserve what changed, why and what remains uncertain | New decision and linked history |

The product must not optimise for persuading the founder to agree with the model. A founder may accept, revise, defer or reject a recommendation. Preserve disagreement and its rationale.

### 6.2 Learning is more than generated explanations

Use a progressive learning sequence:

1. **Orient:** explain the relevant concept and why it matters to this decision.
2. **Model:** show a worked example with the assumptions visible.
3. **Contrast:** compare a counterexample or a case where the concept does not transfer.
4. **Retrieve:** ask the founder to recall the concept without simply repeating the explanation.
5. **Apply:** ask them to use it in their own venture context.
6. **Reflect:** record what changed in their understanding and confidence.
7. **Revisit:** schedule later retrieval and application based on learning needs.

Measure separately:
- recall of a concept;
- conceptual understanding;
- ability to apply it to a new case;
- quality of evidence evaluation;
- calibration of confidence;
- quality and follow-through of a business experiment.

A spaced-repetition scheduler can help schedule recall, but recall scores are not a proxy for strategic competence or business success. Learning effectiveness remains a hypothesis until evaluated with users.

### 6.3 Evidence-led dialogue

For consequential strategic questions, the system should:

- elicit the founder's current view and confidence;
- retrieve relevant, dated and permissioned evidence;
- show comparability limits and counterexamples;
- separate facts, attributed claims, inference and recommendation;
- state what is not known;
- invite the founder to challenge, retain or revise the view;
- record the decision without silently rewriting prior history.

Do not treat an LLM response as a source. Use models for explanation, synthesis and question generation; use retrieval for source material; use deterministic code for calculations, schema checks and permissions; use human expertise where required.

## 7. Commercial product boundary

| Capability | Foundation | Business Builder / service |
|---|---|---|
| Portable schemas and semantics | Open | Consume and extend without breaking compatibility |
| Provenance and transformation contract | Open | Managed source acquisition, verification operations and richer review workflows |
| Local validation and export/import | Open | Hosted storage, backup, collaboration and managed portability |
| Basic reference examples | Open | Curated/licensed case collections and continuously maintained data |
| Basic CLI/SDK | Open | Advanced user experience, multi-venture workspace and workflow orchestration |
| Interoperability interfaces | Open | Managed connectors, enterprise identity and integration operations |
| Core artefact history | Open contract | Hosted retention, audit operations, recovery and governance controls |
| Learning data model | Open contract | Personalised learning paths, expert content and evaluated coaching workflows |
| Documentation and conformance tests | Open | Support, implementation, training and assurance |

The commercial product must remain exportable. A customer should be able to leave the hosted service with their own portable records, subject to source-content licences, privacy rights and lawful retention requirements.

## 8. Technical build sequence

### Phase 0 — Rights and product boundary

- Finish the branch and historical disclosure review.
- Complete upstream file-level provenance review.
- Inventory dependency, font, icon, image, dataset, model and generated-asset licences.
- Resolve ownership and AI-assisted generation terms.
- Decide the public Foundation repository and private application repository owners.
- Record the approved licensing boundary before publishing code under Apache-2.0.

**Gate:** no file enters the Apache Foundation until its provenance and licensing basis are recorded.

### Phase 1 — Foundation specification

- Pin canonical OKF v0.3 and add a compatibility policy for future upstream versions; preserve the upstream Apache-2.0 notice for any reused tooling.
- Define the STaaS business-strategy profile over OKF v0.3; do not create a competing file format.
- Define path-based concept identity, application ID mapping, lineage, correction, supersession and transformation semantics.
- Define source-rights metadata and fact/inference distinctions using base OKF fields first and documented extension keys only where necessary.
- Define the AgentSON trace-to-OKF relationship as a separate adapter contract.
- Publish examples and conformance fixtures.

**Gate:** an independent developer can validate and exchange a sample founder journey without using STaaS hosting.

### Phase 2 — Foundation reference implementation

- Implement TypeScript types and JSON Schema validation.
- Implement CLI validation and portable export/import.
- Add round-trip, malformed-input, compatibility and provenance tests.
- Publish Apache-2.0 only after the legal/provenance gate.
- Add contribution governance, DCO and security reporting.

**Gate:** reproducible tests pass and a clean installation can validate, export and re-import the sample records.

### Phase 3 — Business Builder MVP

Build in the existing React/TypeScript direction unless user testing or technical evidence justifies a migration.

Prioritise:
1. business profile and context capture;
2. assumption ledger and evidence register;
3. source-linked analysis with clear evidence status;
4. decision log and strategic options;
5. experiment planner with measurable success criteria;
6. simple roadmap and review;
7. complete user-controlled export and deletion.

Do not add a large navigation surface before the underlying workflows work. Build one complete founder journey end-to-end.

**Gate:** a founder can move from an idea to a documented assumption, evidence-backed decision, test and review without losing history.

### Phase 4 — Intelligence and learning

- Add source connectors only after rights, scope, rate limits and failure behaviour are specified.
- Add retrieval over permissioned, provenance-aware records.
- Add model-assisted explanations and evidence synthesis behind server-side authorisation.
- Use deterministic calculations and schema validation.
- Add contextual examples and counterexamples.
- Pilot recall and application assessments separately.
- Benchmark model-alone, fixed-evidence and evidence-enabled workflows with held-out cases.

**Gate:** controlled evaluation demonstrates measurable improvement on a defined task; no unsupported claim of general strategic intelligence.

### Phase 5 — Commercial operations and service

- Validate willingness to pay and delivery effort.
- Add organisation/adviser collaboration, managed data and integrations where demanded.
- Define tenancy, support, backup, recovery, privacy, retention and incident response.
- Offer scoped human strategy support with clear accountability and customer exit.
- Publish pricing only after cost and customer discovery.

**Gate:** unit economics, support obligations, customer control and service boundaries are documented.

## 9. Evaluation and product metrics

Avoid vanity metrics such as token count, number of generated pages or user agreement with recommendations.

Pilot measures should include:

- time from initial idea to first testable assumption;
- proportion of high-impact assumptions with adequate evidence;
- proportion of recommendations with inspectable source support;
- founder ability to explain the rationale for a selected decision;
- experiment completion and quality of recorded outcomes;
- number and quality of evidence-led strategy revisions;
- recall and transfer scores reported separately;
- user-reported usefulness, trust, autonomy and accessibility;
- export completeness and successful re-import;
- operational cost and human review effort per completed journey.

Use consent-based pilots and suitable comparison methods. Do not infer that better documentation necessarily caused better revenue or survival.

## 10. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Competitors commercially fork Apache code | Accept as the adoption trade-off; differentiate through execution, trusted data operations, product quality, brand, support and service |
| Foundation becomes a hollow specification | Ship a working validator, CLI, examples and round-trip tests |
| Open and proprietary code boundaries become ambiguous | Use separate repositories and explicit component-level licences |
| Upstream or AI-generated provenance is unclear | Keep affected files out of the Apache release until reviewed |
| Source content is ingested without reuse rights | Track access and redistribution rights separately; link to sources where copying is not permitted |
| Models produce confident but unsupported advice | Evidence links, uncertainty, deterministic checks, human approval and evaluation |
| Founder context becomes vendor-locked | Portable records, documented schemas, complete export and tested re-import |
| Learning becomes persuasion or dependency | Preserve disagreement, measure competence and agency, and allow users to leave with their records |
| Scope expands before value is proven | Deliver one end-to-end founder journey and gate each phase on user evidence |

## 11. Open questions and decision gates

1. Which STaaS business concepts need profile-level extension metadata beyond the base OKF v0.3 fields?
2. What compatibility policy should the Foundation adopt when canonical OKF releases a new version, and which old bundle versions must remain readable?
3. Should the first Foundation release be TypeScript-first, with language-neutral schemas as the normative contract?
4. Which business cases and datasets can be redistributed, which can only be indexed, and which require commercial licences?
5. Which founder segment will participate in the first pilot, and what decision task will be evaluated?
6. What evidence would demonstrate that the learning workflow improves transfer and decision quality rather than merely producing more polished plans?
7. What is the smallest paid service that customers will buy, and what human delivery capacity does it require?

## 12. Release and claims policy

Until the relevant gates are passed:

- call the current application an early prototype or idea analyser;
- call the AI workspace branch a UI prototype with inference disabled;
- describe evidence acquisition, persistent strategic state, learning and managed workflows as proposed where they are not implemented;
- do not claim OKF conformance without fixtures and compatibility tests;
- do not claim immutability, incorruptibility, authenticity or forgery resistance based solely on hashes;
- do not claim educational effectiveness, better business outcomes or market validation without suitable evidence;
- do not publish an Apache-2.0 licence for the existing repository as a whole.

**Strategic principle:** make the portable foundation freely useful, and build the business around making strategic learning dependable, contextual, continuously maintained and operationally useful.
