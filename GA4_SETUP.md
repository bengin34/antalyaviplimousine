# Google Analytics 4 (GA4) Kurulum Rehberi

GA4 = Google'ın ücretsiz ziyaretçi takip aracı. Kimler geldi, nereden geldi,
formu doldurup doldurmadı — bunları görmek için zorunlu.

---

## Adım 1 — GA4 Hesabı Oluştur

1. `analytics.google.com` → Google hesabınla giriş yap
2. **Admin** → **Create Account**
3. Account Name: `Antalya VIP Limousine`
4. **Property** → Property Name: `antalyaviptourism.com`
5. Timezone: `Turkey`, Currency: `EUR`
6. **Data Stream** → Web → URL: `https://antalyaviptourism.com`
7. Sağ üstte **Measurement ID** görünür: `G-XXXXXXXXXX` formatında — bunu kaydet.

---

## Adım 2 — Siteye Ekle

Measurement ID'yi aldıktan sonra Claude'a şunu söyle:

> "GA4 Measurement ID'm G-XXXXXXXXXX, siteye ekle"

Claude `index.html` dosyasına iki kod bloğu ekler, sen sadece deploy edersin.

### Ne Eklenecek (Claude yapar)

`<head>` içine:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Adım 3 — Dönüşüm Event'leri

Bu eventler otomatik değil; sitedeki reservation formuna özel kod eklemek gerekir.
Claude bunu da yapar ama GA4 kurulduktan sonra.

| Event | Ne zaman ateşlenir |
|---|---|
| `booking_submitted_cash` | Nakit rezervasyon formu gönderildi |
| `checkout_started_card` | iyzico ödeme sayfasına yönlendirildi |
| `purchase_card` | iyzico ödeme başarıyla tamamlandı |
| `quote_viewed` | Rota ve fiyat gösterildi |
| `booking_started` | Form ilk defa etkileşime geçildi |

---

## Adım 4 — Google Ads Bağlantısı

GA4 + Google Ads bağlanmalı ki:
- Hangi reklamdan kaç rezervasyon geldi görünsün
- Akıllı teklif sistemi (Smart Bidding) çalışsın

GA4 Admin → **Google Ads Links** → hesabını bağla.

---

## Adım 5 — Google Search Console

Siteni Google'a tanıt:

1. `search.google.com/search-console` → **Add Property**
2. URL: `https://antalyaviptourism.com/`
3. Doğrulama: HTML tag yöntemini seç → Claude `index.html`'e ekler
4. **Sitemap** gönder: `https://antalyaviptourism.com/sitemap.xml`

---

## Öncelik Sırası

1. GA4 hesabı aç → Measurement ID al → Claude'a ver
2. Google Search Console'u doğrula → sitemap gönder
3. Reservation event'lerini eklet (Claude yapar)
4. Google Ads hesabı aç ve GA4'e bağla (reklam başlayacağında)
