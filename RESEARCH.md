# STaaS — Research Contributions

STaaS (Strategy as a Service) is an early-stage founder-support and business-intelligence project. It explores how evidence-grounded conversational learning, global company cases, persistent strategic state and controlled execution workflows could help founders move from an idea to informed action.

This document describes the research rationale, proposed technical contributions, evidence register, evaluation questions and open problems. It is a curated research register, not a systematic review. It distinguishes published research from project hypotheses and implementation claims.

For the product and architecture overview, see the [main README](README.md).

---

## Research contributions

### 1. A provenance-preserving business knowledge architecture

The proposed knowledge foundation separates portable knowledge exchange, analytical storage and discovery:

- **OKF interchange:** intended to represent portable, versioned and provenance-aware knowledge artefacts. The authoritative specification, schema version and conformance suite must be verified before implementation claims or conformance are made.
- **Data warehouse (DWH):** intended to harmonise source-grain company, event, geography, sector, funding, acquisition, operating-condition and outcome records while preserving lineage.
- **Catalogue:** intended to make cases, datasets, frameworks and founder evidence discoverable through structured filters and search.
- **Search projections:** keyword and vector indexes are rebuildable retrieval aids, not canonical records or provenance stores.

**Proposed flow:**

~~~text
Sources → rights review → ingestion → OCR / parsing
   → entity & event resolution → validation / human review
   → OKF artefacts → DWH → catalogue / search indexes
   → contextual retrieval → founder-facing reasoning
   → approved decision → experiment → outcome evidence
~~~

This separation is intended to prevent treating documents, embeddings or chat transcripts as if they were a governed business knowledge base. None of these components is currently evidenced as an integrated implementation in this repository.

### 2. Global company-case intelligence, including failure and context

The proposed catalogue should represent businesses as evolving entities with dated events and contextual conditions, not as static success stories. Relevant evidence includes formation, product launches and customer segments; funding, bootstrapping, debt and financing constraints; pivots, failed experiments and strategic reversals; acquisitions, mergers, ownership and leadership changes; operating constraints, regulation, infrastructure and supply chains; and growth, stagnation, closure and post-mortem evidence.

Potential coverage spans the US, UK, Europe, Africa, Asia and diaspora markets. Geographic coverage must be measured from actual ingested, deduplicated records; a source list is not proof of coverage.

For African founders and founders without obvious local precedents, the catalogue could broaden access to comparable cases. The system must not assume transferability. It should record context such as capital access, infrastructure, regulation, purchasing power, informality, language, distribution, institutions and customer behaviour, and explicitly indicate when a close precedent is unavailable.

### 3. Reflective, evidence-led founder learning

Research on personalised LLM dialogue and belief revision motivates a testable interaction pattern:

1. Elicit the founder's current understanding, assumptions and confidence.
2. Identify the consequential uncertainty or decision.
3. Retrieve relevant evidence, frameworks, cases and counterexamples with source provenance.
4. Explain similarities and differences between the case and the founder's context.
5. Invite the founder to revise, retain or reject their view and explain why.
6. Record the founder's reasoning and decision, with consent and version history.
7. Revisit assumptions after experiments or new evidence.

The intended outcome is stronger critical thinking and founder agency, not compliance with the model. The system should expose uncertainty, allow disagreement and avoid covert persuasion.

**Evidence boundary:** the studies below concern belief revision in specific experimental populations and topics. They do not establish that LLM dialogue teaches entrepreneurship, improves venture outcomes or transfers to African founder populations. This is a product hypothesis that requires its own ethical, contextualised evaluation.

### 4. Separating recall from applied competence

Spaced repetition systems such as FSRS may help schedule retrieval of concepts and framework knowledge. Recall is only one part of learning. STaaS should separately assess whether a founder can apply a concept to a new business scenario, interpret evidence, compare options, design an experiment and revise a decision.

A future learning system could combine concept prompts and spaced retrieval; case-based questions; scenario and counterfactual tasks; evidence interpretation; founder-authored explanations; and later review of decisions against observed outcomes.

No learning engine or competence outcome is claimed as implemented.

### 5. A bounded model-and-workflow architecture

The research supports testing a system composed of retrieval, models, deterministic logic and human approval rather than relying on fine-tuning alone.

