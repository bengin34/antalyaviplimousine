# Marketing Audit — 2026-10-25

Kapsam: `seo-audit`, `programmatic-seo`, `cro`, `ai-seo` skill'leri (`.claude/skills/`).
Yöntem: repo kanıtı + build çıktısı ölçümü. **Hiçbir arama hacmi/trafik sayısı uydurulmadı** —
ölçülmemiş olanlar `VERİ YOK` olarak işaretli.

## Temel durum (ölçülen)

| | Değer | Kaynak |
|---|---|---|
| Diller | 23, hepsi indexable | `public-app/app/lib/site.ts:9` |
| Sitemap URL | 1145 | `node scripts/generate-sitemap.mjs` |
| Transfer sayfası | 14 rota × 23 dil = 322 | `src/public-paths.js:45` |
| Makale | 30 × 23 dil = 690 | `src/articles/translations/` |
| Otel landing | 26 — **yalnız Almanca** | `src/hotels.js:50` |
| Otel index (veri) | 1246 otel, hepsi doğrulanmış AYT km + place id | `src/hotel-distances.js` |

Sağlam olan ve dokunulmayacak: canonical + hreflang + x-default (sitemap tarafında, 23 dil),
TravelAgency/Service/FAQPage/BreadcrumbList/BlogPosting schema, Consent Mode v2, birinci taraf
huni (`site_events`, 12 olay), Ads conversion (`BookingForm.tsx:416`), prerender, gerçek çeviri
(makaleler dil başına ~800 kelime, lokalize slug).

---

## P0 — Bu hafta

### 1. Transfer sayfaları 22 dilde ince; Almanca şablonu taşınmadı
**Etki: Yüksek · Güven: Kesin · Durum: BİTTİ (5251a0dd + c24f2dbb)**

`TransferPage.tsx:105-122` tüm zengin bloğu `language === "de"` ile kapatıyor:
bölge tanıtımı (`germanRegion.about`, `routeDetails`), havalimanı karşılama talimatı
(Meet & Greet J/777), gidiş-dönüş, özel vs shuttle, araç/bagaj/çocuk, güven maddeleri
(ön ödeme yok · şoföre nakit · gizli ücret yok) ve otel listesi.

Sonuç: 14 zengin Almanca sayfaya karşı **308 değişken-takası sayfa** (`routeText[language]`
intro + madde listesi + fiyat + FAQ). `programmatic-seo` skill'inin birinci kuralının ihlali.

**Yapılan:** copy `TransferPage.tsx`'ten `transfer-landing-copy/<dil>.ts`'e çıktı ve 23 dilin
hepsi yazıldı (`landingCopy` artık tam `Record` — copy'si olmayan yeni dil derleme hatası).
Yer adı dile göre çözülüyor: uk/cs çekim ekli, hu ek alıyor, el/he "bölge" kalıbıyla cinsiyet
ve ön ek sorununu atlıyor, fr/nl/sv/ar `routeCatalog`'da adı olmadığı için kendi adını veriyor.

23 dil copy'si tarayıcıya inmesin diye landing artık loader'da düz metne çözülüyor
(yer adı formları ve Almanca otel linkleri dahil) → transfer chunk 113 → **52 KB raw**
(20 KB gzip), yani değişiklik öncesinin yarısının altında.

**Kalan:** uzun mesafe 7 rotanın (bogazkent, manavgat, bodrum, dalaman, fethiye, pamukkale,
kapadokya) bölge metni hiçbir dilde yazılmadı — `regions` bilinçli olarak `Partial`, o rotalar
düz şablonda. 7 rota × ~250 kelime kaynak, 23 dile çevrilir.

### 2. `/health/` 19 dilde İngilizce gövde + çevrilmiş meta
**Etki: Yüksek (site geneli) · Güven: Kesin · Durum: KAPSAM DIŞI (karar 2026-10-25)**

Kullanıcı kararı: "health sayfasi bir firma icin demo, önemsiz" → bu oturumda atlandı.
Not: demo olması tam olarak (b) şıkkının gerekçesi — `/clinic/` gibi indexlenmemesi
gerekir, aksi halde 19 ince URL site geneli helpful-content sinyalini aşağı çeker.
Karar kullanıcının; iş 15 dakikalık (`public-paths.js:31` → 4 dil).

`HealthPage.tsx:605` → `supportedHealthLanguages = {en, de, tr, ru}`, gerisi `en`'e düşüyor.
Ama `healthSeo` 23 dilde title/description üretiyor ve 23 URL sitemap'te
(`src/public-paths.js:31`), self-canonical + hreflang'li.

`seo-audit` skill'i: sadece boilerplate çevirisi = kopya sayfa; helpful content sistemi
**site geneli** çalışır, ince locale sayfaları güçlü sayfaları da aşağı çeker.

Karar gerek (ikisinden biri, ortası yok):
- **a)** Sağlık turizmi hedefse 19 dile gövde çevirisi.
- **b)** Değilse `healthPaths`'i 4 dile indir — URL'i hiç üretme (noindex değil, crawl
  bütçesi için daha temiz), hreflang setini de 4 dile daralt.

