# ADR-0002: OKF as portable knowledge interchange

- **Status:** Accepted architectural direction; STaaS profile and conformance deferred
- **Decision date:** 2026-11-25
- **Last reviewed:** 2026-11-28

## Context

STaaS needs to preserve and exchange research findings, case studies, evidence and strategic knowledge across its application and compatible agent tools.

The canonical Open Knowledge Format project is now identified as [open-knowledge-format/open-knowledge-format](https://github.com/open-knowledge-format/open-knowledge-format). Its current specification is **OKF v0.3** in SPEC.md, and the repository declares **Apache-2.0**. The earlier GoogleCloudPlatform/knowledge-catalog and GoogleCloudPlatform/open-knowledge-format locations are deprecated/frozen snapshots and direct users to the canonical repository.

OKF v0.3 represents knowledge as Markdown concept documents with YAML frontmatter in a directory bundle. It includes provenance, generated/verified trust metadata, lifecycle, links, bundle metadata and Attested Computation contracts. It deliberately does not prescribe a runtime, schema registry, storage/query architecture or fixed domain taxonomy, and it does not replace domain-specific schemas.

The project also has AgentSON, a distinct typed event-stream format for agent execution. AgentSON's OKF digest describes a bridge, but the named adapter/export modules were not found in the inspected AgentSON tree; implementation status remains unverified.

## Decision

1. Adopt **OKF v0.3** as the portable knowledge-bundle envelope for STaaS.
2. Do not create a competing Markdown/YAML knowledge format or duplicate OKF's provenance, trust, lifecycle, linking or attestation semantics.
3. Define a separately versioned **STaaS business-strategy profile** over OKF, using descriptive type values and documented extension keys only where necessary.
4. Treat the OKF concept ID as the bundle-relative file path without the .md suffix. It is not a globally assigned immutable UUID. If the Business Builder requires stable identity across renames, define and test a STaaS profile-level ID mapping rather than attributing that guarantee to OKF.
5. Keep transactional founder state in the application database, source-grain analytical history in the DWH, and portable knowledge artefacts in OKF bundles. Catalogue and vector indexes are rebuildable projections.
6. Use OKF Attested Computation concepts for calculations that need reproducibility and deterministic verification. Models may explain or propose inputs, but must not silently rewrite sanctioned formulas.
7. Keep AgentSON as the execution/provenance event layer. A future adapter may connect AgentSON traces to OKF knowledge concepts, but do not conflate the formats or claim the bridge is implemented until code and tests are verified.
8. Pin the canonical OKF version and test against its published specification and fixtures. Preserve upstream Apache-2.0 notices for any reused code or assets.

## Consequences

- STaaS inherits a human-readable, agent-readable and version-controlled knowledge-bundle format rather than creating a new interchange standard.
- The STaaS Foundation's distinctive contribution becomes a business-strategy profile, integration tooling, examples, conformance tests and AgentSON interoperability, not a fork of OKF itself.
- OKF's minimalism means STaaS must define its own business semantics and validation profile without treating those extensions as part of the base standard.
- The DWH, application database, catalogue and OKF bundle remain separate layers with explicit import/export boundaries.
- An Attested Computation can make business calculations reproducible, but it does not prove that the underlying inputs or assumptions are true.
- AgentSON-to-OKF linkage remains a proposed integration until the adapter is located or implemented and round-trip tests pass.

## Acceptance gate for the STaaS profile

- [x] Identify the canonical OKF repository and specification.
- [x] Pin the inspected version (v0.3) and declared licence (Apache-2.0).
- [ ] Map STaaS business concepts to OKF concepts and extension keys.
- [ ] Define stable application ID to OKF path mapping.
- [ ] Pass base-format and STaaS-profile valid/invalid fixture tests.
- [ ] Pass round-trip tests while preserving unknown extension keys and source attribution.
- [ ] Verify AgentSON bridge implementation or implement it as a separately tested adapter.
- [ ] Document migration, version compatibility and loss behaviour.
