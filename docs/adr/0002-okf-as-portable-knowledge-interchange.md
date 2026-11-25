# ADR-0002: OKF as portable knowledge interchange

- **Status:** Proposed; confirm exact canonical OKF specification before acceptance
- **Date:** 2026-11-25

## Context

STaaS needs to preserve and exchange research findings, case studies, evidence and strategic records across its application and compatible agent tools. The user has an existing OKF project and reports repeated validation, but this repository update has not independently inspected the canonical schema, version, fixtures or conformance results.

## Decision

Use the user's OKF as the intended portable knowledge interchange layer, provided its authoritative specification supports stable identity, timestamps, provenance, versioning, validation and lossless exchange for the required records. Link the exact repository, schema version and test suite before claiming conformance. Do not invent an OKF schema in this product repository.

## Consequences

- OKF records remain distinct from chat transcripts, embeddings and DWH aggregates.
- Adapters must validate against the canonical schema and preserve unknown fields where the format requires it.
- Round-trip, compatibility and corruption tests are release gates.
- Until verified, OKF integration is a design dependency, not a completed feature.
