-- Per-booking, per-leg one-way distances entered from the admin profit/loss
-- report when a route is not covered by the fixed distance graph.
CREATE TABLE IF NOT EXISTS profit_loss_distance_overrides (
  booking_id   UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  leg          TEXT NOT NULL CHECK (leg IN ('outbound', 'return')),
  distance_km  NUMERIC(10, 2) NOT NULL CHECK (distance_km > 0 AND distance_km <= 5000),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (booking_id, leg)
);
ALTER TABLE profit_loss_distance_overrides ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE ON profit_loss_distance_overrides TO authenticated;
CREATE POLICY "admin_read_profit_loss_distance_overrides" ON profit_loss_distance_overrides
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin_insert_profit_loss_distance_overrides" ON profit_loss_distance_overrides
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "admin_update_profit_loss_distance_overrides" ON profit_loss_distance_overrides
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
