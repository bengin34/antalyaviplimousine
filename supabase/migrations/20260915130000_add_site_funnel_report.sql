-- Admin huni raporunun tek veri kaynağı.
--
-- Toplama neden sunucuda: `site_events` her sayfa görüntülemesi için satır
-- yazar. Ham satırları tarayıcıya çekmek birkaç ay sonra megabaytlarca
-- indirme demek olurdu; panel tek çağrıda hazır sayıları alır.
--
-- Ciro kısmı bilerek `site_events`'ten değil `bookings`'ten okunur: olay
-- tablosu ölçüm, rezervasyon tablosu gerçektir. Reklam engelleyici bir
-- ziyaretçinin olaylarını düşürebilir ama rezervasyonunu düşüremez.
create function public.site_funnel_summary(p_days integer default 30)
returns jsonb
language sql
security definer
set search_path = public
as $$
  with window_bounds as (
    select now() - make_interval(days => greatest(p_days, 1)) as since
  ),
  events as (
    select * from public.site_events, window_bounds where created_at >= since
  )
  select jsonb_build_object(
    'days', greatest(p_days, 1),
    -- Huni adımları oturum bazında sayılır: aynı ziyaretçinin fiyatı iki kez
    -- görmesi dönüşüm oranını şişirmemeli.
    'funnel', coalesce((
      select jsonb_agg(row_to_json(step) order by step.event)
      from (
        select event, count(distinct session_id) as sessions, count(*) as events
        from events
        where event in ('landing_view', 'price_shown', 'booking_started', 'booking_submitted')
        group by event
      ) step
    ), '[]'::jsonb),
    'abandoned', coalesce((
      select jsonb_agg(row_to_json(r) order by r.step)
      from (
        select coalesce(props->>'step', '?') as step, count(distinct session_id) as sessions
        from events where event = 'form_abandoned'
        group by 1
      ) r
    ), '[]'::jsonb),
    -- Fiyatı olmayan rota: müşteri istedi, site veremedi.
    'unavailable', coalesce((
      select jsonb_agg(row_to_json(r) order by r.sessions desc)
      from (
        select coalesce(route, '?') as route, count(distinct session_id) as sessions
        from events where event = 'quote_unavailable'
        group by 1
      ) r
    ), '[]'::jsonb),
    'contact', coalesce((
      select jsonb_agg(row_to_json(r) order by r.events desc)
      from (
        select event, count(*) as events
        from events where event in ('whatsapp_clicked', 'phone_clicked')
        group by 1
      ) r
    ), '[]'::jsonb),
    'flight_failures', coalesce((
      select count(*) from events where event = 'flight_verification_failed'
    ), 0),
    'sources', coalesce((
      select jsonb_agg(row_to_json(r) order by r.revenue_eur desc nulls last)
      from (
        select coalesce(nullif(b.utm_source, ''), case when b.gclid is not null then 'google-ads' else 'direct' end) as source,
               count(*) as bookings,
               sum(coalesce(b.price_eur, 0)) as revenue_eur
        from public.bookings b, window_bounds
        where b.created_at >= window_bounds.since
          and b.status <> 'cancelled'
        group by 1
      ) r
    ), '[]'::jsonb)
  );
$$;

revoke all on function public.site_funnel_summary(integer) from public, anon;
grant execute on function public.site_funnel_summary(integer) to authenticated;

comment on function public.site_funnel_summary(integer) is
  'Admin huni raporu: son p_days günün olay toplamları ve kaynak bazlı ciro. '
  'Yalnızca oturum açmış kullanıcı çağırabilir.';
