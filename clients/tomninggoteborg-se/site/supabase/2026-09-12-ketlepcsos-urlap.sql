-- ============================================================
-- Kétlépcsős ajánlatkérő + képfeltöltés — adatbázis-migráció
-- Projekt: pavleectcuwzkuttvmbq (tomninggoteborg.se)
-- Futtatás: Supabase Dashboard -> SQL Editor -> New query
--
-- Biztonságos újrafuttatni: minden lépés idempotens.
-- Meglévő sorokat nem módosít, nem töröl.
-- ============================================================


-- ------------------------------------------------------------
-- 1) Az e-mail ne legyen kötelező
--    Tamás: "az e-mail ne legyen kötelező" (8. pont)
--    A telefon és a név marad NOT NULL.
-- ------------------------------------------------------------
alter table public.leads alter column email drop not null;


-- ------------------------------------------------------------
-- 2) Token a 2. lépéshez
--    Az 1. lépés beszúr egy sort, és visszaad egy tokent.
--    A 2. lépés ezzel a tokennel egészíti ki UGYANAZT a sort.
--    A token képesség-kulcs: csak az kapja meg, aki a sort
--    létrehozta, és csak a 2. lépés mezőit írhatja vele.
-- ------------------------------------------------------------
create extension if not exists pgcrypto;

alter table public.leads
  add column if not exists public_token uuid not null default gen_random_uuid();

create unique index if not exists leads_public_token_idx
  on public.leads (public_token);


-- ------------------------------------------------------------
-- 3) A 2. lépés mezői
--    Mind opcionális — aki itt kiszáll, annak az 1. lépése
--    már megvan leadként.
-- ------------------------------------------------------------
alter table public.leads
  add column if not exists property_type   text,   -- lägenhet / villa / radhus / förråd ...
  add column if not exists size_range      text,   -- "60-80 m2" — szándékosan szöveg, nem szám
  add column if not exists floor_info      text,   -- emelet
  add column if not exists has_elevator    boolean,
  add column if not exists extra_spaces    text,   -- pince / padlás / garázs
  add column if not exists access_notes    text,   -- parkolás, cipelési távolság
  add column if not exists photo_paths     text[] default '{}',
  add column if not exists step2_at        timestamptz,
  add column if not exists consent_at      timestamptz;  -- GDPR elfogadás időbélyege

comment on column public.leads.public_token is
  'Képesség-kulcs a kétlépcsős űrlap 2. lépéséhez. Csak Edge Function használja.';
comment on column public.leads.photo_paths is
  'Fájlútvonalak a lead-photos bucketben. 90 nap után automatikusan törlődnek.';


-- ------------------------------------------------------------
-- 4) Privát tároló a fotóknak
--    Tamás: "Elfogadom a feltöltött képek 90 nap utáni
--    automatikus törlését." (8. pont)
--
--    A bucket PRIVÁT. Elhunyt lakásáról készült kép érzékeny
--    adat — nyilvános URL-en soha nem lehet elérhető.
--    A feltöltés aláírt URL-lel megy, amit az Edge Function ad ki.
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'lead-photos', 'lead-photos', false,
  10485760,                                   -- 10 MB / fájl
  array['image/jpeg','image/png','image/webp','image/heic']
)
on conflict (id) do update
  set public             = false,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Semmilyen anon/authenticated policy NEM készül a buckethez.
-- Így böngészőből közvetlenül sem olvasni, sem írni nem lehet.
-- Minden hozzáférés az Edge Functionön megy, service_role kulccsal.


-- ------------------------------------------------------------
-- 5) RLS — a leads táblán marad a szigorítás
--    Az anon csak beszúrni tudott eddig; most a SELECT-et is
--    elvesszük tőle, mert a Hostinger AI builder óta nincs rá
--    szükség (a mostani űrlap Edge Functiont hív).
--    FIGYELEM: ez törli a "Allow anonymous select" policyt.
-- ------------------------------------------------------------
alter table public.leads enable row level security;

drop policy if exists "Allow anonymous select" on public.leads;
revoke select on table public.leads from anon, authenticated;

-- Az insert policy maradhat: tartalék útvonal, ha az Edge
-- Function kiesne. Ha nem kell, töröld ezt a két sort is.
drop policy if exists "Allow anonymous insert" on public.leads;
create policy "Allow anonymous insert"
  on public.leads for insert to anon, authenticated
  with check (true);


-- ------------------------------------------------------------
-- 6) 90 napos automatikus fotótörlés
--    A sor megmarad (üzleti adat), csak a képek törlődnek.
-- ------------------------------------------------------------
create or replace function public.purge_old_lead_photos()
returns integer
language plpgsql
security definer
set search_path = public, storage
as $$
declare
  removed integer := 0;
begin
  delete from storage.objects
   where bucket_id = 'lead-photos'
     and created_at < now() - interval '90 days';
  get diagnostics removed = row_count;

  update public.leads
     set photo_paths = '{}'
   where photo_paths <> '{}'
     and coalesce(step2_at, created_at) < now() - interval '90 days';

  return removed;
end;
$$;

revoke all on function public.purge_old_lead_photos() from public, anon, authenticated;

-- Ütemezés. Ha a pg_cron nincs engedélyezve a csomagban, ez a
-- blokk csendben kimarad, és a takarítást ütemezett Edge
-- Functionnel oldjuk meg helyette.
do $$
begin
  if exists (select 1 from pg_available_extensions where name = 'pg_cron') then
    begin
      create extension if not exists pg_cron;
    exception when others then
      raise notice 'pg_cron nem kapcsolhato be innen (%). Kapcsold be: Database -> Extensions', sqlerrm;
      return;
    end;
    if exists (select 1 from cron.job where jobname = 'purge-lead-photos') then
      perform cron.unschedule('purge-lead-photos');
    end if;
    perform cron.schedule(
      'purge-lead-photos',
      '30 3 * * *',                                  -- minden éjjel 03:30 UTC
      $cron$ select public.purge_old_lead_photos(); $cron$
    );
    raise notice 'pg_cron utemezes beallitva: purge-lead-photos';
  else
    raise notice 'pg_cron nem elerheto - utemezett Edge Function kell helyette';
  end if;
end
$$;


-- ------------------------------------------------------------
-- 7) Ellenőrzés
-- ------------------------------------------------------------
select column_name, data_type, is_nullable
  from information_schema.columns
 where table_schema = 'public' and table_name = 'leads'
 order by ordinal_position;

select id, name, public, file_size_limit
  from storage.buckets where id = 'lead-photos';
