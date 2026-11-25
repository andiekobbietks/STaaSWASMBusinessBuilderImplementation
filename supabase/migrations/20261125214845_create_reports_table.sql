/*
# Create reports table for Business Builder

1. New Tables
- `reports`
  - `id` (uuid, primary key)
  - `user_id` (uuid, not null, defaults to authenticated user, references auth.users with cascade delete)
  - `business_idea` (text, not null) — the user's input business idea
  - `language` (text, not null, default 'en') — language code: 'en' or 'nl'
  - `clarity_analysis` (text) — output of Clarity Agent
  - `niche_strategy` (text) — output of Niche Agent
  - `action_plan` (text) — output of Action Agent
  - `business_strategy` (text) — output of Strategy Agent
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `reports`.
- Grant CRUD to `authenticated` only (app requires sign-in).
- Owner-scoped CRUD: each authenticated user can only access rows they own.
- `user_id` defaults to `auth.uid()` so inserts that omit it still satisfy the WITH CHECK.

3. Indexes
- Index on `user_id` for fast per-user report listing.
- Index on `created_at` descending for history ordering.
*/

CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  business_idea text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  clarity_analysis text,
  niche_strategy text,
  action_plan text,
  business_strategy text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON reports TO authenticated;

DROP POLICY IF EXISTS "select_own_reports" ON reports;
CREATE POLICY "select_own_reports"
ON reports FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_reports" ON reports;
CREATE POLICY "insert_own_reports"
ON reports FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_reports" ON reports;
CREATE POLICY "update_own_reports"
ON reports FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_reports" ON reports;
CREATE POLICY "delete_own_reports"
ON reports FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
