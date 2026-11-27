# Release readiness checklist

**Current status:** no distributable release is approved. The repository's
`0.1.0-alpha.1` value is a development prerelease marker, not a statement of
production readiness or legal clearance.

Complete this checklist against the exact commit to be tagged. Record evidence
in the release PR or release notes. Do not set the Actions variable
`RELEASE_APPROVED=true` until every mandatory gate is satisfied.

## 1. Scope and version

- [ ] Release scope and supported use are stated.
- [ ] Version follows SemVer; pre-release identifiers are used while unstable.
- [ ] `package.json` and `package-lock.json` versions match.
- [ ] `CHANGELOG.md` describes changes, breaking changes and known limitations.
- [ ] README, architecture and TRL statements match implemented code.

## 2. Provenance and intellectual property

- [ ] File-level upstream comparison is complete for all shipped code.
- [ ] Each copied/adapted component has a source, commit, licence and attribution.
- [ ] Contributor permissions and ownership are documented.
- [ ] AI-assisted/generated material and applicable tool terms are reviewed.
- [ ] Fonts, icons, images, datasets, prompts, model weights and research extracts are cleared.
- [ ] No confidential or trade-secret material is included in a public release.
- [ ] The rights notice and third-party notices are accurate and included.
- [ ] Any patent-sensitive disclosure has been reviewed before publication.

## 3. Dependencies and supply chain

- [ ] Production and development dependency inventories are generated.
- [ ] Transitive dependency licences are reviewed, including unknown/restricted terms.
- [ ] SBOM is generated from the exact release commit.
- [ ] Dependency vulnerabilities are reviewed and accepted or remediated.
- [ ] Build actions and external tools are pinned/assessed for supply-chain risk.

## 4. Security, privacy and operations

- [ ] Secret scan covers relevant branches and history; findings are resolved.
- [ ] Dependency and static checks pass.
- [ ] Authentication, authorisation, RLS, CORS and rate limits are reviewed.
- [ ] No demo credentials or unsafe demo endpoints remain.
- [ ] Live deployment remediation is verified independently of source CI.
- [ ] Backup, restore, export and deletion behaviour is tested where applicable.
- [ ] Privacy/data-flow and retention statements are accurate.

## 5. Build and artefacts

- [ ] CI passes on the exact commit.
- [ ] Lint, typecheck and production build pass.
- [ ] Source archive corresponds to the annotated tag.
- [ ] Build archive is reproducible or its limitations are documented.
- [ ] SBOM, licence inventory, notices and changelog are attached.
- [ ] SHA-256 checksums verify.
- [ ] Release notes identify source commit and known limitations.

## 6. Publication

- [ ] Tag is annotated and matches the package version exactly.
- [ ] Tag points to a commit reachable from `main`.
- [ ] Release is marked prerelease when its SemVer version contains a prerelease identifier.
- [ ] Repository owner has reviewed the evidence and approved publication.
- [ ] `RELEASE_APPROVED=true` is set only for the approved release window.
- [ ] Published assets and checksums are checked after workflow completion.

## Current outstanding blockers

The IP/provenance register still records an incomplete tree-wide upstream
comparison, incomplete non-code asset review and pending contributor/AI
provenance review. The repository is public and forkable. These issues must be
resolved before describing a release as commercially cleared. A public
repository cannot be made confidential retroactively by changing visibility.
