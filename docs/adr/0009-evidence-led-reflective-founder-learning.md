# ADR-0009: Evidence-led reflective dialogue for founder learning

- **Status:** Accepted design direction; effectiveness unvalidated
- **Decision date:** 2026-11-25
- **Last reviewed:** 2026-11-26

## Context

Research on personalised LLM dialogue and belief revision suggests that conversational systems can sometimes help participants reconsider strongly held beliefs when presented with relevant evidence. The 2024 Costello, Pennycook and Rand *Science* article has a subsequent expression-of-concern and October 2026 erratum; its corrected numerical effect must be checked before quoting it as settled. Related work includes Boissin et al. (2025, *PNAS Nexus*) and Meyer et al. (2024, *HKS Misinformation Review*). None of these studies tests STaaS, founder education or African entrepreneurship outcomes.

## Decision

Adopt evidence-led reflective dialogue as a design direction to test, not as a proven educational intervention. The interaction should:

1. Elicit the founder's current assumption, rationale and confidence.
2. Retrieve relevant, source-linked evidence and credible counterexamples.
3. Explain what is comparable, what differs and what remains unknown.
4. Invite the founder to reflect, revise, retain or reject the original view.
5. Record the founder's decision and rationale, including disagreement.
6. Revisit the assumption after new evidence or an experiment.

For African founders and founders operating without close precedents, the catalogue should support geographically and institutionally contextualised comparisons, including local and diaspora cases. It must make missing evidence visible and avoid assuming that a strategy transfers across markets.

The platform must not optimise for persuasion, agreement or a predetermined strategy. The founder retains agency and the ability to inspect sources and challenge the analysis.

## Consequences

- Treat founder beliefs as hypotheses to examine, not defects to correct.
- Distinguish facts, attributed claims, inference and assumptions in the interface and stored records.
- Provide sources, uncertainty, counterexamples and an option to disagree.
- Evaluate comprehension, calibration, decision quality and follow-through, not conversion or agreement.
- Run a consent-based pilot with appropriate comparison groups and independent review before claiming educational effectiveness.
- Keep spaced-repetition recall measures separate from applied strategic competence.
- This decision does not establish that the dialogue pattern is implemented or that it improves founder outcomes.

## References

- Costello, T.H., Pennycook, G. & Rand, D.G. (2024). [Durably reducing conspiracy beliefs through dialogues with AI](https://pubmed.ncbi.nlm.nih.gov/39264999/). *Science*. See correction history in [the research register](../../RESEARCH.md).
- Boissin, E. et al. (2025). [Dialogues with large language models reduce conspiracy beliefs even when the AI is perceived as human](https://doi.org/10.1093/pnasnexus/pgaf325). *PNAS Nexus*.
- Meyer, M. et al. (2024). [Using an AI-powered “street epistemologist” chatbot and reflection tasks to diminish conspiracy theory beliefs](https://misinforeview.hks.harvard.edu/article/using-an-ai-powered-street-epistemologist-chatbot-and-reflection-tasks-to-diminish-conspiracy-theory-beliefs/). *HKS Misinformation Review*.
