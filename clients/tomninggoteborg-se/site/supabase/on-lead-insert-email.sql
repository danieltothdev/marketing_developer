-- ============================================================
-- E-MAIL ÉRTESÍTÉS WEBHOOK NÉLKÜL (pg_net trigger)
-- Futtasd: Supabase SQL Editor (pavleectcuwzkuttvmbq)
--
-- ELŐFELTÉTEL: deploy-old a notify-lead Edge Function-t!
-- Dashboard → Edge Functions → notify-lead → Deploy
-- Secrets: NOTIFY_EMAIL, RESEND_API_KEY, NOTIFY_FROM
-- ============================================================

create extension if not exists pg_net with schema extensions;

create or replace function public.trigger_lead_email()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform net.http_post(
    url := 'https://pavleectcuwzkuttvmbq.supabase.co/functions/v1/notify-lead',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || 'IDE_ÍRD_A_SERVICE_ROLE_KEY-T'
    ),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'leads',
      'record', to_jsonb(NEW)
    )
  );
  return NEW;
end;
$$;

drop trigger if exists on_lead_insert_email on public.leads;
create trigger on_lead_insert_email
  after insert on public.leads
  for each row
  execute function public.trigger_lead_email();

-- ============================================================
-- Service role key: Project Settings → API → service_role → Reveal
-- Cseréld ki: IDE_ÍRD_A_SERVICE_ROLE_KEY-T
-- ============================================================
-- FONTOS: notify-lead-et hívd, NEM submit-lead-et!
-- (submit-lead újra INSERT-elne → duplikált sor)
-- ============================================================
