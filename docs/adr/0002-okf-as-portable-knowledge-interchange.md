# ADR-0002: OKF as portable knowledge interchange

- **Status:** Deferred pending canonical specification verification
- **Decision date:** 2026-11-25
- **Last reviewed:** 2026-11-26

## Context

STaaS needs to preserve and exchange research findings, case studies, evidence and strategic records across its application and compatible agent tools. The project owner has an existing OKF project and reports repeated validation, but this repository review has not independently inspected the canonical specification, versioned schema, fixtures or conformance results.

## Decision

OKF remains the intended portable knowledge interchange candidate. It is **not yet adopted as a binding implementation contract** in this repository. Before acceptance, the decision owner must identify the authoritative project and specification, pin the exact schema/version, inspect its licence and verify that it supports stable identity, timestamps, provenance, versioning, validation and lossless exchange for the records STaaS needs.

Do not invent a replacement OKF schema in this repository or claim conformance based on the acronym or a compatible-looking JSON structure.

## Consequences

- Source artefacts, DWH aggregates, search indexes and conversation records remain separate concepts regardless of the final interchange format.
- If OKF is accepted, adapters must validate against the pinned canonical schema and preserve unknown fields where the specification requires it.
- Round-trip, compatibility, migration and corruption tests are required before production use.
- Until the acceptance gate is met, use explicitly versioned internal contracts behind an adapter boundary and label OKF integration as pending.
- Reconsider this ADR when the canonical specification, version, licence and conformance fixtures are available for review.

## Acceptance gate

- [ ] Link the authoritative OKF repository and specification.
- [ ] Pin the schema version and licence.
- [ ] Map required STaaS record types to the canonical schema.
- [ ] Pass valid/invalid fixture tests and round-trip tests.
- [ ] Document migration and unknown-field behaviour.
