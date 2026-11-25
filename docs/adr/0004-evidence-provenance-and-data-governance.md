# ADR-0004: Evidence provenance, rights and validation

- **Status:** Accepted principle
- **Date:** 2026-11-25

## Context

The product intends to use public reports, company filings, datasets, case studies, academic research and founder uploads. Public accessibility does not automatically grant commercial reuse or model-training rights. Reports may conflict, be outdated or contain claims rather than verified facts.

## Decision

Every ingested item must retain available source identity/URL, publisher, publication/event date, retrieval date, licence/terms, extraction method, version, geography, confidence and validation status. Represent source facts, attributed claims, founder assertions and model interpretations distinctly. Gate ingestion and training on rights review, privacy and data minimisation.

## Consequences

- Build a dataset register and rights review workflow.
- Preserve original documents only where permitted.
- Keep audit trails for extraction and transformations.
- Allow conflicting evidence and uncertainty to remain visible rather than silently resolving it.
