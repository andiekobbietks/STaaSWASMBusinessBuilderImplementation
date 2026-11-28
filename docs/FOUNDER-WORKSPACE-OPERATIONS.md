# Founder Workspace operations

**Status:** MVP implementation; live database deployment and security verification remain outstanding.

## What this adds

The authenticated application now has a Founder Workspace route with:
- venture context;
- assumptions with impact, uncertainty, subjective confidence and evidence links;
- evidence claims with source attribution, access basis, redistribution status and review metadata;
- strategic options and founder-owned decisions;
- experiments with predeclared success/failure criteria and lifecycle status;
- learning concepts using Orient, Model, Contrast, Retrieve, Apply, Reflect and Revisit;
- experiment outcomes;
- a deterministic contribution-margin calculator using integer pence;
- versioned saves and OKF v0.3 ZIP export.

The application makes no AI inference calls in this workflow. It does not acquire market evidence or fabricate business metrics.

## Database migration

Migration:

- supabase/migrations/20261128230000_create_founder_workspaces.sql

It creates:

- public.founder_workspaces
- public.founder_workspace_versions
- public.save_founder_workspace_version(uuid, jsonb)

The parent workspace is owner-scoped through Supabase Auth RLS. Snapshot versions are append-only for normal authenticated clients. The RPC locks the workspace row, checks auth.uid() ownership, validates the JSON object and appends the next version. The RPC is SECURITY DEFINER with a fixed search_path and an explicit owner check. Authenticated users have no direct INSERT, UPDATE or DELETE privilege on the version table.

The application can rename and delete an owned workspace. Deleting a workspace cascades to its stored versions.

### Deployment steps

1. Confirm the intended Supabase project and take a recoverable backup.
2. Link the local Supabase CLI to that project using the project's normal secure credentials.
3. Review the migration SQL and confirm it is the intended target.
4. Apply pending migrations with the Supabase CLI.
5. Inspect both tables and confirm RLS is enabled.
6. Inspect the policies and function privileges in the Supabase dashboard or SQL editor. Confirm staas_private is not listed under API > Exposed schemas, and confirm the public RPC is SECURITY INVOKER while the private implementation is SECURITY DEFINER.
7. Test with two separate authenticated users:
   - User A can create, read, save, rename and delete A's workspace.
   - User B cannot read, save, rename or delete A's workspace or its snapshots.
   - An unauthenticated request cannot access either table or invoke the save RPC.
8. Test two concurrent saves to the same workspace and confirm version numbers remain unique and sequential.
9. Test deletion and confirm snapshots are removed through the parent cascade.

**This change has not applied the migration to a live Supabase project.** The schema, RLS and RPC therefore remain unverified against a deployed database.

## Snapshot model and its limits

The MVP stores each full workspace revision as JSONB. This is deliberate for the first vertical slice: it preserves a coherent founder workspace state and allows append-only versioning without prematurely normalising every concept.

It is not the final analytical data model. Individual concepts are not yet independently queryable relational rows. Before production analytics, multi-user collaboration or high-volume use, evaluate normalised concept tables and source-grain analytical projections. Do not turn the JSONB snapshot into a substitute for a DWH.

The current UI shows the latest version number but does not yet provide a full version-history browser, diff or restore workflow. Ordinary edits to a saved snapshot create a new version; they do not overwrite earlier versions.

## OKF export

The application exports an OKF v0.3 ZIP containing:
- root index.md;
- Business Context;
- Assumption;
- Evidence Claim;
- Strategic Option;
- Decision;
- Experiment;
- Outcome;
- Learning Concept;
- optional Contribution Margin Metric.

The exporter preserves source URLs and per-source access/redistribution metadata. It does not copy source material and does not add a bundle-wide licence. A public URL is not treated as permission to redistribute the source.

The contribution-margin calculation is deterministic and uses integer pence in the application. The current application export contains a Metric definition and recorded inputs/results. A portable OKF Attested Computation with independently executable executor receipt and attester is not yet integrated into this application export.

The exported bundle has not yet been validated by the canonical OKF v0.3 validator, and import/round-trip support is not implemented.

## Data handling and production gates

- No private business data is placed in localStorage by the Founder Workspace.
- No service-role key is used in the browser.
- User-owned records are protected by RLS.
- Source content is not scraped or copied.
- Workspace deletion removes saved snapshots.
- The UI does not yet support individual record edit/delete, full version diff/restore, collaborative workspaces, billing or AI.
- The learning prompts are a structure for learning, not evidence that learning or transfer has occurred.
- The contribution-margin calculator currently accepts GBP inputs only.
- The UI can update venture context, experiment status and the contribution metric; most other concept records are append-only in the current UI. Individual record editing/deletion is deferred.

Before production use, complete live RLS tests, migration rollback/recovery rehearsal, schema validation on write, version-history UI, export validation and round-trip tests, accessibility review, threat modelling, backup/retention policy and privacy review.
