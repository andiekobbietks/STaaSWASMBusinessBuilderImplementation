# 3Blue1Brown, learning and the STaaS principle

> **Don't start from scratch. Start from what humanity has already learned.**

This note connects Grant Sanderson's 3Blue1Brown educational work to the STaaS product philosophy. It is a curated learning path, not an exhaustive catalogue of every video on the channel. It includes the channel's directly relevant neural-network and LLM lessons, plus the 2026 *Compression is Intelligence* trilogy because it speaks especially closely to the manifesto's central idea.

## Why Grant Sanderson makes these videos

Sanderson describes 3Blue1Brown as a project focused on explaining mathematics visually. His stated goal is to help more people love mathematics, whether for its usefulness or beauty, because that appreciation begins with **deep understanding**. He says the videos and the Manim animation engine began as side projects while he was finishing mathematics and computer science studies at Stanford; after graduating, he worked at Khan Academy creating educational videos, articles and exercises.

His method is not simply to simplify terminology. It is to change the representation of a difficult idea so the viewer can see its structure: how quantities move, how components interact, what a mathematical operation is doing and why it is useful. The animation is a means of explanation, not decoration.

There are two particularly clear examples of his intentions:

- **The LLM introduction (2024)** was made for an exhibit at the Computer History Museum. Its purpose was to give a light introduction to LLMs, chatbots, pretraining and transformers.
- **The 2026 information-theory trilogy** began as a planned explanation of cross-entropy and why it is used to pre-train language models. Sanderson explains that the idea expanded into a three-part series because he wanted to explore information theory more properly and was drawn into the provocative relationship between compression and intelligence. He explicitly says that the interesting question is not merely the line of code used for cross-entropy, but what the term means and why it is a principled loss function.

His published support model also matters: 3Blue1Brown says its lessons are funded directly by viewers rather than sponsored ad reads. Its Patreon page says supporters provide essential feedback that helps refine videos before public release. This is a creator-led educational model in which audience support and feedback help sustain the work.

## Curated video catalogue

### A. Neural networks: how learning works

These are the foundations for understanding what a trained model is and what it means for it to learn.

