# ADR-0012: Open STaaS Foundation with a commercial Business Builder

- **Status:** Recommended direction; implementation and licensing release deferred
- **Decision date:** 2026-11-28

## Context

STaaS aims to preserve the relationships between business context, evidence, assumptions, decisions, experiments and outcomes across models, tools and service providers. A portable foundation can reduce adoption friction and encourage integrations. A commercial Business Builder can provide a more complete founder experience, managed evidence operations, advanced workflows and accountable service delivery.

The current repository is public but has a proprietary root rights notice. It records an upstream MIT-licensed Python/Streamlit Business Builder origin, AI-assisted generation and incomplete provenance checks. The current main application is an early React/TypeScript deterministic idea analyser with Supabase authentication and report persistence. A retained AI-workspace branch contains a UI prototype, but its chat endpoint deliberately returns HTTP 503 and inference is disabled. Evidence ingestion, OKF interchange, DWH, catalogue, durable strategic state, learning and agent integrations remain proposed.

A wholesale root Apache-2.0 change would therefore be premature and could misstate rights in inherited and third-party material.

## Decision

1. Adopt an **open STaaS Foundation plus commercial Business Builder and optional Strategy Service** as the target product and licensing architecture.
2. Create a dedicated public Foundation repository after a complete provenance and licensing gate. Target Apache-2.0 for eligible original Foundation files.
3. Keep the existing repository's root rights notice unchanged until its scope and future disposition are deliberately reviewed. Do not claim the entire repository is Apache-2.0.
4. Prefer a separate commercial application repository for unreleased implementation. The existing public repository remains a research/prototype record; moving it to private cannot undo prior public disclosure.
5. Make the Foundation independently useful: versioned portable artefact contracts, provenance and transformation semantics, validation, conformance fixtures, examples, SDK/CLI and export/import.
6. Keep hosted operations, managed evidence acquisition, licensed datasets, advanced workflows, enterprise collaboration, operational governance and human delivery as candidate commercial differentiators, subject to customer validation.
7. Keep the Foundation vendor-neutral. It must not mandate a specific model, vector database, cloud provider, chat harness or hosting platform.
8. Preserve upstream MIT and all third-party notices for material that remains derived or included under those licences.
9. Use an explicit inbound-equals-outbound contribution model for the Foundation, with DCO sign-off and provenance records. Do not assume that contributions can later be relicensed into proprietary code.
10. Treat the cascade effect as a hypothesis to measure: adoption may create integrations, feedback, credibility and demand for maintained services, but it also permits forks, competing hosted offerings and fragmentation.

## Foundation scope

The first release should define and validate the portable records that connect:
- business context and goals;
- sources and evidence claims;
- assumptions and uncertainty;
- strategic options and decisions;
- experiments and success criteria;
- metrics and outcomes;
- transformations, corrections, supersession and provenance.

The exact schemas must be reconciled with the authoritative OKF specification before implementation. The Foundation must not claim OKF conformance without compatibility fixtures and tests.

## Business Builder scope

The commercial product should use Foundation artefacts to guide a founder through discover, diagnose, learn, compare, decide, test, execute, measure and adapt. It should preserve founder agency and disagreement, separate facts from inference, and make evidence inspectable.

A spaced-repetition scheduler may support recall, but recall, conceptual understanding, transfer, evidence evaluation and real-world business outcomes must be evaluated separately. The product must not optimise for persuading the founder to accept model recommendations.

## Consequences

- Apache-2.0 maximises reuse and permits commercial forks; it does not require downstream modifications to be returned.
- Differentiation must come from maintained data operations, workflow quality, product experience, trust, support and service rather than artificial restrictions in the Foundation.
- A separate repository boundary makes licensing clearer but introduces additional release, compatibility and maintenance work.
- The Foundation can be useful without the hosted product, improving credibility and adoption potential.
- The current Business Builder is not yet the full strategy-to-execution system described in the manifesto and requirements.
- No Apache release is authorised by this ADR. File-level rights, upstream provenance, dependency and non-code asset inventories, contributor terms and legal review remain release gates.

## Reconsideration triggers

Revisit the boundary if user research shows that the Foundation is not independently useful, if a compatible authoritative standard already covers the required contracts, if commercial differentiation requires a different architecture, or if legal review identifies rights that prevent the proposed release.
