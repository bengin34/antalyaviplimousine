-- Monthly assumptions and advertising expenses used by the admin profit/loss
-- report. Revenue continues to come exclusively from bookings; this table only
-- stores the inputs required to express vehicle costs and net profit in TRY.
CREATE TABLE IF NOT EXISTS profit_loss_settings (
  period_month             DATE PRIMARY KEY,
  km_cost_try              NUMERIC(10, 2) NOT NULL DEFAULT 15.00
                           CHECK (km_cost_try > 0 AND km_cost_try <= 10000),
  advertising_expense_try  NUMERIC(12, 2) NOT NULL DEFAULT 0
                           CHECK (advertising_expense_try >= 0 AND advertising_expense_try <= 1000000000),
  eur_try_rate             NUMERIC(10, 4) NOT NULL DEFAULT 50.0000
                           CHECK (eur_try_rate > 0 AND eur_try_rate <= 10000),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (period_month = date_trunc('month', period_month)::date)
);

ALTER TABLE profit_loss_settings ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE ON profit_loss_settings TO authenticated;

CREATE POLICY "admin_read_profit_loss_settings" ON profit_loss_settings
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "admin_insert_profit_loss_settings" ON profit_loss_settings
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "admin_update_profit_loss_settings" ON profit_loss_settings
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
