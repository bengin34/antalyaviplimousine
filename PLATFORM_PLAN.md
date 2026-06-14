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
| Ödeme | iyzico Checkout Form | Sözleşmedeki işlem oranı |
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
  payment_currency TEXT,
  payment_method TEXT,            -- cash | card
  status TEXT,                   -- pending|paid|confirmed|cancelled
  iyzico_token TEXT,
  iyzico_payment_id TEXT,
  paid_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ
)

-- Admin notları
booking_notes (
  id, booking_id, note, created_at
)
```

---

## iyzico → Türk Banka Hesabı

**Neden iyzico:**
- Türkiye merkezli şirket başvurusu desteklenir
- Yabancı Visa ve Mastercard ödemeleri alınabilir
- Checkout Form ile kart verisi site sunucularına girmez
- Ödeme sonucu API üzerinden doğrulanmadan rezervasyon `paid` yapılmaz

**Kurulum:**
1. iyzico işyeri hesabını ve yabancı kart/döviz yetkisini etkinleştir
2. API anahtarlarını Supabase secrets içine ekle
3. Önce sandbox ortamında başarılı ve başarısız kart senaryolarını test et
4. Canlıya geçerken API adresini ve anahtarları production değerleriyle değiştir
5. Callback Edge Function'ını JWT doğrulaması kapalı olarak deploy et

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
  Önerilen: araçta nakit ödeme → status=confirmed
  Alternatif: iyzico güvenli Checkout Form sayfası
  → Doğrulanmış callback → status=paid
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
| 2 | iyzico Checkout + callback entegrasyonu | 1 gün |
| 3 | Booking formu → 3 adımlı checkout | 2–3 gün |
| 4 | Email sistemi (Resend) | yarım gün |
| 5 | Admin paneli | 0 (Studio) / 2 gün (custom) |

**Toplam: ~1 hafta**
