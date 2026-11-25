# ADR-0005: Model, retrieval, deterministic workflow and human approval

- **Status:** Accepted architectural direction
- **Date:** 2026-11-25

## Context

Business strategy involves current facts, calculations, context, judgement and consequential decisions. A language model alone is not a dependable database, calculator, policy engine or accountable decision-maker.

## Decision

Use a model for language understanding, explanation and bounded reasoning; retrieval for current source-linked evidence; deterministic code for arithmetic, schema validation, permissions and state transitions; durable workflows for long-running tasks; and explicit human approval for consequential decisions, spending, contracts and external actions.

## Consequences

- Recommendations must show evidence, assumptions, uncertainty and next validation steps.
- The system should abstain or ask for missing information when evidence is insufficient.
- Tool calls require least privilege, audit and revocation.
- Model output is not professional legal, tax, accounting or regulated financial advice.
