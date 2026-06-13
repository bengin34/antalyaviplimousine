# Platform Dönüşüm Planı — Antalya VIP Limousine

Statik site → Online rezervasyon + ödeme platformu.

---

## Mevcut Durum

- Saf HTML/CSS/JS + Vite
- Booking formu var ama hiçbir şey yapmıyor
- Backend yok

---

## Tech Stack

| Katman | Araç | Maliyet |
|--------|------|---------|
| Frontend | Mevcut HTML+Vite | Ücretsiz |
| Backend/DB | Supabase | Ücretsiz (500MB) → $25/ay |
| Ödeme | Stripe | %1.5–3.25/işlem |
| Email | Resend | Ücretsiz (3k/ay) |
| Hosting | Vercel / Netlify | Ücretsiz |

---

## Supabase Veritabanı

```sql
-- Fiyatlandırma matrisi
routes (
  id, from_location, to_location,
  price_eur, price_usd,
  duration_min, distance_km,
  vehicle_type   -- vclass | vito
)

-- Rezervasyonlar
bookings (
  id uuid PRIMARY KEY,
  booking_ref TEXT UNIQUE,       -- "AVL-2024-0001"
  customer_name, customer_email, customer_phone,
  pickup_location, dropoff_location,
  pickup_datetime TIMESTAMPTZ,
  flight_number TEXT,
  guests INT, bags INT,
  vehicle_type TEXT,
  price_eur DECIMAL,
  currency TEXT,                 -- EUR / USD / GBP / TRY
  status TEXT,                   -- pending|paid|confirmed|cancelled
  stripe_payment_intent TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ
)

-- Admin notları
booking_notes (
  id, booking_id, note, created_at
)
```

---

## Stripe → Türk Banka Hesabı

**Neden Stripe (iyzico/PayTR değil):**
- Türkiye'de 2022'den beri aktif
- Uluslararası kart: Visa, MC, Amex, Google Pay, Apple Pay
- Payout: TRY olarak Türk banka hesabına (7 iş günü)
- Yabancı turistler Stripe'a güvenir

**Kurulum:**
1. stripe.com → Turkey business account aç
2. Türk banka IBAN gir (TR...)
3. Kimlik doğrulama (vergi no veya TC kimlik)
4. Para birimi: EUR + TRY
5. Payout: otomatik TRY

**Ücretler:**
- Avrupa kartları: %1.5 + €0.25 / işlem
- Uluslararası kart: %3.25 + €0.25

---

## 3 Adımlı Checkout Akışı

```
ADIM 1 — Rota & Tarih
  pickup | destination | date | time | guests | bags
  → Anlık fiyat göster (routes tablosundan)

ADIM 2 — Kişisel Bilgiler
  İsim | E-posta | Telefon | Uçuş numarası | Notlar
  → Booking kaydedilir (status: pending)

ADIM 3 — Ödeme
  Stripe Embedded ödeme formu
  Apple Pay / Google Pay butonları
  → Webhook → status=paid → Resend email
```

---

## Email (Resend)

- Müşteriye: Rezervasyon onayı (booking ref, detaylar)
- Operatöre: Yeni rezervasyon bildirimi
- 24 saat öncesi: Hatırlatma (cron)
- İptal: Otomatik iptal emaili

---

## Admin Paneli

**Başlangıç:** Supabase Studio (sıfır geliştirme, hemen hazır)

**İleride custom UI:**
```
/admin
├── /bookings        — liste + filtre (tarih/status)
├── /bookings/:id    — detay + notlar + status güncelle
├── /calendar        — günlük takvim
└── /revenue         — gelir özeti
```

---

## Faz Sırası

| Faz | İş | Süre |
|-----|----|------|
| 1 | Supabase kur, tablolar, Edge Functions | 1–2 gün |
| 2 | Stripe entegrasyon + webhook | 1 gün |
| 3 | Booking formu → 3 adımlı checkout | 2–3 gün |
| 4 | Email sistemi (Resend) | yarım gün |
| 5 | Admin paneli | 0 (Studio) / 2 gün (custom) |

**Toplam: ~1 hafta**
