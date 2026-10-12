# Alanya Bölgesel Fiyatlandırma Planı

## Amaç

Tek fiyat olan €95 Vito tarifesini, mesafeye göre Alanya alt bölgelerine ayırmak ve merkezde rekabetçi kalmak.

## Maliyet tabanı

Kâr/zarar modeli bir transferi gidiş-dönüş olarak yükler: araç misafiri bırakır
ve boş döner. Varsayılanlarda (15 TL/km, 50 TL/€) bu, tek yön kilometre başına
€0,60 artı €5 havalimanı karşılama demektir. Şoför ücreti, köprü/otoyol ve
reklam bu rakamın dışındadır.

| Bölge | Tek yön km | Maliyet | Vito | Marj |
| --- | ---: | ---: | ---: | ---: |
| Batı Alanya | 105 | €68 | €73 | %6,8 |
| Alanya Merkez | 125 | €80 | €93 | %14 |
| Doğu Alanya | 138 | €88 | €98 | %10 |
| Kargıcak | 150 | €95 | €108 | %12 |
| Demirtaş | 170 | €107 | €123 | %13 |

Batı Alanya bilinçli olarak %10 marj tabanının altında tutuluyor: kendi
maliyetini karşılıyor ama misafirin en çok fiyat karşılaştırdığı şeritte
rekabetçi kalması için €73'te bırakıldı. `src/route-margin.test.js` bunu
gerekçesiyle belgelenmiş bir istisna olarak tutuyor.

## Uygulanan tek yön fiyatlar

| Bölge | Kapsam | Vito | Sprinter |
| --- | --- | ---: | ---: |
| Batı Alanya | Okurcalar, İncekum, Avsallar, Türkler, Payallar, Konaklı | €73 | €93 |
| Alanya Merkez | Merkez, Kleopatra, Oba, Tosmur | €93 | €98 |
| Doğu Alanya | Kestel, Mahmutlar | €98 | €108 |
| Kargıcak | Kargıcak | €108 | €118 |
| Uzak doğu | Demirtaş | €123 | €133 |

Yalnızca Vito tarifeleri maliyet tabanına çekildi; Sprinter fiyatları zaten
maliyetin üzerindeydi, bu yüzden bu beş bölgede araç farkı daralıyor.

Fiyatlar araç başına, tek yön ve sabit fiyat olarak gösterilir.

## Planın ilk sürümünden farkı

Bu belgenin ilk hâli €65–€95 arası bir merdiven öneriyordu (Merkez €70,
Kargıcak €85, Demirtaş €95). O rakamlar beş bölgenin dördünde maliyetin
altındaydı: Merkez €70 fiyatına karşı €80 maliyet, Demirtaş €95 fiyatına karşı
€107. Tarife her transferde sessizce zarar ettiği için rakamlar maliyetin
üzerine çekildi. `src/route-margin.test.js` bu tabanı koruyor; bir tarife
maliyetin altına inerse build kırılır.

Bu merdiven 2026-10'da bir kez daha düzeltildi: araya giren genel zam
(`20260915100000_raise_transfer_prices.sql`) tarifeleri sıfırlayınca Merkez,
Doğu Alanya, Kargıcak ve Demirtaş yeniden maliyetin altına düştü. Yürürlükteki
rakamlar yukarıdaki tablolardakilerdir.

Sonuç olarak yalnızca batı şeridi eski €95 tarifesinin belirgin biçimde
altında kalabiliyor. Merkez ve doğusu bu maliyet tabanında €88'in altında
satılamaz; daha ucuz bir merkez fiyatı istenirse önce km maliyetinin düşmesi ya
da dönüş bacağının doldurulması gerekir.

## Uygulama

1. `src/routes.js` içine beş ayrı Alanya rota kaydı ekle.
2. Aynı fiyatları Supabase seed ve yeni bir migration ile eşleştir.
3. Rezervasyon formundaki `Alanya` seçeneğini bu beş bölgeyle değiştir.
4. Her bölge için rota sayfası, SEO başlığı ve yapılandırılmış fiyat verisini üret.
5. Fiyat senkronizasyonu ve build testlerini çalıştır.

## Kaynak kontrolü

2026 rakip fiyatlarında merkez çoğunlukla €65–75, Mahmutlar €70–90 ve Kargıcak
€95 civarındadır. Bu tarife merkezde rakiplerin üzerindedir: rakipler ya daha
düşük km maliyetiyle ya da dönüş bacağını başka bir transferle doldurarak
çalışıyor. Merkezde €93'ün altına inmek isteniyorsa çözüm fiyatı düşürmek
değil, dönüş bacağını satmaktır.

## Bilinen açık

`alanya` (€98) artık merdivenin en üstü değil. Kendi 125 km'sine kadar güvenli
— Batı Alanya ve Merkez'i karşılıyor — ve Doğu Alanya ile tam aynı seviyede
duruyor; ama otelini yerleştiremeyen bir Kargıcak veya Demirtaş misafiri
olduğundan ucuza fiyat alır. Bu iki bölgede transfer kabul edilmeden önce elle
teyit edilmelidir. `src/routes.test.js` bu listeyi sabitliyor.

Ayrıca `alanya_bati` altında satılan 23 otel 114–118 km'ye geocode ediyor, yani
bölgenin kendi 105 km'sinin ötesinde: €73 tarifesi bunların maliyetini €0,40–
€2,80 açıkla kaçırıyor. Bu bir tarife değil ilçe sorusu — çoğu çıplak "Alanya"
ilçesiyle kayıtlı — ve `src/hotel-distances-review.test.js` içinde borç olarak
listeleniyor.
