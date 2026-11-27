# Security policy

## Supported versions

This repository is an early prototype. No production release is currently
supported. Security fixes should be applied to the active development branch
and any explicitly supported release.

## Reporting a vulnerability

Do not publish credentials, exploit details, customer data, or an unpatched
vulnerability in a public issue. Use GitHub's private vulnerability reporting
feature if enabled for this repository, or contact the repository owner through
a verified private channel.

Include affected branch/commit, impact, reproduction steps, and suggested
mitigation. Allow reasonable time for investigation and remediation.

## Security baseline

- Never commit service-role keys, access tokens, passwords, signing keys or
  production environment files.
- Treat all browser-exposed values as public.
- Require server-side authentication and authorisation for privileged actions.
- Apply least privilege and Row Level Security to user-owned records.
- Validate input and constrain CORS to trusted origins.
- Rate-limit externally reachable AI and setup endpoints.
- Do not expose demo-account creation/deletion endpoints without strong
  administrative controls.
- Rotate any credential suspected to have entered Git history.
- Test backup, restore, export and deletion controls.
- Review dependency alerts and generated SBOMs before releases.

## Known review item

The historical demo setup function was previously identified as having JWT
verification disabled while using privileged Supabase operations. Verify the
current deployment state, disable or redesign the function, and rotate
potentially exposed demo credentials. This policy does not certify that the
issue has been remediated.
