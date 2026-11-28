# STaaS Business Strategy Profile

- **Profile version:** 0.1.0
- **Base format:** Open Knowledge Format (OKF) v0.3
- **Status:** Initial design; validation and interoperability tests pending
- **Licence:** Apache-2.0 within the foundation/ subtree

## 1. Purpose

This profile describes how a STaaS Business Builder represents founder knowledge using OKF concepts. It is not a new file format, a replacement for OKF, or a mandatory extension to every OKF bundle.

OKF remains the portable knowledge envelope: Markdown concept documents, YAML frontmatter, directory paths, links, source provenance, verification, lifecycle and (where applicable) attested computations.

The STaaS profile adds business-strategy semantics. It defines the vocabulary and metadata needed to distinguish business context, evidence, assumptions, decisions, experiments, metrics, outcomes and learning.

## 2. Conformance layers

A consumer must distinguish three independent checks:

1. **OKF v0.3 base conformance:** use the canonical OKF specification and validator. A non-reserved Markdown concept requires parseable YAML frontmatter and a non-empty string type. Optional metadata must not become a base-format rejection gate.
2. **STaaS profile conformance:** validate the STaaS-specific type vocabulary and x-staas metadata using the profile schema in schemas/.
3. **Evidence and business validity:** assess source quality, rights, comparability, calculations and founder decisions. Passing a schema does not make a claim true or a strategy sound.

A bundle can be valid OKF while not using the STaaS profile. A profile-valid concept can still contain weak or false evidence. Never collapse these states into one green tick.

## 3. Concept types

The following type values are conventions for STaaS bundles. OKF does not centrally register or reserve them.

| Type | Meaning | Typical relationships |
|---|---|---|
| Business Context | Venture, goals, stage, customer, offer and constraints | Links to segments, assumptions and decisions |
| Customer Segment | A bounded group with shared needs or behaviours | Links to evidence claims and options |
| Market Observation | A dated observation about a market, competitor or operating condition | Links to sources, segments and assumptions |
| Evidence Claim | A bounded, attributable statement supported by one or more sources | Supports or challenges assumptions and decisions |
| Assumption | A proposition whose truth is uncertain and relevant to a decision | Links to evidence and experiments |
| Strategic Option | A candidate course of action | Compared by a decision |
| Decision | A founder-owned choice among options | Links to rationale, evidence and review triggers |
| Experiment | A bounded test of an assumption or strategic hypothesis | Links to assumptions, metrics and outcomes |
| Metric | A defined measure with unit, scope and observation period | Links to outcomes and optional Attested Computation |
| Outcome | An observed result of an experiment or operating period | Links to metrics and subsequent decisions |
| Learning Concept | A concept the founder needs to understand and apply | Links to decisions, examples and retrieval prompts |

The base OKF type field is required. The profile does not make every other metadata field mandatory at the OKF layer.

## 4. Namespaced extension

STaaS-specific metadata is stored under one top-level x-staas mapping. This avoids collisions with current and future base OKF fields and makes the extension boundary visible.

Common fields:

| Field | Required | Meaning |
|---|---:|---|
| profile_version | Yes | STaaS profile version, currently 0.1.0 |
| id | Yes | Stable STaaS UUID for the logical concept, independent of its OKF path |
| record_version | Yes | Positive integer incremented when a new concept revision is written |
| confidence | No | Founder/reviewer subjective belief, explicitly not an OKF trust tier or a probability unless calibrated |
| impact | Contextual | Low, medium or high decision impact |
| uncertainty | Contextual | Low, medium or high uncertainty |
| claim_kind | Evidence Claim | observed_fact, source_claim, founder_assertion, model_inference or hypothesis |
| review_state | Evidence Claim | unreviewed, human_reviewed or disputed |
| decision_state | Decision | provisional, approved, deferred or rejected |
| selected_option_id | Decision | Stable STaaS id of the selected Strategic Option |
| execution_status | Experiment | planned, running, completed or cancelled |
| hypothesis | Experiment | Testable statement the experiment is intended to evaluate |
| method | Experiment | How the test will be run |
| success_criteria | Experiment | Observable conditions that count as success |
| failure_criteria | Experiment | Observable conditions that count as failure or disconfirmation |
| learning_steps | Learning Concept | Ordered learning sequence from the set defined in section 8 |
| unit | Metric | Unit of measurement, for example percent or GBP |
| scope | Metric | Measurement scope, for example per_sale or per_month |

The JSON Schema is permissive toward unknown keys. Consumers must preserve unknown OKF frontmatter and x-staas extension keys when reading and writing a bundle. A profile validator may warn about unsupported profile versions, but must not silently delete or rewrite fields.

### 4.1 Stable identity and revisions

OKF concept IDs are bundle-relative paths without the .md suffix. They are not globally assigned immutable UUIDs. STaaS uses x-staas.id as a stable logical identity and x-staas.record_version as a profile revision number.

A path rename must preserve x-staas.id. A new revision increments record_version. If a concept is retired in favour of another concept, use OKF's superseded_by lifecycle field where applicable and retain the old concept for traceability. Do not overwrite the historical decision rationale without recording a new revision.

The application database may use its own primary key. The export adapter must maintain an explicit mapping between the application ID, x-staas.id and the current OKF concept path.

