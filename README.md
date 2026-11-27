# STaaS Business Builder

> **Reduce the friction between having an idea and acting on it.**

STaaS means **Strategy as a Service**. This project explores a founder-centred workspace that helps people understand a business opportunity, challenge assumptions, learn from relevant evidence, choose a direction and turn that direction into measurable action.

The ambition is bigger than generating a business plan. STaaS should help founders build and continuously improve the mental models they use to make decisions. It connects business education, global company intelligence, founder-specific evidence, strategic frameworks and execution in one traceable workflow.

**Current status:** an early React/TypeScript/Vite prototype with a deterministic, browser-side four-stage business-idea analysis flow and Supabase-backed authentication/report persistence. The parameterised assessment framework, external evidence acquisition, OKF interchange, DWH, knowledge catalogue, persistent strategic state, learning loop and agent integrations are architectural or roadmap items unless explicitly marked as implemented. This repository distinguishes working code from proposed capabilities.

- [The STaaS Manifesto](MANIFESTO.md)
- [Intellectual foundations of STaaS](docs/INTELLECTUAL-FOUNDATIONS-OF-STAAS.md)
- [Continuity without sameness: transmission, transformation and the preservation of meaning](docs/CONTINUITY-WITHOUT-SAMENESS.md)
- [3Blue1Brown: learning, LLMs, compression and the STaaS principle](docs/3BLUE1BROWN-AND-STAAS.md)
- [Compression, intelligence and cryptographic discovery](docs/COMPRESSION-INTELLIGENCE-AND-CRYPTOGRAPHY.md)
- [Research contributions, bibliography and open questions](RESEARCH.md)
- [Product requirements](docs/PRODUCT-REQUIREMENTS.md)
- [STaaS operating model](docs/STAAS-OPERATING-MODEL.md)
- [Architecture and provisional TRL assessment](docs/ARCHITECTURE-AND-TRL.md)
- [Architecture decision records](docs/adr/README.md)

## Repository guide

This README is the product and architecture overview. Use the linked documents for detailed requirements, operating procedures, research evidence and individual architectural decisions.

