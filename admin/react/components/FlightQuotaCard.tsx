import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
// Tavan ve döngü aritmetiği Edge Function ile ortak: bu iki değeri burada
// kopyalamak, panelin gerçekte tükenmiş bir kotaya "hak var" demesine yol
// açardı — göstergenin var olma sebebini ortadan kaldırırdı. cycle.ts hiçbir
// şey import etmeyen saf bir modül olduğu için admin paketine doğrudan girer.
import { cycleKey, DEFAULT_ANCHOR_DAY, MONTHLY_CAP } from '../../../supabase/functions/verify-flight/cycle'

// Edge Function tarafında yıldönümü günü RAPIDAPI_CYCLE_ANCHOR_DAY ile
// ayarlanabiliyor. Panel o secret'ı göremez (Deno ortamı ayrı), bu yüzden
// kendi build-time değişkenini okur ve tanımlı değilse ortak varsayılana
// düşer. Operatör Edge Function tarafında günü değiştirirse burayı da
// ayarlamalı; ayarlamazsa kart var olmayan bir satırı okur ve aşağıdaki
// "kayıt yok" dalına düşer — yanlış bir sayı uydurmaz.
const configuredAnchorDay = Number(import.meta.env.VITE_RAPIDAPI_CYCLE_ANCHOR_DAY ?? DEFAULT_ANCHOR_DAY)
// cycleKey saçma bir değeri zaten varsayılana indiriyor; ekranda da aynı
// gün yazsın diye burada da aynı geçerlilik kontrolü yapılıyor.
const anchorDay = Number.isInteger(configuredAnchorDay) && configuredAnchorDay >= 1 && configuredAnchorDay <= 31
  ? configuredAnchorDay
  : DEFAULT_ANCHOR_DAY

export type QuotaTone = 'ok' | 'low' | 'spent'

/** Ton eşikleri saf bir fonksiyonda: üç durumun da testi buradan geçer. */
export function quotaTone(calls: number, cap: number = MONTHLY_CAP): QuotaTone {
  const ratio = calls / cap
  if (ratio >= 1) return 'spent'
  if (ratio >= 0.8) return 'low'
  return 'ok'
}

const NOTES: Record<QuotaTone, string> = {
  spent: 'Bu dönemin hakkı doldu. Uçuş saatleri dönem sonuna kadar elle girilecek; '
    + 'müşteriye hiçbir uyarı gösterilmez, rezervasyonlarda uçuş rozeti de çıkmaz.',
  low: 'Hak azaldı. Dolduğunda uçuş doğrulaması sessizce durur ve uçuş saatleri elle girilir.',
  ok: 'Bu dönem kalan hak yeterli.',
}

type State =
  | { kind: 'loading' }
  | { kind: 'error' }
  | { kind: 'ready'; calls: number }

export function FlightQuotaCard() {
  const [state, setState] = useState<State>({ kind: 'loading' })
  // Sayacın okundugu satırın anahtarı: store.ts'in consumeQuota'da yazdığı
  // anahtarla birebir aynı hesap (ör. '2026-09-14'), takvim ayı değil.
  const [cycle] = useState(() => cycleKey(new Date(), anchorDay))

  useEffect(() => {
    let mounted = true
    void (async () => {
      const { data, error } = await supabase
        .from('flight_api_usage')
        .select('calls')
        .eq('month', cycle)
        .maybeSingle()
      if (!mounted) return
      // Okuyamamak ile "bu dönem hiç sorgu olmadı" aynı şey değil. RLS
      // politikası eksikse veya oturum düşmüşse data da null gelir;
      // bunu 0 diye göstermek kartı yalancı yapardı.
      if (error) return setState({ kind: 'error' })
      // Satır yoksa sayaç gerçekten 0'dır: consume_flight_quota satırı ilk
      // çağrıda oluşturur, yani "kayıt yok" = bu dönem hiç sorgu yapılmadı.
      setState({ kind: 'ready', calls: (data as { calls: number } | null)?.calls ?? 0 })
    })()
    return () => { mounted = false }
  }, [cycle])

  if (state.kind === 'loading') return null

  if (state.kind === 'error') {
    return <div className="section flight-quota">
      <div className="section-label">Uçuş doğrulama kotası</div>
      <strong className="flight-quota-figure">—</strong>
      <small className="flight-quota-note">Sayaç okunamadı. Kalan hakkı bilmediğimiz için burada bir sayı gösterilmiyor.</small>
      <small className="flight-quota-cycle">Dönem başlangıcı: {cycle}</small>
    </div>
  }

  const tone = quotaTone(state.calls)
  return <div className={`section flight-quota ${tone}`}>
    <div className="section-label">Uçuş doğrulama kotası</div>
    <strong className="flight-quota-figure">{state.calls} / {MONTHLY_CAP}</strong>
    <small className="flight-quota-note">{NOTES[tone]}</small>
    <small className="flight-quota-cycle">Dönem başlangıcı: {cycle} · hak her ayın {anchorDay}. günü yenilenir</small>
  </div>
}