## 5. Evidence, attribution and rights

Use OKF base fields first:

- sources records the material from which a concept derives.
- sources[].id provides a stable key for claim-level Markdown footnotes.
- generated records who or what produced the current content and when.
- verified records independent verification events.
- status and stale_after communicate lifecycle and freshness.
- Markdown links express relationships between concepts.

STaaS must distinguish:
- observed fact;
- claim made by a source;
- founder assertion;
- model interpretation;
- hypothesis awaiting a test.

A model response is not a source. A search result is not automatically reliable evidence. A source citation does not establish that the source is comparable to the founder's market.

For every source where reuse rights matter, the STaaS profile may add a namespaced x-staas mapping inside the relevant sources entry:

- access_basis: public, customer_provided, licensed, permissioned, synthetic or other;
- redistribution: permitted, prohibited or unknown;
- terms_uri: link to relevant terms where available;
- reviewed_at: time of the latest rights review.

Unknown rights must remain unknown. Do not infer redistribution permission from public accessibility. Do not copy source content into a bundle where linking and attribution are the permitted route.

## 6. Confidence is not trust

x-staas.confidence records a person's subjective belief about a claim or assumption. It must include:
- value between 0 and 1;
- actor;
- timestamp;
- scale set to subjective-belief.

This value is not:
- a source-quality score;
- an OKF trust tier;
- a calibrated probability unless an evaluation has demonstrated calibration;
- a substitute for sources or human verification.

OKF verified metadata remains the separate signal for machine-confirmed or human-reviewed content. The UI must show confidence and verification as different dimensions.

## 7. Decisions and experiments

A Decision records the founder's choice, not the model's preferred answer. The body should document:
- the decision question;
- options considered and links to option concepts;
- evidence for and against each material option;
- selected option and rationale;
- known trade-offs and unresolved uncertainty;
- owner and review trigger.

An Experiment must be bounded and falsifiable. It should state:
- the assumption or hypothesis being tested;
- method and target population;
- duration and resource limit;
- success and failure criteria defined before execution;
- observed result and limitations;
- what the founder learned and whether the decision changed.

A completed experiment that fails to support the hypothesis is still a valid learning outcome. Do not rewrite a failed test as success.

## 8. Learning workflow

A Learning Concept should support a progressive sequence:

1. **Orient:** state the learning objective and why it matters to the current decision.
2. **Model:** explain the concept with a worked example.
3. **Contrast:** provide a counterexample and identify where the concept does not transfer.
4. **Retrieve:** ask the founder to recall the concept without simply repeating the explanation.
5. **Apply:** ask the founder to use it in their own venture context.
6. **Reflect:** record what changed, what remains uncertain and what evidence would change their mind.
7. **Revisit:** schedule a later retrieval or application check.

The learning_steps extension records which stages are present in a concept. It does not prove learning occurred. Recall, conceptual understanding, transfer, evidence evaluation and business outcomes must be measured separately.

## 9. Metrics and attested computation

Use OKF type Metric for a metric definition and link it to an OKF Attested Computation when the calculation needs to be reproducible and independently checked.

Suitable first examples include:
- gross and contribution margin;
- unit economics;
- customer acquisition cost;
- recurring revenue;
- break-even and cash runway;
- pricing and sensitivity scenarios.

An Attested Computation must use the base OKF contract: runtime, typed parameters, computation, executor receipt and deterministic attester. The model may explain the calculation or suggest parameter values. It must not write or silently modify the sanctioned computation.

A successful attestation confirms that the prescribed computation was used against the supplied receipt. It does not prove that input data is true, that an assumption is reasonable, or that the business will succeed.

## 10. Storage and projection boundaries

- **Application database:** transactional state, authentication, permissions and current workspace operations.
- **OKF bundle:** portable, human-readable knowledge concepts and relationships.
- **DWH:** source-grain analytical records, dimensions, history and reproducible analytical queries.
- **Catalogue/search:** rebuildable discovery projections over governed records.
- **AgentSON:** temporal execution events showing what an agent or tool did.

Do not use OKF as a substitute for a transactional database or DWH. Do not use a vector index as the source of truth. Do not treat AgentSON traces as the knowledge concepts they may have produced.

## 11. Example bundle

See examples/founder-pilot/. It is a fictional scenario with synthetic evidence and illustrative calculations. It is not market research, customer data, financial advice or a validated business case.

## 12. Versioning and compatibility

- The STaaS profile version is independent of the base OKF version.
- Each bundle should declare okf_version in its root index.md.
- A consumer must preserve unknown OKF fields and x-staas keys on round-trip.
- A consumer must not rewrite untouched YAML values merely to normalize formatting.
- Profile migrations must be explicit, tested and reversible where practical.
- Base OKF conformance and STaaS profile conformance must be reported separately.
- Breaking profile changes require a major version increment; additive optional fields require a minor version increment; clarifications and compatible fixes require a patch version increment.

## 13. Non-goals

This profile does not:
- redefine OKF;
- prescribe an LLM, model provider, vector database, cloud provider or runtime;
- guarantee that source material is true or reusable;
- replace domain standards or financial/accounting advice;
- automate founder decisions without approval;
- claim that a hash alone proves authenticity, immutability or correctness;
- claim educational effectiveness or improved business outcomes without evaluation.
