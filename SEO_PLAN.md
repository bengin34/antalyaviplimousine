# SEO & Reklam Planı - Antalya VIP Limousine

Güncelleme: 13 Haziran 2026

Ana hedef: Antalya Havalimanı çıkışlı özel transfer arayan uluslararası
ziyaretçilerden nitelikli rezervasyon almak.

Reklam kapsamı: **yalnızca İngilizce ve Almanca**.

---

## Mevcut Durum

Son site değişiklikleri:

- Rota sayısı 5'ten 13'e çıktı.
- Mercedes Vito ve Mercedes Sprinter için ayrı fiyatlar eklendi.
- Nakit/araçta ödeme varsayılan, iyzico kart ödemesi alternatif oldu.
- Rezervasyona e-posta, özel adres ve doğrulama adımları eklendi.
- Arayüzde 11 dil var ancak tüm diller aynı URL üzerinde JavaScript ile değişiyor.

SEO açısından mevcut açıklar:

- Yalnızca ana sayfa var; rota kartları ayrı ve indekslenebilir sayfa değil.
- Canonical, Open Graph, Twitter Card ve structured data yok.
- `robots.txt` ve `sitemap.xml` yok.
- Dil seçeneklerinin ayrı URL'leri olmadığı için `hreflang` uygulanamaz.
- JPG görseller büyük; görsel boyutları HTML'de belirtilmemiş.
- Google Ads ve analytics dönüşüm event'leri henüz tanımlı değil.
- Telefon numarası, Google puanı, yorum sayısı, müşteri sayısı ve 24/7 destek
  ifadeleri yayına/reklama alınmadan önce gerçek verilerle doğrulanmalı.

---

## Öncelik Sırası

| Faz | İş                                           | Etki                           |
| --- | -------------------------------------------- | ------------------------------ |
| P0  | Gerçek iletişim ve güven verilerini doğrula  | Reklam onayı ve güven          |
| P0  | Analytics, consent ve dönüşüm ölçümü         | Reklam optimizasyonu           |
| P1  | EN/DE rota landing page altyapısı            | Organik trafik + Quality Score |
| P1  | Canonical, metadata, schema, sitemap, robots | Teknik indeksleme              |
| P1  | EN ve DE Search kampanyalarını aç            | Hızlı talep                    |
| P2  | İlk 6 rota içeriğini tamamla                 | En yüksek arama potansiyeli    |
| P2  | Core Web Vitals ve görsel optimizasyonu      | SEO + dönüşüm                  |
| P3  | Kalan rotalar, içerik ve backlink çalışması  | Uzun vadeli büyüme             |

---

## 1 - Dil ve URL Stratejisi

İlk aşamada yalnızca EN ve DE sayfaları SEO ve reklam için hazırlanacak.

```text
https://antalyaviptourism.com/
https://antalyaviptourism.com/transfers/belek/
https://antalyaviptourism.com/transfers/side/

https://antalyaviptourism.com/de/
https://antalyaviptourism.com/de/transfers/belek/
https://antalyaviptourism.com/de/transfers/side/
```

Her EN/DE sayfasında:

- Kendine işaret eden canonical bulunmalı.
- EN ve DE karşılıkları karşılıklı `hreflang` vermeli.
- İngilizce ana sayfa `x-default` olmalı.
- Title, description, H1 ve ana içerik sunucudan/statik HTML olarak gelmeli.
- Dil değiştirici kullanıcıyı karşılık gelen URL'ye götürmeli.

Örnek:

```html
<link rel="canonical" href="https://antalyaviptourism.com/transfers/belek/" />
<link
  rel="alternate"
  hreflang="en"
  href="https://antalyaviptourism.com/transfers/belek/"
/>
<link
  rel="alternate"
  hreflang="de"
  href="https://antalyaviptourism.com/de/transfers/belek/"
/>
<link
  rel="alternate"
  hreflang="x-default"
  href="https://antalyaviptourism.com/transfers/belek/"
/>
```

Diğer dokuz arayüz dili kullanıcı deneyimi için kalabilir. Ayrı, kaliteli ve
indekslenebilir URL'ler hazırlanana kadar bu diller için `hreflang` eklenmemeli.

---

## 2 - Rota Landing Page Planı

13 rotanın tamamını aynı anda üretmek yerine talep ve Antalya ile ilişki
gücüne göre aşamalı ilerle:

### Faz A - Öncelikli 6 Rota

1. Belek
2. Side
3. Kemer
4. Alanya
5. Antalya City
6. Manavgat

Her biri için bir EN ve bir DE sayfası: toplam 12 landing page.

### Faz B - İkincil Rotalar

- Tekirova
- Boğazkent
- Dalaman
- Fethiye

### Faz C - Uzun Mesafe Test Sayfaları

- Bodrum
- Pamukkale
- Kapadokya

Uzun mesafe sayfaları ancak gerçek operasyon, fiyat ve talep doğrulandıktan
sonra indekslenmeli ve reklama açılmalı.

### Sayfa Şablonu

