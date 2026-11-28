# IP, provenance and disclosure register

**Status:** working register; not legal advice or a freedom-to-operate opinion.  
**Repository:** STaaS Business Builder  
**Current development version:** 0.1.0-alpha.1  
**Review date:** 2026-11-27

## 1. Asset classes

| Asset | Current evidence | Treatment |
|---|---|---|
| Original STaaS research prose and synthesis | Manifesto, research register and intellectual-foundations documents | Copyright may subsist in original expression; underlying ideas are not owned merely by describing them |
| Application source and UI | React, TypeScript, CSS and serverless code across branches | Copyrightable expression; ownership and upstream provenance must be reconciled |
| Architecture decisions and product specifications | ADRs, requirements and architecture documents | Copyrightable expression; distinguish proposals from implemented capabilities |
| Third-party source | Upstream business-builder project and npm dependencies | Preserve applicable licences and notices; do not claim exclusive ownership |
| Data, case studies and research sources | References and source leads in research documents | Review source terms, database rights, privacy and permissions before ingestion or redistribution |
| Brand names and marks | STaaS and related product naming | Trademark clearance and registration status not assessed |
| Potential inventions | Proposed evidence, strategic-state, continuity and transformation mechanisms | No patentability conclusion; document concrete technical problem, implementation and disclosure chronology for patent counsel |
| Confidential know-how | Future non-public algorithms, datasets, customer information and operating procedures | Keep out of public branches; use access control and confidentiality measures |

## 2. Provenance rules

For every material contribution, record:

- author/contributor and date;
- source repository, file, commit and licence where derived;
- whether copied, adapted, generated, or independently implemented;
- applicable copyright and attribution notices;
- AI tools used where material to the contribution, plus human review and edits;
- data/model/media sources and permitted uses;
- evidence supporting any ownership or novelty claim.

A Git commit author is evidence of repository activity, not conclusive proof of legal authorship or assignment.

## 3. Public-disclosure boundary

The repository has been public. Moving it to private cannot reverse prior disclosure, downloads, forks, caches or third-party copies. Public research prose can support attribution; confidential implementation details and potential patent subject matter require separate review before further publication.

Do not describe a concept as a trade secret once it has been made public. Do not claim a patentable invention without claim-specific prior-art and patentability assessment.

## 4. Release gate

A release must not be labelled production-ready or commercially cleared unless:

- upstream and contributor rights are reconciled;
- dependency and non-code asset licences are inventoried;
- secret and vulnerability scans pass;
- build, lint and type checks pass;
- the release notes identify known limitations;
- source commit, SBOM, licence report and bundle checksums are retained.

## 5. Outstanding work

- Complete line-level comparison with JeffvonD-coder/business-builder.
- Verify Bolt and other AI-assisted generation terms applicable at the time of creation.
- Audit every branch, pull request, workflow, tag and release for secrets and sensitive material.
- Generate branch-specific dependency SBOMs, especially for the AI workspace branch.
- Confirm whether any third-party datasets, logos, icons, fonts or model assets are included.
- Obtain legal advice before any patent filing or broad commercial distribution.

## 6. Preliminary upstream comparison (27 November 2026)

A first-pass source comparison was performed against the public `JeffvonD-coder/business-builder` repository at upstream commit `77e8214380ad3d4a4da939405fa73c6ef9e3206e` (main). The current STaaS feature branch was examined at commit `606ffe96cd4e3876e48870abea883e248cc4843b` before subsequent security-only changes.

Candidate file pairs and normalized exact-line overlap:

| Upstream file | STaaS candidate | Shared normalized lines | Jaccard of unique non-comment lines |
|---|---|---:|---:|
| `streamlit_business_builder/app.py` | `src/App.tsx` | 1 | 0.006 |
| `streamlit_business_builder/main.py` | `src/lib/analysis.ts` | 1 | 0.002 |
| `streamlit_business_builder/prompts.py` | `src/lib/analysis.ts` | 0 | 0.000 |
| `streamlit_business_builder/translations.py` | `src/lib/translations.ts` | 2 | 0.006 |
| `streamlit_business_builder/utils/security.py` | `src/context/AuthContext.tsx` | 0 | 0.000 |
| `streamlit_business_builder/utils/database.py` | `src/lib/supabase.ts` | 1 | 0.006 |
| `streamlit_business_builder/utils/file_manager.py` | `src/lib/pdf.ts` | 0 | 0.000 |
| `streamlit_business_builder/utils/rate_limiter.py` | `api/chat.ts` | 0 | 0.000 |
| `streamlit_business_builder/pages/01_user_management.py` | `src/components/AuthScreen.tsx` | 1 | 0.004 |
| `streamlit_business_builder/pages/02_report_history.py` | `src/components/ReportHistory.tsx` | 0 | 0.000 |