| Order | Video | Why it matters |
|---|---|---|
| 1 | [But what is a neural network? (Deep Learning Ch. 1)](https://www.youtube.com/watch?v=aircAruvnKk) | Introduces neurons, layers, weights and biases through handwritten-digit recognition. Establishes that a network is a parameterised function, not a mysterious mind. |
| 2 | [Gradient descent, how neural networks learn (Ch. 2)](https://www.youtube.com/watch?v=IHZwWFHWa-w) | Explains training data, cost functions, gradients and how weights are adjusted to reduce error. Useful for distinguishing learning from simply retrieving stored facts. |
| 3 | [Backpropagation, intuitively (Ch. 3)](https://www.youtube.com/watch?v=Ilg3gGewQ5U) | Shows how the effect of an error is traced backwards through a network to determine how parameters should change. |
| 4 | [Backpropagation calculus (Ch. 4)](https://www.youtube.com/watch?v=tIeHLnjs5U8) | Gives the mathematical account using derivatives and the chain rule. Useful for understanding the machinery beneath model training. |

### B. Large language models: from text to transformers

These videos move from the general idea of neural networks to the architecture used by modern LLMs.

| Order | Video | Why it matters |
|---|---|---|
| 5 | [Large Language Models explained briefly](https://www.youtube.com/watch?v=LPZh9BOjkQs) | A short introduction to chatbots, pretraining and transformers. Sanderson says this was made for a Computer History Museum exhibit. |
| 6 | [Transformers, the tech behind LLMs (Deep Learning Ch. 5)](https://www.youtube.com/watch?v=wjZofJX0v4M) | Visualises the flow of data through a transformer, including tokens, embeddings, unembedding and next-token prediction. |
| 7 | [Attention in transformers, step-by-step (Ch. 6)](https://www.youtube.com/watch?v=eMlx5fFNoYc) | Explains how attention lets token representations incorporate contextual information, including queries, keys, values, masking and multiple heads. |
| 8 | [How might LLMs store facts? (Ch. 7)](https://www.youtube.com/watch?v=9-Jl0dxWQs8) | Explores multilayer perceptrons, representations and superposition, and asks how factual associations may be encoded inside a model. It is an interpretability-oriented explanation, not a claim that every fact has a simple address in a model. |

### C. Compression is Intelligence: the closest connection to the STaaS manifesto

This trilogy is particularly relevant to the line “Don't start from scratch. Start from what humanity has already learned.” It explores how prediction, information, entropy, language modelling and compression relate.

| Order | Video | Why it matters |
|---|---|---|
| 9 | [Reinventing Entropy | Compression is Intelligence Part 1](https://www.youtube.com/watch?v=l6DKRf-fAAM) | Builds intuition for information and entropy, asks how compressible language is, and introduces the information-theoretic foundations of the trilogy. |
| 10 | [But what is Cross-Entropy? | Compression is Intelligence Part 2](https://www.youtube.com/watch?v=GlYgs6v2YfU) | Connects cross-entropy to compression and explains why it is used as a loss function in LLM pretraining. It also discusses distillation and KL divergence. |
| 11 | [How to compress text to 1 bit per character | Compression is Intelligence Part 3](https://www.youtube.com/watch?v=qbsb9DpdZ6s) | Explores arithmetic coding, language-model predictions and the relationship between compression and generalisation. Published 17 November 2026. |

**Recommended sequence:** watch 1–4 to understand learning; 5–8 to understand LLM architecture; then 9–11 to explore the deeper relationship between prediction, information and compression. The trilogy can also be watched on its own after the short LLM introduction.

## How the videos were received

The clearest public reception signal is sustained audience reach. At the time of the research for this note (November 2026), YouTube search snapshots showed the channel at roughly 8.7 million subscribers. The first neural-network lesson had more than 25 million views; the transformer lesson more than 11 million; and the short LLM introduction more than 8 million. The 2026 first part of the compression trilogy had passed 1.6 million views, while the third part had only just been published. Counts change and should be treated as snapshots, not fixed facts.

This reach is consistent with the channel becoming a widely used reference for visual explanations of neural networks and LLMs. It is not, by itself, proof that every viewer understood the material or that the videos caused better learning outcomes. View counts and likes measure engagement, not comprehension. A stronger reception study would examine comments, educational adoption, learner outcomes and independent evaluations separately.

The creator's own website provides another kind of reception evidence: written and interactive versions of many videos are available, and the Patreon model explicitly invites supporters to provide feedback that helps refine lessons before public release. The channel is therefore not only publishing videos; it is building reusable learning resources around them.

## What this means for STaaS

The connection is methodological, not a claim that STaaS is a mathematics education channel or that Sanderson endorses this project.

### 1. Make difficult knowledge visible

3Blue1Brown makes mathematical structure easier to inspect. STaaS should make strategic structure easier to inspect: the relationship between a founder's problem, customer, market, operating conditions, evidence, assumptions, risks and available choices.

A founder should be able to see not only a recommendation, but how the evidence and reasoning connect to it.

### 2. Teach the underlying model, not just the answer

A video that explains gradient descent helps a learner understand what training is doing, rather than simply telling them that neural networks learn. Similarly, STaaS should help founders understand why a framework, market concept, financial measure or validation method applies. It should build the founder's ability to reason independently.

### 3. Treat prior knowledge as a starting point, not a substitute for judgement

The manifesto does not say that historical examples can be copied blindly. It says that founders should not have to rediscover everything from zero. STaaS must retrieve prior work, qualify its quality and relevance, compare the original context with the founder's context, and identify what still needs to be tested.

The distinction is:

- **Reuse knowledge:** discover what has already been learned.
- **Understand knowledge:** explain the concepts and mechanisms behind it.
- **Test transfer:** establish whether it applies in this market, sector, geography and stage.
- **Create new knowledge:** run experiments and preserve what the founder learns.

### 4. Connect the compression idea to the knowledge problem

The trilogy's “compression is intelligence” framing is a provocative information-theory lens, not a complete definition of intelligence. A language model learns statistical structure that helps it predict text; a good predictive model can also support compression because predictable sequences need fewer bits to encode.

There is a useful analogy for STaaS: a founder faces a large, fragmented body of information. The platform should help reduce the search and interpretation burden by finding the most decision-relevant knowledge and expressing it in a compact, structured form. But the compression must not discard provenance, uncertainty, contradictory evidence or context. A shorter answer is not automatically a better answer.

### 5. Build a learning system, not a content dump

The product should not become a playlist or a document warehouse. Each resource should be attached to a question, a concept, a business parameter or a decision. The platform should record what the founder learned, what they changed their mind about, what evidence remains missing and what they will do next.

This aligns with the STaaS cycle:

1. Discover relevant knowledge.
2. Qualify its source and limitations.
3. Explain the underlying concept.
4. Connect it to the founder's context.
5. Challenge assumptions and transferability.
6. Identify what needs validation.
7. Turn learning into action.
8. Preserve the outcome for future decisions.

## Product implications

The 3Blue1Brown example suggests several concrete design principles for STaaS:

- **Knowledge cards:** each concept or source has a concise explanation, original source, publication date, context, limitations and links to related ideas.
- **Concept maps:** show relationships between business concepts, evidence, strategic assumptions and decisions.
- **Progressive explanation:** provide an accessible overview first, then deeper reasoning, technical detail and primary sources.
- **Evidence-to-decision traceability:** show which sources support a claim, what the source actually says and what remains inference.
- **Contextual learning paths:** recommend resources based on the founder's current uncertainty, not a generic curriculum.
- **Learning checks:** ask the founder to explain a concept or apply it to their own venture, rather than treating a watched video as proof of understanding.
- **Feedback and revision:** improve explanations based on user questions and observed misunderstandings, while preserving source accuracy.

These are product proposals, not claims that the current prototype already implements them.

## Sources

### Primary sources

- [3Blue1Brown — About](https://www.3blue1brown.com/about/) — Sanderson's stated educational philosophy and the origin of the channel and Manim.
- [3Blue1Brown — Neural Networks topic](https://www.3blue1brown.com/topics/neural-networks) — official lesson catalogue and descriptions.
- [3Blue1Brown — Patreon: Reinventing Entropy](https://members.3blue1brown.com/posts/reinvent-part-160410360) — creator's explanation of how the original cross-entropy idea grew into the information-theory trilogy.
- [3Blue1Brown — Patreon: But what is cross-entropy?](https://members.3blue1brown.com/posts/but-what-is-163980467) — creator's introduction to Part 2.
- [3Blue1Brown — Patreon](https://members.3blue1brown.com/) — creator support and feedback model.
- [3Blue1Brown — Computer History Museum LLM introduction](https://www.youtube.com/watch?v=LPZh9BOjkQs) — description states that the short LLM video was made for a museum exhibit.
- [3Blue1Brown — Compression is Intelligence Part 1](https://www.youtube.com/watch?v=l6DKRf-fAAM), [Part 2](https://www.youtube.com/watch?v=GlYgs6v2YfU) and [Part 3](https://www.youtube.com/watch?v=qbsb9DpdZ6s) — the trilogy itself.

### Reception and catalogue context

- [3Blue1Brown YouTube channel](https://www.youtube.com/@3blue1brown) — current audience and video engagement figures.
- [3Blue1Brown video index](https://github.com/tamnd/3blue1brown-index) — a third-party catalogue used as a cross-check for publication dates, durations and engagement snapshots. It is not the creator's official channel.

---

*Editorial note: the STaaS interpretation above is our own product analysis. It should not be attributed to Grant Sanderson, and no endorsement, partnership or affiliation is implied. Video titles and links are provided for discovery; all rights remain with their creator and publishers.*
