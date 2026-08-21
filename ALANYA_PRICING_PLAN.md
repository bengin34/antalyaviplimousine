# Alanya Bölgesel Fiyatlandırma Planı

## Amaç

Tek fiyat olan €95 Vito tarifesini, mesafeye göre Alanya alt bölgelerine ayırmak ve merkezde rekabetçi kalmak.

## Önerilen tek yön fiyatlar

| Bölge | Kapsam | Vito | Sprinter |
| --- | --- | ---: | ---: |
| Batı Alanya | Okurcalar, İncekum, Avsallar, Türkler, Payallar, Konaklı | €65 | €85 |
| Alanya Merkez | Merkez, Kleopatra, Oba, Tosmur | €70 | €90 |
| Doğu Alanya | Kestel, Mahmutlar | €75 | €100 |
| Kargıcak | Kargıcak | €85 | €110 |
| Uzak doğu | Demirtaş | €95 | €125 |

Fiyatlar araç başına, tek yön ve sabit fiyat olarak gösterilir.

## Uygulama

1. `src/routes.js` içine beş ayrı Alanya rota kaydı ekle.
2. Aynı fiyatları Supabase seed ve yeni bir migration ile eşleştir.
3. Rezervasyon formundaki `Alanya` seçeneğini bu beş bölgeyle değiştir.
4. Her bölge için rota sayfası, SEO başlığı ve yapılandırılmış fiyat verisini üret.
5. Fiyat senkronizasyonu ve build testlerini çalıştır.

## Kaynak kontrolü

2026 rakip fiyatlarında merkez çoğunlukla €65–75, Mahmutlar €70–90 ve Kargıcak €95 civarındadır. Bu tarife merkezde €95 tek fiyatına göre daha rekabetçidir.
