# Otel kaynak sayfaları

Otel indeksinin türetildiği ham liste sayfaları. Sadece kaynak olarak
saklanıyor; hiçbiri siteye yayınlanmaz.

`assets/` klasörünün tamamı `scripts/build-all.mjs` tarafından olduğu gibi
`dist/assets/` içine kopyalanır, yani oraya konan her dosya alan adından
servis edilir. Bu sayfalar başkasının sitesinden alındığı için `assets/`
dışında, burada duruyorlar.

| Dosya | Kaynak | Tarih | Ne verdi |
| --- | --- | --- | --- |
| `antalya-all-hotels.html` | antalya-hotels.org, Antalya destinasyon sayfası | Ağustos 2026 | 673 kayıt; 633'ü `src/hotel-index-antalya-city.js` içine aktarıldı |

Sayfalarda belde sütunu yok — destinasyon sayfasının kendisi bölgeyi verir.
Yeni bir bölge eklerken o bölgenin destinasyon sayfasını buraya koymak
yeterli; isimlerin hepsi o bölgeye ait sayılır.
