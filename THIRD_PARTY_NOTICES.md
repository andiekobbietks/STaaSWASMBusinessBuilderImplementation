# Third-party notices and licence register

The separately Apache-2.0-licensed STaaS Foundation subtree has its own scoped notices in [foundation/NOTICE](foundation/NOTICE) and [foundation/THIRD_PARTY_NOTICES.md](foundation/THIRD_PARTY_NOTICES.md). The canonical OKF specification is referenced there; no OKF source code is copied into the Foundation alpha.


This register is a starting point, not a completed software bill of materials
(SBOM) or legal clearance. Verify every shipped dependency and inherited file
against the exact source version before distribution.

## Identified upstream project

### JeffvonD-coder/business-builder

- Upstream: https://github.com/JeffvonD-coder/business-builder
- Upstream licence: MIT
- Upstream copyright notice: Copyright (c) 2024 JeffvonD-coder
- STaaS provenance: the project-development notes identify the initial
  application as a port/adaptation of this project. A complete file-by-file
  similarity review has not yet been completed.
- Obligation: retain the upstream copyright and MIT permission notice in
  copies or substantial portions of the MIT-licensed material.

The complete upstream MIT licence text is reproduced below.

```text
MIT License

Copyright (c) 2024 JeffvonD-coder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Direct dependencies

The current main-branch package manifest includes:

- @supabase/supabase-js
- lucide-react
- react
- react-dom

Development dependencies are listed in package.json. Their transitive
dependencies must also be included in an automated licence inventory before
a distributable bundle is approved.

The feature branch `feat/staas-ai-workspace-rendering` has a different
package manifest, including AI SDK packages and Playwright. Do not assume its
dependency graph is identical to main.

## Required release checks

Before each distributable release:

1. Generate a complete dependency SBOM from the exact release commit.
2. Generate a third-party licence inventory including transitive dependencies.
3. Review incompatible, unknown, source-available, or restricted licences.
4. Confirm all required copyright and attribution notices are bundled.
5. Record the SBOM, licence report, source commit and build provenance with
   the release.
6. Review fonts, icons, images, datasets, model weights, prompts and copied
   research material separately; package-manager scans do not cover these.

## Status

- Upstream MIT notice recorded: yes.
- Complete inherited-code comparison: pending.
- Complete dependency licence inventory: pending.
- Dataset/model/media rights review: pending.
- Contributor and AI-assisted authorship provenance: pending.
- Distribution clearance: not granted by this register.
