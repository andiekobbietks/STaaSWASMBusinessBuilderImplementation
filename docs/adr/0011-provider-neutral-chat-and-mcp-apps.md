# ADR-0011: Provider-neutral conversational orchestration and MCP Apps

- **Status:** Accepted; partial demo implementation (AI SDK chat and native UI); production integrations deferred
- **Date:** 2026-11-26

## Context

STaaS needs a founder-facing interaction layer that can do more than return text. Users may need streaming conversations, structured results, first-party business-analysis tools, external integrations, interactive tool interfaces and approval-based workflows.

The Vercel AI SDK provides TypeScript APIs for model-provider abstraction, streaming, structured outputs, tool calling, agent loops and React-oriented chat UI. Its MCP integration can connect to MCP servers. Vercel documents an MCP Apps host pattern using `@ai-sdk/mcp` and `@ai-sdk/react` to discover tools, retrieve `ui://` resources and render interactive tool interfaces in a sandboxed iframe. The referenced renderer is experimental and must be treated accordingly.

OpenAI's Apps SDK also uses MCP servers with optional UI. The MCP Apps protocol provides a portable UI/host interaction mechanism for compatible clients. ChatGPT-specific extensions remain optional host-specific additions and are not required for MCP Apps interoperability.

The STaaS baseline is a React/TypeScript/Vite application with deterministic analysis and Supabase authentication/report persistence. This implementation adds AI SDK 7 React chat UI, an OpenAI-compatible server endpoint and native interactive React workspace views. The endpoint is deliberately gated for local demo use until production authentication and venture-level authorisation are implemented. MCP clients, MCP Apps rendering and production-grade tool governance are not yet implemented.

## Decision

1. Adopt a **provider-neutral conversational architecture** as the target direction. The Vercel AI SDK is the preferred candidate toolkit for an initial TypeScript proof of concept, subject to framework/package compatibility and a technical spike. It is not a mandatory domain dependency.
2. Keep STaaS business logic, identity, tenant authorisation, founder state, source provenance, audit and durable workflows outside provider-specific UI and model APIs.
3. Prefer typed, first-party AI SDK tools for core STaaS domain operations where schema control, predictable behaviour and latency matter. Use MCP for interoperable external tools/resources and user-selected integrations.
4. Support both first-party React generative UI for STaaS-owned structured results and MCP Apps UI resources for compatible third-party tools, rendered through a sandboxed host.
5. Treat MCP Apps as the portable interoperability target. ChatGPT Apps host-specific APIs may be used only as optional adapters; do not make `window.openai` or another host-specific extension a core dependency.
6. Model-visible tools and app-only tools must be separated. The host must expose only the tools required for the current operation.
7. Require server-side authentication, per-tenant authorisation, tool allowlists, schema validation, least-privilege connector scopes, audit and revocation for every tool invocation. Tool descriptions and model output are never security controls.
8. Require contextual user confirmation before consequential external writes, spending, publication, messaging, deletion or irreversible changes. A model tool call alone is not consent.
9. Treat retrieved content, MCP resources, tool output and widget HTML as untrusted. Render MCP Apps in a sandbox with a constrained bridge and no ambient secrets.
10. Provide text/structured-data fallbacks when a host cannot render an MCP App. Keep authoritative business state on STaaS servers; widget state and provider conversation state are not canonical records.
11. Defer production adoption until the proof of concept passes compatibility, security, usability, accessibility, failure and audit tests. Pin SDK/protocol versions and isolate experimental renderers behind an adapter.

## Consequences

- The chat now provides a partial multi-capability workspace with streamed model text and native React components. Typed tool calls, MCP connectors and MCP Apps remain target capabilities, not current implementation claims.
- STaaS can expose selected services to compatible MCP hosts without duplicating domain logic in every chat client.
- MCP does not automatically provide identity, permissions, billing, tenant isolation, durable jobs or trust. STaaS must implement these.
- A Vercel AI SDK MCP Apps host does not automatically reproduce every ChatGPT Apps feature or gain access to ChatGPT-specific extensions.
- Multimodal capability is model/provider-dependent and must be tested per modality and deployment.
- The experimental MCP Apps renderer may change; version pinning, adapter isolation and fallback UI are required.
- Additional providers and connectors increase operational complexity, attack surface, cost and data-processing obligations.
- The current prototype remains unchanged until an implementation PR is completed and tested.

## Initial implementation sequence

1. Verify current package manifest, framework and deployment runtime.
2. Prototype server-side streaming chat without external tools.
3. Add first-party read-only STaaS tools and typed UI rendering.
4. Add one restricted MCP client/server integration.
5. Prototype MCP Apps resource rendering with sandbox and fallback.
6. Add approval-gated writes, audit and revocation.
7. Evaluate multimodal inputs and durable long-running agents only where validated user needs justify them.

## Acceptance criteria

- [ ] AI SDK version, provider and runtime compatibility are recorded.
- [ ] No privileged provider or connector credentials reach the browser.
- [ ] All tool calls are authorised server-side against user and venture scope.
- [ ] Read-only and write-capable tools are distinguished and allowlisted.
- [ ] MCP Apps resources run in an isolated sandbox with constrained bridge permissions.
- [ ] Unsupported MCP Apps render a usable text/structured fallback.
- [ ] Consequential writes require contextual user confirmation.
- [ ] Audit events record actor, connector/tool, approval and outcome with sensitive data redacted.
- [ ] Connector revocation, timeout, retry, cancellation and failure states are tested.
- [ ] At least one MCP-compatible client interoperability test passes.
- [ ] Accessibility, keyboard interaction and responsive behaviour are checked.

## References

- Vercel, [AI SDK: Add MCP Apps to your AI SDK application](https://vercel.com/kb/guide/ai-sdk-mcp-apps).
- Vercel, [AI SDK MCP tools](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools).
- Vercel, [AI SDK 7 changelog](https://vercel.com/changelog/ai-sdk-7).
- OpenAI, [Add UI to your MCP server](https://developers.openai.com/plugins/build/chatgpt-ui).
- OpenAI, [MCP server and UI quickstart](https://developers.openai.com/plugins/build/app-quickstart).
