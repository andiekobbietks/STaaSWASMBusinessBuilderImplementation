# Security remediation status

This branch applies fail-closed source changes to the AI workspace feature branch.

## Changes in this branch

- The Supabase `setup-demo` function now requires JWT verification.
- The function is retired and returns HTTP 410. It no longer reads the service-role key, provisions users, resets passwords, lists users or deletes accounts.
- The login screen's hard-coded demo email/password shortcut has been removed from the current source.
- The `api/chat.ts` route always returns HTTP 503. It cannot be re-enabled with a demo environment flag.
- The login screen's hard-coded demo email/password shortcut has been removed from the current source.

## Deployment actions still required

Source changes do not alter an already deployed Supabase Edge Function or Vercel deployment. Redeploy the Supabase function/configuration and Vercel application, or manually disable the corresponding deployed functions immediately. Verify the live endpoints return the expected fail-closed responses.

If the former shared demo password or service-role key was ever exposed, rotate the affected credentials in Supabase and invalidate sessions as appropriate. Do not assume changing source code rotates secrets.

## Re-enable gate

Do not restore either capability until there is tested server-side Supabase JWT validation, resource-level authorisation, rate limiting, abuse controls, request-size and token limits, safe error handling, audit logging, and tests covering unauthenticated, cross-user and excessive-request cases. The provider endpoint must not be reachable directly from an untrusted client.

The branch also contains `supabase/functions-deploy-state.json` with an earlier function hash and `hasChanged: false`. Treat that file as stale deployment metadata, not evidence that this remediation has been deployed. Regenerate or update deployment state through the actual Supabase deployment process and verify the live function after deployment.

This is a source-level mitigation, not a security certification or confirmation of live deployment state.
