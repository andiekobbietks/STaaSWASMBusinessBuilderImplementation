# Third-party notices for the STaaS Foundation subtree

## Open Knowledge Format

The STaaS profile is designed for the canonical Open Knowledge Format v0.3:

- Project: https://github.com/open-knowledge-format/open-knowledge-format
- Specification: SPEC.md
- Licence: Apache-2.0

The STaaS Foundation references the OKF specification but does not copy OKF source code into this initial subtree. OKF remains a separate upstream work and its licence does not grant rights to use upstream names or marks beyond ordinary identification.

## Development-only dependencies

The profile validator and tests use the pinned development dependencies in requirements-dev.txt:

- jsonschema 4.24.0
- ruamel.yaml 0.18.16

These are development/test dependencies, not runtime dependencies of the Business Builder. Verify their exact licence metadata and transitive dependency notices from the generated SBOM before publishing a stable Foundation release.

All future third-party code, assets, data or documentation added under this subtree must be recorded here with its source, version, licence and required notices.
