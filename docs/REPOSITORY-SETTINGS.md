# GitHub repository settings runbook

This document records the recommended GitHub-side controls for the current
repository. These settings live in GitHub's repository administration layer;
they are not equivalent to files committed in Git.

## Current observed state

- Visibility: public.
- Default branch: `main`.
- Forking: enabled for this public repository.
- Published GitHub releases: none at the time this runbook was prepared.
- npm publication: disabled by `private: true` and `UNLICENSED` in
  `package.json`.

Public repositories are forkable. A public proprietary rights notice does not
make code confidential or technically prevent copying. If unreleased
implementation must be confidential, use a private repository and migrate
before publishing further sensitive details. A visibility change cannot undo
previous public disclosure, forks, downloads, caches or copies.

## Recommended repository settings

In **Settings → General**:

- Keep `main` as the default branch.
- Keep merge methods consistent; squash merge is a reasonable default for
  focused PR history.
- Do not rely on disabling forks while the repository remains public; public
  repositories are forkable.
- Do not enable automatic deletion of head branches if doing so would remove
  branches being retained as historical research/implementation records.

In **Settings → Rules → Rulesets** (or branch protection settings), create a
branch ruleset for `main`:

- Require a pull request before merging.
- Require the CI status check from `.github/workflows/ci.yml`.
- Require conversation resolution.
- Block force pushes and branch deletion.
- Require linear history if the chosen merge strategy supports it.
- Do not require a second reviewer when the repository has only one maintainer;
  instead, require the owner to review the diff and CI evidence before merge.
- Do not allow bypass except for a documented emergency.

Create a tag ruleset for `v*`:

- Restrict tag creation to the repository owner/maintainers.
- Block tag updates and deletion.
- Use annotated SemVer tags only.
- Do not reuse a published version number.

In **Settings → Code security and analysis**:

- Enable Dependabot alerts and security updates.
- Enable secret scanning and push protection where available.
- Enable private vulnerability reporting.
- Review code scanning results and dependency alerts before releases.

In **Settings → Actions → General**:

- Set default workflow permissions to read-only.
- Permit GitHub Actions to create releases only where required by the tagged
  release workflow.
- Keep third-party actions reviewed and updated.
- Do not store long-lived credentials in repository files; use narrowly scoped
  Actions secrets/environments only when required.

## Release control

The tagged release workflow additionally requires the repository variable
`RELEASE_APPROVED=true`. Leave it unset until the complete
`docs/RELEASE-CHECKLIST.md` is evidenced and approved. The variable is an
explicit owner-controlled gate, not a substitute for branch/tag rulesets,
legal review, or security testing.

## Private/public split

If STaaS is to remain publicly researchable while protecting commercial
implementation, use two repositories:

- Public research repository: manifesto, citations, non-confidential research,
  architecture summaries, ADRs with sensitive implementation details removed,
  interfaces and deliberately released examples.
- Private implementation repository: unreleased source, proprietary algorithms,
  deployment configuration, customer data, internal evaluation datasets and
  confidential operating procedures.

Do not move sensitive files into a new private repository and assume their
previous public Git history has disappeared. Review history and rotate any
exposed credentials separately. See
`PRIVATE-REPOSITORY-MIGRATION.md`.
