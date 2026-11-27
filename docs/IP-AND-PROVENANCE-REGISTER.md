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
