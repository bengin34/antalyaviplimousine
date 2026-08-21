import type {
  CreateProfitDistributionInput,
  ProfitDistribution,
  ProfitShareSettings,
  SaveProfitShareSettingsInput,
} from '../types'
import { supabase } from './supabase'

export async function fetchProfitDistributionLedger(): Promise<{
  settings: ProfitShareSettings | null
  distributions: ProfitDistribution[]
}> {
  const settingsQuery = supabase
    .from('profit_share_settings')
    .select('*')
    .maybeSingle()
  const distributionsQuery = supabase
    .from('profit_distributions')
    .select('*')
    .order('period_end', { ascending: false })

  const [settingsResult, distributionsResult] = await Promise.all([
    settingsQuery,
    distributionsQuery,
  ])

  if (settingsResult.error) throw settingsResult.error
  if (distributionsResult.error) throw distributionsResult.error

  return {
    settings: settingsResult.data as ProfitShareSettings | null,
    distributions: (distributionsResult.data ?? []) as ProfitDistribution[],
  }
}

export async function saveProfitShareSettings(
  input: SaveProfitShareSettingsInput,
): Promise<ProfitShareSettings> {
  const { data, error } = await supabase.rpc('set_profit_share_settings', {
    p_opening_date: input.openingDate,
    p_default_operations_share_pct: input.operationsSharePct,
    p_default_vehicle_owner_share_pct: input.vehicleOwnerSharePct,
  }).single()

  if (error) throw error
  if (!data) throw new Error('Profit share settings RPC returned no data')
  return data as ProfitShareSettings
}

export async function createProfitDistribution(
  input: CreateProfitDistributionInput,
): Promise<ProfitDistribution> {
  const { data, error } = await supabase.rpc('create_profit_distribution', {
    p_expected_start: input.expectedStart,
    p_period_end: input.periodEnd,
    p_operations_share_pct: input.operationsSharePct,
    p_vehicle_owner_share_pct: input.vehicleOwnerSharePct,
    p_snapshot: input.snapshot,
  }).single()

  if (error) throw error
  if (!data) throw new Error('Profit distribution RPC returned no data')
  return data as ProfitDistribution
}

export function profitDistributionErrorMessage(error: unknown): string {
  const details = error && typeof error === 'object'
    ? error as { code?: unknown; message?: unknown; status?: unknown }
    : {}
  const code = typeof details.code === 'string' ? details.code.toLowerCase() : ''
  const message = typeof details.message === 'string'
    ? details.message.toLowerCase()
    : typeof error === 'string' ? error.toLowerCase() : ''
  const status = typeof details.status === 'number' ? details.status : null

  if (
    code === '23p01'
    || message.includes('stale or not contiguous')
    || message.includes('overlap')
  ) {
    return 'Dağıtım dönemi güncelliğini yitirdi. Verileri yenileyip tekrar deneyin.'
  }
  if (message.includes('end must be on or after')) {
    return 'Bitiş tarihi başlangıç tarihinden önce olamaz.'
  }
  if (message.includes('only closed')) {
    return 'Yalnızca tamamlanmış günler için dağıtım yapılabilir.'
  }
  if (message.includes('opening date cannot change')) {
    return 'İlk dağıtımdan sonra başlangıç tarihi değiştirilemez.'
  }
  if (
    message.includes('malformed profit distribution snapshot')
    || message.includes('snapshot schema or period')
    || message.includes('snapshot does not reconcile')
  ) {
    return 'Hesap özeti doğrulanamadı. Verileri yenileyip tekrar deneyin.'
  }
  if (message.includes('profit shares must')) {
    return 'Kâr paylaşım oranları iki ondalığı geçmemeli ve toplam %100 olmalıdır.'
  }
  if (message.includes('settings must be configured first')) {
    return 'Önce kâr paylaşımı başlangıç ayarlarını kaydedin.'
  }
  if (
    code === '42501'
    || code === 'pgrst301'
    || status === 401
    || status === 403
    || message.includes('authentication required')
    || message.includes('permission denied')
    || message.includes('unauthorized')
    || message.includes('forbidden')
    || message.includes('jwt')
  ) {
    return 'Bu işlem için yetkiniz yok. Lütfen yeniden giriş yapın.'
  }
  if (
    message.includes('failed to fetch')
    || message.includes('fetch failed')
    || message.includes('network')
    || message.includes('connection')
    || message.includes('load failed')
    || message.includes('timed out')
    || message.includes('timeout')
    || message.includes('offline')
  ) {
    return 'Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.'
  }

  return 'İşlem tamamlanamadı. Lütfen tekrar deneyin.'
}
