# Release and bundle policy

## Versioning

Use Semantic Versioning 2.0.0:

- MAJOR: incompatible public API or persisted-data changes.
- MINOR: backwards-compatible functionality.
- PATCH: backwards-compatible fixes.
- Pre-release identifiers (alpha, beta, rc) mark incomplete, unstable builds.

The current development marker is `0.1.0-alpha.1`. It is a prerelease
designation, not a claim of production readiness.

## Release procedure

1. Update package.json and package-lock.json together.
2. Update CHANGELOG.md with user-visible changes and known limitations.
3. Ensure CI passes on the exact commit.
4. Generate dependency SBOM and third-party licence inventory.
5. Review secrets, security findings, provenance and release permissions.
6. Create an annotated Git tag matching package.json, e.g. `v0.1.0-alpha.1`.
7. Push the tag. The tagged-release workflow builds and attaches source and
   application bundles.
8. Verify release assets, checksums, provenance and notes before announcing.

Never force-move or reuse a published version tag. Publish a new patch or
prerelease identifier instead.

## Bundles

Each tagged release should include:

- a source archive generated from the tagged commit;
- a production build archive;
- a dependency licence inventory;
- an SBOM where generation succeeds;
- SHA-256 checksums;
- release notes and known limitations.

The source archive preserves the release snapshot; Git branches and commit
history remain the canonical development record. Do not treat a ZIP bundle as
a substitute for Git history.

## Distribution status

The package is marked UNLICENSED and the repository-level rights notice
reserves rights in original material. Third-party components retain their own
licences. Do not distribute a bundle commercially until the provenance and
licence review is complete.
