-- Admins can adjust an agreed booking price (for example after a WhatsApp offer).
-- Keep the authenticated role restricted to the operational fields used by the
-- admin panel; every other booking column remains read-only.
REVOKE UPDATE ON bookings FROM authenticated;
GRANT UPDATE (status, price_eur) ON bookings TO authenticated;
