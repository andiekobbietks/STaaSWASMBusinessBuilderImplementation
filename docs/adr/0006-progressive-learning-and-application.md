# ADR-0006: Progressive learning and applied competence

- **Status:** Accepted architectural direction
- **Decision date:** 2026-11-25
- **Last reviewed:** 2026-11-26

## Context

Founders should encounter relevant concepts when they become useful, rather than being required to study every framework upfront. Spaced repetition can support recall, but remembering a definition does not prove the ability to apply it to a real business decision.

## Decision

Adopt progressive, context-sensitive learning as a product design direction. Introduce concepts when they are relevant to a founder's current question or decision. Keep at least three learning outcomes distinct:

1. **Conceptual understanding:** explain the idea or framework in the founder's own words.
2. **Recall:** retrieve key concepts later, using a spaced-retrieval scheduler where this is useful.
3. **Applied competence:** use the concept in a scenario, evidence assessment, experiment or real founder decision.

An FSRS-inspired scheduler may be evaluated for recall practice, but the scheduler is an implementation choice, not a requirement of the learning model. It must not be used as a proxy for strategic competence.

## Consequences

- Store the source, version and learning objective for each concept.
- Do not copy copyrighted books, proprietary course materials or paid course content without permission.
- Measure recall, conceptual understanding, transfer and application separately.
- Keep the founder in control of learning pace and allow concepts to be revisited.
- Scheduler choice, accessibility and learning efficacy require user testing; no learning gains are claimed yet.
- This ADR accepts the design direction only. It does not claim that a learning coach, scheduler or assessment system is implemented.

## Reconsideration triggers

Revisit the scheduler and learning design when pilot data shows that recall practice is ineffective, burdensome or inaccessible, or when a different method demonstrates better retention and transfer.