Aynı kontrol `land-of-legends` için yapıldı: 23 dil copy dosyası mevcut, sorun yok.

### 3. Ana sayfa JS yükü: 122 KB gzip tek chunk
**Etki: Orta-Yüksek (LCP/INP, Ads kalite skoru) · Güven: Ölçüldü · Durum: kısmen (ccda6d7c)**

```
booking-DnpLgvdA.js   raw 412.171  gzip 121.961   ← modulepreload, / sayfasında
entry.client          raw 188.103  gzip  58.999
ana sayfa kritik yol  ────────────  gzip ~252.640
```

1246 otel index + 1246 mesafe tablosu + bant fiyat mantığı her ziyaretçiye iniyor, oysa
rezervasyon formunun otel aramasına kadar gerekmiyor. Yapılacak: `HotelCombobox`
veri importunu dinamik `import()` arkasına al (ilk tuş vuruşunda), veya fiyat sorgusunu
Supabase function'a taşı. Hedef: ana sayfa kritik yol < 150 KB gzip.

**Yapılan (ccda6d7c):** place-id'ler `src/hotel-places.js`'e çıktı — tarayıcı
fiyatlamada yalnız `km` + `checked` okuyor. `hotel-distances.js` 135,7 → 81,1 KB;
booking chunk 122,0 → 99,4 KB gzip; ana sayfa kritik yol 252,6 → 230,2 KB gzip.

**Yapılan (06bc39fc):** otel index'i + mesafe tablosu tek dinamik import'un arkasına
alındı, otel alanına dokunulduğunda yükleniyor. Yalnız combobox'ı ertelemek işe yaramazdı:
index'e ikinci yol `quoteFor` → `hotel-distance-lookup` → `hotel-search` üzerinden statikti,
o yüzden iki yarı birlikte iniyor. Form fetch'i sahipleniyor ve sonucu state'te tutuyor —
index geldiğinde fiyat yeniden hesaplanıyor, yani fetch bitmeden tam yazılan otel adı da
bantla taban alıyor. O ana kadar bölge fiyatı görünüyor (bant tabanı öncesi davranış) ve
liste "otel bulunamadı" demiyor; alan açıkken `aria-busy`.

