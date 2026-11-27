# Private repository migration runbook

## Current position

The source repository is public. This runbook does not change visibility and no private destination has been created by the connected GitHub actions.

The nine original branch names are:

- `main`
- `docs/add-staas-manifesto`
- `docs/ai-sdk-mcp-apps-chat-architecture`
- `docs/model-alone-analysis-capability`
- `docs/readme-and-adr-finalisation`
- `docs/staas-manifesto-3blue1brown-learning`
- `docs/staas-positioning-roadmap-wasm`
- `docs/staas-product-prd`
- `feat/staas-ai-workspace-rendering`

Governance and security remediation branches are additional working branches, not replacements for these originals.

## Recommended migration

1. In GitHub, create an **empty private repository** under the intended owner. Do not initialise it with a README, licence or .gitignore.
2. From a trusted local machine, make a mirror clone of the existing repository:

   ```bash
   git clone --mirror https://github.com/andiekobbietks/STaaSWASMBusinessBuilderImplementation.git
   cd STaaSWASMBusinessBuilderImplementation.git
   git remote add private <PRIVATE_REPOSITORY_GIT_URL>
   git push --mirror private
   ```

3. Verify every original branch and tag exists in the private destination:

   ```bash
   git ls-remote --heads private
   git ls-remote --tags private
   ```

4. Compare the returned branch names against the nine names above and compare commit IDs. Also verify the governance and security branches if they are to be retained.
5. Recreate repository settings separately: collaborators, branch protections/rulesets, Actions permissions, environments, secrets, variables, webhooks, Dependabot settings, Pages and deployment integrations. A Git mirror does not migrate these settings, issues, pull requests, Actions history or releases.
6. Keep the original public repository read-only or archived only after verifying the private copy and deciding what public research material should remain available. Do not delete the original as a substitute for a disclosure review.

## Important historical-exposure warning

The `.bolt/` files have been removed from the tips of the documentation and feature branches by additive commits, and the governance branch removes them from the proposed main-branch tree. This does **not** remove those files from older commits, public forks, caches or downloaded copies. A full mirror intentionally preserves that history. Review the historical contents before deciding whether to preserve the complete history in the private destination or create a separate cleaned public research repository.

If any actual credentials were committed, rotate them immediately. Rewriting history is a separate, coordinated operation and should only be considered after a verified backup and a deliberate decision about branch preservation.

## Migration completion criteria

- Private destination visibility is verified in GitHub.
- All nine original branches and selected additional working branches are present with expected commit ancestry.
- Tags are accounted for.
- Required settings and secrets have been recreated securely.
- Public source disposition and historical-disclosure risks are documented.
- The private destination is the agreed canonical implementation repository.
