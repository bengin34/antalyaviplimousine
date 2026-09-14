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
// düşer. Operatör Edge Function tarafında günü değiştirip burayı ayarlamazsa
// kart var olmayan bir satırı okur. Bu, gerçekten boş bir dönemden
// ayırt edilemez — o yüzden ikisi de aynı "kayıt yok" dalına düşer ve o dal
// bilerek hiçbir güvence vermez ("hak yeterli" demez).
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
  | { kind: 'empty' }
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
      // Satır yokluğu iki şeyi birden anlatabilir ve kart ikisini ayıramaz:
      // bu dönem gerçekten hiç sorgu olmadı (sayaç 0), ya da yukarıda
      // hesaplanan dönem anahtarı store.ts'in yazdığından farklı — yani kart
      // kör. İkincisi sıradan bir operatör hareketiyle mümkün (yıldönümü günü
      // bir tarafta Supabase secret'ı, diğerinde build-time değişkeni), bu
      // yüzden "kayıt yok" ayrı bir durum: sayı verilir ama "hak yeterli"
      // denmez.
      const row = data as { calls: number } | null
      setState(row ? { kind: 'ready', calls: row.calls } : { kind: 'empty' })
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

  if (state.kind === 'empty') {
    return <div className="section flight-quota">
      <div className="section-label">Uçuş doğrulama kotası</div>
      <strong className="flight-quota-figure">0 / {MONTHLY_CAP}</strong>
      <small className="flight-quota-note">
        Bu dönem için henüz kayıt yok. Sayaç satırını ilk uçuş sorgusu oluşturur; hiç sorgu
        yapılmadıysa bu normaldir. Ama dönem ortasında, uçuş numarası girilmiş rezervasyonlar
        varken hâlâ kayıt görünmüyorsa panel yanlış dönemi okuyor demektir — aşağıdaki dönem
        başlangıcının Edge Function ayarıyla aynı olduğunu kontrol edin.
      </small>
      <small className="flight-quota-cycle">Dönem başlangıcı: {cycle} · hak her ayın {anchorDay}. günü yenilenir</small>
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
