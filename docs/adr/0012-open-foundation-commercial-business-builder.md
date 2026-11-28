# ADR-0012: Open STaaS Foundation with a commercial Business Builder

- **Status:** Recommended direction; Apache-licensed profile alpha implemented in foundation/; dedicated repository and product integration deferred
- **Decision date:** 2026-11-28
- **Last reviewed:** 2026-11-28

## Context

STaaS aims to preserve the relationships between business context, evidence, assumptions, decisions, experiments and outcomes across models, tools and service providers. A portable foundation can reduce adoption friction and encourage integrations. A commercial Business Builder can provide a more complete founder experience, managed evidence operations, advanced workflows and accountable service delivery.

The current repository is public but has a proprietary root rights notice. It records an upstream MIT-licensed Python/Streamlit Business Builder origin, AI-assisted generation and incomplete provenance checks. The current main application is an early React/TypeScript deterministic idea analyser with Supabase authentication and report persistence. A retained AI-workspace branch contains a UI prototype, but its chat endpoint deliberately returns HTTP 503 and inference is disabled. Evidence ingestion, DWH, catalogue, durable strategic state, learning and agent integrations remain proposed.

The canonical Open Knowledge Format is now identified as [open-knowledge-format/open-knowledge-format](https://github.com/open-knowledge-format/open-knowledge-format), with a v0.3 specification and an Apache-2.0 repository licence. STaaS should build a business-strategy profile and integration layer over OKF rather than invent a competing knowledge format. AgentSON is a separate execution-event layer that may provide provenance links to OKF concepts.

A wholesale root Apache-2.0 change would still be premature and could misstate rights in inherited and third-party material.

## Decision

1. Adopt an **open STaaS Foundation plus commercial Business Builder and optional Strategy Service** as the target product and licensing architecture.
2. Use foundation/ as the initial, explicitly scoped Apache-2.0 alpha subtree. Extract it into a dedicated public Foundation repository after the full provenance, dependency and release gate. The Apache grant applies only to eligible original files in foundation/.
3. Base the portable knowledge layer on canonical OKF v0.3. Do not fork or redefine the OKF specification.
4. Define a versioned STaaS business-strategy profile for founder context, evidence, assumptions, options, decisions, experiments, learning and outcomes. Preserve unknown OKF extension keys and distinguish profile-specific semantics from base OKF semantics.
5. Keep AgentSON separate as the agent-execution trace layer. Implement and test a bridge before claiming that AgentSON traces are linked to or exportable as OKF knowledge concepts.
6. Keep the root rights notice in force for the rest of the repository, with an explicit scope exception for foundation/. Do not claim the entire repository is Apache-2.0.
7. Prefer a separate commercial application repository for unreleased implementation. The existing public repository remains a research/prototype record; moving it to private cannot undo prior public disclosure.
8. Make the Foundation independently useful. The initial alpha now contains the STaaS profile, profile schema, synthetic founder bundle, Python profile validator, deterministic contribution-margin example and tests. Base OKF validation, conformance fixtures, round-trip import/export, SDK/CLI and compatibility guidance remain to be completed.
9. Keep hosted operations, managed evidence acquisition, licensed datasets, advanced workflows, enterprise collaboration, operational governance and human delivery as candidate commercial differentiators, subject to customer validation.
10. Use an explicit inbound-equals-outbound contribution model for the Foundation, with DCO sign-off and provenance records. Do not assume that contributions can later be relicensed into proprietary code.
11. Treat the cascade effect as a hypothesis to measure: adoption may create integrations, feedback, credibility and demand for maintained services, but it also permits forks, competing hosted offerings and fragmentation.

## Foundation scope

The first release should not invent a new knowledge file format. The initial Apache-licensed alpha under foundation/ implements the first draft of a STaaS business-strategy profile over OKF v0.3, including:
- documented STaaS concept types and extension semantics;
- application identity mapping to path-based OKF concept IDs;
- provenance and transformation links;
- validation and round-trip preservation of unknown fields;
- synthetic founder-journey bundles;
- an AgentSON bridge only after its mapping and code are tested;
- deterministic Attested Computation examples for business calculations.

The profile must not claim base OKF conformance for STaaS-specific extensions unless the base format and profile are tested separately.

## Business Builder scope

The commercial product should use Foundation artefacts to guide a founder through discover, diagnose, learn, compare, decide, test, execute, measure and adapt. It should preserve founder agency and disagreement, separate facts from inference, and make evidence inspectable.

A spaced-repetition scheduler may support recall, but recall, conceptual understanding, transfer, evidence evaluation and real-world business outcomes must be evaluated separately. The product must not optimise for persuading the founder to accept model recommendations.

## Consequences

- Apache-2.0 maximises reuse and permits commercial forks; it does not require downstream modifications to be returned.
- The STaaS Foundation differentiates through its domain profile, integration quality, validation, examples and tooling rather than a competing file format.
- Differentiation in the commercial product must come from maintained data operations, workflow quality, product experience, trust, support and service rather than artificial restrictions in the Foundation.
- A separate repository boundary makes licensing clearer but introduces additional release, compatibility and maintenance work.
- The Foundation can be useful without the hosted product, improving credibility and adoption potential.
- The current Business Builder is not yet the full strategy-to-execution system described in the manifesto and requirements.
- Apache-2.0 currently applies only to the foundation/ alpha subtree. A stable Foundation release, extraction to a dedicated repository and any change to the licensing of the rest of this repository remain gated on file-level rights, upstream provenance, dependency and non-code asset inventories, contributor terms and legal review.

## Reconsideration triggers

Revisit the boundary if user research shows that the Foundation is not independently useful, if OKF changes in a way that makes the profile incompatible, if commercial differentiation requires a different architecture, or if legal review identifies rights that prevent the proposed release.
