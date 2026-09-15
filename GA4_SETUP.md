# Ölçüm (Tracking) Rehberi

Site iki paralel ölçüm sistemi kullanır. İkisi birbirinin yedeği değil,
farklı soruları cevaplar:

| Sistem | Soru | Neden gerekli |
| --- | --- | --- |
| **GA4 + Google Ads** | Trafik nereden geldi? | Ads teklif algoritması yalnızca kendi sinyaliyle öğrenir; alternatifi yok |
| **`site_events` (Supabase)** | Huninin neresinde kaybediyoruz? Hangi kampanya kaç euro ciro getirdi? | Reklam engelleyici ve çerez reddi bunu engellemez; `bookings` ile aynı şemada |

---

## 1. Kampanya attribution'ı

Reklam tıklamasının parametreleri yalnızca giriş sayfasının URL'sinde bulunur.
`public-app/app/lib/attribution.ts` bunları ilk sayfa yüklemesinde
`sessionStorage`'a alır ve rezervasyon gönderilirken `bookings` tablosunun
`utm_*` / `gclid` / `landing_page` / `referrer` kolonlarına yazar
(migration `20260822120000`).

Kural: kampanya alanları **son dokunuş** (yeni reklam eskisini ezer),
`landing_page` ve `referrer` **ilk dokunuş** (ziyaretin nasıl başladığını anlatır).

Doğrulama: siteyi `?utm_source=test&gclid=test123` ile aç, rezervasyon yap,
admin panelinde kaydın `utm_source` alanına bak.

---

## 2. `site_events` — birinci taraf huni

Migration: `supabase/migrations/20260915120000_add_site_events.sql`
İstemci: `public-app/app/lib/track.ts`

Yazılan olaylar (tablo bu listenin dışını `check` kısıtıyla reddeder):

| Olay | Ne zaman |
| --- | --- |
| `landing_view` | Her sayfa yüklemesi — tüm oranların paydası |
| `route_selected` / `vehicle_selected` | Ana sayfadan rota veya araç seçimi |
| `price_shown` | Adım 1 → 2, fiyat gösterildi |
| `quote_unavailable` | Rota/otel seçildi ama fiyat 0 döndü — **kayıp talep** |
| `booking_started` | Adım 2 → 3, müşteri bilgilerine geçildi |
| `form_abandoned` | Formu yarıda bırakıp sayfadan çıktı (hangi adımda) |
| `flight_verification_failed` | Uçuş numarası doğrulanamadı |
| `begin_checkout` / `booking_submitted` | Gönderim |
| `whatsapp_clicked` / `phone_clicked` | Doğrudan iletişim |

**Kişisel veri yazılmaz.** `session_id` rastgeledir, sekme kapanınca kaybolur.
`track()` gönderim öncesi isim/e-posta/telefon/adres/otel içeren anahtarları
düşürür — testi `public-app/app/lib/track.test.ts` içinde. Bu yüzden bu
satırlar çerez onayına tabi değildir; **yeni alan eklerken bu kuralı bozma.**

### Admin paneli

Panelde **📊 Huni** sekmesi (`#funnel`) bu verileri okur. Toplama tarayıcıda
değil, `site_funnel_summary(p_days)` RPC'sinde yapılır (migration
`20260915130000`) — panel her açılışta binlerce satır indirmez.

Sekmede dört blok var:

1. **Huni** — giriş → fiyat gördü → bilgi girdi → gönderdi, oturum bazında.
   Aynı ziyaretçinin fiyatı iki kez görmesi oranı şişirmez.
2. **Kayıplar** — hangi adımda bırakıldı, hangi rota fiyat döndüremedi
3. **Kaynak → ciro** — bu blok `bookings`'ten okur, olaylardan değil
4. **Üst kartlar** — WhatsApp/telefon tıklaması, uçuş doğrulama hataları

Paydası sıfır olan oran "%0" değil "—" gösterilir: bilinmiyor ile sıfır aynı
şey değildir ve %0 yanlış karar verdirir.

### Kullanışlı sorgular

Huni oranları (son 30 gün):

```sql
select event, count(*) as n, count(distinct session_id) as sessions
from site_events
where created_at > now() - interval '30 days'
  and event in ('landing_view','price_shown','booking_started','booking_submitted')
group by event;
```

Nerede bırakıyorlar:

```sql
select props->>'step' as step, count(*)
from site_events
where event = 'form_abandoned' and created_at > now() - interval '30 days'
group by 1 order by 2 desc;
```

Fiyatı olmayan rotalar (doğrudan kaybedilen para):

```sql
select route, count(*) from site_events
where event = 'quote_unavailable' group by 1 order by 2 desc;
```

Kampanya → gerçek ciro (GA4'ün veremediği sayı):

```sql
select coalesce(utm_source, 'direct') as source,
       count(*) as bookings,
       sum(price_eur) as revenue_eur
from bookings
where created_at > now() - interval '30 days'
group by 1 order by revenue_eur desc nulls last;
```

### Bakım

Satırlar sınırsız birikmemeli. Ayda bir (veya pg_cron ile):

```sql
select prune_site_events(90);
```

---

## 3. Consent Mode v2

`src/analytics-consent.js` — hem eski sayfalar (`src/consent.js`) hem React
sitesi (`CookieConsent.tsx`) buradan besleniyor; **ID'ler tek yerde**.

Davranış: etiket **her ziyarette** yüklenir, ama tüm sinyaller `denied`
başlar. Çerez yazılmaz, reklam tanımlayıcısı gönderilmez. Ziyaretçi kabul
ederse aynı etiket yerinde `granted`'a yükseltilir.

Neden: eskiden onay verilmeden etiket hiç yüklenmiyordu ve banner'ı yok sayan
herkes görünmezdi — AB trafiğinde bu çoğunluk demek. Consent Mode ile Google
görmediği dönüşümleri modelleyebiliyor ve Ads teklifi çalışmaya devam ediyor.

> Gizlilik metinleri (7 dil) bu davranışı anlatacak şekilde güncellendi.
> Metnin hukuki yeterliliği gözden geçirilmeli — teknik açıklama doğru, ama
> nihai sorumluluk operatörde.

---

## 4. Google Search Console

Sitemap ve robots hazır:

- `https://antalyaviptourism.com/sitemap.xml` — 408 URL, her build'de yeniden üretilir
- `public/robots.txt` sitemap'i zaten işaret ediyor

Kalan tek adım doğrulama ve bu bir token gerektiriyor:

1. `search.google.com/search-console` → **Add Property** → URL prefix:
   `https://antalyaviptourism.com/`
2. **HTML file** yöntemini seç, `googleXXXXXXXX.html` dosyasını indir
3. Dosyayı `public/` klasörüne koy (Yandex doğrulaması da orada:
   `public/yandex_82a3e3ec135d6119.html`) ve deploy et
4. Search Console'da **Verify** → ardından **Sitemaps** → `sitemap.xml` gönder

---

## Deploy kontrol listesi

- [ ] `supabase db push` — `site_events` ve `site_funnel_summary` migration'larını canlıya al
- [ ] Search Console doğrulama dosyasını `public/` içine ekle
- [ ] GA4 Admin → **Google Ads Links** → Ads hesabını bağla
- [ ] `?utm_source=test&gclid=test123` ile bir test rezervasyonu yap, kolonları doğrula
