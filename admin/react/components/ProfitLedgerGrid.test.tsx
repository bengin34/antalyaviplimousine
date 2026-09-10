// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const actions = vi.hoisted(() => ({
  saveLegOwnVehicleProfit: vi.fn(),
  saveLegSupplierCost: vi.fn(),
  saveLegCostMode: vi.fn(),
  saveLegMeetFee: vi.fn(),
  saveParkingHours: vi.fn(),
}))
vi.mock('../lib/leg-cost-actions', () => actions)
const csv = vi.hoisted(() => ({ downloadCsv: vi.fn() }))
vi.mock('../lib/ledger-csv', async importOriginal => ({ ...(await importOriginal<object>()), downloadCsv: csv.downloadCsv }))

import { ProfitLedgerGrid, type LedgerLeg } from './ProfitLedgerGrid'

afterEach(cleanup)
beforeEach(() => { vi.clearAllMocks(); localStorage.clear() })

const base = {
  revenueEur: 85, revenueTry: 4250, oneWayKm: 40, vehicleCostTry: 600, supplierCostTry: 0,
  airportMeetCostTry: 250, airportMeetCostEur: 5, parkingCostTry: 0, parkingCostEur: 0,
  advertisingPerLegTry: 155, advertisingPerLegEur: 3.1, netProfitTry: 3245, netProfitEur: 64.9, eurTryRate: 50,
}
const ali: LedgerLeg = { ...base, bookingId: '1', bookingRef: 'A102', customerName: 'Ali Veli', leg: 'outbound', date: '2026-08-18', from: 'airport', to: 'Belek', ownVehicleProfitEur: 60, ownVehicleProfitTry: 3000 }
const veli: LedgerLeg = { ...base, bookingId: '2', bookingRef: 'A103', customerName: 'Zeynep Kaya', leg: 'outbound', date: '2026-08-20', from: 'Belek', to: 'airport', revenueEur: 80, revenueTry: 4000, airportMeetCostTry: 0, airportMeetCostEur: 0, supplierCostTry: 2750, netProfitTry: 1095, netProfitEur: 21.9 }
const aliBooking = { id: '1', booking_ref: 'A102', customer_name: 'Ali Veli', trip_type: 'one_way', pickup_location: 'airport', dropoff_location: 'belek', pickup_date: '2026-08-18', price_eur: 85, status: 'completed', service_cost_mode: 'own_vehicle', airport_meet_fee_applies: true, airport_meet_fee_parking_hours: 1 } as any
const veliBooking = { id: '2', booking_ref: 'A103', customer_name: 'Zeynep Kaya', trip_type: 'one_way', pickup_location: 'belek', dropoff_location: 'airport', pickup_date: '2026-08-20', price_eur: 80, status: 'completed', service_cost_mode: 'sold_transfer', sold_transfer_cost_try: 2750 } as any
const bookings = new Map([['1', aliBooking], ['2', veliBooking]])

function renderGrid(props: Partial<Parameters<typeof ProfitLedgerGrid>[0]> = {}) {
  const onBookingSaved = vi.fn()
  const utils = render(<ProfitLedgerGrid
    legs={[ali, veli]} bookingsById={bookings} editable today="2026-09-01" periodLabel="acik"
    onBookingSaved={onBookingSaved} {...props}
  />)
  return { ...utils, onBookingSaved }
}

