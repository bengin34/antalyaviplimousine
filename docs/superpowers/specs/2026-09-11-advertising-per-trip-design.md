# Reklam Giderinin Seyahat Başına Dağıtılması ve Reklam Toggle'ı — Tasarım

**Tarih:** 2026-09-11
**Kapsam:** `admin/profit-loss-metrics.js` reklam modeli + `admin/react` kâr/zarar sayfasında "Reklam giderini dahil et" anahtarı.

## 1. Sorun

Reklam bütçesi aylık giriliyor (`profit_loss_settings.advertising_expense_try`), ama döneme **takvim günü oranıyla** yükleniyordu (`allocatedAdvertisingForRange`): 30 günlük ayın 10 günü seçildiyse reklamın 10/30'u gider yazılıyordu.

Bu yanlıştı. Reklam gideri güne değil talebe hizmet eder: bugün harcanan reklam haftalar sonraki rezervasyonları getirir. Sonuçta yoğun ve sakin günler aynı reklam yükünü taşıyor, seyahatsiz bir aralık bile gider üretiyordu.

## 2. Model

Reklam **seyahat ayağı (leg) başına** dağıtılır:

```
havuz      = bugüne kadarki (içinde bulunulan ay dahil) tüm aylık reklam gideri
bölen      = bugüne kadar gerçekleşmiş tüm seyahat ayağı
seyahat payı = havuz / bölen
dönem reklamı = seyahat payı × dönemdeki ayak sayısı
```

`advertisingPerLegRate(settingsByMonth, legCount, today)` havuzu ve payı hesaplar; `attachAdvertisingPerLeg(legs, rate)` payı her bacağa yazar. Dönem toplamı bu payların toplamıdır — aralığın uzunluğu hesaba girmez.

Kararlar:
- **Havuz tüm zamanlar** (ay bazlı değil): geçmiş reklam gelecek seyahatleri de getirdiği için tek bir seyahat-başı maliyet çıkar. Aylık bütçe farkları tek orana erir.
- **Gelecek aylara önden girilmiş bütçe havuza alınmaz** — henüz harcanmadı.
- **Artık kuruş serpiştirilmez:** her seyahat aynı kuruşu taşır. 100 ₺ / 3 → her biri 33,33 ₺, dönem 99,99 ₺. Eşit maliyet, kuruşu kuruşuna toplam uyumundan önemli sayıldı.
- Seyahat yoksa pay 0'dır; seyahatsiz aralığa reklam yüklenmez.
- `allocatedAdvertisingForRange` ve gün oranlama testleri **kaldırıldı**.

## 3. Toggle

Araç çubuğunda "Reklam giderini dahil et" onay kutusu. Tercih `localStorage`'da (`profit-loss:include-advertising`, özel sekmede erişim hatası tolere edilir), varsayılan **açık**.

Kapalıyken `includeAdvertising: false` üç hesaplayıcıya da geçer (`calculateLedgerForRange`, `calculateProfitDistribution`, `calculateProfitLossMetrics`): reklam gideri ve bacak payları 0 olur.

**Kapsam kararı: dağıtım da etkilenir.** Toggle kapalıyken ortaklara dağıtılacak net kâr da reklamsız hesaplanır ve snapshot bu haliyle kalıcı kaydedilir — yani reklam gideri o dönem için ortaklardan hiç tahsil edilmez. Riski görünür kılmak için dağıtım bölümünde toggle kapalıyken kalıcı bir uyarı gösterilir.

Kaydedilmiş dağıtımların KPI'ı snapshot'tan okunmaya devam eder; toggle geçmiş kayıtları değiştirmez.
