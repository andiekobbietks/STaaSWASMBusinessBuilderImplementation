# STaaS research register

- **Status:** curated starting bibliography and research plan; not an exhaustive systematic review.
- **Last reviewed:** 25 November 2026.
- **Purpose:** distinguish published evidence, engineering observations, product hypotheses and work still required.

## Executive interpretation

The literature supports a plausible engineering approach: compact language models can be useful for bounded tasks; high-quality curated and synthetic examples can materially affect model capability; supervised fine-tuning and preference/reinforcement methods are available; retrieval and deterministic workflows can ground outputs in current, source-linked evidence. None of these findings proves that a small model can independently deliver reliable business strategy, nor that a particular dataset size guarantees a capability level.

STaaS should therefore be a system, not a fine-tuned model alone: retrieval over licensed and provenance-preserving knowledge, explicit business state, deterministic calculations and policy checks, human approval for consequential decisions, and evaluation against held-out business cases.

## Research register

| Source | Finding relevant to STaaS | What it does not establish |
|---|---|---|
| [Phi-3 Technical Report (Microsoft, 2024)](https://arxiv.org/abs/2404.14219) | Phi-3 Mini is 3.8B parameters and was trained on 3.3T tokens using heavily filtered web data and synthetic data; post-training included SFT and DPO. Shows that data quality and training recipe matter for compact models. | It does not show that 3B models automatically match frontier models on business strategy. |
| [Phi-4 Technical Report (Microsoft, 2024)](https://arxiv.org/abs/2412.08905) | Phi-4 (14B) emphasises data quality and synthetic data throughout training, with curriculum and post-training improvements. | Not evidence that 3,000–5,000 examples alone reproduce Phi-4. Its pretraining scale and compute are vastly larger. |
| [Phi-4-reasoning Technical Report (Microsoft, 2025)](https://arxiv.org/abs/2504.21318) | 14B model further trained with SFT on curated teachable prompts and teacher-generated reasoning demonstrations; a variant used outcome-based RL. Demonstrates a specific recipe for improving reasoning. | Does not establish that a Phi-sized model trained on founder cases will achieve equivalent general reasoning or domain performance. |
| [Small Language Models are the Future of Agentic AI (NVIDIA Research)](https://research.nvidia.com/labs/lpr/slm-agents/) | Argues many agent systems can benefit from specialised models and code-orchestrated workflows rather than delegating every decision to a general-purpose model. | Does not prove a universal percentage of tool calls or a universal small-model advantage for STaaS workloads. Benchmark the actual tasks. |
| [Unsloth integration in Hugging Face TRL](https://huggingface.co/docs/trl/v1.15.0/en/unsloth_integration) | Documents integration for SFT and preference/RL workflows, including LoRA/QLoRA and supported algorithms. Useful implementation path for constrained training environments. | Training speed and memory claims are workload/hardware dependent; compatibility must be checked for the selected base model and versions. |
| [MIT Martin Trust Center: Disciplined Entrepreneurship](https://diymtc.mit.edu/education/deframework/) | Describes a systematic 24-step framework for building innovation-driven enterprises. A useful structured knowledge source and workflow reference. | A framework is not a universal recipe or a validated outcome predictor. Respect book and course copyrights; store references and licensed summaries, not unauthorised copies. |
| [World Bank Enterprise Surveys: methodology](https://www.enterprisesurveys.org/en/methodology) | Firm-level, stratified survey methodology covering business environment topics such as finance, infrastructure, regulation and competition; panel data can support longitudinal analysis. | Survey populations, dates, instruments and sampling differ. Do not treat all waves as directly comparable without methodology checks. |
| [World Bank Enterprise Surveys: FAQ](https://www.enterprisesurveys.org/en/about-us/frequently-asked-questions) | Reports nearly 300,000 interviews in 181 economies following the Global Methodology. | Interviews are not 300,000 narrative startup case studies or labelled reasoning examples. |
| [World Bank Enterprise Surveys: data portal](https://www.enterprisesurveys.org/en/data) | Provides indicators and microdata across formal, micro and informal enterprise surveys. Strong basis for country/sector context. | Check the individual dataset's metadata, terms, sampling and permitted use before ingestion or model training. |
| [FSRS](https://github.com/open-spaced-repetition/fsrs4anki) | A modern spaced-repetition scheduler estimates memory stability and retrievability from review history. Could inform recall scheduling. | Recall scheduling is not evidence of applied business competence; application needs separate assessment. |

## Training approach and evidence boundaries

### Proposed pipeline

1. **Select a base model** after evaluating licence, language coverage, context length, tool-use ability, hardware footprint and baseline performance. Phi is a candidate family, not a predetermined answer.
2. **Build a rights-cleared corpus.** Collect source documents and structured records with licence, attribution, geography, date, source type and extraction provenance.
3. **Create curated examples.** Convert cases into tasks: identify facts vs assumptions; compare strategic options; diagnose constraints; ask for missing evidence; design experiments; calculate unit economics; explain uncertainty; and revise a recommendation when evidence changes.
4. **SFT/QLoRA first.** Teach output formats, disciplined evidence use, structured analysis and domain workflows. Use Unsloth/TRL where compatible.
5. **Preference optimisation second.** DPO may be useful where high-quality chosen/rejected responses and clear preference criteria exist.
6. **RL only where reward is defensible.** GRPO or other outcome-based methods are experimental until rewards can be checked reliably (e.g. arithmetic, schema validity, evidence citation, explicit task success). Do not reward persuasive but unsupported advice.
7. **RAG remains essential.** Use current sources and founder evidence at inference time; do not attempt to bake changing market facts into model weights.
8. **Evaluate and deploy.** Compare base vs adapted model on held-out companies, sectors, countries and task types; test calibration, citations, refusal/abstention, tool safety and regression. Quantise and benchmark with the target inference runtime (including OpenVINO where supported).

### Dataset-size caution

A 3,000–5,000-example pilot is a reasonable experiment for a narrow SFT task, not a literature-proven threshold and not a substitute for Phi's pretraining corpus. Quality, coverage, task diversity, deduplication, leakage controls and evaluation matter more than a headline count. Start with a small expert-reviewed pilot, measure it, then expand based on error analysis.

### Suggested example taxonomy

- Evidence extraction and provenance.
- Business-model and customer-problem diagnosis.
- Market/industry context and geographic transferability.
- Strategic-framework selection and application.
- Financial reasoning and unit economics.
- Competitive positioning and differentiation.
- Failure, pivot, acquisition and financing case analysis.
- Experiment design and prioritisation.
- Decision revision after new evidence.
- Founder teaching, retrieval practice and misconception correction.

## Dataset and source acquisition register

This is a lead list, not a claim that all records have been downloaded, deduplicated, licensed for commercial use or converted into OKF.

| Source | Potential value | Acquisition / rights note |
|---|---|---|
| [World Bank Enterprise Surveys](https://www.enterprisesurveys.org/en/data) | Firm operating conditions, finance, infrastructure, regulation, competition and performance across economies. | Inspect each survey's metadata and use terms; distinguish formal, micro and informal samples. |
| [Global Entrepreneurship Monitor](https://www.gemconsortium.org/data) | Entrepreneurship attitudes, activity and framework conditions across participating economies. | Check access, country/year coverage and dataset licence. |
| [Autopsy](https://data.getautopsy.io/) | Startup failure post-mortems and failure patterns. | Commercial access/licensing to be confirmed; do not assume bulk reuse. |
| [Simplifying Finance case studies](https://simplifyingfinance.org/case-studies/) | Company strategy, crises and failures. | Publicly readable does not mean unrestricted text reuse or training rights. |
| [Fliar BI datasets](https://fliarbi.com/datasets/) | Company events, funding, acquisitions, financial and operational records. | Published sample terms include non-commercial restrictions; obtain commercial permission before use. |
| [Propel Africa](https://www.propel.africa/dataset) | African startup funding and deal coverage. | Confirm export access, coverage and commercial reuse rights. |
| [The Chancery Africa Funding Atlas](https://atlas.thechancery.io/index.html) | African startup, investor and funding records. | Confirm data provenance, API/export access and licence. |
| [Companies House](https://www.gov.uk/government/organisations/companies-house) | UK company filings, accounts and corporate events. | Review Companies House API terms, personal data obligations and filing limitations. |
| [SEC EDGAR](https://www.sec.gov/edgar/search/) | US public-company filings, acquisitions, risk factors and financial disclosures. | Follow SEC access policies; filings are primary evidence but not uniformly structured case studies. |
| [OpenAlex](https://openalex.org/) | Research discovery and scholarly metadata for entrepreneurship, strategy and management. | Use API/data licence and article-level copyright conditions; metadata access is not a licence to full text. |

Do not sum source record counts as unique businesses: sources overlap and count different units (firms, interviews, deals, events, articles or cases). Maintain separate counts for source records, unique entities, events, documents and training examples.

## Evaluation design

Create a held-out benchmark stratified by geography, sector, company stage and outcome (growth, survival, pivot, acquisition, closure). Include counterfactual traps and incomplete evidence. Score:

- factual accuracy and source support;
- correct separation of facts, claims, assumptions and inference;
- quality of questions asked when information is missing;
- strategic option quality and trade-off reasoning;
- numerical correctness for finance calculations;
- context-sensitive transferability (including when lessons do not transfer);
- calibrated uncertainty and appropriate abstention;
- tool-call/schema correctness;
- consistency after new evidence and state updates;
- usefulness and comprehension in founder-facing explanations.

Avoid training/test leakage by splitting at company/entity and source-family level, not merely random rows. Evaluate by temporal holdout where possible.

## Local inference observation

The user has reported an OpenVINO benchmark around 40 tokens/second on their local hardware. This is a user-reported runtime observation, not independently reproduced in this repository. Record exact model ID/revision, quantisation, device, prompt/output token counts, warm-up, concurrency, OpenVINO version and measurement script before using it as a repeatable performance claim. Tokens/second says nothing by itself about strategic reasoning quality.

## Research gaps

- Locate and assess the exact strategic-management module material from the user's BSc only if its syllabus/learning outcomes are available and permission allows reuse.
- Conduct a systematic review of entrepreneurship strategy, founder cognition, business-model validation and AI-assisted decision support.
- Confirm all data licensing and model-training permissions.
- Establish the OKF canonical specification, schema version, conformance suite and lossless round-trip tests.
- Validate DWH dimensional model and data lineage against actual ingestion samples.
- Run domain-specific benchmark before making model capability or TRL claims.
