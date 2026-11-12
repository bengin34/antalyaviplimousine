-- Per-caller fixed-window rate limits for public endpoints (MEN-245).
--
-- create-booking and verify-flight call consume_rate_limit() from the Edge
-- Function; site_events (anon insert straight through PostgREST) is guarded by
-- a trigger. Postgres, not isolate memory: edge isolates are ephemeral and
-- multi-instance, same reasoning as flight_lookups.
--
-- The subject (client IP) is stored as md5 so no raw IPs sit in the table.

create table public.rate_limits (
  bucket text not null,
  subject text not null,
  window_start timestamptz not null,
  hits integer not null default 1,
  primary key (bucket, subject, window_start)
);

alter table public.rate_limits enable row level security;
-- No policies: only service role / security definer functions touch it.

create function public.consume_rate_limit(
  p_bucket text,
  p_subject text,
  p_limit integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_hits integer;
  v_window timestamptz :=
    to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);
begin
  insert into public.rate_limits (bucket, subject, window_start, hits)
  values (p_bucket, md5(p_subject), v_window, 1)
  on conflict (bucket, subject, window_start) do update
    set hits = public.rate_limits.hits + 1
    where public.rate_limits.hits < p_limit
  returning public.rate_limits.hits into v_hits;

  return v_hits is not null;
end;
$$;

revoke execute on function public.consume_rate_limit(text, text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.consume_rate_limit(text, text, integer, integer)
  to service_role;

-- site_events: anon can insert with `with check (true)`. Cap one IP at
-- 600 rows / 10 min (hotel Wi-Fi NAT shares an IP across many tourists).
-- Over the cap the row is silently dropped so the client keeps its 2xx.
-- No IP header (service role, SQL editor) -> insert untouched.
create function public.site_events_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_h json := nullif(current_setting('request.headers', true), '')::json;
  -- cf-connecting-ip / x-real-ip are set by the proxy; the first
  -- x-forwarded-for entry is client-supplied, so it is the last resort.
  v_ip text := nullif(trim(coalesce(
    v_h ->> 'cf-connecting-ip',
    v_h ->> 'x-real-ip',
    split_part(coalesce(v_h ->> 'x-forwarded-for', ''), ',', 1))), '');
begin
  if v_ip is not null
     and not public.consume_rate_limit('site_events', v_ip, 600, 600) then
    return null;
  end if;
  return new;
end;
$$;

create trigger site_events_rate_limit
  before insert on public.site_events
  for each row execute function public.site_events_rate_limit();

create extension if not exists pg_cron with schema pg_catalog;

select cron.schedule(
  'prune-rate-limits',
  '27 3 * * *',
  $$delete from public.rate_limits where window_start < now() - interval '1 day'$$
);
