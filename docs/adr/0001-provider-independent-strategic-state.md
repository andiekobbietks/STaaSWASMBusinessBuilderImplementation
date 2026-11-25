# ADR-0001: Platform-owned persistent strategic state

- **Status:** Accepted architectural direction
- **Date:** 2026-11-25

## Context

Founder context is expected to evolve across conversations, research sessions, models and agent harnesses. Chat transcripts, vector indexes and provider-specific thought signatures do not provide a reliable, portable business record.

## Decision

The STaaS platform owns canonical persistent state, separated into founder, market, knowledge/learning, evidence/provenance, strategic decision and execution domains. Conversation history is retained only as an interaction record subject to retention policy. Embeddings are derived indexes. Provider-specific reasoning tokens/signatures are transient protocol data and are not canonical memory.

## Consequences

- State requires explicit schemas, migrations, access control, export and deletion.
- Material changes should be timestamped and attributable.
- Model/provider replacement should not require reconstructing business context.
- This is a target architecture; implementation and migration tests remain outstanding.
