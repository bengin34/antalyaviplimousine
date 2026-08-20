-- Move legacy profit/loss manual distance overrides into the canonical
-- bookings columns so admin edits and reporting use a single persistence path.
UPDATE bookings AS b
SET manual_outbound_distance_km = src.distance_km
FROM profit_loss_distance_overrides AS src
WHERE src.booking_id = b.id
  AND src.leg = 'outbound'
  AND (
    b.manual_outbound_distance_km IS NULL
    OR b.manual_outbound_distance_km <> src.distance_km
  );

UPDATE bookings AS b
SET manual_return_distance_km = src.distance_km
FROM profit_loss_distance_overrides AS src
WHERE src.booking_id = b.id
  AND src.leg = 'return'
  AND (
    b.manual_return_distance_km IS NULL
    OR b.manual_return_distance_km <> src.distance_km
  );
