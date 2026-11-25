# ADR-0007: Interoperable agent harnesses

- **Status:** Proposed
- **Date:** 2026-11-25

## Context

Founders and developers may use the STaaS web application alongside coding/agent harnesses such as OpenCode. Knowledge should not be locked to one UI, model provider or agent runtime.

## Decision

Expose narrowly scoped, authenticated interfaces and adapters for compatible agent harnesses. MCP is a candidate protocol for tool/resource access. Adapters should read and write approved OKF-backed records through the platform's permission and audit layer; they must not bypass application policy or directly mutate the DWH.

## Consequences

- Define read/write scopes, tenant isolation, user consent, audit logs and revocation.
- Test portability across at least two independent clients before claiming interoperability.
- Do not assume every harness preserves another provider's hidden reasoning state.
- No production OpenCode integration is claimed by this ADR.