- [Product proposition and founder problem](#why-build-staas)
- [Founder case study: minoHealth AI Labs](#case-study-darlington-akogo-minohealth-ai-labs-and-the-work-behind-locally-grounded-ai)
- [Current prototype and assessment framework](#product-at-a-glance)
- [Model capability and evaluation approach](#can-a-language-model-perform-this-analysis-on-its-own)
- [Knowledge acquisition and source ecosystem](#knowledge-acquisition-and-source-ecosystem)
- [System architecture and WASM rationale](#proposed-system-architecture)
- [Global intelligence and contextual transfer](#global-business-intelligence-and-contextual-transfer)
- [Security, privacy and trust](#security-privacy-and-trust)
- [Phased roadmap and evidence gates](#phased-development-approach)
- [Development and research notes](#development)

<details>
<summary><strong>Explore the documentation map</strong> — requirements, research, operating model and architecture</summary>

**Document map**

| Document | Use it for |
|---|---|
| [Manifesto](MANIFESTO.md) | Product philosophy and founding proposition |
| [Product requirements](docs/PRODUCT-REQUIREMENTS.md) | User needs, functional scope and acceptance criteria |
| [Operating model](docs/STAAS-OPERATING-MODEL.md) | How the service is intended to work |
| [Architecture and TRL](docs/ARCHITECTURE-AND-TRL.md) | Component boundaries, dependencies and provisional readiness |
| [Research register](RESEARCH.md) | Sources, research claims, evaluation questions and limitations |
| [Continuity without sameness](docs/CONTINUITY-WITHOUT-SAMENESS.md) | Biblical memory, recontextualisation, information theory, computing and cultural knowledge transmission |
| [Architecture decision records](docs/adr/README.md) | Decision history, status and reconsideration triggers |
| [3Blue1Brown and STaaS](docs/3BLUE1BROWN-AND-STAAS.md) | Learning design and conceptual teaching precedent |

</details>

---

## Product and architecture at a glance

~~~text
                  STaaS: STRATEGY AS A SERVICE
       Discover what exists. Understand what it means.
       Validate what is true. Apply it. Learn from outcomes.

+----------------------+  +----------------------+  +----------------------+
| KNOWLEDGE DISCOVERY  |  | CONCEPTUAL LEARNING  |  | FOUNDER EXPERIENCE   |
| HackerTube approach  |  | 3Blue1Brown          |  | Simon Squibb         |
| signal mining        |  | visual explanation  |  | HelpBnk / community  |
+----------+-----------+  +----------+-----------+  +----------+-----------+
           \                       |                         /
            +----------------------+------------------------+
                                   |
                                   v
                    +-----------------------------+
                    | SOURCE + RIGHTS GOVERNANCE  |
                    | provenance, quality, context|
                    +--------------+--------------+
                                   |
                                   v
                    +-----------------------------+
                    | KNOWLEDGE FOUNDATION        |
                    | records, catalogue, DWH,    |
                    | searchable evidence         |
                    +--------------+--------------+
                                   |
                                   v
                    +-----------------------------+
                    | STRATEGIC INTELLIGENCE      |
                    | parameters, retrieval,      |
                    | models, deterministic checks|
                    +--------------+--------------+
                                   |
                                   v
                    +-----------------------------+
                    | FOUNDER DECISIONS           |
                    | experiments, milestones,    |
                    | outcomes and learning       |
                    +-----------------------------+
                                   ^ 
                                   +------ feedback loop
~~~

The three named creator/platform examples are complementary precedents, not integrations, endorsements or evidence that the STaaS backend already exists. The current application remains the prototype described below; the larger pipeline is a proposed architecture.

---

## Why build STaaS?

Founders can find articles, watch talks, use a business-plan generator and ask a general-purpose chatbot for advice. Those activities often remain disconnected. They may produce information without helping the founder understand which evidence applies, what is uncertain, what to test next or how new learning should change the plan.

STaaS is intended to close that gap. It should help a founder:

1. **Understand** their idea, customer problem, market and constraints.
2. **Learn** the concepts and frameworks needed to reason about the business.
3. **Compare** relevant company cases, including failures, pivots, acquisitions, financing and operational challenges.
4. **Challenge** assumptions through respectful, evidence-grounded dialogue.
5. **Decide** between strategic options while retaining ownership of the decision.
6. **Act** through experiments, milestones and prioritised work.
7. **Review** outcomes and adapt the strategy as evidence changes.

The platform should not assume that a founder has access to a large local network, nearby incubator or obvious precedent. It should surface relevant knowledge across the US, UK, Europe, Africa, Asia and diaspora markets while making contextual differences explicit.

## Case study: Darlington Akogo, minoHealth AI Labs and the work behind locally grounded AI

<details>
<summary>Expand this section: Case study: Darlington Akogo, minoHealth AI Labs and the work behind locally grounded AI</summary>


> A founder should not have to discover every relevant dataset, research paper, company precedent, market constraint and validation requirement entirely through trial and error.

The journey of Ghanaian AI entrepreneur **Darlington Akogo**, founder of [minoHealth AI Labs](https://www.minohealth.ai/), illustrates why. It is not a story of simply having an AI idea and finding a model. It is a story about recognising a real problem, revising an initial diagnosis of that problem, learning a new technical discipline, finding domain expertise, assembling data, earning institutional credibility and understanding that a working model is not automatically a deployable healthcare product.

### From a frustrating experience to a better problem definition

Akogo has described a hospital experience in Ghana that made him think about how technology might improve healthcare access. His first interpretation was that appointment systems and queues were part of the problem. As he read, investigated and spoke with people in healthcare, he came to see a more fundamental constraint: shortages of clinicians and specialist capacity, including radiologists.

That change matters. The first problem he noticed was not necessarily the root problem worth solving. A scheduling tool might make queues more orderly without creating more diagnostic capacity. The venture direction changed as he learned more about the operating environment.

In a 2017 interview, Akogo described minoHealth as a broader system combining medical prediction and diagnosis, cloud medical records and data analytics. He said he and a liaison consulted and interviewed healthcare professionals in Ghana and abroad. He also described spending around ten months building the system, reading medical and AI research papers, coding and developing interface designs. This early account shows the breadth of work behind the product: domain discovery, literature review, expert consultation, system design and engineering, not model selection alone.

### From hand-written rules to data-driven methods

Akogo initially explored writing rules for a pneumonia-focused diagnostic system. He found that symptoms and clinical presentations are not cleanly separable: a pattern associated with one condition may be caused by another. The complexity of the problem pushed him towards machine learning and deep learning.

For medical imaging, the task became learning patterns from X-rays rather than attempting to encode every diagnostic rule manually. In a 2023 interview, he described collecting data and developing a system that could analyse X-ray images. The important lesson is not that data collection is a trivial replacement for rules. It is that the task required a different technical approach, suitable data, medical understanding and a way to establish whether the outputs were clinically meaningful.

The journey also included setbacks. Akogo told Ghana Business News that he lost his computer and the work stored on it, subsequently spent time in Italy and returned to Ghana in 2016 to continue. He also described early difficulty getting healthcare professionals to engage because he and the project lacked credibility. Working with Professor Xavier-Lewis Palmer, undertaking research and testing, and publishing work on AI in health helped build the credibility needed for conversations with healthcare institutions.

### Why a model is not the whole product

Akogo's account makes a distinction that STaaS should preserve. Healthcare AI is not validated merely because it produces an answer quickly. He described learning about clinical validation, regulation and policy, and why the requirements differ from a comparatively bounded fintech transaction. In healthcare, errors can affect human lives, and clinicians and regulators have essential roles in determining whether a system is safe and acceptable.

The 2024 Stanford Social Innovation Review profile places minoHealth in the wider context of diagnostic access and medical-imaging workflows. It describes the platform's work with chest X-rays, mammograms, CT scans and MRI, and its evolution beyond a single narrow diagnostic demonstration. These are reported descriptions of the company and its platform, not an independent clinical-effectiveness assessment by STaaS.

### The international perspective: “ground zero” is where the problem is

At the **World Bank Group's Global AI & Digital Summit in Seoul, Republic of Korea (19–22 October 2026)**, Akogo took part in the session *Closing the Gap: The Promise of Artificial Intelligence in Developing Economies*. He explained why minoHealth was deliberately built in Ghana rather than relocating the company to the United States. His argument was that Africa is “ground zero” for addressing major healthcare challenges: innovators need to be close to the people, institutions and conditions they are trying to serve.

He also argued that African biological diversity can contribute valuable data for AI systems with relevance beyond the continent. The point is not that one dataset represents every population, or that geographic origin guarantees representativeness. It is that locally relevant data and proximity to the problem are strategic assets, and that systems developed without the right populations and contexts may fail to transfer.

In the same summit discussion, Akogo described moving from diagnostic imaging models towards healthcare and biology foundation models, and discussed Moremi AI and its use in clinical decision support. He also stressed the importance of working with local experts, selecting real use cases, piloting and benchmarking systems before scaling. His contribution therefore connects local problem understanding, data, model development, deployment context and implementation discipline.

This was a **World Bank summit panel/session**, rather than a lecture specifically about technical “grounding” or retrieval-augmented generation. The phrase “ground zero” refers to where innovation should be rooted. It is a useful strategic idea for STaaS, but should not be misrepresented as a technical claim about grounding an LLM.

### What STaaS learns from this case

The case demonstrates the founder's evidence burden. Relevant information is distributed across interviews, specialist knowledge, academic literature, datasets, institutional requirements, regulation, implementation partners and real-world feedback. A founder may not know which of these sources exist, which apply to their context, what rights govern their use or what evidence is sufficient to proceed.

STaaS is intended to reduce that discovery and coordination burden through an evidence-led workflow:

1. **Discover:** identify relevant datasets, research, company precedents, sector reports, standards, regulations, funders and potential domain experts.
2. **Qualify:** record source identity, publisher, date, geography, population, methodology, licence, access conditions and limitations. Distinguish public metadata from access to the underlying data.
3. **Connect:** map evidence to the founder's problem, customer, operating context, strategic assumptions and assessment parameters.
4. **Challenge:** identify gaps, conflicting findings, transferability risks and claims that lack sufficient support.
5. **Validate:** propose proportionate tests, expert conversations, pilots and measurable acceptance criteria. In regulated or safety-critical sectors, identify the relevant specialist and regulatory validation pathways rather than pretending the platform can replace them.
6. **Preserve and learn:** retain provenance, decisions, outcomes and revisions so the founder does not have to rediscover the same context at every stage.

For a healthcare AI founder, this might mean surfacing relevant medical-imaging research, dataset documentation, population and modality limitations, clinical evaluation guidance, regulatory pathways and comparable deployments. It must not imply that STaaS can grant access to restricted patient records, confer data-use rights, certify a model or replace clinicians, ethics review or regulators.

**The strategic proposition:** STaaS should help founders find out what they need to know, understand why it matters, see what remains unknown and determine what evidence would justify the next decision. It is an evidence-discovery and strategic-learning layer, not an automated substitute for domain expertise or validation.

**Sources and further reading**

- [Tech Labari (15 August 2017): interview with Darlington Ahiale Akogo about minoHealth](https://techlabari.com/can-minohealth-revolutionize-health-care-industry-ghana-healthcare-system/) — early product scope, consultations with healthcare professionals in Ghana and abroad, research reading and development effort.
- [Ghana Business News (24 February 2023): Darlington Akogo and MinoHealth transforming healthcare in Ghana with artificial intelligence](https://www.ghanabusinessnews.com/2023/02/24/darlington-akogo-and-minohealth-transforming-healthcare-in-ghana-with-artificial-intelligence/) — origin story, problem reframing, data collection, transition from rules to machine learning, credibility, validation and regulation.
- [Stanford Social Innovation Review (Fall 2024): Using AI to Improve Medical Diagnostics in Africa](https://ssir.org/articles/entry/ai-medical-diagnostics-africa) — healthcare context and minoHealth's diagnostic-imaging work.
- [World Bank Live: Global AI & Digital Summit – Closing the Gap](https://live.worldbank.org/en/event/2026/global-ai-digital-summit-artificial-intelligence-developing-economies) — Seoul summit session transcript, Akogo's “ground zero” argument, local data context, pilots and scaling.
- [ITU: Darlington Akogo biography](https://www.itu.int/en/ITU-T/academia/kaleidoscope/2022/Pages/Darlington-Akogo.aspx) — his wider work on AI for radiology, data management and global health collaboration.

*Case-study note: this section synthesises public interviews, profiles and an event transcript. Company capabilities and deployment statements are attributed to those sources; they are not presented as independently verified clinical performance findings.*

</details>

## Product at a glance

### Current application

The imported application is an early **Business Idea Analyzer**. It accepts a free-text business idea and produces four structured sections through a deterministic, heuristic, browser-side analysis engine:

| Stage | Current purpose |
|---|---|
| Clarity | Clarify the concept, customer problem and business model |
| Niche | Explore target segments and positioning |
| Action | Suggest initial actions |
| Strategy | Synthesize a broader strategic direction |

The documented application baseline includes React, TypeScript and Vite; responsive Tailwind CSS and Lucide icons; English and Italian interface/output language selection; deterministic browser-side analysis; Supabase authentication and user-scoped report persistence; report history, deletion and browser print-based PDF export; and progress feedback across the four stages.

The current engine does **not** conduct live market research, validate demand, access authoritative financial data or provide professional legal, tax, accounting or investment advice. Outputs are hypotheses and prompts for founder validation, not verified facts or guaranteed outcomes.

### The intended parameter-based business assessment

The four-stage flow is the presentation and workflow structure. The next analytical step is to make the underlying assessment parameter-driven: every business is examined against a consistent set of dimensions, while the depth and relevance of each dimension adapt to the venture's sector, stage, geography and business model.

| Assessment dimension | Questions the platform should investigate |
|---|---|
| Problem and need | Is the problem specific, consequential and evidenced? Who experiences it, and how is it addressed today? |
| Customer and segment | Who is the buyer, user and decision-maker? Which segment is reachable first? |
| Market and context | What is the addressable market, geography, demand context and timing? Which claims have reliable sources? |
| Value proposition | What measurable value is offered, to whom, and compared with which alternatives? |
| Competition and positioning | What direct, indirect and substitute solutions exist? What is genuinely differentiated? |
| Business and revenue model | How is value delivered and captured? Are pricing, purchasing behaviour and recurring revenue assumptions credible? |
| Financial viability | What are the cost drivers, gross margin, cash requirements, break-even assumptions and unit economics? |
| Operations and delivery | What people, partners, processes, supply chains and service capabilities are required? |
| Technology and data | What must be built or integrated? What data, infrastructure, security and maintenance requirements apply? |
| Regulation, rights and risk | Which legal, regulatory, privacy, IP, safety and contractual obligations need specialist review? |
| Feasibility and resources | What capabilities, funding, time and dependencies are available or missing? |
| Growth and resilience | What could constrain scale? How sensitive is the model to market, supplier, platform or funding changes? |

A parameter assessment should not collapse these dimensions into an unexplained pass/fail score. The intended record for each parameter is:

- **Assessment:** what the current information suggests.
- **Evidence:** source-linked facts, founder-provided information and relevant case comparisons.
- **Evidence quality:** provenance, date, rights, relevance and validation status.
- **Confidence:** how strongly the available evidence supports the assessment, with uncertainty stated.
- **Assumptions and gaps:** what is unknown, disputed or not yet tested.
- **Validation action:** the smallest useful research task or experiment to reduce uncertainty.
- **Strategic implication:** how the finding affects the founder's choices and priorities.

The assessment framework is a product design target, not a claim that the current heuristic engine already performs these checks. Until evidence ingestion and validation exist, the current prototype can structure an initial diagnostic but cannot substantiate market, financial, regulatory or competitive conclusions.

### Can a language model perform this analysis on its own?

A capable language model can produce a useful first-pass diagnosis, explain established frameworks, identify assumptions, compare options and draft structured recommendations. That is not the same as independently delivering reliable business strategy. The distinction is supported by published strategy evaluations:

**What model intelligence alone can do:** when given a clearly defined business problem and enough relevant information in the prompt, a capable model can organise the problem, apply familiar frameworks, identify assumptions and contradictions, generate strategic options, explain trade-offs and write a coherent first-pass analysis. In bounded tasks, a strong reasoning model may do substantial analytical work without a separate retrieval system.

**What it cannot be assumed to do reliably on its own:** a model without external retrieval cannot independently discover and verify current market datasets, company developments, local operating conditions, regulatory changes or source permissions. Its pretraining is not a live evidence base. Even when it produces a persuasive analysis, it may misstate facts, invent supporting detail, miss a root cause, miscalculate, transfer a precedent to the wrong context, overlook a non-consensus option or express more confidence than the evidence warrants. A larger model or a reasoning-oriented model may improve some tasks, but neither model size nor fluent writing establishes dependable strategic judgement.

The answer to the product question is therefore **yes, model intelligence alone can perform useful analytical work; no, it should not be treated as sufficient for dependable, end-to-end business intelligence.** It can be the analyst's reasoning engine, but it cannot guarantee that the information it reasons from is complete, current, locally relevant or true. STaaS must test the model's standalone reasoning separately from the quality of the wider evidence and workflow system.

To make that distinction measurable, STaaS should keep three evaluation conditions separate:

1. **Model-only:** give each model the same business problem and prompt, without browsing, retrieval or supplied research pack. This tests what the model can infer, structure and reason from its prompt and learned knowledge.
2. **Model with a fixed evidence pack:** give each model the same curated facts and source extracts, still without live retrieval. This tests whether it can interpret evidence, apply frameworks, compare options and avoid claims not supported by the pack.
3. **Evidence-enabled STaaS:** use the same model with governed retrieval, provenance, deterministic calculations and the structured assessment workflow. This tests the contribution of the platform, not just the model.

The comparison should score diagnosis, framework application, critical evaluation, alternatives and trade-offs, feasibility, KPIs, numerical correctness, evidence fidelity, uncertainty, contextual transfer and appropriate abstention. The model-only result must not be credited with facts that were supplied by the evidence pack, and the evidence-enabled result must not attribute retrieval or deterministic-check benefits to model intelligence.

- **Doshi et al. (Strategic Management Journal, first published 14 November 2024):** across two studies using 60 business models each, LLM evaluations were often inconsistent and biased at the individual-comparison level. Aggregated rankings tended to resemble human-expert rankings. This supports using model output as decision support, with structured comparison and human judgement, rather than treating one answer as an authoritative verdict. [Paper and DOI](https://doi.org/10.1002/smj.3677).
- **Allen and McDonald (Strategy Science, published online 11 March 2026):** benchmarked 21 proprietary and 13 open models in the Back Bay Battery strategy simulation. Performance varied by model generation; some reasoning-focused models exceeded historical MBA cohort averages, while several later frontier models regressed. The simulation highlights long-horizon trade-offs between exploiting a profitable core and investing in emerging opportunities. This is evidence that some models can perform strongly in a bounded strategic simulation, not proof that any model can independently advise a real founder. [Paper and DOI](https://doi.org/10.1287/stsc.2025.0444).
- **Stoeber et al. (Journal of Business Research, July 2026):** compared 2,400 model-generated strategic recommendations across ten cases and four models with a human benchmark of 218 managers. The authors report a tendency towards strategic conformity under institutional pressure. This warns that fluent recommendations may reproduce prevailing assumptions instead of identifying when a business should diverge. [Paper and DOI](https://doi.org/10.1016/j.jbusres.2026.116227).

**STaaS interpretation:** the model is a reasoning component, not the entire intelligence system. It can interpret a parameter framework and help a founder reason, but reliable analysis also requires current and relevant evidence, source provenance, deterministic calculations and checks, explicit uncertainty, contextual comparison, and founder or expert review for consequential decisions. A model should be able to say that evidence is missing, ask for it, and abstain from unsupported conclusions.

### Model capability assessment and local inference

The project is investigating compact models because deployment cost, latency, privacy and hardware accessibility matter to the STaaS delivery model. Current evidence must be separated into three categories:

1. **Published model research:** Microsoft’s Phi-3, Phi-4 and Phi-4-reasoning technical reports explain how data curation, synthetic data, supervised fine-tuning, preference optimisation and reasoning-focused post-training contribute to model capability. Parameter count alone does not determine reasoning quality. These reports do not establish that a small model automatically matches a larger model on STaaS tasks. See the [Phi-3 report](https://arxiv.org/abs/2404.14219), [Phi-4 report](https://arxiv.org/abs/2412.08905) and [Phi-4-reasoning report](https://arxiv.org/abs/2504.21318).
2. **Local runtime observation:** the project owner reported approximately 40.96 tokens/second for Liquid AI LFM2.5-1.2B-Instruct using OpenVINO INT4 CPU inference on an Intel Core i5-1135G7 system with 8 GB RAM. Other reported observations include approximately 38.3 tokens/second with Ollama Q4, 15.28 tokens/second with OpenVINO on Iris Xe, and 28.0 tokens/second with Ollama Q8 CPU. These are owner-reported runtime measurements, not independently reproduced benchmark results. They measure throughput, not reasoning quality.
3. **STaaS-specific reasoning evaluation:** no controlled, held-out comparison has yet been recorded here that establishes LFM2.5, Phi-4 Mini Reasoning or another model's score on the STaaS business-analysis rubric. Phi-4 Mini Reasoning is a candidate for comparison, not a model result claimed by this repository. No percentile or human-equivalence claim is justified.

The next evaluation should compare the same tasks, prompts, evidence pack and scoring rubric across (a) a base compact model, (b) the same model with retrieval and structured STaaS workflow, and (c) a stronger reasoning-model reference. The rubric should be anchored in the user's USW Strategic Information Systems Management learning outcomes and cover problem diagnosis, technique/framework selection and application, critical evaluation, alternatives and trade-offs, implementation feasibility, measures/KPIs, and reflective justification. Add evidence accuracy, citation support, numerical correctness, uncertainty calibration, contextual transfer, consistency and abstention. Use independently scored examples, held-out businesses/sectors/geographies, multiple runs where appropriate, and report raw scores and uncertainty rather than unsupported percentiles.

The key question is therefore not simply whether a model can write a convincing analysis. It is whether it can repeatedly produce defensible, evidence-linked assessments and recognise the limits of its knowledge.

### Intended STaaS service cycle

~~~text
DISCOVER → DIAGNOSE → LEARN → STRATEGISE → PRIORITISE
    ↑                                           ↓
 REVIEW ← MEASURE ← EXECUTE ← EXPERIMENT ← DECIDE
~~~

Each recommendation should have a visible rationale, evidence basis, owner, next action, expected outcome and review point. A plan should evolve when new evidence arrives.

## Research-informed design

<details>
<summary>Expand this section: Research-informed design</summary>


Three connected ideas shape the proposed product:

1. **Business intelligence as reusable knowledge.** Preserve source provenance and context so a founder can learn from companies beyond their immediate geography or network. Do not reduce a business to a success/failure label: preserve events, constraints, decisions, pivots and outcomes over time.
2. **Reflective, evidence-led dialogue.** Research on personalised LLM dialogue and belief revision motivates a testable design in which the system elicits assumptions, presents relevant evidence and counterexamples, invites reflection and records the founder's own reasoning. This is a design hypothesis for entrepreneurship education, not proof of STaaS effectiveness. The 2024 Science study has a subsequent expression-of-concern and erratum; see the [publication-history note in RESEARCH.md](RESEARCH.md#1-personalised-evidence-based-dialogue-and-belief-revision).
3. **Learning is not the same as recall.** Spaced retrieval may help founders remember concepts, but applied competence must be evaluated separately through scenarios, decisions, experiments and observed follow-through.

The ethical objective is informed founder agency, not persuasion or agreement with the model. Founders must be able to disagree, inspect sources and retain control of consequential decisions.

</details>

## Knowledge acquisition and source ecosystem

<details>
<summary>Expand this section: Knowledge acquisition and source ecosystem</summary>


STaaS should not depend on one creator, platform, search engine or content format. Its knowledge foundation needs a source-adapter architecture that can discover and qualify different kinds of material while preserving the original context and rights.

### Complementary precedents

| Precedent | What it demonstrates | What STaaS should learn | What it does not prove |
|---|---|---|---|
| [Andrej Karpathy's HackerTube](https://github.com/karpathy/hn) | A discovery approach that mines community signals and recommendations to surface useful video material. | Discover candidate knowledge from existing signals rather than relying only on manually curated lists. Preserve the original recommendation context and rank signals. | Popularity or repeated recommendation does not establish accuracy, completeness, suitability or permission to reuse content. |
| [3Blue1Brown](https://www.3blue1brown.com/) | Carefully structured visual explanations that build intuition about difficult technical ideas. | Help founders understand concepts and mechanisms, not merely receive a generated answer. | A clear explanation is not automatically a complete business framework or proof of commercial applicability. |
| [Simon Squibb and HelpBnk](https://www.simonsquibb.com/helpbnk) | A founder-facing ecosystem combining public educational content, interviews, mentorship, practical resources and community participation. See also the [HelpBnk video channel](https://www.youtube.com/@HelpBnk). | Include practitioner experience, founder questions, mentor perspectives and practical routes to action. Treat Simon's public content and HelpBnk's own public resources as a source family, not just a single YouTube channel. | Personal stories, mentor opinions, promotional claims and community anecdotes are not interchangeable with independently corroborated evidence. |
| TED/TEDx, universities and open research | Research-led talks, lectures, specialist perspectives and documented methods. | Connect founder questions to deeper concepts, domain expertise and primary research. | A talk is not a substitute for the underlying paper, dataset, standard or current regulation. |

These examples define different functions in the knowledge system: **discover**, **explain**, **contextualise** and **apply**. STaaS combines those functions with evidence governance and founder-specific strategic analysis.

### Source classes and evidence treatment

The source registry should distinguish at least:

1. **Primary evidence:** datasets, official statistics, filings, standards, regulations, peer-reviewed research and original documentation.
2. **Expert interpretation:** lectures, interviews, specialist analysis and professional guidance.
3. **Founder and operator experience:** first-person accounts, case studies, post-mortems and practical lessons.
4. **Community signals:** questions, recommendations, discussions and recurring reported problems.
5. **Promotional material:** product pages, sponsored content, marketing claims and platform announcements.

Community and popularity signals are useful for discovering topics and recurring needs. They must not be promoted to factual evidence without corroboration. Record conflicts of interest and distinguish the speaker's own claims from independently verified outcomes.

### Proposed acquisition and qualification pipeline

~~~text
DISCOVER
  Search, recommendations, public catalogues, APIs, user submissions
    |
    v
IDENTIFY
  Canonical URL, creator, publisher, content type, date, source family
    |
    v
CHECK RIGHTS AND ACCESS
  Licence, terms, privacy, public/member-only status, permitted purpose
    |
    v
CAPTURE PERMITTED MATERIAL
  Metadata, links, authorised transcripts, open documents, user uploads
    |
    v
NORMALISE AND DEDUPLICATE
  Stable source identity, versions, timestamps, language, entities
    |
    v
CLASSIFY
  Topic, business parameter, founder stage, sector, geography
    |
    v
EXTRACT WITH PROVENANCE
  Claims, frameworks, examples, questions, limitations, source anchors
    |
    v
QUALIFY AND CORROBORATE
  Evidence type, expertise, recency, methodology, conflicts, contradictions
    |
    v
RETRIEVE IN CONTEXT
  Match to founder problem, assumptions, constraints and decision
    |
    v
ANALYSE, TEST AND LEARN
  Options, trade-offs, experiments, outcomes and refreshed evidence
~~~

### Minimum source record

Each source record should preserve, where available:

- canonical URL and stable source identifier;
- author, speaker, publisher and organisation;
- title, content type, language, publication/event date and retrieval date;
- source family and discovery method, including recommendation context where relevant;
- licence, terms, access classification, permission status and permitted use;
- capture method, transcript/document provenance and extraction-tool version;
- topic taxonomy, business-parameter tags, founder stage, sector and geography;
- extracted claims and frameworks with page, section or timestamp anchors;
- evidence category, quality rationale, corroborating sources and conflicting evidence;
- limitations, uncertainty, review status and last-checked date.

### Rights, privacy and platform boundaries

Publicly viewable does not mean freely reusable, downloadable, modifiable or suitable for model training. Use official APIs and permitted metadata access where available. Do not scrape private/member-only HelpBnk material, collect personal community data without a lawful basis, bypass access controls or assume that a platform's public video grants commercial reuse rights. Where rights do not permit copying or transcript storage, retain only permitted metadata and a link to the original.

The initial corpus should prioritise public, rights-cleared or user-authorised sources. A source adapter should be replaceable without changing the canonical STaaS knowledge model. Retrieval indexes are rebuildable projections, not the authoritative record.

</details>

## Conversational workspace, tools and interactive apps

<details>
<summary>Expand this section: Conversational workspace, tools and interactive apps</summary>


The chat interface is intended to become a multi-capability workspace, not just a text box connected to one model. The Vercel AI SDK is a candidate TypeScript foundation for streaming, provider abstraction, structured outputs, tool calling, agent loops and React chat state. Its MCP integration can connect compatible external tools and resources. Its documented MCP Apps host pattern can also render interactive interfaces returned by MCP tools.

This creates a route towards some of the interaction patterns familiar from ChatGPT Apps: the user asks for a task, the assistant invokes a capability, and a focused interface appears inside the conversation to inspect, compare, edit or confirm the result. The portable foundation should be the open MCP Apps protocol, not a dependency on ChatGPT's proprietary host APIs.

### Capability layers

| Layer | Candidate capability | STaaS examples |
|---|---|---|
| Conversation | AI SDK UI streaming and typed message parts | Progressive answers, saved conversation context and tool status |
| Model orchestration | AI SDK Core, provider adapters and agent/tool loops | Select a model for research synthesis, structured analysis or summarisation |
| Native STaaS tools | Typed, application-owned tools | Score business parameters, calculate unit economics, validate assumptions, build an experiment plan |
| External integrations | MCP clients and scoped MCP servers | Connect approved research, document, CRM, project and data services |
| Interactive tool apps | MCP Apps resources and host rendering | Evidence explorer, market-comparison table, roadmap editor, financial scenario controls |
| Purpose-built interface | React generative UI | Charts, source cards, parameter scorecards, decision forms and review panels |
| Multimodal input/output | Provider/model-dependent file, image, audio and other modalities | Analyse a founder-uploaded document or image; voice interaction where supported |
| Human control | Explicit approval and confirmation states | Confirm external writes, sending messages, spending, publishing or changing business records |

### Example interaction

~~~text
FOUNDER
  "Compare these business models and help me test the pricing."

       |
       v
STaaS CHAT / AI SDK
  streams progress; asks clarifying questions
       |
       +----> STaaS NATIVE TOOLS
       |        parameter analysis · unit economics · validation rules
       |
       +----> MCP CONNECTORS
       |        approved research · CRM · documents · project tools
       |
       +----> KNOWLEDGE SERVICES
       |        source catalogue · retrieval · provenance · DWH
       |
       v
STRUCTURED RESULTS
  evidence + assumptions + calculations + uncertainty
       |
       v
INTERACTIVE UI
  comparison · charts · scenario controls · evidence explorer
       |
       v
FOUNDER REVIEW / APPROVAL
  accept · edit · reject · request more evidence
       |
       v
AUDITED WORKFLOW
  approved action · decision record · outcome measurement
~~~

### MCP Apps and ChatGPT Apps: compatibility, not equivalence

OpenAI's Apps SDK uses MCP servers and supports optional interactive UI resources. The MCP Apps specification provides a shared host/UI protocol intended to work across compatible clients. A Vercel AI SDK application can implement an MCP Apps host, but it does not thereby become ChatGPT, inherit every ChatGPT Apps capability, or gain access to ChatGPT's proprietary host extensions.

STaaS should build its own first-party chat and interactive component system, expose portable capabilities through well-scoped MCP tools and resources, use MCP Apps for interoperable tool-provided UI where supported, and keep any ChatGPT-specific extension optional. Provide a useful text/structured-data fallback when a host cannot render a widget.

### Important implementation and security boundaries

The AI SDK is an orchestration/UI toolkit, not a complete permissions, tenancy, audit, billing or workflow-governance system. STaaS must supply those controls.

- Keep model API keys and privileged connector credentials server-side.
- Authenticate each founder and bind every tool invocation to an authorised tenant and user.
- Allowlist MCP servers and tools; do not expose every discovered tool to every model or user.
- Validate tool input and output against schemas and enforce timeouts, quotas and rate limits.
- Separate read-only tools from write-capable tools.
- Require explicit user confirmation for consequential external writes, spending, publishing, messaging and irreversible changes.
- Record actor, tool, arguments (with sensitive fields redacted), approval, outcome and correlation ID in an audit trail.
- Treat MCP tool descriptions, resource content, documents and widget HTML as untrusted input.
- Render MCP Apps in a sandbox with a narrowly scoped bridge; never grant an iframe direct access to application secrets or unrestricted APIs.
- Keep authoritative business state in STaaS services. UI widget state and provider conversation state are not the system of record.
- Support connector revocation, failure handling, retries with idempotency and export/exit paths.

### Delivery status

This is a proposed architecture. The current repository describes a React/TypeScript/Vite deterministic analyzer with Supabase authentication and report persistence. It does not currently establish that Vercel AI SDK, an MCP client/server, MCP Apps rendering, multimodal chat, agent orchestration or ChatGPT Apps compatibility has been implemented. Verify the package manifest and runtime before changing any capability to implemented.

The MCP Apps renderer documented by Vercel is marked experimental in the referenced integration guide. Pin and test compatible versions, isolate the renderer behind an adapter and retain a fallback before relying on it in a production workflow.

</details>

## Proposed system architecture

<details>
<summary>Expand this section: Proposed system architecture</summary>


The diagrams distinguish the current application from the proposed knowledge and intelligence services.

### Current prototype boundary

~~~text
┌──────────────────────────────────────────────────────────┐
│             React + TypeScript + Vite UI                 │
│                                                          │
│  Idea input → Clarity → Niche → Action → Strategy        │
│                     │                                    │
│             Deterministic browser-side engine            │
│                     │                                    │
│        Report view / print-to-PDF / history UI           │
└─────────────────────┬────────────────────────────────────┘
                      │ Supabase client
          ┌───────────┴────────────┐
          │                       │
     Supabase Auth          Reports storage
          │                       │
          └──── user-scoped RLS ──┘
~~~

This is the documented current baseline. It is not a live research agent, DWH, vector database, knowledge catalogue or managed strategy service.

### Why browser-first, and why consider WebAssembly (WASM)?

The current prototype executes its deterministic TypeScript/JavaScript analysis in the browser. That is a deliberate low-friction starting point, but it is important not to overstate the implementation: **the current repository does not establish that the analysis engine is compiled to or running as a WebAssembly module.**

The browser-first direction is useful because it can provide:

- **Fast feedback:** deterministic analysis can run locally without a model-inference round trip.
- **Lower service dependency:** the basic diagnostic does not need a continuously available analysis API.
- **Cost control:** routine rule-based processing does not incur per-request hosted-model inference costs.
- **Data minimisation:** initial idea text can be processed in the browser before any optional persistence or external processing, subject to the actual application flow and user consent.
- **Portability:** a browser-delivered application can run across supported operating systems without a native desktop installation.

WASM is a potential next step where profiling shows a concrete benefit. It can provide a portable, sandboxed execution target for computationally intensive or reusable modules, and may allow selected components written in languages such as Rust to run in supported browsers. It is not automatically faster than JavaScript, does not itself provide offline persistence, and is not a substitute for application security, permissions, privacy controls or server-side authorisation.

The implementation decision should therefore be evidence-led: benchmark representative workloads, bundle size, startup time, memory use and browser compatibility before introducing WASM. Keep ordinary UI and workflow code in TypeScript unless a measured use case justifies a WASM module. Supabase remains a separate persistence/authentication dependency in the current prototype; browser-side execution does not mean all data stays on the device.

### Target STaaS architecture (proposed)

~~~text
┌──────────────────────────────────────────────────────────────────────┐
│                         FOUNDER EXPERIENCE                           │
│ Idea workspace · Learning coach · Case explorer · Strategy · Tasks  │
│ Evidence register · Assumption ledger · Decision log · Review       │
└───────────────────────────────┬──────────────────────────────────────┘
                                │
┌───────────────────────────────▼──────────────────────────────────────┐
│                 FOUNDER & BUSINESS STRATEGIC STATE                   │
│ Goals · Stage · Sector · Geography · Constraints · Capabilities     │
│ Assumptions · Confidence · Decisions · Experiments · Outcomes       │
│ Consent · Access policy · Version history                           │
└───────────────────────────────┬──────────────────────────────────────┘
                                │
┌───────────────────────────────▼──────────────────────────────────────┐
│                  REASONING & WORKFLOW ORCHESTRATION                  │
│ Retrieval-augmented dialogue · Framework selection · Planning       │
│ Deterministic finance/schema checks · Tool permissions              │
│ Human approval for consequential actions                            │
└───────────────┬─────────────────────────────┬────────────────────────┘
                │                             │
┌───────────────▼────────────────┐  ┌─────────▼────────────────────────┐
│       KNOWLEDGE CATALOGUE      │  │       LEARNING & EVALUATION      │
│ Company cases · Frameworks     │  │ Spaced recall · Scenario tasks   │
│ Datasets · Founder evidence    │  │ Calibration · Competence         │
│ Search · Filters · Discovery   │  │ Held-out benchmark · Feedback    │
└───────────────┬────────────────┘  └──────────────────────────────────┘
                │
┌───────────────▼──────────────────────────────────────────────────────┐
│                    DATA & KNOWLEDGE FOUNDATION                       │
│ Source register → rights review → fetch/import → OCR/parsing         │
│      → entity/event resolution → validation & human review           │
│                                                                      │
│   ┌────────────────┐  ┌────────────────┐  ┌──────────────────────┐  │
│   │ OKF interchange│→ │ DWH / analytics│→ │ Search/vector index │  │
│   │ portable record│  │ history/metrics│  │ rebuildable view    │  │
│   └────────────────┘  └────────────────┘  └──────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
                │
┌───────────────▼──────────────────────────────────────────────────────┐
│                 SOURCES & CONNECTED KNOWLEDGE                        │
│ Public filings · Enterprise surveys · Research · Case studies        │
│ Founder uploads · Interviews · Product/market evidence               │
└──────────────────────────────────────────────────────────────────────┘

Cross-cutting: provenance · licensing · privacy · security · auditability
               portability · observability · backup · deletion controls
~~~

### The roles of OKF, DWH and catalogue

These are separate responsibilities, not interchangeable names for one database.

| Layer | Intended responsibility | Not a substitute for |
|---|---|---|
| **OKF** | Portable, versioned, provenance-aware knowledge interchange artefacts. The canonical specification and schema must be verified before claiming conformance. | Conversation history, embeddings or hidden model reasoning. |
| **DWH** | Governed analytical integration of source-grain records, entities, events, geography, sector, time and outcomes. | Original documents or a portable exchange format. |
| **Catalogue** | Human- and machine-readable discovery across cases, datasets, frameworks and founder records. | Evidence validation, copyright permission or a guarantee that a result is true. |
| **Search/vector index** | Rebuildable keyword and semantic retrieval projections over governed records. | Canonical records, provenance or source rights. |

### Proposed evidence-to-learning data flow

~~~text
SOURCE REGISTER
   ↓
Rights / licence / privacy review
   ↓
Fetch or founder-authorised import
   ↓
Source capture and metadata (where lawful)
   ↓
OCR / parsing / extraction
   ↓
Entity resolution + event normalisation
   ↓
Validation, deduplication and human review
   ↓
OKF knowledge artefacts (schema verification required)
   ↓
DWH analytical history
   ↓
Catalogue + keyword/vector retrieval projections
   ↓
Contextual retrieval for founder question or decision
   ↓
Model + deterministic workflow + human approval
   ↓
Founder-approved decision / experiment / action
   ↓
Evidence and outcome captured; strategy reviewed
~~~

Every knowledge item should distinguish observed facts, attributed claims, founder assertions, model-generated interpretation and unresolved hypotheses. Preserve source identifiers, publisher, publication/event date, retrieval date, licence/terms, extraction method/version, validation status and lawful links to originals.

</details>

## Global business intelligence and contextual transfer

<details>
<summary>Expand this section: Global business intelligence and contextual transfer</summary>


The catalogue is intended to learn from businesses across the US, UK, Europe, Africa, Asia and diaspora communities. It should include businesses that grew, survived, stalled or closed; pivots and failed experiments; acquisitions, mergers and ownership changes; funding rounds, bootstrapping and financing constraints; operational challenges, infrastructure constraints and regulatory changes; and customer discovery, distribution, pricing and business-model changes.

A case from another market is a comparison, not a prescription. Capture the conditions that shape transferability: infrastructure, capital access, regulation, purchasing power, informality, language, distribution, institutions, supply chains and customer behaviour. When no close precedent exists, say so rather than inventing one.

</details>

## Founder learning and mental-model development

<details>
<summary>Expand this section: Founder learning and mental-model development</summary>


A proposed learning loop:

1. Ask the founder to explain their current model of the business in their own words.
2. Identify assumptions, confidence levels and the decision currently blocked by uncertainty.
3. Retrieve relevant cases, evidence and framework concepts, including credible counterexamples.
4. Explain what is comparable and what differs; make the evidence trail inspectable.
5. Invite the founder to revise, retain or reject their view and explain why.
6. Record the founder's decision and rationale, not merely the model's preferred answer.
7. Revisit the assumption after experiments or new evidence.
8. Use spaced retrieval for concept recall and separate applied tasks to assess competence.

Potential measures include comprehension, calibration, quality of reasoning, experiment design, decision quality and follow-through. Do not optimise for agreement, confidence inflation or a predetermined business outcome.

</details>

## Agent interoperability and infrastructure

<details>
<summary>Expand this section: Agent interoperability and infrastructure</summary>


The longer-term architecture may expose permissioned capabilities through MCP or other adapters so compatible agent harnesses (for example, OpenCode) can read approved knowledge and update authorised work items. The platform must own durable strategic state; provider-specific conversation formats and thought signatures are not portable business memory.

AKCloud may help founders assess deployment readiness, hosting options and applications for third-party startup programmes. It cannot guarantee Google Cloud credits or any provider award. External integrations must be optional, scoped, auditable and revocable.

</details>

## Security, privacy and trust

<details>
<summary>Expand this section: Security, privacy and trust</summary>


- Enforce authorisation server-side and test Supabase Row Level Security for every user-owned record.
- Treat business ideas, uploaded documents, interviews and financial data as confidential.
- Minimise collection; document retention, export, deletion and third-party processing.
- Keep service-role credentials out of browser code and Git history.
- Require explicit permission before sending founder data to external models or connected services.
- Log operational events without unnecessarily logging sensitive business content.
- Require founder approval for spending, publication, external communication and other consequential actions.
- Preserve evidence provenance and distinguish source facts from generated analysis.

**Known security blocker:** the imported project includes a demo-account setup Edge Function described as having JWT verification disabled and privileged Supabase administrative operations. Review, redesign or remove it before public production use. Do not expose a service-role secret or allow unauthenticated callers to delete/recreate accounts. Rotate credentials if exposure is suspected. The demo sign-in flow also requires abuse and access-control review.

</details>

## Phased development approach

<details>
<summary>Expand this section: Phased development approach</summary>


The phases are deliberately sequenced so that STaaS earns its intelligence claims through data quality, traceability and user validation. Each phase has an outcome and an evidence gate. Phases may overlap where useful, but later capabilities must not be presented as delivered before their gates are met.

| Phase | Focus | Intended deliverables | Exit evidence / status |
|---|---|---|---|
| 0. Prototype baseline | Establish the current application | React/TypeScript/Vite interface; Clarity → Niche → Action → Strategy flow; browser-side deterministic analysis; Supabase authentication and report history; PDF export | **Existing source baseline.** Reproducible build, lint, typecheck, RLS isolation and end-to-end tests still need to be run and recorded. |
| 1. Parameterised business diagnostic | Turn the four-stage flow into a transparent assessment model | Versioned parameter catalogue; sector/stage-aware applicability; structured assessments; explicit assumptions, evidence gaps, confidence and validation actions; explainable scoring only where justified | **Next product-engineering priority.** Unit tests for parameter coverage, deterministic outputs, edge cases and language handling; expert/founder review of assessment quality. |
| 2. Founder and venture workspace | Give each assessment context and continuity | Business profile; founder goals and constraints; evidence register; assumption ledger; decision log; consent and data controls; report versioning | User-scoped persistence, access-control tests, export/deletion tests and a usable founder workflow. |
| 3. Evidence acquisition and governance | Acquire information responsibly and make it inspectable | Source register; rights/licence and privacy review; source capture where lawful; document/table extraction; entity and event resolution; provenance; deduplication; validation and human review | Rights-cleared sample corpus, extraction-quality evaluation, lineage audit and repeatable refresh process. |
| 4. Knowledge foundation | Make evidence reusable across tools and analysis | Verified OKF interchange; governed DWH; knowledge catalogue; rebuildable keyword/vector retrieval projections | Canonical OKF schema/version linked and conformance tests passed; DWH lineage and quality checks; catalogue retrieval and export/import tests. |
| 5. Evidence-grounded reasoning and learning | Use evidence to challenge and improve founder understanding | Retrieval-augmented analysis; source-linked parameter assessments; comparable-case reasoning; counterexamples; reflective dialogue; spaced recall and applied scenarios | Held-out evaluation for factuality, citation quality, calibration, contextual transfer and learning outcomes; founder pilot. |
| 6. Strategy-to-execution loop | Turn decisions into measured work | Prioritised roadmap; experiments; owners; milestones; metrics; review cadence; outcome capture; strategy updates | Pilot evidence that founders complete experiments, record outcomes and make better-informed revisions; no unsupported business-success claims. |
| 7. Interoperability and managed STaaS | Make the platform portable and deliverable as a continuing service | Permissioned MCP/agent adapters; portable exports; operational controls; service onboarding, review and handover processes | Compatibility, security, backup/restore, provider-exit and service-delivery tests; repeatable customer outcomes. |

### How the phases fit together

~~~text
PHASE 0  Prototype
   ↓
PHASE 1  Parameterised diagnostic
   ↓
PHASE 2  Founder and venture context
   ↓
PHASE 3  Evidence acquisition + governance
   ↓
PHASE 4  OKF + DWH + knowledge catalogue
   ↓
PHASE 5  Evidence-grounded reasoning + learning
   ↓
PHASE 6  Strategy + experiments + measured outcomes
   ↓
PHASE 7  Interoperability + managed service
   ↺
New evidence and outcomes continuously update the founder's strategic state.
~~~

**Important sequencing principle:** do not use a language model to make an unsupported answer appear authoritative. First establish the assessment parameters, source rights, provenance, evidence quality and validation workflow. Then use retrieval and model-assisted reasoning to interpret that governed knowledge. Deterministic code should handle schemas, calculations, permissions and workflow rules; founders retain approval of consequential decisions.

See [ARCHITECTURE-AND-TRL.md](docs/ARCHITECTURE-AND-TRL.md) for component-level provisional TRLs and evidence gates. Do not represent the integrated product at the highest TRL of any individual component.

</details>

## Success measures to validate

- time from idea submission to a founder-approved next action;
- proportion of key assumptions with recorded validation evidence;
- experiment completion and learning capture;
- decision quality and calibrated confidence;
- comprehension of relevant business concepts;
- usefulness of retrieved cases and quality of contextual comparisons;
- milestone progress and review completion;
- successful data export, deletion and permission revocation.

Set numerical targets only after baseline research and user pilots. Do not claim improved revenue, funding, survival or venture success without suitable evidence.

## Development

Install dependencies and run the Vite development server:

~~~bash
npm install
npm run dev
~~~

Available scripts:

~~~bash
npm run dev       # Start Vite development server
npm run build     # Create production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run typecheck # Run TypeScript checks
~~~

Configure the Supabase project URL and public anon key using the variable names referenced in src/lib/supabase.ts. Keep local secrets in an ignored .env file and configure deployment secrets through the hosting platform. Never commit service-role keys. Apply and verify migrations in a non-production Supabase project before production.

## Research and evidence

<details>
<summary>Expand this section: Research and evidence</summary>


The [research register](RESEARCH.md) documents model-training literature, data-source leads, evidence on reflective LLM dialogue, evaluation design, open problems and limitations. It distinguishes published findings from STaaS hypotheses and engineering observations.

Important limits:

- A 3,000–5,000-example pilot is an experiment for a narrow task, not a proven threshold for business reasoning.
- A reported local tokens-per-second result is not evidence of reasoning quality.
- Dataset record counts are not unique business counts or training-example counts.
- Public availability does not automatically grant commercial reuse or model-training rights.
- Belief-revision studies do not validate entrepreneurship education or outcomes for African founders.
- No OKF conformance claim is justified until the canonical specification, version and round-trip tests are verified.

</details>

## Manifesto

> **Don't start from scratch. Start from what has already been learned, test what applies, and build what comes next.**

A founder should not have to rediscover every lesson independently. STaaS aims to make knowledge discoverable, contextual and actionable while respecting the limits of analogy and evidence.

We do not simply generate business plans. We aim to help founders build the mental models to understand, challenge, validate and evolve their businesses.

This is an independent product direction. References to public research, frameworks and organisations are not endorsements, partnerships or claims of affiliation.

## Contributing

Keep implementation claims aligned with the code. For substantial changes, update requirements, architecture, threat/data-flow notes, tests and the research register together. Mark proposed capabilities as proposed until code and validation evidence demonstrate otherwise.

## Licence, provenance and releases

Original STaaS materials are reserved to their applicable rights holders under
[LICENSE](LICENSE). Third-party components retain their own terms; see
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). The package is marked
`UNLICENSED`; public visibility does not grant permission to reuse original
code or documentation. Repository visibility and GitHub forking controls are
separate from copyright licensing; see the private-migration runbook before
relying on this public repository for confidentiality.

See [IP and provenance register](docs/IP-AND-PROVENANCE-REGISTER.md), [private repository migration runbook](PRIVATE-REPOSITORY-MIGRATION.md),
[security policy](SECURITY.md), [release policy](RELEASE.md), and
[CHANGELOG.md](CHANGELOG.md). The current development marker is `0.1.0-alpha.1`, not a
production-readiness claim. A tagged release is created only after the
validation and rights checks in the release workflow.