- booking chunk: 367 → **234 KB raw** (99 → 65 KB gzip)
- index iki ayrı chunk olarak çıktı: 21,5 + 11,5 KB gzip, **hiçbir sayfada preload yok**
- ana sayfa kritik yol (tüm modulepreload'lar): 285 → **251 KB gzip**

**Kalan (hedef <150 KB gzip tutturulmadı):** kalan ağırlık otel verisi değil —
`libphonenumber-js` (zod şemasındaki telefon doğrulaması, `lib/booking.ts:1`),
`CookieConsent` (28,5 KB gzip, ana sayfada preload), `entry.client` (59 KB gzip).
Üçü de ayrı karar; telefon doğrulamasını ertelemek şemayı async'e çevirir.

---

## P1 — 2-4 hafta

### 4. Otel landing sayfaları: 26 → ilk ~150, de + ru + en
**Etki: Yüksek · Güven: Veri hazır, talep VERİ YOK**

Elde `programmatic-seo` skill'inin "product-derived data" katmanı var: 1246 otel için
doğrulanmış AYT km (`hotel-distances.js`, `checked: true`), ilçe→bölge eşlemesi, mesafe
bantlı kesin Vito/Sprinter fiyatı. Sayfa başına gerçekten tekil veri: km, süre, ilçe, fiyat.

Kurallar (ince sayfa cezasından kaçınmak için):
- Yalnız **elle yazılmış `locationCopy`'si olan** oteller yayınlanır — 26'da bu var, şablon
  cümle üretmek doğrudan doorway page olur.
- Hub-spoke: `/{lang}/transfers/{bölge}/` → otel sayfaları; her otel sayfasından hub'a dönüş.
- Ayrı sitemap: `sitemap-hotels.xml` (indexleme teşhisi tek sitemap'te okunmuyor).
- Dalga dalga: 25 sayfa yayınla → 3 hafta GSC indexlenme + tıklama oranına bak → devam/dur.

Sıralama girdisi: GSC query raporu + Ads search terms'ten otel adı içeren sorgular.
Bu veri alınmadan sayfa üretilmez.

### 5. Rota kataloğu eksikleri
**Etki: VERİ YOK — önce doğrula**

Mevcut 14: antalya, belek, side, kemer, alanya, bogazkent, manavgat, kizilagac, tekirova,
bodrum, dalaman, fethiye, pamukkale, kapadokya.

Aday (hacim doğrulanmadan sayfa açılmaz): Kaş, Kalkan, Olympos/Çıralı, Gazipaşa (GZP)
havalimanı, Konyaaltı/Lara ayrımı, Serik, Avsallar/Konaklı, Marmaris.
Kaynak: GSC "Queries" (son 3 ay) + Ads search terms report. Sıfır gösterimli olana sayfa yok.

### 6. Sitemap `lastmod` her build'de bugünün tarihi
`scripts/generate-sitemap.mjs:25` → `today` tüm 1145 URL'e yazılıyor. Google, hepsi aynı
tarihi taşıyan lastmod'u güvenilmez sayıp yok sayar. Makalelerde `published`/`updated` alanı
zaten var (`src/articles/*.js`); rota/otel sayfaları için git commit tarihi kullanılabilir.

### 7. Blog header nav'da yok
690 makale sayfasına tek giriş ana sayfa footer'ı (`HomePage.tsx:1476`). `Header.tsx:137-142`
nav'ı yalnız sayfa-içi anchor + B2B. Blog'u nav'a ekle. (Transfer → makale linki
`TransferPage.tsx:128`'de var, o yön sorunsuz.)

Ayrıca `Header.tsx:142` → `"B2B Partners"` etiketi 23 dilde sabit İngilizce, ve `/b2b/`
`noindex,nofollow` (`seo.ts:431`) olmasına rağmen her sayfadan link alıyor. Etiketi çevir
veya linki yalnız İngilizce sayfalarda göster.

### 8. `ai-seo`: makine okunabilir katman yok
- `/llms.txt` yok → ne yaptığınız, 14 rota, fiyat modeli, iletişim.
- `/pricing.md` yok → `routeCatalog` fiyatları + dahil olanlar (uçuş takibi, 90 dk bekleme,
  çocuk koltuğu, araç başı fiyat, nakit). Fiyatı okuyamayan ajan rakibi öneriyor.
- `robots.txt` tüm botlara açık — AI discovery botları (OAI-SearchBot, PerplexityBot,
  Claude-SearchBot) erişebiliyor, değişiklik gerekmiyor.

İkisi de statik dosya, `public/` içine konur, build'e dokunmaz.

### 9. CRO: ödeme modeli dönüşüm tavanı
`cro` skill'i "objection handling" → form zaten güçlü (3 adım, fiyat iletişim bilgisinden
**önce** gösteriliyor, `price_shown` olayı bunu doğruluyor; 90 dk bekleme, uçuş takibi, araç
başı sabit fiyat hero'da yazılı). Kalan tek büyük itiraz: **nakit-only**.

- Booking.com/GetYourGuide alışkanlığındaki müşteri için ön ödeme opsiyonu yok
  (`PLATFORM_PLAN.md` Stripe'ı planlıyor, canlı değil).
- "Ön ödeme yok, şoföre nakit" mesajı Almanca sayfalarda güven maddesi olarak **var**, diğer
  dillerde yok → P0.1 ile birlikte gelir. Önce bunu ölç, Stripe kararını sonra ver.
- `HomePage.tsx:65` yorumları kod içinde sabit. Gerçek müşteri yorumu değilse kaldır/atıfla —
  doğrulanamayan testimonial hem güven hem FTC riski. Self-serving `AggregateRating` schema
  **eklenmeyecek**: Google kendi işletmesi için olanı rich result'a uygun saymıyor; yorum
  sinyali GBP üzerinden gelir (`SEO_TODO_MANUEL.md` madde 5).

---

## P2 — Off-page (mevcut listede, hâlâ açık)

`SEO_TODO_MANUEL.md` madde 4-5 geçerli ve hiçbiri kod işi değil:
Tripadvisor, Trustpilot, Bing Places, Apple Business Connect, Yandex Business, Foursquare →
sonra GetTransfer.com (nakit + Rus pazarı), Kiwitaxi, Jayride. Çok dilli review akışı
(WhatsApp teslim mesajına review linki).

---

## Ölçüm — her şeyden önce

`MARKETING_TODO.md` "Setup" bölümündeki **28 günlük baseline hâlâ boş**. Bu olmadan yukarıdaki
hiçbir değişiklik okunamaz; ilk iş bu:

- GSC → son 28 gün organik klik/gösterim, dil ve ülke kırılımı. Tarihi ve tanımı yaz.
- `site_funnel_summary(28)` → giriş → fiyat gördü → bilgi girdi → gönderdi oranları.
- `bookings` → kaynak bazlı rezervasyon + ciro (`GA4_SETUP.md`'deki sorgu).
- `quote_unavailable` olayları → fiyat döndüremeyen rota/otel listesi = doğrudan kayıp talep.

**Ads tarafı bir boşluk:** ödeme nakit olduğu için web'deki `purchase` olayı aslında *lead*.
İptal/no-show Ads'e düzeltilmiş değer olarak gitmiyor → teklif algoritması gerçekleşmemiş
ciroyu öğreniyor. Çözüm: offline conversion import veya conversion value adjustment
(`booking_ref` zaten `transaction_id` olarak gönderiliyor, eşleme hazır). Enhanced conversions
ayrı karar — onay sinyaline bağlı.

**Eski dokümanlar:** `GA4_SETUP.md` "408 URL", `SEO_TODO_MANUEL.md` "232 URL / 12 dil" diyor;
gerçek 1145 URL / 23 dil. Düzelt, yoksa sonraki oturum yanlış temelden başlar.

---

## Sıra

~~1. Baseline kaydı~~ → hâlâ açık, kod işi değil, her şeyi blokluyor
~~2. P0.2 health kararı~~ → kapsam dışı (demo)
~~3. P0.1 transfer içeriği~~ → 23 dil bitti (c24f2dbb); 7 uzun mesafe rotası kaldı
~~4. P0.3 bundle~~ → otel index'i kritik yoldan çıktı (06bc39fc); <150 KB tutturulmadı

Sıradaki:
1. **Baseline kaydı (ölçüm bölümü)** — yarım gün, kod yok, P1'in tamamını blokluyor
2. P1.6 lastmod + P1.7 nav + P1.8 llms.txt/pricing.md — küçük, aynı PR olabilir
3. P1.4 otel sayfaları (GSC verisi geldikten sonra)
4. P1.5 rota adayları (aynı veri)
5. P2 off-page — kod beklemez, paralel yürür
6. Uzun mesafe 7 rotanın bölge metni (P0.1 kalanı)

Sonraki denetim: 2026-11-02 (haftalık büyüme incelemesi, `MARKETING_TODO.md` cadence).
