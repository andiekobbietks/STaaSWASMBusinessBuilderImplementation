# Contributing

## Current contribution policy

STaaS Business Builder is a proprietary, source-available research and prototype
repository. The repository is public, but public visibility does not grant a
general licence to reuse its original materials.

External code contributions are not currently accepted by default. Before
opening a pull request that adds code, documentation, designs, datasets, or
other creative material, obtain written approval from the repository owner.
A pull request alone does not transfer copyright or grant the project a
sufficient licence to redistribute the contribution.

Do not submit material unless you have the right to do so. Do not include
employer-owned work, confidential information, personal data, credentials,
third-party code without compatible permissions, or AI-generated material
whose applicable terms you have not checked.

## Development expectations for authorised contributors

- Work on a focused branch; do not commit directly to `main`.
- Explain the user problem, scope, implementation and known limitations.
- Keep working behaviour, proposed architecture and roadmap items clearly
  distinguished.
- Preserve upstream copyright and licence notices.
- Record provenance for copied, adapted, generated and externally sourced
  material in `docs/IP-AND-PROVENANCE-REGISTER.md`.
- Update tests, documentation and `CHANGELOG.md` where appropriate.
- Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`
  and `npm audit --audit-level=high` before requesting review.
- Never add secrets, generated credentials, local state or private customer
  data.

## Pull request review

A pull request must identify:

1. What changed and why.
2. The affected components and branches.
3. Tests and checks performed.
4. Third-party, data, model, media or AI-generated material introduced.
5. Security, privacy, compatibility and migration implications.
6. Whether the change affects a documented product claim or TRL statement.

Changes to licensing, provenance, security, workflows or release policy require
repository-owner review. Do not merge a change that has not passed required CI
checks.

## Licensing

The root `LICENSE` is a rights notice, not an open-source licence. Original
STaaS materials remain subject to the rights of their applicable owners.
Third-party material remains under its own licence. See
`THIRD_PARTY_NOTICES.md` and the IP/provenance register.

No contribution is accepted under an implied assignment or blanket licence.
Any permission needed to incorporate an external contribution must be agreed
in writing before merge.