describe('ProfitLedgerGrid — görünüm', () => {
  test('kolon başlıklarını düz tabloda gösterir', () => {
    renderGrid()
    for (const header of ['Tarih', 'Yolcu', 'Yön', 'Rota', 'Gelir €', 'Maliyet €', 'Reklam öncesi kâr', 'Tedarikçi ₺', 'Karşılama', 'Otopark saat', 'Reklam ₺', 'Net kâr ₺', 'Model']) {
      expect(screen.getByRole('columnheader', { name: new RegExp(header) })).toBeInTheDocument()
    }
    expect(screen.queryByText(/18 Ağustos.*sefer/)).toBeNull()
  })

  test('yolcu adını gösterir, rezervasyon numarasını göstermez', () => {
    renderGrid()
    expect(screen.getAllByText('Ali Veli').length).toBeGreaterThan(0)
    expect(screen.queryByText('A102')).toBeNull()
  })

  test('yolcu adı tıklanınca detaya gider', () => {
    const navigate = vi.fn()
    renderGrid({ navigate })
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli' })[0])
    expect(navigate).toHaveBeenCalledWith('#detail/A102?from=profit-loss')
  })

  test('varsayılan sıralama tarih azalan; başlığa tıklayınca artan', () => {
    renderGrid()
    const table = screen.getByRole('table')
    const firstRow = () => within(table).getAllByRole('row')[1]
    expect(firstRow()).toHaveTextContent('Zeynep Kaya')
    fireEvent.click(screen.getByRole('columnheader', { name: /Tarih/ }).querySelector('button')!)
    expect(firstRow()).toHaveTextContent('Ali Veli')
    expect(screen.getByRole('columnheader', { name: /Tarih/ })).toHaveAttribute('aria-sort', 'ascending')
  })

  test('metin filtresi yolcu ve rota üzerinde çalışır', () => {
    renderGrid()
    fireEvent.change(screen.getByRole('searchbox', { name: /Ara/ }), { target: { value: 'zeynep' } })
    const table = screen.getByRole('table')
    expect(within(table).queryByText('Ali Veli')).toBeNull()
    expect(within(table).getByText('Zeynep Kaya')).toBeInTheDocument()
  })

  test('boş listede uyarı gösterir', () => {
    renderGrid({ legs: [] })
    expect(screen.getByText('Bu dönemde gerçekleşmiş sefer yok.')).toBeInTheDocument()
  })

  test('dip toplam satırı görünür satırları toplar', () => {
    renderGrid()
    const footer = screen.getByRole('table').querySelector('tfoot')!
    expect(footer).toHaveTextContent('Toplam')
    expect(footer).toHaveTextContent('€165,00')     // 85 + 80
    expect(footer).toHaveTextContent('₺4.340,00')   // 3245 + 1095
  })

  test('mobil kartlar yolcu adıyla render eder', () => {
    const { container } = renderGrid()
    const cards = container.querySelectorAll('.ledger-card')
    expect(cards).toHaveLength(2)
    expect(cards[0]).toHaveTextContent('Zeynep Kaya')
  })
})

