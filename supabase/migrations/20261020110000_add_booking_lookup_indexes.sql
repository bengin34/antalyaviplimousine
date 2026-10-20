-- Indexes for the lookups the admin screens make on every load.
--
-- booking_notes.booking_id: the timeline, driver-comms and detail pages embed
-- `booking_notes(...)` per booking, and the ON DELETE CASCADE from bookings
-- has to find the notes too; without an index each one scans the table.
-- bookings.manual_return_of_ref: the detail page looks up a booking's linked
-- return by it, and its ON DELETE SET NULL scans bookings on every delete.
-- pickup_date / return_date / service_end_date: the timeline (refreshed every
-- minute), driver comms and the flight-check list filter on these, OR-ed
-- together; separate indexes let Postgres combine them with a BitmapOr.
--
-- The tables are small, so a plain (locking) build is a moment's work and can
-- run inside the migration transaction, unlike CREATE INDEX CONCURRENTLY.

create index if not exists booking_notes_booking_id_idx
  on public.booking_notes (booking_id);

create index if not exists bookings_manual_return_of_ref_idx
  on public.bookings (manual_return_of_ref)
  where manual_return_of_ref is not null;

create index if not exists bookings_pickup_date_idx
  on public.bookings (pickup_date);

create index if not exists bookings_return_date_idx
  on public.bookings (return_date)
  where return_date is not null;

create index if not exists bookings_service_end_date_idx
  on public.bookings (service_end_date)
  where service_end_date is not null;
