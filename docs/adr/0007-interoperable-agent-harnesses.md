# ADR-0007: Interoperable agent harnesses

- **Status:** Accepted architectural direction
- **Decision date:** 2026-11-25
- **Last reviewed:** 2026-11-26

## Context

Founders and developers may use the STaaS web application alongside coding and agent harnesses such as OpenCode. Knowledge and strategic state should not be locked to one user interface, model provider or agent runtime.

## Decision

Adopt a harness-neutral integration boundary. Expose narrowly scoped, authenticated interfaces and adapters for compatible clients. MCP is the preferred candidate for tool and resource discovery where it fits the use case, but it is not the canonical data model or the security boundary.

Adapters must access approved records through STaaS authentication, authorisation, validation and audit services. They must not bypass application policy or directly mutate DWH aggregates. Platform-owned strategic state remains canonical.

## Consequences

- Define per-user and per-venture read/write scopes, tenant isolation, explicit consent, audit logs, rate limits and revocation.
- Keep protocol adapters replaceable; do not couple core business logic to MCP-specific message formats.
- Test portability across at least two independent clients before claiming interoperability.
- Do not assume that one harness can import another provider's hidden reasoning state or proprietary session signatures.
- This is an accepted architectural direction, not a claim that production OpenCode/MCP integration exists.

## Reconsideration triggers

Revisit the protocol choice if MCP does not meet the required security, portability or operational needs, or if a simpler authenticated API provides equivalent interoperability with lower complexity.
