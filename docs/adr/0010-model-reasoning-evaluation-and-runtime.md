# ADR-0010: Evaluate model reasoning separately from runtime performance

- **Status:** Accepted evaluation principle; candidate model comparison remains proposed
- **Date:** 2026-11-26

## Context

STaaS needs to determine whether compact language models can perform useful business diagnosis and strategic reasoning within practical hardware, latency, privacy and cost constraints. A high tokens-per-second result does not establish reasoning quality. Parameter count, a model's general benchmark reputation or a fluent sample response also does not establish performance on STaaS's business-analysis tasks.

Published research shows that LLM strategic-analysis performance is task- and model-dependent. Individual business-model evaluations can be inconsistent or biased (Doshi et al., 2024/2025); model performance varies in multi-period strategy simulations (Allen and McDonald, 2026); and models can exhibit strategic conformity under institutional pressure (Stoeber et al., 2026).

The project owner has reported local inference measurements for Liquid AI LFM2.5-1.2B-Instruct, including approximately 40.96 tokens/second using OpenVINO INT4 CPU inference on an Intel Core i5-1135G7 with 8 GB RAM. These are runtime observations only and have not been independently reproduced in this repository. Phi-4 Mini Reasoning (3.8B) is a candidate comparison model; this ADR does not claim a completed head-to-head reasoning benchmark.

## Decision

1. Treat the language model as one component of STaaS, not the complete business-analysis system.
2. Separate model quality evaluation from runtime profiling. Report reasoning scores, factual/evidence quality, calibration and consistency separately from latency, throughput, memory and footprint.
3. Compare at least:
   - a compact base model (initial candidate: LFM2.5-1.2B-Instruct);
   - the same model with STaaS retrieval, parameter framework and deterministic workflow;
   - a stronger reasoning reference (candidate: Phi-4 Mini Reasoning, subject to availability and reproducible setup).
4. Use identical business cases, prompts, evidence packs and output schemas wherever possible. Include repeated runs for stochastic configurations and record exact model IDs/revisions, quantisation, runtime, decoding settings, hardware and software versions.
5. Anchor the STaaS task rubric in the user's USW Strategic Information Systems Management learning outcomes and assess:
   - problem and context diagnosis;
   - selection and application of relevant techniques/frameworks;
   - critical evaluation of evidence and assumptions;
   - alternatives, trade-offs and strategic coherence;
   - implementation feasibility, resources and dependencies;
   - objectives, measures and KPIs;
   - reflective justification and revision when new evidence appears.
6. Add cross-cutting measures for factual accuracy, citation support, numerical correctness, source/fact/inference separation, uncertainty calibration, contextual transfer, consistency, appropriate clarification and abstention.
7. Use held-out business entities, sectors, geographies and source families to reduce leakage. Where possible, use independent human assessors, blinded scoring, inter-rater agreement and confidence intervals. Compare against a human reference group before making percentile or equivalence claims.
8. Preserve retrieval for current evidence; use deterministic code for arithmetic, schemas, permissions and workflow transitions; require founder or qualified human approval for consequential decisions.

## Consequences

- The current deterministic four-stage browser analyzer remains the implemented baseline; this ADR does not claim that an LLM is currently integrated into the application.
- LFM2.5's reported throughput is evidence of promising local execution performance, not evidence that it can independently perform reliable business strategy.
- Phi-4 Mini Reasoning remains a candidate, not a verified STaaS benchmark winner.
- No percentile, human-equivalence, MBA-equivalence or business-outcome claim may be made without a suitable reference distribution and reproducible evaluation.
- A model may support first-pass diagnosis, framework explanation, assumption discovery and option generation, but STaaS's target capability depends on evidence acquisition, provenance, retrieval, deterministic validation and human judgement.
- If a compact model performs well on bounded tasks, prefer targeted workflow/RAG improvements before assuming fine-tuning is required. If fine-tuning is later tested, follow ADR-0008 and retain held-out evaluation.

## References

- Doshi, A. R., Bell, J. J., Mirzayev, E. and Vanneste, B. S. (2024; journal issue 2025). [Generative artificial intelligence and evaluating strategic decisions](https://doi.org/10.1002/smj.3677). *Strategic Management Journal*, 46(3), 583–610.
- Allen, R. T. and McDonald, R. M. (2026). [How Well Can AI Do Strategy? Empirical Benchmarking Using Strategy Simulations](https://doi.org/10.1287/stsc.2025.0444). *Strategy Science*, 11(1), 93–117.
- Stoeber, T. et al. (2026). [AI strategy under institutional pressure: strategic conformity and decision-making in large language models](https://doi.org/10.1016/j.jbusres.2026.116227). *Journal of Business Research*, 212, 116227.
- Microsoft (2024). [Phi-3 Technical Report](https://arxiv.org/abs/2404.14219).
- Microsoft (2024). [Phi-4 Technical Report](https://arxiv.org/abs/2412.08905).
- Microsoft (2025). [Phi-4-reasoning Technical Report](https://arxiv.org/abs/2504.21318).
