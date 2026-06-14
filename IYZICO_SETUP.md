# iyzico Kurulumu

## 1. Veritabanı

Supabase migration'larını uygula:

```bash
supabase db push
```

Bu işlem eski ödeme sağlayıcısı alanını kaldırır, iyzico alanlarını ekler ve
frontend fiyatlarını sunucu tarafındaki `routes` tablosuyla eşitler.

## 2. Secrets

`supabase/.env.example` dosyasını `supabase/.env` olarak oluştur ve gerçek
değerleri ekle:

```bash
supabase secrets set --env-file supabase/.env
```

Sandbox:

```text
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com
```

Canlı:

```text
IYZICO_BASE_URL=https://api.iyzipay.com
```

`IYZICO_FOREIGN_BUYER_IDENTITY_NUMBER` değerini canlıya geçmeden önce iyzico
hesap temsilcinle teyit et. Bu proje yabancı turist ödemelerine göre hazırlanmıştır.

## 3. Edge Functions

```bash
supabase functions deploy create-booking
supabase functions deploy create-iyzico-checkout
supabase functions deploy iyzico-callback --no-verify-jwt
```

Callback URL kod tarafından otomatik oluşturulur:

```text
https://<project-ref>.supabase.co/functions/v1/iyzico-callback
```

## 4. Frontend

Kök `.env` dosyasında yalnızca Supabase istemci değerleri gerekir:

```text
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

## 5. Canlıya Geçiş Kontrolü

- Yabancı kart ve EUR tahsilat yetkisi iyzico tarafından açılmış olmalı.
- `PUBLIC_SITE_URL` gerçek HTTPS alan adını göstermeli.
- Başarılı ödeme rezervasyonu `paid` yapmalı.
- Başarısız veya imzası geçersiz callback rezervasyonu `pending` bırakmalı.
- Araçta ödeme seçilen rezervasyon iyzico'ya gitmeden `confirmed` olmalı.
- iyzico panelindeki tutar ile `bookings.price_eur` aynı olmalı.
