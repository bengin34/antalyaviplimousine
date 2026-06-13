# SEO & Reklam Planı — Antalya VIP Limousine

Hedef: Uluslararası turistlerin (EN/DE/RU) önüne çıkmak.

---

## Öncelik Sırası

| Adım | İş | Süre | Maliyet | Etki |
|------|----|------|---------|------|
| 1 | Google Business Profile | 1 saat | Ücretsiz | **Yüksek** (hızlı) |
| 2 | Structured Data + hreflang | 2 saat | Ücretsiz | Orta (yavaş) |
| 3 | Google Ads Search | 1 gün setup | €10–20/gün | **Yüksek** (hızlı) |
| 4 | 6 rota landing page | 2–3 gün | Ücretsiz | **Çok Yüksek** (yavaş) |
| 5 | Viator / GetYourGuide | yarım gün | %20–25 komisyon | Orta |
| 6 | Blog içerikler | haftalık | Ücretsiz | Yüksek (çok yavaş) |

---

## 1 — Teknik SEO (Site İçi)

### hreflang

```html
<link rel="alternate" hreflang="en" href="https://domain.com/" />
<link rel="alternate" hreflang="de" href="https://domain.com/de/" />
<link rel="alternate" hreflang="tr" href="https://domain.com/tr/" />
<link rel="alternate" hreflang="ru" href="https://domain.com/ru/" />
```

### Structured Data (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "name": "Antalya VIP Limousine",
  "areaServed": ["Belek", "Side", "Kemer", "Alanya"],
  "priceRange": "€€",
  "telephone": "+90...",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 36.89,
    "longitude": 30.79
  }
}
</script>
```

### Open Graph

```html
<meta property="og:title" content="Antalya VIP Limousine | Airport Transfer" />
<meta property="og:description" content="Private chauffeur transfers from Antalya Airport" />
<meta property="og:image" content="og-image.jpg" />
```

### Diğer

- Görseller → WebP (şu an JPG)
- `loading="lazy"` tüm img'lere
- `sitemap.xml` + `robots.txt` oluştur
- Font preload ekle

### URL Yapısı (platform sonrası)

```
domain.com/transfers/belek/
domain.com/transfers/side/
domain.com/transfers/kemer/
domain.com/transfers/alanya/
domain.com/transfers/antalya-city/
domain.com/de/transfers/belek/
domain.com/ru/transfers/belek/
```

---

## 2 — Rota Landing Pages (En Önemli İçerik)

Her destinasyon için ayrı sayfa = ayrı keyword cluster.

**Örnek `/transfers/belek/` içeriği:**
```
H1: "Antalya Airport to Belek Transfer — Private VIP Service"

- Mesafe & süre (45 km, ~40 dk)
- Fiyat tablosu (V-Class: €X, Vito: €X)
- Neden biz (uçuş takip, karşılama, sabit fiyat)
- FAQ (schema markup ile)
- Inline booking widget
```

**Hedef keywords:**
- `antalya airport to belek transfer`
- `antalya to belek taxi price`
- `belek airport transfer private`

**6 rota = 6 sayfa = 6 farklı keyword cluster**

---

## 3 — Google Business Profile (Ücretsiz, Kritik)

```
maps.google.com → Business Profile oluştur
Kategori: "Airport shuttle service" + "Limousine service"
Servis alanı: Antalya, Belek, Side, Kemer, Alanya
Fotoğraf: araç içi, karşılama, havalimanı
Hizmetler: Airport Transfer, VIP Transfer, Group Transfer
Fiyat listesi ekle
WhatsApp linki ekle
```

→ Google Maps 3'lü kutusuna (Local Pack) girmek hedef  
→ Her müşteriden Google review iste → 4.9★ → üste çıkar

---

## 4 — Google Ads

**Budget:** €10–20/gün başlangıç

### Hedef Keywords

```
[antalya airport transfer]
[antalya airport to belek]
[private transfer antalya]
[antalya vip transfer]
[antalya flughafen transfer]      ← Almanca kampanya ayrı
```

### Negatif Keywords

```
-free -cheap -bus -dolmus -shuttle -toplu -public
```

### Ad Copy Örneği

```
Headline 1: Antalya Airport VIP Transfer
Headline 2: Fixed Price · Flight Tracking Included
Headline 3: Book Online — Instant Confirmation
Description: Mercedes V-Class · Meet & Greet · 24/7 Support
Display URL: antalyavip.com/transfers/belek
```

### Hedefleme

```
Konum: Tüm dünya (turist kendi ülkesinden arar)
Dil: İngilizce + Almanca + Rusça
Zamanlama: 7/24
Cihaz: Mobile bid +%30
```

### Remarketing

Siteye gelip booking yapmadan gidenler → Display ads:
- €2–5/gün
- "Hâlâ Antalya transferi mi arıyorsunuz?"

### Dönüşüm Takibi

Stripe başarılı ödeme → Google Ads conversion event → hangi keyword para getiriyor görünür

---

## 5 — Üçüncü Parti Platformlar

| Platform | Kitle | Komisyon | Not |
|----------|-------|----------|-----|
| Viator | Global turist | %20–25 | Başlangıç trafiği için iyi |
| GetYourGuide | DE/AT/CH güçlü | %20–25 | Alman pazarı |
| TripAdvisor Experiences | Global | %20 | İkincil |

→ Platformlar komisyon yer ama hazır kitle verir  
→ Sonra direkt siteye yönlendir (Stripe ile %20 ucuza)

---

## 6 — WhatsApp Business

- Telefon numarasına WhatsApp Business kur
- Google Business Profile'a ekle
- Ruslar WhatsApp/Telegram tercih eder

---

## Hedef Keywords Listesi

**İngilizce:**
- antalya airport transfer
- antalya airport to belek / side / kemer / alanya
- private transfer antalya
- vip transfer antalya airport
- antalya chauffeur service

**Almanca:**
- antalya flughafen transfer
- transfer antalya belek
- privater transfer antalya

**Rusça:**
- трансфер аэропорт анталья
- трансфер анталья белек
- частный трансфер анталья

---

## Blog İçerik Fikirleri (Uzun Vade)

- "Belek Resort Guide — Which Hotels Are Near Antalya Airport?"
- "Antalya Airport to Alanya: Transfer vs Bus vs Taxi"
- "Golf in Belek: Everything You Need to Know About Getting There"
- "Antalya Havalimanı'ndan Side'ye Nasıl Gidilir?"
