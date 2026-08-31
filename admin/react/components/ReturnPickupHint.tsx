import { recommendedAirportPickup, pickupRuleSummary, comparePickupTime, formatDurationTr } from '../../../src/airport-pickup.js'

export interface RecommendedPickup {
  time: string
  dayOffset: number
  leadMinutes: number
  checkinMin: number
  driveMin: number
  bufferMin: number
  rule: { slug: string | null; label: string; driveMin: number; bufferMin: number; isDefault: boolean }
}

/**
 * Dönüş uçuşunun kalkış saatinden tavsiye edilen otelden alınma saatini bulur.
 * `pickupLocation` dönüş ayağında yolcunun alınacağı bölgedir (gidişin varışı).
 */
export function returnPickupAdvice(departureTime?: string | null, pickupLocation?: string | null) {
  return recommendedAirportPickup(departureTime, pickupLocation) as RecommendedPickup | null
}

function dayOffsetLabel(dayOffset: number) {
  if (dayOffset === 0) return ''
  return dayOffset < 0 ? ' (bir önceki gün)' : ' (ertesi gün)'
}

/**
 * Dönüş transferi için tavsiye edilen otelden alınma saatini ve kuralın
 * dökümünü gösterir. `actualTime` verilirse girilen saat tavsiyeyle karşılaştırılır.
 */
export function ReturnPickupHint({ departureTime, pickupLocation, actualTime, onApply }: {
  departureTime?: string | null
  pickupLocation?: string | null
  actualTime?: string | null
  onApply?: (time: string) => void
}) {
  const pickup = returnPickupAdvice(departureTime, pickupLocation)
  if (!pickup) return null
  const comparison = comparePickupTime(actualTime, pickup) as { diffMinutes: number; isLate: boolean; isEarly: boolean; onTime: boolean } | null

  // Alış uçuştan bir önceki güne düşüyorsa saati tek başına uygulamak yanıltır;
  // dönüş tarihinin de bir gün geri alınması gerekir.
  const crossesMidnight = pickup.dayOffset !== 0

  return <div className={`return-pickup-hint${comparison?.isLate ? ' is-late' : ''}`}>
    <div className="return-pickup-hint-head">
      <span className="return-pickup-hint-label">Tavsiye edilen otelden alınma</span>
      <strong>{pickup.time}{dayOffsetLabel(pickup.dayOffset)}</strong>
      {onApply && !crossesMidnight && <button type="button" className="return-pickup-apply" onClick={() => onApply(pickup.time)}>Bu saati kullan</button>}
    </div>
    <small className="return-pickup-hint-rule">{pickupRuleSummary(pickup)}</small>
    <small className="return-pickup-hint-rule">Yolcu havalimanında kalkıştan {formatDurationTr(pickup.checkinMin)} önce olmalı.</small>
    {crossesMidnight && <small className="return-pickup-hint-warning">Alış uçuş gününden {pickup.dayOffset < 0 ? 'bir gün önce' : 'bir gün sonra'} başlıyor; dönüş tarihini de buna göre girin.</small>}
    {pickup.rule.isDefault && <small className="return-pickup-hint-warning">Alış bölgesi seçili değil; en uzun güvenli varsayım ({formatDurationTr(pickup.driveMin)} yol) uygulandı.</small>}
    {comparison?.isLate && <small className="return-pickup-hint-warning">Girilen alış saati tavsiyeden {formatDurationTr(comparison.diffMinutes)} geç · uçuş kaçırma riski.</small>}
    {comparison?.isEarly && <small className="return-pickup-hint-note">Girilen alış saati tavsiyeden {formatDurationTr(-comparison.diffMinutes)} erken.</small>}
  </div>
}
