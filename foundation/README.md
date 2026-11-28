# STaaS Foundation

**Status: Alpha profile**

The STaaS Foundation is the open, provider-neutral layer for portable business-strategy knowledge. This initial subtree defines a STaaS business-strategy profile over canonical Open Knowledge Format (OKF) v0.3. It does not fork or redefine OKF.

## Scope

- OKF v0.3 is the underlying knowledge-bundle format.
- The STaaS profile defines how founder context, evidence, assumptions, decisions, experiments, metrics, outcomes and learning concepts are represented using OKF concepts.
- The JSON Schema validates STaaS profile frontmatter after a conforming YAML parser has read it. It does not replace the OKF v0.3 specification or validate Markdown link semantics.
- The example bundle is synthetic and exists to demonstrate relationships and progressive disclosure.
- The Business Builder application, hosted services, private datasets and managed operations are not part of this subtree.

## Canonical upstream

- OKF repository: https://github.com/open-knowledge-format/open-knowledge-format
- Specification: OKF v0.3, SPEC.md
- Upstream licence: Apache-2.0

Do not use the frozen OKF snapshots in the former GoogleCloudPlatform repositories for new integrations.

## Files

| Path | Purpose |
|---|---|
| PROFILE.md | STaaS profile semantics and learning workflow |
| schemas/staas-profile-0.1.schema.json | JSON Schema for parsed STaaS frontmatter |
| examples/founder-pilot/ | Synthetic end-to-end founder journey |
| LICENSE | Apache License 2.0 for this subtree |
| NOTICE | Scope and upstream attribution |

## Licence boundary

The Apache-2.0 licence in this directory applies only to original STaaS Foundation materials under foundation/. The repository root LICENSE explicitly excludes this subtree. All files elsewhere in the repository retain their existing applicable rights and third-party licences.

This is an initial profile alpha. Its profile-level validator and example tests pass in CI, but this is not a claim of canonical OKF base conformance or a stable release. Round-trip tests, compatibility tests and review remain outstanding.

Contributions currently follow the repository-root CONTRIBUTING.md policy and require prior written approval. A dedicated DCO-based contribution process will be established before the Foundation is extracted into its own repository.

## Development status

- [x] Identify canonical OKF v0.3 repository and licence.
- [x] Define initial STaaS concept types and metadata conventions.
- [x] Add a synthetic founder-journey bundle.
- [ ] Implement a validator that checks OKF v0.3 and the STaaS profile separately.
- [ ] Test unknown-field preservation and import/export round trips.
- [ ] Add AgentSON bridge with trace-to-concept linkage tests.
- [ ] Extract this subtree into a dedicated repository after the repository-level provenance and release review.
