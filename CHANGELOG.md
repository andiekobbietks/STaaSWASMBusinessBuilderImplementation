# Changelog

## [Unreleased]

- Add an authenticated Founder Workspace vertical slice with append-only JSONB snapshots, owner-scoped RLS and a save RPC.
- Add venture context, assumptions linked to evidence, source-rights metadata, strategic options, decisions, experiments, outcomes and progressive learning prompts.
- Add an integer-pence contribution-margin calculator and OKF v0.3 ZIP export for founder records.
- Add Supabase deployment runbook and ADR-0013; live migration/RLS verification remains outstanding.
- Add an Apache-2.0-scoped STaaS Foundation subtree implementing an initial business-strategy profile over canonical OKF v0.3.
- Add a synthetic founder journey, profile JSON Schema, profile validator, deterministic contribution-margin example and tests.
- Keep the root rights notice in force for the rest of the repository; explicitly carve out foundation/.


All notable changes are documented here. This project follows Semantic
Versioning 2.0.0. Until 1.0.0, the public interfaces and product behaviour may
change without backwards compatibility.

## [0.1.0-alpha.1] - 2026-11-27

Initial governance prerelease designation for the existing prototype.

- Establishes package identity and prerelease version.
- Records initial upstream MIT provenance and third-party notice.
- Adds IP/provenance and security registers.
- Adds CI and tagged-release workflows, SemVer release checks, release artefact provenance, checksums, contributor policy, issue forms and release-readiness checklist.
- Retires the unsafe Supabase demo-provisioning endpoint on `main` and the AI workspace feature branch; requires JWT verification and returns HTTP 410.
- Disables unauthenticated feature-branch chat inference with HTTP 503.
- Removes the hard-coded demo-login shortcut from the authentication screen and adds CI/release guards against reintroducing demo credentials and flags.
- Refreshes dependency manifests and lockfiles; CI reports zero npm audit vulnerabilities.
- Does not represent production readiness, legal clearance, or a completed
  security remediation.
