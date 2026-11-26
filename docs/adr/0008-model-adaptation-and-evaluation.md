# ADR-0008: Staged model adaptation and evaluation

- **Status:** Deferred; no model-training programme approved
- **Decision date:** 2026-11-25
- **Last reviewed:** 2026-11-26

## Context

Phi research suggests that data quality, curated synthetic demonstrations and post-training can improve compact models on selected tasks. It does not establish that a small business corpus reproduces Phi-level general reasoning. STaaS must be evaluated on its own business tasks, and model adaptation should not precede evidence that the base model plus retrieval and deterministic workflow are inadequate.

## Decision

Defer fine-tuning and reinforcement-learning work until the following sequence has been completed:

1. Establish a reproducible STaaS benchmark and a capable base-model reference.
2. Evaluate model-only, fixed-evidence and evidence-enabled workflow conditions as specified in ADR-0010.
3. Identify repeatable, material errors that are not better addressed by retrieval, parameter design, deterministic checks, prompt/workflow changes or better source data.
4. If a persistent domain-specific gap remains, run a bounded, expert-reviewed SFT experiment using LoRA/QLoRA and compatible tooling.
5. Consider DPO only where defensible preference pairs exist. Consider GRPO or other RL only where rewards are verifiable, stable and resistant to gaming.
6. Compare every adapted model with the unmodified base model and retrieval-only baseline using held-out company/entity, sector, geography and temporal splits.

This ADR records a deliberate deferral, not a commitment to train a model.

## Consequences

- 3,000–5,000 examples remains a pilot hypothesis, not a proven requirement or sufficient condition.
- Keep retrieval for changing market evidence; fine-tuning is not a substitute for a current knowledge base.
- Any future training run must preserve data lineage, rights review, consent where applicable, reproducibility and model-card documentation.
- Measure citation accuracy, reasoning quality, numerical correctness, uncertainty, regional transfer, robustness and tool reliability.
- Do not claim a trained STaaS model until a reproducible training and evaluation run exists.

## Reconsideration gate

Reopen this decision only when ADR-0010's benchmark identifies a repeatable capability gap, the proposed training data is rights-cleared and representative, and a measurable success criterion is defined in advance.
