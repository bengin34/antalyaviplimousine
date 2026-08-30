-- The booking editor writes the customer message language when saving the full
-- form, so admins need column-level UPDATE on language. Additive grant keeps the
-- existing column privileges from 20260820110000 / 20260821130000 intact.
GRANT UPDATE (language) ON bookings TO authenticated;
