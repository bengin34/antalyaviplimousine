# Kâr/Zarar Dashboard Sadeleştirme Tasarımı

## Amaç

Kâr/Zarar admin ekranını, yinelenen metrikler ve operasyonel liste ayrıntılarından arındırılmış, hızlı okunabilen bir dashboard haline getirmek. Kâr paylaşımı, net kârın doğrudan sonucu olarak görünür ve erişilebilir kalacaktır.

## Onaylanmış düzen

Sayfa aşağıdaki sırayı kullanır:

1. Dönem seçici ve yenileme eylemi.
2. Seçili dönemin net kâr/zarar hero alanı (TRY, EUR ve kâr marjı).
3. Kâr paylaşımı alanı. Açık dönemin dağıtılabilir tutarını, iki ortağın tutarlarını ve `Kârı dağıt` eylemini gösterir. Dağıtım geçmişi bu alan içinden erişilebilir kalır.
4. Üç özet kart: seyahat geliri, toplam gider ve gerçekleşmiş sefer sayısı.
5. Varsayılan kapalı `İşlem bekleyen kayıtlar` alanı. Eksik tek yön KM ve eksik günlük kiralama KM kayıtlarını sayar; açıldığında yalnızca bu kayıtları ve mevcut rezervasyon-detayına yönlendiren eylemleri gösterir.
6. Varsayılan kapalı `Gider dağılımı` alanı. Kendi araç, satılan transfer, karşılama ve reklam giderlerini gösterir.
7. Varsayılan kapalı `Hesaplama ayarları` alanı. Aylık KM maliyeti, EUR/TL kuru, reklam gideri ve mevcut kaydet/hesapla davranışı burada korunur. `Tümü` dönemindeki bilgilendirme de bu panelde görünür.

## Kapsam dışı bırakılanlar

Ana Kâr/Zarar sayfasından aşağıdakiler kaldırılır:

- Kâr formülü satırı.
- Altı kartlık, gider kalemleriyle yinelenen KPI alanı.
- Seyahat geçmişi listesi.
- Rota dökümü.
- Manuel mesafeler listesi.
- Satılan transferler listesi.
- Uzun hesaplama dipnotu.

Bu listelerde bulunan KM, maliyet modeli ve tedarikçi maliyeti düzenleme işlemleri Kâr/Zarar sayfasında yeniden sunulmaz. Kullanıcı bunları rezervasyon detay ekranından yapar.

## Bileşen ve veri akışı

`ProfitLossPage`, mevcut `calculateProfitLossMetrics` sonucunu kullanmaya devam eder. Yeni sunum bileşenleri bu tek metrik kaynağından türetilir:

- `ProfitSummaryCards`: gelir, toplam gider (`totalExpenseTry`) ve tamamlanan sefer sayısı.
- `ProfitActionItems`: çözülmemiş kayıtlar ve günlük KM eksiği için yalnızca yönlendirme eylemleri.
- `ProfitBreakdown`: mevcut gider alt toplamları.
- Mevcut `SettingsForm`: açılır hesaplama ayarları içinde.
- Mevcut `ProfitDistributionSection`: hero alanının hemen ardından.

`ProfitDistributionSection`ın hesaplama, dağıtım onayı, tarih ayarı, hata ve geçmiş davranışları değişmez. Kâr paylaşımı satır içi özetinin üst düzey görünürlüğü korunur.

## Durumlar ve erişilebilirlik

- Yüklenme ve sayfa seviyesi hata durumları korunur.
- Açılır alanlar gerçek düğmelerle yönetilir; `aria-expanded` ve ilişkili panel kimliği kullanılır.
- İşlem bekleyen kayıtların sayısı kapalı durumdayken de görünür.
- Veri eksikliği yalnızca maliyet hesaplamasını etkilediğinde uyarı olur; işlem gerektirmeyen geçmiş kayıtlar ana sayfada listelenmez.

## Test kapsamı

- Net kâr hero alanından sonra kâr paylaşımının render sırası.
- Sadece üç özet kartın gösterilmesi ve toplam giderin doğru kullanılması.
- Çıkarılan seyahat geçmişi, rota dökümü, manuel mesafe ve satılan transfer bölümlerinin görünmemesi.
- Hesaplama ayarları, gider dağılımı ve işlem bekleyen kayıtlar panellerinin kapalı/açık etkileşimi.
- Eksik kayıt eylemlerinin doğru rezervasyon detayına yönlenmesi.
- Mevcut kâr paylaşımı yükleme, hata ve dağıtım davranışlarının korunması.

## Başarı ölçütü

Yönetici, seçili dönemin net sonucunu ve dağıtılabilir kârı sayfayı kaydırmadan görür. Ayrıntılı finans kırılımı, ayarlar ve yalnızca aksiyon gerektiren kayıtlar gerektiğinde açılır; tüm operasyonel seyahat düzenlemeleri rezervasyon detayına taşınmış olur.