### Interpretation and limits

The measured overlap is low at the literal-line level for these selected pairs, consistent with a substantial rewrite from a Streamlit/Python application into a React/TypeScript browser application. It does **not** establish independent creation, eliminate possible reuse of structure or expression elsewhere, resolve the recorded port/adaptation provenance, or determine copyright ownership. This was a targeted comparison, not a complete repository-wide AST/token, commit-history, UI asset, prompt, documentation or semantic comparison. The upstream MIT licence and notice must remain documented wherever upstream code or substantial portions are incorporated.

Before commercial distribution, complete a full tree-wide comparison (including all branches and historical commits), trace each reused or adapted component, inspect screenshots/assets and generated materials, and have the resulting provenance record reviewed by a qualified IP professional.


## 7. STaaS Foundation alpha subtree (28 November 2026)

The new foundation/ subtree is separately licensed under Apache-2.0. The root LICENSE contains an explicit scope exception for this directory; the root rights notice continues to apply outside it, subject to all third-party licences.

| Material | Provenance | Licence / treatment |
|---|---|---|
| foundation/PROFILE.md | Newly authored STaaS business-strategy profile | Apache-2.0 within foundation/ |
| foundation/schemas/staas-profile-0.1.schema.json | Newly authored profile schema | Apache-2.0 within foundation/ |
| foundation/examples/founder-pilot/ | Synthetic scenario, records and examples authored for this profile | Apache-2.0 within foundation/; explicitly not real market evidence |
| Contribution-margin computation and attester | Newly authored Python example using the standard library | Apache-2.0 within foundation/ |
| Canonical OKF v0.3 | External specification referenced, not copied | Upstream Apache-2.0; retain attribution and do not imply affiliation |
| jsonschema 4.24.0 and ruamel.yaml 0.18.16 | Pinned development/test dependencies | Dev-only; verify full licence metadata and transitive notices from SBOM before stable release |

The initial Foundation subtree does not include copied source code from the OKF reference implementation. The sample bundle contains fictional data and illustrative calculations only. The example attester checks a pinned computation digest and deterministic result; it does not prove source authenticity, input truth or protection against an attacker who can replace the trusted attester itself.

This is a scoped Apache-2.0 alpha, not a stable release, complete legal clearance, OKF base-conformance certification or freedom-to-operate opinion. Dedicated-repository extraction, contributor governance, full dependency review, base OKF validation, profile round-trip tests and AgentSON integration remain outstanding.


## 8. Founder Workspace MVP (28 November 2026)

The following application materials are newly authored for this repository and remain under the root rights notice, not the Apache-2.0 licence scoped to foundation/:

| Material | Provenance | Licence / treatment |
|---|---|---|
| src/components/FounderWorkspace.tsx | Newly authored founder workflow UI, English/Italian copy and form interactions | Root rights notice; no open-source grant |
| src/lib/founder-workspace.ts | Newly authored domain types, Supabase persistence helpers and integer-pence contribution-margin calculation | Root rights notice; no open-source grant |
| src/lib/okf-export.ts | Newly authored adapter from workspace snapshots to OKF v0.3 Markdown/YAML concepts | Root rights notice; designed against the Apache-2.0 Foundation profile, but not copied from its source |
| src/lib/zip.ts | Newly authored dependency-free ZIP store writer | Root rights notice; no third-party ZIP package introduced |
| supabase/migrations/20261128230000_create_founder_workspaces.sql | Newly authored owner-scoped tables, RLS policies and append-version RPC | Root rights notice; live deployment and RLS testing remain outstanding |
| docs/FOUNDER-WORKSPACE-OPERATIONS.md and ADR-0013 | Newly authored operations and architecture documentation | Root rights notice |

The application uses existing React, Supabase JS and Lucide dependencies already declared by the project. No new npm runtime dependency was introduced. The OKF v0.3 format and STaaS profile semantics are referenced; the app does not copy the Foundation's implementation files.

The workspace currently persists full JSONB snapshots and exports founder-entered records. It does not acquire external source content, and it does not grant a bundle-wide licence. Live Supabase migration application, cross-user RLS tests, canonical OKF base validation and export round-trip tests remain release gates.