Her rota sayfasında benzersiz olarak:

- Arama niyetine uygun title, meta description ve H1
- Tahmini mesafe ve normal trafik koşullarındaki süre
- Vito ve Sprinter için güncel sabit fiyat
- Fiyata dahil hizmetler
- Karşılama ve uçuş takip süreci
- Yolcu/bagaj kapasitesi
- Rota özelinde en az 4 FAQ
- Sayfa içinde çalışan rezervasyon formu
- Diğer yakın rotalara iç linkler
- `BreadcrumbList` ve uygun FAQ structured data

Örnek EN:

```text
Title: Antalya Airport to Belek Transfer | Private Fixed-Price Service
H1: Private Transfer from Antalya Airport to Belek
```

Örnek DE:

```text
Title: Transfer Antalya Flughafen nach Belek | Privater Festpreis
H1: Privater Transfer vom Flughafen Antalya nach Belek
```

İçerikte aynı paragrafı yalnızca destinasyon adını değiştirerek çoğaltma.
Mesafe, süre, otel bölgeleri, yolculuk bilgisi ve FAQ her rota için özgün olmalı.

---

## 3 - Teknik SEO

Ana sayfa ve landing page'ler için:

- Benzersiz `title` ve meta description
- Self-referencing canonical
- EN/DE `hreflang` + `x-default`
- Open Graph ve Twitter Card
- 1200x630 sosyal paylaşım görseli
- `robots.txt`
- Yalnızca canonical ve indekslenebilir URL'leri içeren `sitemap.xml`
- Doğru heading sırası ve tek H1
- Breadcrumb navigasyonu
- Özel 404 sayfası
- Search Console ve Bing Webmaster Tools doğrulaması

Structured data:

- Ana sayfa: `Organization` veya şartları karşılıyorsa `LocalBusiness`
- Hizmet sayfaları: `Service`
- Rota sayfaları: `BreadcrumbList`
- Görünür FAQ içeriği varsa: `FAQPage`

`aggregateRating`, yorum sayısı, adres, telefon, çalışma saati ve fiyat
bilgileri yalnızca gerçek, görünür ve doğrulanmış verilerle işaretlenmeli.

### Performans

- JPG dosyalarını WebP/AVIF varyantlarıyla sun.
- Hero görselini preload et; ekran altındaki gerçek `<img>` öğelerini lazy load et.
- Görsellere `width` ve `height` vererek layout shift'i azalt.
- Google Fonts'u mümkünse self-host et.
- Kullanılmayan JavaScript/CSS'i azalt.
- Mobilde LCP, INP ve CLS ölçümlerini PageSpeed Insights ile takip et.

---

## 4 - Google Ads: Yalnızca EN ve DE

Başlangıç bütçesi: toplam **EUR 10-20/gün**.

Bütçeyi ilk aşamada eşit bölmek yerine sonuçlara göre yönet:

- EN kampanya: yaklaşık %60
- DE kampanya: yaklaşık %40
- 2-3 hafta sonra nitelikli rezervasyon maliyetine göre yeniden dağıt

### Kampanya Yapısı

```text
Search - EN - Antalya Airport Transfer
  Belek
  Side / Manavgat
  Kemer
  Alanya
  Generic Antalya VIP Transfer

Search - DE - Antalya Flughafen Transfer
  Belek
  Side / Manavgat
  Kemer
  Alanya
  Generic Privater Transfer Antalya
```

Her reklam grubu kullanıcıyı genel ana sayfaya değil ilgili dildeki rota
landing page'ine göndermeli.

### EN Anahtar Kelimeler

```text
[antalya airport transfer]
[private transfer antalya airport]
[antalya airport to belek transfer]
[antalya airport to side transfer]
[antalya airport to kemer transfer]
[antalya airport to alanya transfer]
"antalya vip transfer"
```

### DE Anahtar Kelimeler

```text
[antalya flughafen transfer]
[privater transfer antalya]
[transfer antalya flughafen belek]
[transfer antalya flughafen side]
[transfer antalya flughafen kemer]
[transfer antalya flughafen alanya]
"vip transfer antalya"
```

### Negatif Anahtar Kelimeler

Arama terimleri raporuna göre EN ve DE ayrı listeler:

```text
bus
public
dolmus
job
salary
rent a car
car rental
flug
busfahrplan
stellenangebot
mietwagen
```

`cheap`, `taxi` ve `shuttle` kelimelerini ilk günden körlemesine negatifleme.
Bu terimler satın alma niyeti taşıyabilir; arama terimi ve dönüşüm verisine
göre karar ver.

### Reklam Mesajı

Yalnızca landing page'de gerçekten sunulan avantajları kullan:

- Fixed price / Festpreis
- Meet & greet / Persönliche Abholung
- Flight tracking / Flugüberwachung
- Mercedes Vito or Sprinter
- Pay in vehicle or secure card payment

Mevcut akış rezervasyon talebinden sonra 30 dakika içinde iletişim sözü verdiği
için doğrulanmadan "Instant Confirmation" kullanılmamalı.

