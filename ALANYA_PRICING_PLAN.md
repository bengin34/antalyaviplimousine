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
| Batı Alanya | 105 | €68 | €80 | %15 |
| Alanya Merkez | 125 | €80 | €95 | %16 |
| Doğu Alanya | 138 | €88 | €105 | %16 |
| Kargıcak | 150 | €95 | €115 | %17 |
| Demirtaş | 170 | €107 | €130 | %18 |

## Uygulanan tek yön fiyatlar

| Bölge | Kapsam | Vito | Sprinter |
| --- | --- | ---: | ---: |
| Batı Alanya | Okurcalar, İncekum, Avsallar, Türkler, Payallar, Konaklı | €80 | €100 |
| Alanya Merkez | Merkez, Kleopatra, Oba, Tosmur | €95 | €115 |
| Doğu Alanya | Kestel, Mahmutlar | €105 | €130 |
| Kargıcak | Kargıcak | €115 | €140 |
| Uzak doğu | Demirtaş | €130 | €160 |

Fiyatlar araç başına, tek yön ve sabit fiyat olarak gösterilir.

## Planın ilk sürümünden farkı

Bu belgenin ilk hâli €65–€95 arası bir merdiven öneriyordu (Merkez €70,
Kargıcak €85, Demirtaş €95). O rakamlar beş bölgenin dördünde maliyetin
altındaydı: Merkez €70 fiyatına karşı €80 maliyet, Demirtaş €95 fiyatına karşı
€107. Tarife her transferde sessizce zarar ettiği için rakamlar maliyetin
üzerine çekildi. `src/route-margin.test.js` bu tabanı koruyor; bir tarife
maliyetin altına inerse build kırılır.

Sonuç olarak yalnızca batı şeridi eski €95 tarifesinin altında kalabiliyor.
Merkez ve doğusu bu maliyet tabanında €95'in altında satılamaz; daha ucuz bir
merkez fiyatı istenirse önce km maliyetinin düşmesi ya da dönüş bacağının
doldurulması gerekir.

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
çalışıyor. Merkezde €95'in altına inmek isteniyorsa çözüm fiyatı düşürmek değil,
dönüş bacağını satmaktır.

## Bilinen açık

`alanya` (€95) artık merdivenin en üstü değil. Kendi 125 km'sine kadar güvenli
— Batı Alanya ve Merkez'i karşılıyor — ama otelini yerleştiremeyen bir Doğu
Alanya, Kargıcak veya Demirtaş misafiri olduğundan ucuza fiyat alır. Bu üç
bölgede transfer kabul edilmeden önce elle teyit edilmelidir.
