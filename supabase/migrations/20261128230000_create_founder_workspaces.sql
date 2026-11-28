-- Founder workspace persistence with append-only snapshots.
-- Each save creates a new version; consequential history is not overwritten.

create table if not exists public.founder_workspaces (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 120),
  created_at timestamptz not null default now()
);

create index if not exists founder_workspaces_user_created_idx
  on public.founder_workspaces (user_id, created_at desc);

alter table public.founder_workspaces enable row level security;

revoke all on table public.founder_workspaces from anon, public;
grant select, insert, delete on table public.founder_workspaces to authenticated;
revoke update on table public.founder_workspaces from authenticated;
grant update (name) on table public.founder_workspaces to authenticated;

create policy "Users can read their founder workspaces"
  on public.founder_workspaces
  for select to authenticated
  using (user_id = auth.uid());

create policy "Users can create their founder workspaces"
  on public.founder_workspaces
  for insert to authenticated
  with check (user_id = auth.uid());

create policy "Users can rename their founder workspaces"
  on public.founder_workspaces
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "Users can delete their founder workspaces"
  on public.founder_workspaces
  for delete to authenticated
  using (user_id = auth.uid());

create table if not exists public.founder_workspace_versions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.founder_workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  version integer not null check (version > 0),
  snapshot jsonb not null check (
    jsonb_typeof(snapshot) = 'object'
    and snapshot ->> 'schemaVersion' = '1'
  ),
  created_at timestamptz not null default now(),
  unique (workspace_id, version)
);

create index if not exists founder_workspace_versions_latest_idx
  on public.founder_workspace_versions (workspace_id, version desc);

alter table public.founder_workspace_versions enable row level security;

revoke all on table public.founder_workspace_versions from anon, public;
grant select on table public.founder_workspace_versions to authenticated;

create policy "Users can read their founder workspace versions"
  on public.founder_workspace_versions
  for select to authenticated
  using (
    user_id = auth.uid()
    and exists (
      select 1
      from public.founder_workspaces w
      where w.id = workspace_id
        and w.user_id = auth.uid()
    )
  );

create policy "Users can append their founder workspace versions"
  on public.founder_workspace_versions
  for insert to authenticated
  with check (
    user_id = auth.uid()
    and exists (
      select 1
      from public.founder_workspaces w
      where w.id = workspace_id
        and w.user_id = auth.uid()
    )
  );

create or replace function public.save_founder_workspace_version(
  p_workspace_id uuid,
  p_snapshot jsonb
)
returns integer
language plpgsql
security definer
set search_path = pg_catalog, public, pg_temp
as $$
declare
  v_user_id uuid := auth.uid();
  v_next_version integer;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;

  perform 1
  from public.founder_workspaces
  where id = p_workspace_id
    and user_id = v_user_id
  for update;

  if not found then
    raise exception 'Founder workspace not found or not owned by caller'
      using errcode = '42501';
  end if;

  if p_snapshot is null or jsonb_typeof(p_snapshot) <> 'object' then
    raise exception 'Snapshot must be a JSON object'
      using errcode = '22023';
  end if;

  select coalesce(max(version), 0) + 1
    into v_next_version
  from public.founder_workspace_versions
  where workspace_id = p_workspace_id;

  insert into public.founder_workspace_versions (
    workspace_id,
    user_id,
    version,
    snapshot
  )
  values (
    p_workspace_id,
    v_user_id,
    v_next_version,
    p_snapshot
  );

  return v_next_version;
end;
$$;

revoke all on function public.save_founder_workspace_version(uuid, jsonb) from public;
grant execute on function public.save_founder_workspace_version(uuid, jsonb) to authenticated;

comment on table public.founder_workspaces is
  'Owner-scoped founder ventures. Deleting a workspace cascades to its snapshots.';
comment on table public.founder_workspace_versions is
  'Append-only versioned snapshots of founder workspace state; ordinary clients cannot update or delete versions.';
comment on function public.save_founder_workspace_version(uuid, jsonb) is
  'Serializes concurrent saves by locking the owner-scoped workspace row and appending the next snapshot version.';