- Retrieval supplies current, source-linked market and case evidence.
- The model supports explanation, comparison, question generation and synthesis.
- Deterministic code handles arithmetic, schema validation, access control and workflow constraints.
- Human approval gates consequential decisions, spending and external actions.
- Persistent platform-owned state preserves goals, assumptions, evidence, decisions and outcomes independently of a model provider or agent harness.

Fine-tuning may improve bounded tasks such as structured extraction, evidence classification, framework selection and output consistency. It cannot replace current retrieval or establish factual correctness by itself.

---

## Architecture

### Current prototype

The repository documents an imported React, TypeScript and Vite application with a deterministic browser-side four-stage analyzer (Clarity, Niche, Action and Strategy), English/Italian support, Supabase authentication, user-scoped report persistence, report history and browser print-to-PDF export.

The current application does not provide a live research pipeline, integrated DWH, knowledge catalogue, vector retrieval, persistent founder mental model, fine-tuned model, MCP adapter or managed STaaS service. Those are proposed capabilities.

### Proposed target architecture

~~~text
┌──────────────────────────────────────────────────────────────────┐
│ FOUNDER EXPERIENCE                                               │
│ Idea analysis · Learning · Cases · Strategy · Tasks · Reviews    │
└───────────────────────────────┬──────────────────────────────────┘
                                │
┌───────────────────────────────▼──────────────────────────────────┐
│ FOUNDER STRATEGIC STATE                                          │
│ Goals · Constraints · Assumptions · Evidence · Decisions         │
│ Experiments · Metrics · Outcomes · Consent · Version history    │
└───────────────────────────────┬──────────────────────────────────┘
                                │
┌───────────────────────────────▼──────────────────────────────────┐
│ REASONING & ORCHESTRATION                                        │
│ RAG · Dialogue · Frameworks · Deterministic checks · Approvals   │
└───────────────┬─────────────────────────────┬────────────────────┘
                │                             │
┌───────────────▼────────────────┐  ┌─────────▼────────────────────┐
│ CATALOGUE & RETRIEVAL          │  │ LEARNING & EVALUATION        │
│ Cases · Datasets · Frameworks  │  │ Recall · Scenarios ·         │
│ Founder evidence · Search      │  │ Calibration · Competence     │
└───────────────┬────────────────┘  └──────────────────────────────┘
                │
┌───────────────▼──────────────────────────────────────────────────┐
│ KNOWLEDGE FOUNDATION                                             │
│ Sources → rights → OCR/parsing → entities/events → validation   │
│          → OKF interchange → DWH → catalogue/search projections  │
└───────────────────────────────┬──────────────────────────────────┘
                                │
┌───────────────────────────────▼──────────────────────────────────┐
│ PUBLIC SOURCES + FOUNDER-AUTHORISED EVIDENCE                      │
│ Filings · Surveys · Research · Cases · Interviews · Uploads      │
└──────────────────────────────────────────────────────────────────┘

Cross-cutting: provenance · licensing · privacy · security · audit
               portability · observability · backup · deletion
~~~

The full component assessment and validation gates are in [ARCHITECTURE-AND-TRL.md](docs/ARCHITECTURE-AND-TRL.md).

---

## Evidence register

### 1. Personalised evidence-based dialogue and belief revision

#### Costello, Pennycook and Rand (2024)