describe('ProfitLedgerGrid — düzenleme', () => {
  test('editable=false iken hiçbir düzenleme butonu yok', () => {
    const { container } = renderGrid({ editable: false })
    // Başlık sıralama butonları kalır; hücre düzenleme butonları (.ledger-cell-edit) hiç olmamalı.
    expect(container.querySelectorAll('.ledger-cell-edit')).toHaveLength(0)
  })

  test('kâr hücresinden kaydedince saveLegOwnVehicleProfit çağrılır ve booking yamalanır', async () => {
    actions.saveLegOwnVehicleProfit.mockResolvedValue({ own_vehicle_profit_eur: 55 })
    const { onBookingSaved } = renderGrid()
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli gidiş kâr' })[0])
    const input = screen.getAllByRole('textbox', { name: 'Ali Veli gidiş kâr' })[0]
    fireEvent.change(input, { target: { value: '55' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    await waitFor(() => expect(actions.saveLegOwnVehicleProfit).toHaveBeenCalledWith('1', 'outbound', 55))
    expect(onBookingSaved).toHaveBeenCalledWith(expect.objectContaining({ id: '1', own_vehicle_profit_eur: 55 }))
  })

  test('maliyet hücresine girilen değer kâra çevrilir (gelir − maliyet − karşılama/otopark)', async () => {
    actions.saveLegOwnVehicleProfit.mockResolvedValue({ own_vehicle_profit_eur: 50 })
    renderGrid()
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli gidiş maliyet' })[0])
    const input = screen.getAllByRole('textbox', { name: 'Ali Veli gidiş maliyet' })[0]
    fireEvent.change(input, { target: { value: '30' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    // 85 − 30 − 5 = 50
    await waitFor(() => expect(actions.saveLegOwnVehicleProfit).toHaveBeenCalledWith('1', 'outbound', 50))
  })

  test('satılan transfer ayağında tedarikçi hücresi düzenlenir, kâr hücresi —', async () => {
    actions.saveLegSupplierCost.mockResolvedValue({ service_cost_mode: 'sold_transfer', sold_transfer_cost_try: 3000 })
    renderGrid()
    expect(screen.queryByRole('button', { name: 'Zeynep Kaya dönüş kâr' })).toBeNull()
    fireEvent.click(screen.getAllByRole('button', { name: 'Zeynep Kaya dönüş tedarikçi maliyeti' })[0])
    const input = screen.getAllByRole('textbox', { name: 'Zeynep Kaya dönüş tedarikçi maliyeti' })[0]
    fireEvent.change(input, { target: { value: '3000' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    await waitFor(() => expect(actions.saveLegSupplierCost).toHaveBeenCalledWith('2', 'outbound', 3000))
  })

  test('model → satılan transfer, bedel yoksa mod kaydedilmez ve tedarikçi hücresi açılır', async () => {
    renderGrid()
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli gidiş maliyet modeli' })[0])
    fireEvent.change(screen.getAllByRole('combobox', { name: 'Ali Veli gidiş maliyet modeli' })[0], { target: { value: 'sold_transfer' } })
    await waitFor(() => expect(screen.getAllByRole('textbox', { name: 'Ali Veli gidiş tedarikçi maliyeti' }).length).toBeGreaterThan(0))
    expect(actions.saveLegCostMode).not.toHaveBeenCalled()
  })

  test('model → maliyeti yok doğrudan kaydedilir', async () => {
    actions.saveLegCostMode.mockResolvedValue({ service_cost_mode: 'no_cost', sold_transfer_cost_try: null })
    renderGrid()
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli gidiş maliyet modeli' })[0])
    fireEvent.change(screen.getAllByRole('combobox', { name: 'Ali Veli gidiş maliyet modeli' })[0], { target: { value: 'no_cost' } })
    await waitFor(() => expect(actions.saveLegCostMode).toHaveBeenCalledWith('1', 'outbound', 'no_cost'))
  })

  test('karşılama select ve otopark saati kaydeder', async () => {
    actions.saveLegMeetFee.mockResolvedValue({ airport_meet_fee_applies: false })
    actions.saveParkingHours.mockResolvedValue({ airport_meet_fee_parking_hours: 2 })
    renderGrid()
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli gidiş karşılama' })[0])
    fireEvent.change(screen.getAllByRole('combobox', { name: 'Ali Veli gidiş karşılama' })[0], { target: { value: 'no' } })
    await waitFor(() => expect(actions.saveLegMeetFee).toHaveBeenCalledWith('1', false))
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli gidiş otopark saati' })[0])
    const input = screen.getAllByRole('textbox', { name: 'Ali Veli gidiş otopark saati' })[0]
    fireEvent.change(input, { target: { value: '2' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    await waitFor(() => expect(actions.saveParkingHours).toHaveBeenCalledWith('1', 2))
  })

  test('tedarikçi maliyeti € olarak girilince gün kuruyla ₺ye çevrilir', async () => {
    actions.saveLegSupplierCost.mockResolvedValue({ service_cost_mode: 'sold_transfer', sold_transfer_cost_try: 2000 })
    renderGrid()
    fireEvent.click(screen.getAllByRole('button', { name: 'Zeynep Kaya dönüş tedarikçi maliyeti' })[0])
    fireEvent.change(screen.getAllByRole('combobox', { name: 'Zeynep Kaya dönüş tedarikçi maliyeti para birimi' })[0], { target: { value: 'EUR' } })
    const input = screen.getAllByRole('textbox', { name: 'Zeynep Kaya dönüş tedarikçi maliyeti' })[0]
    fireEvent.change(input, { target: { value: '40' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    // 40 € × 50 (o günün kuru) = 2.000 ₺
    await waitFor(() => expect(actions.saveLegSupplierCost).toHaveBeenCalledWith('2', 'outbound', 2000))
  })

  test('maliyet ₺ olarak girilince kâr €ya çevrilerek kaydedilir', async () => {
    actions.saveLegOwnVehicleProfit.mockResolvedValue({ own_vehicle_profit_eur: 50 })
    renderGrid()
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli gidiş maliyet' })[0])
    fireEvent.change(screen.getAllByRole('combobox', { name: 'Ali Veli gidiş maliyet para birimi' })[0], { target: { value: 'TRY' } })
    const input = screen.getAllByRole('textbox', { name: 'Ali Veli gidiş maliyet' })[0]
    fireEvent.change(input, { target: { value: '1500' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    // ₺1.500 = 30 € maliyet → kâr 85 − 30 − 5 = 50 €
    await waitFor(() => expect(actions.saveLegOwnVehicleProfit).toHaveBeenCalledWith('1', 'outbound', 50))
  })

  test('kur kolonu seferin gününe ait kuru gösterir', () => {
    renderGrid()
    expect(screen.getByRole('columnheader', { name: /Kur/ })).toBeInTheDocument()
    expect(screen.getAllByText('50,00').length).toBeGreaterThan(0)
  })

  test('havalimanından başlamayan ayakta karşılama/otopark hücreleri —', () => {
    renderGrid()
    expect(screen.queryByRole('button', { name: 'Zeynep Kaya dönüş karşılama' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Zeynep Kaya dönüş otopark saati' })).toBeNull()
  })

  test('kayıt hatası hücrede gösterilir', async () => {
    actions.saveLegOwnVehicleProfit.mockRejectedValue(new Error('boom'))
    renderGrid()
    fireEvent.click(screen.getAllByRole('button', { name: 'Ali Veli gidiş kâr' })[0])
    const input = screen.getAllByRole('textbox', { name: 'Ali Veli gidiş kâr' })[0]
    fireEvent.change(input, { target: { value: '1' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    await waitFor(() => expect(screen.getAllByRole('alert')[0]).toHaveTextContent('Kaydedilemedi'))
  })
})

describe('ProfitLedgerGrid — eksik bilgi', () => {
  const missing: LedgerLeg = { ...ali, bookingId: '9', bookingRef: 'A9', customerName: 'Zoe', date: '2026-08-20', ownVehicleProfitEur: null, ownVehicleProfitTry: null }
  const missingBooking = { id: '9', booking_ref: 'A9', customer_name: 'Zoe', pickup_location: 'airport', service_cost_mode: 'own_vehicle' } as any

  test('eksik kârlı kendi-araç ayağı is-attention alır', () => {
    const { container } = renderGrid({ legs: [missing], bookingsById: new Map([['9', missingBooking]]) })
    expect(container.querySelector('tr.is-attention')).toBeTruthy()
  })

  test('attentionSince öncesi eksik ayak uyarı almaz', () => {
    const { container } = renderGrid({ legs: [missing], bookingsById: new Map([['9', missingBooking]]), attentionSince: '2026-08-25' })
    expect(container.querySelector('.is-attention')).toBeNull()
  })

  test('"Sadece eksik bilgi" kutusu diğer satırları gizler', () => {
    renderGrid({ legs: [ali, missing], bookingsById: new Map([['1', aliBooking], ['9', missingBooking]]) })
    fireEvent.click(screen.getByRole('checkbox', { name: /Sadece eksik bilgi/ }))
    const table = screen.getByRole('table')
    expect(within(table).queryByText('Ali Veli')).toBeNull()
    expect(within(table).getByText('Zoe')).toBeInTheDocument()
  })

  test('günlük hizmet eksik ayağı Maliyeti yok seçeneği sunar ve onSaveNoCost çağırır', async () => {
    const daily: LedgerLeg = { ...base, bookingId: 'd', bookingRef: 'D1', customerName: 'Deniz', leg: 'day-1', date: '2026-08-20', from: 'Günlük', to: 'Günlük', isDailyChauffeur: true, distanceSource: 'daily-missing', dayId: 'day-1' }
    const onSaveNoCost = vi.fn().mockResolvedValue(undefined)
    renderGrid({ legs: [daily], bookingsById: new Map([['d', { id: 'd', trip_type: 'daily_chauffeur' } as any]]), onSaveNoCost })
    fireEvent.click(screen.getAllByRole('button', { name: 'Deniz maliyeti yok' })[0])
    fireEvent.change(screen.getAllByRole('combobox', { name: 'Deniz maliyeti yok' })[0], { target: { value: 'no_cost' } })
    await waitFor(() => expect(onSaveNoCost).toHaveBeenCalledWith(daily))
  })
})

describe('ProfitLedgerGrid — toolbar', () => {
  test('kolon gizleme localStorage a yazılır ve başlığı kaldırır', () => {
    renderGrid()
    fireEvent.click(screen.getByRole('button', { name: 'Kolonlar' }))
    fireEvent.click(screen.getByRole('checkbox', { name: 'Reklam ₺' }))
    expect(screen.queryByRole('columnheader', { name: 'Reklam ₺' })).toBeNull()
    expect(JSON.parse(localStorage.getItem('profit-ledger-columns')!)).toEqual({ advertisingTry: false })
  })

  test('CSV indir filtrelenmiş satırları ve dosya adını kullanır', () => {
    renderGrid()
    // 'ali' tek başına "Antalya Havalimanı" rotasını da yakalar; tam ad kullan.
    fireEvent.change(screen.getByRole('searchbox', { name: /Ara/ }), { target: { value: 'ali veli' } })
    fireEvent.click(screen.getByRole('button', { name: 'CSV indir' }))
    expect(csv.downloadCsv).toHaveBeenCalledTimes(1)
    const [filename, content] = csv.downloadCsv.mock.calls[0]
    expect(filename).toBe('kar-zarar-acik.csv')
    expect(content).toContain('"Ali Veli"')
    expect(content).not.toContain('"Zeynep Kaya"')
    expect(content.split('\r\n')[0]).toContain('"Kâr €";"Kâr ₺"')
  })
})
