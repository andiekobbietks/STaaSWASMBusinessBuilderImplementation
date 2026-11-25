# ADR-0003: Separate DWH, catalogue and source artefacts

- **Status:** Accepted architectural direction
- **Date:** 2026-11-25

## Context

STaaS needs both reusable source-linked knowledge and analytical comparison across companies, events, markets and founder evidence. A single store or vector database cannot serve all of these responsibilities cleanly.

## Decision

Separate three roles: OKF/source artefacts preserve portable records and provenance; the DWH harmonises structured facts and dimensions for analytical queries; the catalogue provides discovery across datasets, cases, frameworks and founder records. Keyword/vector indexes are rebuildable projections of governed records.

## Consequences

- Define source grain, entity identity, event time and ingestion time.
- Preserve lineage from aggregate back to source record.
- Deduplication must not erase conflicting reports or historical changes.
- The DWH and catalogue are planned, not currently evidenced as implemented.
