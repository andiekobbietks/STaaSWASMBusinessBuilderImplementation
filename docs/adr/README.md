# Architecture Decision Records

These records describe architectural choices for STaaS. Status applies to the decision, not implementation maturity.

- **Accepted architectural direction:** the design direction is agreed; implementation may still be absent.
- **Accepted principle:** a governing rule is agreed; it does not imply a complete architecture or implementation.
- **Accepted design direction; effectiveness unvalidated:** the interaction pattern is selected for evaluation, not proven to work.
- **Deferred:** a decision has deliberately been postponed until a named dependency or evidence gate is met.
- **Proposed:** a decision is still awaiting approval.
- **Recommended direction; implementation and licensing release deferred:** the strategy is recommended, but code publication and licence application remain gated.

An accepted ADR is not proof that the capability has shipped. The README and architecture document remain the source of truth for implementation status.

| ADR | Decision | Status | Main boundary / next gate |
|---|---|---|---|
| [0001](0001-provider-independent-strategic-state.md) | Platform-owned persistent strategic state | Accepted architectural direction | Implement schemas, migrations, access control, export and deletion |
| [0002](0002-okf-as-portable-knowledge-interchange.md) | OKF v0.3 as portable knowledge envelope; STaaS profile deferred | Accepted architectural direction; profile and conformance deferred | Map STaaS concepts and identity; pass profile and round-trip fixtures |
| [0003](0003-dwh-and-catalogue-separation.md) | Separate DWH, catalogue and source artefacts | Accepted architectural direction | Define source grain, identity, event time and lineage |
| [0004](0004-evidence-provenance-and-data-governance.md) | Evidence provenance, rights and validation | Accepted principle | Implement source register, rights review and validation workflow |
| [0005](0005-model-and-orchestration-boundaries.md) | Model + retrieval + deterministic workflow + human approval | Accepted architectural direction | Enforce boundaries, least privilege and approval gates |
| [0006](0006-progressive-learning-and-application.md) | Progressive learning; recall distinct from applied competence | Accepted architectural direction | Pilot learning objectives, accessibility and outcome measures |
| [0007](0007-interoperable-agent-harnesses.md) | Harness-neutral adapters; MCP as candidate protocol | Accepted architectural direction | Define scopes and test at least two independent clients |
| [0008](0008-model-adaptation-and-evaluation.md) | Staged model adaptation and evaluation | Deferred | Complete ADR-0010 benchmark and demonstrate an unresolved capability gap |
| [0009](0009-evidence-led-reflective-founder-learning.md) | Evidence-led reflective dialogue for founder learning | Accepted design direction; effectiveness unvalidated | Run consent-based STaaS-specific evaluation |
| [0010](0010-model-reasoning-evaluation-and-runtime.md) | Separate strategic reasoning evaluation from runtime performance | Accepted evaluation principle | Build reproducible benchmark and publish scored results |
| [0011](0011-provider-neutral-chat-and-mcp-apps.md) | Provider-neutral conversational orchestration and MCP Apps | Accepted architectural direction; implementation deferred | Verify SDK/framework fit; pass streaming, MCP, sandbox, approval, audit and interoperability tests |
| [0012](0012-open-foundation-commercial-business-builder.md) | Open STaaS Foundation with commercial Business Builder and Strategy Service | Recommended direction; scoped Apache-2.0 profile alpha implemented; dedicated repository and product integration deferred | Complete provenance, conformance and contributor gates; extract foundation/ into a separately governed repository |

## Decision review

Review an ADR when implementation evidence, user research, security requirements, cost, licensing or interoperability assumptions change. Update the status and consequences when a decision is accepted, deferred, superseded or rejected. Do not mark a decision implemented merely because it is documented.

For every implementation PR that materially changes an accepted decision, link the relevant ADR and update the architecture and tests. Preserve superseded ADRs for history rather than silently rewriting the decision record.
