-- ============================================================
-- HOSTINGER AI BUILDER – TELJES JAVÍTÁS
-- Futtasd: https://supabase.com/dashboard/project/pavleectcuwzkuttvmbq/sql/new
-- ============================================================
-- A Hostinger űrlap insert().select()-et használ → INSERT + SELECT kell az anon-nak.
-- Ha csak INSERT van megadva, ez a hiba jön: "permission denied for table leads"

-- 1) Jogosultságok
grant usage on schema public to anon, authenticated, service_role;
grant insert, select on table public.leads to anon, authenticated, service_role;
grant all on table public.leads to service_role;

-- 2) RLS bekapcsolás
alter table public.leads enable row level security;

-- 3) INSERT policy (űrlap küldés)
drop policy if exists "Allow anonymous insert" on public.leads;
create policy "Allow anonymous insert"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- 4) SELECT policy (Hostinger visszaolvassa a beszúrt sort)
drop policy if exists "Allow anonymous select" on public.leads;
create policy "Allow anonymous select"
  on public.leads
  for select
  to anon, authenticated
  using (true);

-- 5) Hostinger csak név/email/telefon mezőket küld – alapértelmezések
alter table public.leads
  alter column site_domain set default 'tomninggoteborg.se',
  alter column city set default 'Göteborg',
  alter column address set default '',
  alter column postal_code set default '';

alter table public.leads
  alter column address drop not null,
  alter column city drop not null,
  alter column postal_code drop not null;

-- ============================================================
-- ELLENŐRZÉS (futtatás után):
-- Table Editor → leads → új sor jelenik meg teszt küldéskor
-- ============================================================