**Paper:** Thomas H. Costello, Gordon Pennycook and David G. Rand, “Durably reducing conspiracy beliefs through dialogues with AI,” *Science* 385(6714), eadq1814 (13 September 2024). [PubMed record](https://pubmed.ncbi.nlm.nih.gov/39264999/) · [MIT Sloan summary](https://mitsloan.mit.edu/ideas-made-to-matter/mit-study-ai-chatbot-can-reduce-belief-conspiracy-theories).

The original report described experiments involving 2,190 participants who engaged in personalised, evidence-based dialogues with GPT-4 Turbo. The authors reported reductions in conspiracy-belief ratings and persistence at follow-up. This motivates testing tailored evidence-led dialogue, but it is not evidence that an LLM can teach business strategy or improve venture outcomes.

**Publication-history qualification (reviewed 25 November 2026):** Science issued an Editorial Expression of Concern on 11 June 2026 after reporting/screening inconsistencies and a code-merging error affecting the public dataset and reproducibility of some reported values. The authors supplied a corrected analysis pipeline and stated that corrected results retained the original direction, statistical significance and substantive size. Science subsequently published an erratum on 22 October 2026; PubMed records the erratum and marks the expression-of-concern record as rescinded. The corrected numerical results have not been independently re-analysed for this project. Accordingly, this project does not treat the originally reported approximately 20% figure as an unqualified settled estimate. [Expression-of-concern record](https://pubmed.ncbi.nlm.nih.gov/42275523/) · [Erratum record](https://pubmed.ncbi.nlm.nih.gov/42912168/) · [AAAS notice](https://sciencesources.eurekalert.org/news-releases/1131247).

#### Boissin et al. (2025)

**Paper:** Esther Boissin et al., “Dialogues with large language models reduce conspiracy beliefs even when the AI is perceived as human,” *PNAS Nexus* 4(11), pgaf325 (2025). [Article and DOI](https://doi.org/10.1093/pnasnexus/pgaf325) · [PubMed](https://pubmed.ncbi.nlm.nih.gov/41179846/).

In a preregistered experiment (N=955), participants discussed a conspiracy or an epistemically unwarranted belief with an LLM presenting evidence-based counterarguments. The study manipulated whether the interlocutor was described as an AI or an expert and whether the tone was human-like. Confidence decreased, with no significant differences between those presentation conditions. This supports investigating evidence quality and reflection rather than assuming anthropomorphic presentation is the active ingredient. It does not establish entrepreneurship-learning efficacy.

#### Meyer et al. (2024)

**Paper:** Marco Meyer et al., “Using an AI-powered ‘street epistemologist’ chatbot and reflection tasks to diminish conspiracy theory beliefs,” *Harvard Kennedy School Misinformation Review* 5(6) (12 December 2024). [Article](https://misinforeview.hks.harvard.edu/article/using-an-ai-powered-street-epistemologist-chatbot-and-reflection-tasks-to-diminish-conspiracy-theory-beliefs/).

This work examined AI-facilitated reflection on uncertainty and reported that chatbot interaction and reflection tasks could weaken conviction for some participants. It motivates asking founders what they are uncertain about and what evidence might change their view. It is not a validation of STaaS or a general claim about all users.

### 2. Compact language models and model adaptation

| Source | Relevant finding | Limitation for STaaS |
|---|---|---|
| [Phi-3 Technical Report (Microsoft, 2024)](https://arxiv.org/abs/2404.14219) | Phi-3 Mini is 3.8B parameters and was trained on 3.3T tokens using heavily filtered web and synthetic data; post-training included SFT and DPO. | Does not show that a small model automatically matches frontier models on business strategy. |
| [Phi-4 Technical Report (Microsoft, 2024)](https://arxiv.org/abs/2412.08905) | Phi-4 (14B) emphasises data quality and synthetic data throughout training, with curriculum and post-training improvements. | Does not show that a few thousand examples reproduce Phi-4's capabilities. |
| [Phi-4-reasoning Technical Report (Microsoft, 2025)](https://arxiv.org/abs/2504.21318) | Describes SFT on curated teachable prompts and teacher-generated reasoning demonstrations; a variant uses outcome-based RL. | Not evidence that the same recipe transfers to founder strategy tasks without domain evaluation. |
| [NVIDIA Research: Small Language Models are the Future of Agentic AI](https://research.nvidia.com/labs/lpr/slm-agents/) | Makes the case for specialised models and code-orchestrated workflows for bounded agent tasks. | Does not establish a universal SLM advantage or a fixed share of agent tasks. |
| [Hugging Face TRL: Unsloth integration](https://huggingface.co/docs/trl/v1.15.0/en/unsloth_integration) | Documents SFT and preference/RL workflows with LoRA/QLoRA where supported. | Compatibility, memory and speed depend on model, hardware and software versions. |

### 3. Business strategy, entrepreneurship and enterprise context

| Source | Potential contribution | Limitation / use condition |
|---|---|---|
| [MIT Martin Trust Center: Disciplined Entrepreneurship](https://diymtc.mit.edu/education/deframework/) | A structured 24-step framework for building innovation-driven enterprises. | A framework is not a universal recipe or outcome predictor. Respect copyright; store references and licensed summaries rather than unauthorised copies. |
| [World Bank Enterprise Surveys: methodology](https://www.enterprisesurveys.org/en/methodology) | Firm-level survey methodology covering finance, infrastructure, regulation, competition and business environment. | Survey populations, dates, instruments and sampling differ; check comparability. |
| [World Bank Enterprise Surveys: FAQ](https://www.enterprisesurveys.org/en/about-us/frequently-asked-questions) | Reports nearly 300,000 interviews in 181 economies following the Global Methodology. | Interviews are not equivalent to 300,000 startup case studies or labelled reasoning examples. |
| [World Bank Enterprise Surveys: data portal](https://www.enterprisesurveys.org/en/data) | Indicators and microdata across enterprise surveys, including formal, micro and informal enterprise surveys. | Inspect dataset-level metadata, terms, sampling and permitted uses. |
| [FSRS](https://github.com/open-spaced-repetition/fsrs4anki) | Spaced-repetition scheduling based on memory stability and retrievability. | Recall scheduling does not prove applied business competence. |


### 4. Empirical evidence on LLM strategic-analysis capability

The following studies are used to define STaaS's model-evaluation problem. They assess different tasks and populations; their results should not be collapsed into a single general intelligence score.

#### Doshi, Bell, Mirzayev and Vanneste (2024/2025)

**Paper:** “Generative artificial intelligence and evaluating strategic decisions,” *Strategic Management Journal*, 46(3), 583–610. First published 14 November 2024. [Publisher DOI](https://doi.org/10.1002/smj.3677) · [UCL repository record](https://discovery.ucl.ac.uk/id/eprint/10198793/).

Across two studies, the researchers examined 60 business models in each study and compared LLM rankings with human-expert rankings. Individual model evaluations could be inconsistent and biased; aggregation tended to produce rankings more similar to expert judgements. For STaaS, this supports structured multi-criteria assessment, comparison and review rather than trusting a single unchallenged model response. It does not demonstrate that a model can independently validate a real venture.

#### Allen and McDonald (2026)

**Paper:** “How Well Can AI Do Strategy? Empirical Benchmarking Using Strategy Simulations,” *Strategy Science*, 11(1), 93–117. Published online 11 March 2026. [Publisher DOI](https://doi.org/10.1287/stsc.2025.0444).

The study assessed 21 proprietary and 13 open-source models using the Back Bay Battery simulation, which tests multi-period strategic choices, uncertainty and the balance between exploiting an existing business and investing in emerging opportunities. Results varied across model generations: some reasoning-focused models exceeded historical MBA cohort averages, while several later frontier models underperformed earlier models and the historical MBA average. This demonstrates that strategic capability is task- and model-dependent and that model version changes can matter. It is not a direct benchmark of STaaS, its compact model candidates or real-world founder outcomes.

#### Stoeber et al. (2026)

**Paper:** “AI strategy under institutional pressure: strategic conformity and decision-making in large language models,” *Journal of Business Research*, 212, 116227 (July 2026). [Publisher DOI](https://doi.org/10.1016/j.jbusres.2026.116227).

The authors generated 2,400 strategic recommendations across ten business cases and four models, with a human benchmark involving 218 managers. They report that models tend towards strategic acquiescence under institutional pressure, introducing the concept of “Synthetic Optimism”. For STaaS, this motivates tests for conformity, unexamined industry assumptions, counterexamples and strategic alternatives. A recommendation that sounds reasonable may still fail to challenge the prevailing approach.

#### Implications for STaaS model selection

Together, these studies do not show that an LLM is incapable of strategic analysis. They show that performance varies by model and task, single evaluations can be biased or inconsistent, and model recommendations can converge on institutional norms. STaaS should therefore use models as bounded reasoning components inside an evidence-governed workflow, not as autonomous sources of truth.

No model percentile, MBA-equivalence claim or STaaS business-analysis score is asserted by these publications for LFM2.5 or Phi-4 Mini Reasoning. Those claims require a separate, reproducible STaaS benchmark.

---

## Dataset and source acquisition register

This is a lead list, not a statement that records have been downloaded, deduplicated, licensed for commercial use or converted into a training corpus.

| Source | Potential value | Acquisition and rights note |
|---|---|---|
| [World Bank Enterprise Surveys](https://www.enterprisesurveys.org/en/data) | Firm operating conditions, finance, infrastructure, regulation, competition and performance across economies. | Inspect each survey's metadata and terms; distinguish formal, micro and informal samples. |
| [Global Entrepreneurship Monitor](https://www.gemconsortium.org/data) | Entrepreneurship attitudes, activity and framework conditions across participating economies. | Check access, country/year coverage and dataset licence. |
| [Autopsy](https://data.getautopsy.io/) | Startup failure post-mortems and failure patterns. | Confirm commercial access and licensing; do not assume bulk reuse. |
| [Simplifying Finance case studies](https://simplifyingfinance.org/case-studies/) | Company strategy, crises and failures. | Publicly readable does not mean unrestricted text reuse or model-training rights. |
| [Fliar BI datasets](https://fliarbi.com/datasets/) | Company events, funding, acquisitions, financial and operational records. | Published sample terms include non-commercial restrictions; obtain commercial permission before use. |
| [Propel Africa](https://www.propel.africa/dataset) | African startup funding and deal coverage. | Confirm export access, coverage and commercial reuse rights. |
| [The Chancery Africa Funding Atlas](https://atlas.thechancery.io/index.html) | African startup, investor and funding records. | Confirm data provenance, API/export access and licence. |
| [Companies House](https://www.gov.uk/government/organisations/companies-house) | UK company filings, accounts and corporate events. | Review API terms, personal data obligations and filing limitations. |
| [SEC EDGAR](https://www.sec.gov/edgar/search/) | US public-company filings, acquisitions, risk factors and financial disclosures. | Follow SEC access policies; filings are primary evidence but not uniformly structured case studies. |
| [OpenAlex](https://openalex.org/) | Research discovery and scholarly metadata for entrepreneurship and management. | Metadata access is not a licence to full text; check API and article-level rights. |

Do not add source record counts together as if they were unique businesses. Sources count different units: firms, interviews, deals, events, documents and articles. Track separate totals for source records, unique entities, events, documents, extracted claims and training/evaluation examples.

---

## Training and adaptation methodology

### Proposed pipeline

1. **Base-model selection:** compare licence, language coverage, context length, tool-use reliability, footprint and baseline task performance.
2. **Rights-cleared corpus:** retain source attribution, licence, geography, date, source type and extraction provenance.
3. **Expert-reviewed task generation:** create tasks for evidence extraction, assumption identification, option comparison, missing-information questions, experiment design, unit economics and decision revision.
4. **SFT/QLoRA:** first adapt bounded behaviours such as structured extraction, disciplined citations and workflow outputs.
5. **Preference optimisation:** consider DPO only when chosen/rejected examples and preference criteria are high quality.
6. **Outcome-based RL:** consider GRPO or other methods only where rewards are independently verifiable (for example arithmetic, schema validity, citation support or explicit task completion). Do not reward persuasive but unsupported advice.
7. **RAG at inference:** retrieve changing market facts, case evidence and founder-specific material rather than attempting to encode them permanently in model weights.
8. **Held-out evaluation:** compare base and adapted models across unseen companies, sectors, countries and tasks; test calibration, citations, abstention, tool safety and regressions.
9. **Deployment profiling:** test quantisation and runtime behaviour on target hardware, including OpenVINO where supported.

### Dataset-size caution

A 3,000–5,000-example pilot is a proposed experiment for a narrow SFT task, not a literature-proven threshold and not a substitute for large-scale pretraining. Quality, coverage, task diversity, deduplication, leakage controls and evaluation matter more than a headline count. Begin with a small expert-reviewed pilot, measure errors and expand only where justified.

### Suggested example taxonomy

- evidence extraction and provenance;
- business-model and customer-problem diagnosis;
- market context and geographic transferability;
- strategic-framework selection and application;
- financial reasoning and unit economics;
- competitive positioning and differentiation;
- failure, pivot, acquisition and financing case analysis;
- experiment design and prioritisation;
- decision revision after new evidence;
- founder teaching, retrieval practice and misconception correction.

---

## Evaluation design

Build a held-out benchmark stratified by geography, sector, company stage and outcome (growth, survival, pivot, acquisition and closure). Include incomplete evidence, conflicting sources, counterexamples and counterfactual traps.

Score factual accuracy and source support; separation of facts, attributed claims, founder assertions, assumptions and inference; quality of clarifying questions when information is missing; strategic option quality and trade-off reasoning; numerical correctness for financial calculations; contextual transferability, including recognition when lessons do not transfer; calibrated uncertainty and appropriate abstention; tool-call and schema correctness; consistency after evidence and state updates; founder comprehension and usefulness; applied competence on unseen scenarios; and decision quality and follow-through where ethically and practically measurable.

Split by company/entity and source family, not random rows alone, to reduce leakage. Use temporal holdouts where possible. Report sample sizes, confidence intervals, subgroup performance and missingness. Do not present synthetic validation accuracy as real-world founder impact.

For the reflective-learning hypothesis, compare appropriate interaction conditions and assess evidence comprehension, assumption calibration, quality of reasoning and follow-through. Use informed consent, disclose AI involvement, avoid manipulation and permit disagreement. A preregistered or otherwise transparently specified pilot with independent review is preferable before making efficacy claims.

---

## Engineering observations and project status

### Local inference observation

The user has reported an OpenVINO benchmark around 40 tokens/second on local hardware. This is a user-reported runtime observation, not independently reproduced in this repository. A repeatable benchmark must record exact model ID/revision, quantisation, device, prompt/output token counts, warm-up, concurrency, OpenVINO version and measurement script. Tokens per second do not measure reasoning quality.

### Current implementation boundary

The repository currently documents the imported four-stage analyzer and Supabase report workflow. The following remain unimplemented or unverified as integrated capabilities: rights-cleared ingestion and OCR pipeline; canonical OKF schema/conformance and lossless round-trip tests; DWH, entity/event resolution and catalogue; provenance-preserving keyword/vector retrieval; persistent founder strategic state and assumption/decision lifecycle; reflective founder-learning workflow; spaced-repetition and applied-competence assessment; fine-tuned STaaS model and held-out benchmark; MCP/OpenCode or other agent-harness adapter; and managed STaaS service operations.

See [the architecture and TRL assessment](docs/ARCHITECTURE-AND-TRL.md). The integrated product must not be assigned the highest TRL of one component.

---

## Research questions

1. **Founder mental models:** Can evidence-grounded dialogue improve founders' ability to articulate, test and revise business assumptions without reducing agency or encouraging agreement with the system?
2. **Contextual case transfer:** Which case attributes best predict whether a strategy is relevant across different countries, sectors, infrastructure and capital environments?
3. **African and diaspora case coverage:** What are the actual coverage gaps by country, language, sector, stage and outcome, and which rights-cleared sources can close them?
4. **Failure and negative evidence:** How can the system preserve reliable lessons from failures and pivots without survivorship bias or hindsight distortion?
5. **Retrieval quality:** Does hybrid lexical/semantic retrieval with metadata and contextual reranking outperform simpler retrieval for business-case discovery?
6. **Small-model specialisation:** Which bounded STaaS tasks benefit from SFT/QLoRA, and where do retrieval, deterministic code or a larger model remain necessary?
7. **Recall versus competence:** Does spaced retrieval improve concept recall, and does that transfer to applied decision-making on unseen scenarios?
8. **Persistent state and interoperability:** Can a platform-owned, versioned knowledge/state model support reliable handoff across model providers and agent harnesses without losing provenance or permission boundaries?
9. **Founder outcomes:** Do pilots improve evidence quality, decision quality, experiment completion or time to a useful next action compared with appropriate baselines?

---

## Open problems and limitations

### Research transfer

The belief-revision literature concerns specific beliefs and experimental samples. It does not establish entrepreneurship-learning efficacy, improved venture performance or transfer to African founders. Product pilots must test these hypotheses directly and ethically.

### Source bias and coverage

Public company information overrepresents visible, formal, funded and successful firms. Informal businesses, small local firms, closed companies and founders outside major ecosystems are less documented. The catalogue must record missingness and source bias rather than implying comprehensive global coverage.

### Rights and licensing

Publicly accessible content is not automatically available for commercial reuse, redistribution, embedding or model training. A rights register and source-specific review are prerequisites for ingestion at scale.

### Entity resolution and event quality

Company names, subsidiaries, aliases, funding announcements and acquisitions are difficult to reconcile. Incorrect merges can corrupt longitudinal analysis. Retain source-level records, confidence, review state and reversible entity mappings.

### Outcome and survivorship bias

Success stories are easier to find and often retrospectively simplified. Include failures, censored outcomes, unsuccessful experiments and contradictory accounts. Do not infer causality from a case narrative.

### OKF specification

The canonical OKF source, exact schema version, required fields and compatibility rules must be verified. Do not invent a schema or claim conformance without validation fixtures and lossless round-trip tests.

### Evaluation validity

Synthetic cases can test format and bounded skills but cannot substitute for real founder usage. Benchmarks need entity-level holdouts, contextual coverage, independent review and transparent uncertainty.

### Security and privacy

Founder uploads may contain commercially sensitive, personal or financial data. Define data minimisation, retention, deletion, access control, encryption, model-processing disclosures and incident response before enabling broad ingestion or third-party agent access.

### Local inference

The reported tokens/second figure is not an accuracy, latency distribution, cost or quality benchmark. Reproduce it under a documented test protocol and evaluate task quality independently.

---

## What further research and funding could enable

1. **Rights-cleared global case corpus:** build a traceable company/event dataset with deliberate coverage of African markets, diaspora founders, failures, pivots and operational constraints.
2. **Founder-learning pilot:** evaluate reflective dialogue, case-based learning and spaced retrieval with consented founders and independent outcome review.
3. **Knowledge integrity implementation:** verify the canonical OKF contract and build ingestion, entity resolution, DWH, catalogue and round-trip tests.
4. **Retrieval benchmark:** compare lexical, semantic and hybrid retrieval on realistic founder questions and context-sensitive case matching.
5. **Small-model adaptation study:** compare baseline and SFT/QLoRA models on held-out extraction, reasoning, calibration and workflow tasks.
6. **Agent interoperability:** implement permissioned MCP adapters and test auditability, revocation and portable state across compatible harnesses.
7. **Operational validation:** resolve the imported demo provisioning security issue, test tenant isolation, backup/restore, deletion and provider-exit procedures.

---

## Selected bibliography

- Costello, T. H., Pennycook, G. & Rand, D. G. (2024). “Durably reducing conspiracy beliefs through dialogues with AI.” *Science*, 385(6714), eadq1814. [PubMed](https://pubmed.ncbi.nlm.nih.gov/39264999/).
- Boissin, E. et al. (2025). “Dialogues with large language models reduce conspiracy beliefs even when the AI is perceived as human.” *PNAS Nexus*, 4(11), pgaf325. [DOI](https://doi.org/10.1093/pnasnexus/pgaf325).
- Meyer, M. et al. (2024). “Using an AI-powered ‘street epistemologist’ chatbot and reflection tasks to diminish conspiracy theory beliefs.” *Harvard Kennedy School Misinformation Review*, 5(6). [Article](https://misinforeview.hks.harvard.edu/article/using-an-ai-powered-street-epistemologist-chatbot-and-reflection-tasks-to-diminish-conspiracy-theory-beliefs/).
- Microsoft (2024). [Phi-3 Technical Report](https://arxiv.org/abs/2404.14219).
- Microsoft (2024). [Phi-4 Technical Report](https://arxiv.org/abs/2412.08905).
- Microsoft (2025). [Phi-4-reasoning Technical Report](https://arxiv.org/abs/2504.21318).
- NVIDIA Research. [Small Language Models are the Future of Agentic AI](https://research.nvidia.com/labs/lpr/slm-agents/).
- Hugging Face. [TRL Unsloth integration](https://huggingface.co/docs/trl/v1.15.0/en/unsloth_integration).
- MIT Martin Trust Center. [Disciplined Entrepreneurship](https://diymtc.mit.edu/education/deframework/).
- World Bank. [Enterprise Surveys methodology](https://www.enterprisesurveys.org/en/methodology) and [data portal](https://www.enterprisesurveys.org/en/data).
- FSRS. [Free Spaced Repetition Scheduler](https://github.com/open-spaced-repetition/fsrs4anki).