Hedefleme:

- Kampanya dili: EN veya DE
- Kullanıcı konumu: rezervasyon alınan gerçek kaynak pazarlara göre ülke bazlı
- Konum seçeneği: hedef bölgede bulunan kişiler, ilgi gösterenler değil
- Search Partners ve Display Expansion başlangıçta kapalı
- İlk aşamada manuel cihaz artışı yok; cihaz verisi toplandıktan sonra karar ver

Remarketing, yeterli trafik ve Consent Mode kurulmadan P0 değildir.

---

## 5 - Ölçüm ve Dönüşümler

Nakit ödeme varsayılan olduğu için sadece iyzico ödeme başarısını ölçmek
rezervasyonların büyük bölümünü görünmez yapar.

Önerilen event'ler:

| Event                    | Ne zaman                            | Google Ads kullanımı     |
| ------------------------ | ----------------------------------- | ------------------------ |
| `booking_started`        | Form etkileşimi başladı             | Gözlem                   |
| `quote_viewed`           | Rota ve araç fiyatı gösterildi      | Gözlem                   |
| `booking_submitted_cash` | Nakit rezervasyon kaydı oluştu      | İlk aşamada primary lead |
| `checkout_started_card`  | iyzico sayfasına yönlendirildi      | Secondary                |
| `purchase_card`          | Doğrulanmış iyzico callback sonrası | Primary purchase         |
| `qualified_booking`      | Operasyon rezervasyonu doğruladı    | Offline primary          |
| `completed_transfer`     | Yolculuk tamamlandı                 | Gelir/ROAS               |

Teknik notlar:

- `purchase_card` event'i URL temizlenmeden önce yalnızca bir kez çalışmalı.
- Yenilemede tekrar dönüşüm yazılmasını engellemek için booking/payment ID ile
  deduplication yapılmalı.
- `gclid`, `gbraid`, `wbraid`, UTM ve landing page bilgisi rezervasyonla saklanmalı.
- Nakit rezervasyonlar için Google Ads offline conversion import kurulmalı.
- Analytics ve reklam etiketleri için EEA/UK trafiğinde consent banner ve
  Consent Mode v2 uygulanmalı.
- Telefon ve WhatsApp tıklamaları secondary conversion olarak ölçülmeli.

---

## 6 - Local SEO ve Güven

Google Business Profile:

- Gerçek işletme adı, telefon, web sitesi ve hizmet alanları
- Doğru ana kategori; yalnızca gerçekten verilen ikincil kategoriler
- Vito/Sprinter, karşılama ve araç içi gerçek fotoğraflar
- EN ve DE hizmet açıklamaları
- Rezervasyon veya WhatsApp bağlantısı
- Her tamamlanan yolculuk sonrası tarafsız yorum talebi

Site yayını ve Ads öncesi doğrulanacaklar:

- `+90 530 265 57 90` yerine gerçek telefon
- 4.9 puan ve 387 Google yorumu
- 2,500+ misafir
- 24/7 erişilebilirlik
- Görünen müşteri yorumlarının gerçekliği ve kullanım izni
- Gösterilen rota fiyatlarının vergi ve ek ücret kapsamı

Doğrulanamayan iddialar kaldırılmalı; reklamlarda ve schema içinde
kullanılmamalı.

---

## 7 - İçerik Planı

İlk içerikler EN ve DE olarak, rota sayfalarını destekleyecek şekilde:

- Antalya Airport to Belek: Transfer vs Taxi vs Shared Shuttle
- Antalya Airport to Side: Travel Time, Price and Arrival Guide
- Belek Golf Transfer Guide for Groups with Golf Bags
- Private Transfer from Antalya Airport for Families with Child Seats

Her içerik ilgili rota landing page'ine ve rezervasyon formuna bağlanmalı.
Yayın sıklığından önce rota sayfalarının kalite ve dönüşüm performansı
tamamlanmalı.

---

## İlk 30 Gün

### Hafta 1

- Güven iddiaları ve iletişim verilerini düzelt
- GA4, Google Ads, consent ve dönüşüm event planını kur
- Canonical, OG, schema, robots ve sitemap altyapısını ekle

### Hafta 2

- EN/DE Belek, Side ve Kemer landing page'lerini yayınla
- Search Console'a sitemap gönder
- EN ve DE Search kampanyalarını düşük bütçeyle aç

### Hafta 3

- EN/DE Alanya, Antalya City ve Manavgat sayfalarını yayınla
- Arama terimleri ve negatif keyword temizliği yap
- Form, telefon ve WhatsApp dönüşümlerini kontrol et

### Hafta 4

- Kampanya bütçesini nitelikli rezervasyon maliyetine göre dağıt
- Landing page başlık/CTA testi başlat
- İlk rota içeriklerini ve gerçek müşteri yorum akışını devreye al

Başarı ölçütü yalnızca form sayısı değil; **nitelikli rezervasyon maliyeti,
tamamlanan transfer sayısı ve rota bazlı gelir** olmalı.
