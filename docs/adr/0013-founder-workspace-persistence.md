# ADR-0013: Founder Workspace persistence and portable knowledge boundary

- **Status:** Accepted for MVP; not production approval
- **Date:** 28 November 2026
- **Decision owners:** STaaS project maintainers
- **Related:** ADR-0012 (Open Foundation and commercial Business Builder), Foundation Profile 0.1.0

## Context

The Business Builder needs to preserve founder context, assumptions, evidence, options, decisions, experiments, learning and outcomes across sessions. Consequential decisions must not be silently overwritten. The founder must also be able to export portable knowledge without making a database, cloud provider or vector index the canonical format.

At this stage, the product's actual usage volume, query patterns and collaboration requirements are not yet known. Prematurely normalising every concept into separate relational tables would increase migration and application complexity before the domain has been validated.

## Decision

For the first authenticated vertical slice:

1. Use owner-scoped PostgreSQL/Supabase workspace records.
2. Store each complete workspace revision as a JSONB snapshot in founder_workspace_versions.
3. Treat versions as append-only for ordinary authenticated clients. A dedicated RPC locks the parent workspace row, checks the caller's auth.uid() ownership and appends the next sequential version.
4. Apply Row Level Security to both tables. Do not expose service-role credentials to the browser. Do not grant authenticated clients direct update/delete privileges on version rows.
5. Allow workspace deletion to cascade to its snapshots.
6. Treat the database as transactional application state and OKF v0.3 bundles as the portable knowledge representation.
7. Keep DWH, catalogue, search and vector indexes as rebuildable projections if and when introduced. They are not sources of truth.
8. Keep AI inference outside this first slice. The user records evidence and makes decisions; the application provides structure and deterministic calculations.

## Alternatives considered

### Normalised concept tables

Separate tables for assumptions, evidence, decisions, experiments, metrics and learning would improve per-concept queries, constraints and analytics. It is deferred until real usage and query requirements are understood. This is a likely next architecture step, not rejected permanently.

### Event sourcing

An immutable domain event stream could provide richer causal history and replay. It adds complexity in event schema evolution, projection rebuilding and consistency. The MVP's append-only snapshots provide coarse-grained history without claiming to be event sourcing.

### Object storage as primary persistence

Object storage is useful for bundle archives and larger artefacts but is not selected as the transactional source of truth for this MVP.

## Consequences

### Positive

- A workspace can be saved and recovered as a coherent version.
- Consequential decisions are not overwritten by ordinary client updates.
- Ownership and access are enforced by database policies.
- The application can export a provider-neutral OKF bundle.
- The storage model can be replaced or projected into normalised tables later.

### Trade-offs and limits

- JSONB snapshots are less efficient for querying individual concepts.
- The current UI does not yet provide version diffs or restore.
- Full-snapshot writes can grow with workspace size.
- Concurrent saves must be serialised by the RPC.
- The migration and RLS policies have not yet been tested against a live Supabase project.
- This is not event sourcing, a DWH or a complete audit ledger.
- The current export is not yet validated by the canonical OKF validator and import/round-trip is outstanding.

## Security requirements

- The save function must remain SECURITY DEFINER only with fixed search_path and explicit auth.uid() ownership validation.
- Do not grant authenticated clients direct INSERT, UPDATE or DELETE privileges on founder_workspace_versions.
- Keep RLS enabled and test cross-user isolation with at least two independent accounts.
- Review function owner and grants when deploying the migration.
- A successful save proves only that the authenticated caller could append a snapshot; it does not prove the truth or quality of the information in that snapshot.

## Revisit triggers

Revisit this ADR before:
- enabling multi-user or organisation workspaces;
- introducing high-volume analytical queries;
- exposing API integrations or external agents;
- storing large attachments or source documents;
- promising production auditability or regulatory assurance;
- implementing event replay, DWH or cross-workspace analytics.
