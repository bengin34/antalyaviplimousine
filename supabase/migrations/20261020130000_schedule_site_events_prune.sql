-- Prune site_events every night instead of by hand.
--
-- prune_site_events() was added with the table but nothing ever called it:
-- one row per page view from anonymous visitors kept accumulating, eating the
-- free tier's disk and bloating the indexes the funnel report and every
-- insert depend on. 90 days is the retention the function and GA4_SETUP.md
-- already assume. 03:17 UTC keeps it off the hour, when most cron jobs run.
--
-- cron.schedule with an existing job name replaces that job, so re-running
-- this is harmless.

create extension if not exists pg_cron with schema pg_catalog;

select cron.schedule(
  'prune-site-events',
  '17 3 * * *',
  $$select public.prune_site_events(90)$$
);
