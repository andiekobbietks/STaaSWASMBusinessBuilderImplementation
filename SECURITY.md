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

## Known remediation and remaining deployment work

On 27 November 2026, the source-level remediation for the former Supabase
`setup-demo` function was merged into `main`: JWT verification is required and
the handler is retired with HTTP 410. The same remediation is present on the
AI workspace feature branch. The unauthenticated feature-branch chat route is
also disabled with HTTP 503.

**Live deployment state remains unverified.** These Git changes do not deploy
the Edge Function or Vercel route, rotate credentials, or invalidate sessions.
Disable/redeploy the live function, verify its responses, and rotate/delete the
former shared demo account credentials. Rotate any potentially exposed provider
secrets and invalidate sessions where appropriate. Do not treat source merge or
CI success as proof of live remediation.
