# Compression, intelligence and cryptographic discovery

> **A timely case study for STaaS: intelligence as the discovery, representation, verification and reuse of meaningful structure.**

**Research note dated: 27 November 2026**

## Why this note exists

The cryptography discussion circulating on 26–27 November 2026 prompted a useful connection to the STaaS principle and the 3Blue1Brown *Compression is Intelligence* trilogy. The connection is not that RSA has been broken. No public evidence establishes that. The more important observation is that AI systems are increasingly being used to search mathematical spaces, coordinate research agents, generate candidate arguments and support formal verification.

This is a live example of the difference between compressing information into a useful representation and developing new knowledge from that representation.

## What prompted the connection

Three developments need to be kept separate.

### 1. Rumours about a possible factoring breakthrough

On 25 November 2026, computer scientist Scott Aaronson wrote that he was virtually certain, based on multiple sources, that AI laboratories held one or more significant cryptography results. He was much less confident about their specific nature and warned that details may have been distorted. He explicitly did not confirm that any lab had achieved polynomial-time integer factoring.

**Status: unverified reports.** A rumour about a result is not a result, and repeated circulation does not establish independent confirmation.

Primary source: [Scott Aaronson, Shtetl-Optimized, 25 November 2026](https://scottaaronson.blog/?p=2026).

### 2. Google Research's Cogentic mathematics papers

On 25 November 2026, the public [Google Research Cogentic papers folder](https://github.com/google-research/google-research/tree/main/cogentic_research_papers) received six mathematics papers attributed by their accompanying notes to Cogentic, an agentic research harness using Gemini 4. The papers cover several areas, including integer factoring, discrete logarithms, game theory, communication complexity and graph theory.

The lead factoring paper claims an unconditional expected-time bound of the form \\(L_N[1/3,105]\\). This is a theoretical complexity result, not a polynomial-time factoring algorithm and not a practical attack on RSA-2048. The large constant matters: matching an asymptotic exponent does not make the method competitive at real cryptographic key sizes. The repository notes say Lean 4 formalizations would follow in a companion submission; readers should check the repository for the current verification artifacts and independent review status before treating the claims as established.

**Status: published preprints and stated claims requiring scrutiny.** The research output is relevant to AI-assisted mathematical work; it is not evidence that RSA has been broken.

### 3. DeepMind's AI-agent RSA-1024 computation

Google DeepMind's earlier work showed AI agents planning, coding, running and debugging a large computation against a known 1024-bit RSA signature benchmark. The experiment used a signing-oracle setup and reproduced a known attack result. It did **not** factor the RSA modulus or recover a private key. Its reported resource comparison also needs its stated accounting caveats, including excluded GPU work and differences in hardware.

Primary paper: [Faster affine root finding and a 1024-bit computation](https://storage.googleapis.com/deepmind-media/papers/Faster_Affine_Root_and_a_1024bit%20Computation.pdf).

**Status: a real agentic-computation demonstration, but not an RSA-2048 break.**

## Why this matters to the compression thesis

The 3Blue1Brown trilogy explores the information-theoretic relationship between prediction, entropy, cross-entropy and compression. A predictive model captures regularities in data; those regularities can make the data more efficiently representable. This is a powerful lens on learning, but it is not a complete definition of intelligence and does not imply that compression alone discovers new mathematics.

The cryptography developments suggest a complementary research loop:

1. **Represent:** learned models encode useful regularities and mathematical patterns from prior information.
2. **Generate:** models propose conjectures, candidate algorithms, proof strategies or code.
3. **Search:** agents explore alternatives, run experiments and divide a difficult problem into subproblems.
4. **Check:** independent verifiers, formal proof systems, tests and expert scrutiny challenge candidate results.
5. **Retain:** validated results, counterexamples, assumptions and provenance become reusable knowledge.
6. **Transfer:** future work starts from that retained structure rather than rediscovering every intermediate step.

The important advance is not simply that a model can produce a shorter explanation. It is that a system can potentially use compressed representations of prior knowledge to guide search, then turn successful and verified discoveries into durable knowledge.

This is a hypothesis about the architecture of useful AI-assisted research, not a claim that the cited systems all implement this exact pipeline.

## The STaaS connection

The STaaS manifesto says: **"Don't start from scratch. Start from what humanity has already learned."**

That principle can be made more precise:

> **Strategic intelligence is decision-relevant compression of accumulated knowledge, with enough provenance, context, uncertainty and counter-evidence preserved to support independent judgement and future revision.**

For STaaS, this means:

- Compress large bodies of business and research information into useful concepts, evidence records, relationships and decision options.
- Preserve source identity, date, rights, context, uncertainty and contradictory evidence; do not turn a summary into an unsupported fact.
- Distinguish what a source says from what the system infers.
- Reuse prior cases as starting points, not templates to copy blindly.
- Test whether a lesson transfers across geography, sector, customer, infrastructure and venture stage.
- Preserve the founder's assumptions, decisions, experiments and outcomes so the system can update its strategic model over time.

A shorter answer is not necessarily a better representation. A useful compression keeps the information needed to challenge the conclusion and reconstruct why it was reached.

## A proposed STaaS learning loop

| Stage | System responsibility | Integrity requirement |
|---|---|---|
| Discover | Find prior research, cases, data and frameworks | Source provenance and rights |
| Represent | Extract concepts, entities, events and relationships | Preserve context and uncertainty |
| Explain | Make the underlying mechanism understandable | Separate evidence from inference |
| Compare | Identify similarities, differences and counterexamples | Avoid false equivalence |
| Challenge | Generate alternatives and test assumptions | Include disconfirming evidence |
| Verify | Check calculations, claims and formal constraints | Independent checks where possible |
| Decide | Help the founder choose a testable next step | Founder retains agency |
| Learn | Record results and revise the strategic state | Version history and traceability |

This is the product-level equivalent of a research system that does not merely generate an answer, but builds on validated prior work.

## Implications for architecture and evaluation

The case strengthens several existing STaaS design requirements:

- **Persistent knowledge:** store structured claims, concepts, evidence, assumptions and decisions rather than relying on chat history alone.
- **Provenance-preserving compression:** retain links from every summary or derived claim to its source records.
- **Contradiction and uncertainty handling:** preserve competing explanations and unresolved questions.
- **Verification boundaries:** distinguish generated hypotheses, reproducible computations, machine-checked proofs, expert-reviewed results and peer-reviewed publications.
- **Model-independent state:** retain knowledge in platform-owned, versioned formats so a model or provider can be changed without losing the learning record.
- **Evaluation:** test whether compression preserves decision-relevant facts, caveats and counterexamples, and whether users can reconstruct and challenge the reasoning.

These are architectural and research directions. They are not claims that the current STaaS prototype already implements persistent strategic memory, evidence ingestion, formal verification or the complete learning loop.

## What this does not establish

- It does not establish that RSA-2048 has been factored.
- It does not establish that any AI laboratory has a practical polynomial-time factoring algorithm.
- It does not establish that the Cogentic factoring result is a practical cryptanalytic method.
- It does not establish that compression is sufficient for intelligence or mathematical discovery.
- It does not show that STaaS has implemented the proposed architecture or that its approach improves founder outcomes.

For cryptographic migration, organisations should continue to use established security guidance and plan for cryptographic agility; speculative reports are not a substitute for verified vulnerability information.

## Research questions for STaaS

1. How much can a knowledge representation be compressed before it loses context needed for a sound decision?
2. Can provenance-preserving summaries improve retrieval and strategic reasoning compared with ordinary document search?
3. Can a system reliably distinguish source facts, generated hypotheses, independently reproduced results and formally verified claims?
4. Does retaining validated intermediate reasoning reduce duplicated work across sessions, models and agent harnesses?
5. Can founders use compact evidence maps to challenge assumptions and make better decisions without becoming dependent on the system?

## Sources

- [Scott Aaronson, Shtetl-Optimized (25 November 2026)](https://scottaaronson.blog/?p=2026) — primary account of the cryptography rumours and the author's explicit uncertainty about their specific nature.
- [Google Research, Cogentic research papers](https://github.com/google-research/google-research/tree/main/cogentic_research_papers) — primary repository for the six papers and their accompanying status notes.
- [Google DeepMind, Faster affine root finding and a 1024-bit computation](https://storage.googleapis.com/deepmind-media/papers/Faster_Affine_Root_and_a_1024bit%20Computation.pdf) — primary technical account of the AI-agent computation and its scope.
- [3Blue1Brown, Compression is Intelligence trilogy](https://www.youtube.com/watch?v=l6DKRf-fAAM) — Part 1; [Part 2](https://www.youtube.com/watch?v=GlYgs6v2YfU); [Part 3](https://www.youtube.com/watch?v=qbsb9DpdZ6s).
- [NIST Post-Quantum Cryptography](https://www.nist.gov/pqc) — standards and migration context.

---

*Research note: written 27 November 2026 to record the connection between the current cryptography discussion, AI-assisted mathematical research and the STaaS compression-and-learning principle. Recheck source status before relying on any time-sensitive claim.*
