# Project memory

## Product intent & audience

- Business Builder: a business-idea analyzer that runs four sequential "agents" (Clarity, Niche, Action, Strategy) to produce structured analysis of a user-submitted idea.
- Ported from an existing Streamlit app (`JeffvonD-coder/business-builder`) that used DeepSeek AI server-side; rebuilt as a WASM-first web app where all analysis runs in-browser.
- Audience: entrepreneurs and founders looking for instant, structured business-idea analysis.
- Key features: bilingual (English/Dutch) with language toggle, user accounts, report history (view/delete), PDF export via browser print.

## Brand personality & voice

- Professional, analytical, product-focused.
- Bilingual presentation (English/Dutch) — UI copy and generated analysis both localized.
- Polished and production-grade; aims for "beautiful, not cookie cutter."

## Visual design & UX direction

- Stack: Vite + React + TypeScript, Tailwind CSS, Lucide React icons.
- `@/` path alias maps to `src/` (prefer over deep relative imports).
- UI includes agent progress cards, smooth animations, responsive layout.
- Markdown rendering for analysis output with dedicated CSS styles.
- Custom Tailwind utility `border-3` added to config (not in Tailwind by default).

## Decisions, constraints & rationale

- WASM-first / client-side: replaced DeepSeek AI with a deterministic rules-based analysis engine running entirely in the browser — no API keys, no server round-trips, instant results.
- Engine detects context from idea text: product vs service, B2B vs B2C, online vs local, industry domain (eco/tech/health/food, etc.), and tailors output accordingly.
- Supabase chosen over original MongoDB for auth + report persistence; works well in browser context.
- Reports table created via migration with user-scoped RLS (row-level security).
- PDF export implemented via browser print dialog (no heavy PDF library).
- No UI theme/icon packages installed beyond the template defaults (Tailwind, Lucide React).

## Open questions & assumptions

- The rules-based engine is deterministic; quality vs. original AI output may differ — future enhancement could allow optional AI integration.
- Supabase project URL/anon key assumed available via environment/secrets; not stored here.
- Analysis quality depends on keyword/context detection heuristics; edge-case ideas may produce generic output.