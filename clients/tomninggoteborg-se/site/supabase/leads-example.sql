create table if not exists public.leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  site_domain text not null default 'tomninggoteborg.se',
  name text not null,
  address text default '',
  city text default 'Göteborg',
  postal_code text default '',
  phone text not null,
  email text not null,
  service text,
  preferred_date date,
  message text
);

alter table public.leads enable row level security;

grant usage on schema public to anon, authenticated, service_role;
grant insert on table public.leads to anon, authenticated, service_role;
grant select on table public.leads to service_role;

drop policy if exists "Allow anonymous insert" on public.leads;
create policy "Allow anonymous insert"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- Hostinger AI Builder: futtasd külön is → supabase/hostinger-fix.sql
