# SEO İçerik & Dil Genişletme Planı

Güncelleme: 16 Eylül 2026

`SEO_PLAN.md` reklam ve teknik kurulumu anlatır. Bu doküman onun üstüne
**organik görünürlüğü büyütmek** için eklenen içerik katmanını tanımlar:
çok dilli makale merkezi, makale şeması, besleme (RSS) ve hreflang'li
sitemap.

---

## 1 - Neden makale?

Bugün sitede yalnızca ticari niyet taşıyan sayfalar var: ana sayfa, 14 rota
landing page'i, sağlık turizmi ve 26 Almanca otel sayfası. Toplam 408
indekslenebilir URL var ama hepsi "X'e transfer" niyetini hedefliyor.

Eksik olan huninin üst basamağı: "Antalya havalimanından şehre nasıl
gidilir", "taksi mi transfer mi", "çocuk koltuğu var mı", "Alanya ne kadar
uzak" gibi bilgi amaçlı aramalar. Bu aramalar rota sayfalarına doğrudan iç
link verecek makalelerle karşılanır; hem yeni giriş noktası açar hem de rota
sayfalarının konu otoritesini besler.

## 2 - URL ve dil stratejisi

Makaleler sitenin **23 dilinin tamamında** yayınlanıyor. Dil sırası alfabetik
değil, **Antalya Havalimanı'na gelen yolcu hacmine** göre: Rusya, Almanya,
İngiltere, Polonya ve Ukrayna başta; Arapça Körfez ve Mısır pazarını kapsıyor
(geç rezerve eden, gece inen profil - makalelerin cevapladığı iki konu).

```text
ru · de · en · pl · uk · nl · cs · ro · tr · he · fr · sv
da · ar · hu · es · it · pt · el · zh · ko · ja · ur
```

Bu sıra aynı zamanda öncelik sırası: yeni bir makale önce baştaki pazarlarda
yazılır. `src/articles/translations/index.js` içindeki `languageOrder` tek
kaynaktır; rota, sitemap, hreflang ve besleme katmanları onu izler.

Slug'lar dil başına yerelleşir; her dil kendi anahtar kelimesiyle indekslenir.
Latin dışı alfabelerde (ru, uk, he, ar, el, zh, ko, ja, ur) slug
transliterasyondur - URL'ler her yerde okunabilir kalsın diye:

```text
/blog/antalya-airport-transfer-vs-taxi/
/de/blog/antalya-flughafen-transfer-oder-taxi/
/ru/blog/transfer-ili-taksi-v-aeroportu-antalii/
/ar/blog/naql-khas-am-taxi-matar-antalya/
/ja/blog/antarya-kuko-soge-taxi-hikaku/
```

`hreflang` yalnızca makalenin **gerçekten var olduğu** diller arasında
kurulur; `x-default` her zaman İngilizce sürümdür. Arapça, İbranice ve Urduca
sayfalar `dir="rtl"` ile render edilir; blog stilleri `text-align: start` gibi
mantıksal özellikler kullanır.

## 3 - Makale seti (Faz 1)

| Slug ailesi | Niyet | Beslediği rota sayfaları |
| --- | --- | --- |
| `transfer-vs-taxi` | Karşılaştırma, yüksek ticari niyet | tüm rotalar |
| `airport-arrival-guide` | Bilgi, varış anı | ana sayfa + tüm rotalar |
| `family-child-seats` | Bilgi, aile segmenti | belek, side, kizilagac |
| `belek-golf-transfer` | Niş, golf bagajı | belek |
| `alanya-distance-guide` | Bilgi, uzun mesafe | alanya, kizilagac, manavgat |
| `when-to-visit-antalya` | Sezon planlama | ana sayfa + tüm rotalar |

Her makale şunları içerir: benzersiz başlık/description, tek H1, en az dört
H2 bölümü, konuya özel bir karşılaştırma/veri listesi, en az dört FAQ,
ilgili rota sayfalarına iç link ve rezervasyona CTA.

## 4 - Structured data

- Makale: `BlogPosting` (headline, description, datePublished, dateModified,
  author/publisher, inLanguage, mainEntityOfPage, image)
- Makale: `BreadcrumbList` (Ana sayfa → Blog → Makale)
- Makale: görünür FAQ varsa `FAQPage`
- Blog dizini: `Blog` + `ItemList`, `BreadcrumbList`

`aggregateRating` veya uydurma yazar kullanılmaz; yayıncı gerçek işletmedir.

## 5 - Teknik eklentiler

