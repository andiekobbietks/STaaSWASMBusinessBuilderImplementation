# Release and bundle policy

## Release status

The project is currently an early prototype. `0.1.0-alpha.1` is the current
development prerelease marker. It is not a published release, production
readiness claim, legal clearance or permission to commercially redistribute
the source.

The npm package is deliberately marked `private: true` and `UNLICENSED`.
Do not publish it to npm. GitHub source releases are a separate distribution
mechanism and remain blocked until the rights, provenance and security gates
are completed.

## Versioning

Follow Semantic Versioning 2.0.0:

- MAJOR: incompatible public API or persisted-data changes.
- MINOR: backwards-compatible functionality.
- PATCH: backwards-compatible fixes.
- Pre-release identifiers (alpha, beta, rc) mark incomplete, unstable builds.

Increment the prerelease number for successive alpha builds, e.g.
`0.1.0-alpha.1`, `0.1.0-alpha.2`, then `0.1.0-beta.1`. Do not label the
prototype `1.0.0` until its public contract and operational support are
stable.

## Release procedure

1. Open a release-preparation PR against `main`.
2. Update `package.json` and `package-lock.json` together.
3. Update `CHANGELOG.md` and `docs/RELEASE-CHECKLIST.md`.
4. Ensure CI passes on the exact commit that will be tagged.
5. Complete provenance, dependency, non-code asset, security, privacy and
   deployment review using `docs/RELEASE-CHECKLIST.md`.
6. Confirm the release commit is on `main`; do not tag an unreviewed feature
   branch.
7. Create an annotated tag matching the package version, e.g.
   `git tag -a v0.1.0-alpha.1 -m "STaaS Business Builder v0.1.0-alpha.1"`.
8. Push the tag. The tagged-release workflow checks the tag, approval variable,
   main ancestry, tests, audit and secret scan before publishing.
9. Verify the GitHub release, source/build archives, notices, SBOM, licence
   inventory, provenance metadata and checksums.
10. Announce only what the shipped code actually implements; identify known
    limitations and the source commit.

Never force-move or reuse a published version tag. Publish a new version
instead. Do not set `RELEASE_APPROVED=true` until every mandatory checklist
item has evidence and the repository owner has explicitly approved publication.

## Release contents

Each approved tagged release includes:

- source archive generated from the annotated tag;
- production build archive;
- root rights notice and third-party notices;
- changelog and release policy;
- production dependency licence inventory;
- CycloneDX SBOM;
- build provenance metadata identifying tag, commit and workflow run;
- SHA-256 checksums for all release assets.

The source archive is a snapshot. Git branches and commit history remain the
canonical development record.

## Licensing and distribution

The root `LICENSE` is a proprietary rights notice, not an open-source licence.
The package is `UNLICENSED`; no general reuse permission is granted for
original STaaS material. Third-party components retain their own licences and
notices. The third-party register is currently a starting point, not completed
legal clearance.

Do not commercially distribute a release until all rights and licence checks
are complete. Public visibility does not grant a licence and cannot be undone
for material already disclosed.
