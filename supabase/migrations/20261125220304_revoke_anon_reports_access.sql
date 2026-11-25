/*
# Tighten reports table grants — remove anon access

The Business Builder app requires authentication (sign-in screen).
The reports table was accidentally granted CRUD to the `anon` role,
which is unnecessary and insecure — unauthenticated users should not
be able to read, create, modify, or delete any reports.

1. Changes
- REVOKE all privileges on `reports` from `anon` role.
- `authenticated` retains its existing CRUD grants (unchanged).
- RLS policies remain unchanged (authenticated-only, owner-scoped).

2. Security
- After this change, only `authenticated` users can access reports,
  and only their own rows per the existing RLS policies.
*/

REVOKE ALL PRIVILEGES ON reports FROM anon;