1. **Sitemap hreflang** — `sitemap.xml` her URL için `xhtml:link
   rel="alternate"` alternatiflerini taşır. 400+ URL'lik çok dilli sitede en
   büyük tek teknik kazanç budur.
2. **RSS beslemesi** — dil başına `/blog/feed.xml`, sayfadan
   `<link rel="alternate" type="application/rss+xml">` ile bağlanır.
3. **İç linkleme** — blog girişi rota sayfalarının navigasyonuna ve alt
   bilgisine eklenir; her makale en az iki rota sayfasına link verir, rota
   sayfaları da ilgili makaleye geri link verir. Tarama derinliği azalır.
4. **Skip-link dil boşluğu** — `root.tsx` içindeki atlama bağlantısı 23
   dilin yalnızca 14'ünde çevriliydi; kalan diller tamamlanır.

## 6 - Uygulama sırası

| Adım | İş | Çıktı |
| --- | --- | --- |
| 1 | `src/articles/` kataloğu ve makale metinleri | veri katmanı |
| 2 | `src/public-paths.js` blog/makale yolları | prerender + sitemap |
| 3 | `seo.ts` `blogMeta` / `articleMeta` | meta + şema |
| 4 | `BlogIndexPage` / `ArticlePage` bileşenleri + `blog.css` | sayfalar |
| 5 | `routes.ts` dil başına blog ve makale rotaları | yönlendirme |
| 6 | Sitemap hreflang + RSS üretimi | teknik SEO |
| 7 | Rota/ana sayfa iç linkleri | tarama derinliği |
| 8 | Testler, `typecheck`, `build` | doğrulama |

## 7 - Başarı ölçütü

Yayından 60 gün sonra Search Console'da: makale URL'lerinde gösterim ve
tıklama, makaleden rota sayfasına geçiş, rota sayfalarının ortalama
pozisyonunda iyileşme. Trafik değil, **makale → rota → rezervasyon** akışı
ölçülür.

---

## Uygulama Durumu (16 Eylül 2026)

Blog sitenin **23 dilinin tamamında** yayında: 6 makale × 23 dil = **138
makale sayfası** artı 23 dizin sayfası.

| İş | Durum | Nerede |
| --- | --- | --- |
| Makale metadata'sı (6 makale) | Bitti | `src/articles/*.js` |
| Dil başına metin + chrome (23 dosya) | Bitti | `src/articles/translations/` |
| Dil sırası (turist hacmi) | Bitti | `translations/index.js` |
| Tipli katman | Bitti | `public-app/app/lib/articles.ts` |
| `blogMeta` / `articleMeta` + şema | Bitti | `public-app/app/lib/seo.ts` |
| Sayfa bileşenleri + RTL uyumlu stil | Bitti | `ArticlePage.tsx`, `BlogIndexPage.tsx`, `blog.css` |
| Rotalar (46 yeni rota) | Bitti | `public-app/app/routes.ts` |
| Prerender + sitemap yolları | Bitti | `src/public-paths.js` |
| Sitemap hreflang açıklamaları | Bitti | `scripts/generate-sitemap.mjs` |
| Dil başına RSS beslemesi (23) | Bitti | `scripts/generate-feeds.mjs` |
| Rota ve ana sayfadan iç link | Bitti | `TransferPage.tsx`, `HomePage.tsx` |
| Skip-link dil boşluğu | Bitti | `public-app/app/root.tsx` |
| Build doğrulaması | Bitti | `scripts/verify-react-build.mjs` |

Sayısal sonuç: indekslenebilir URL **408 → 569**, prerender edilen sayfa
**409 → 570**. Sitemap'teki çevirisi olan her URL `xhtml:link` hreflang
açıklaması taşıyor.

### Katalog yapısı

Makale dosyası yalnızca metadata tutar (id, tarih, görsel, ilgili rotalar);
metin `src/articles/translations/<dil>.js` içinde makale id'siyle anahtarlanır.
Böylece bir dil eklemek **bir dosya eklemektir**, altı makale dosyasını
düzenlemek değil.

### Sıradaki adımlar

1. `dist/` yayına alındıktan sonra Search Console'a `/blog/` URL'lerini inspect et.
2. 30 gün sonra makale → rota geçişlerini ölç; en çok geçiş veren makaleyi
   ikinci bir makaleyle destekle.
3. Yeni makale eklemek: `src/articles/<id>.js` metadata dosyası, kataloğa
   ekleme ve 23 çeviri dosyasına `<id>` bloğu. Testler eksik dili yakalar.
4. Yeni dil eklemek: `translations/<dil>.js`, `languageOrder` girdisi ve
   `routes.ts` içinde iki satır. Geri kalanı otomatik.
