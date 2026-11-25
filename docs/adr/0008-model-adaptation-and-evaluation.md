# ADR-0008: Staged model adaptation and evaluation

- **Status:** Proposed
- **Date:** 2026-11-25

## Context

Phi research suggests data quality, curated synthetic demonstrations and post-training can improve compact models on selected tasks. It does not establish that a small business corpus reproduces Phi-level general reasoning. STaaS must be evaluated on its own business tasks.

## Decision

Begin with baseline model comparison and retrieval. If evaluation identifies repeatable domain-specific weaknesses, trial expert-reviewed SFT with LoRA/QLoRA using compatible Unsloth/TRL tooling. Consider DPO only with defensible preference pairs. Consider GRPO or other RL only when rewards are verifiable and robust against gaming. Maintain RAG for changing market evidence. Use held-out company/entity and temporal splits to prevent leakage.

## Consequences

- 3,000–5,000 examples is a pilot hypothesis, not a proven requirement or sufficient condition.
- Publish model cards, data lineage and benchmark results for each trained variant.
- Compare against the unmodified base model and retrieval-only baseline.
- Measure citation accuracy, reasoning, numerical correctness, uncertainty, regional transfer and tool reliability.
- Do not claim a trained STaaS model until a reproducible training and evaluation run exists.
