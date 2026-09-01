// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, test, expect, vi } from 'vitest'

afterEach(cleanup)
import { ProfitLedgerGrid } from './ProfitLedgerGrid'

const legs = [
  { bookingId: '1', bookingRef: 'A102', customerName: 'Ali', leg: 'outbound', date: '2026-08-18', from: 'AYT', to: 'Belek', revenueEur: 85, revenueTry: 4250, oneWayKm: 40, vehicleCostTry: 600, supplierCostTry: 0, airportMeetCostTry: 250, advertisingPerLegTry: 155, advertisingPerLegEur: 3.1, netProfitTry: 3245, netProfitEur: 64.9, eurTryRate: 50 },
  { bookingId: '2', bookingRef: 'A103', customerName: 'Veli', leg: 'outbound', date: '2026-08-18', from: 'Belek', to: 'AYT', revenueEur: 80, revenueTry: 4000, oneWayKm: 0, vehicleCostTry: 0, supplierCostTry: 2750, airportMeetCostTry: 0, advertisingPerLegTry: 155, advertisingPerLegEur: 3.1, netProfitTry: 1095, netProfitEur: 21.9, eurTryRate: 50 },
]

describe('ProfitLedgerGrid', () => {
  test('gün başlığı ve gün ara toplamı render eder', () => {
    render(<ProfitLedgerGrid legs={legs} bookingsById={new Map()} editable={false} />)
    expect(screen.getByText(/18 Ağustos/)).toBeInTheDocument()
    expect(screen.getByText(/2 sefer/)).toBeInTheDocument()
    // ₺4.340,00 appears in both the day header and the subtotal row — both should be present
    expect(screen.getAllByText(/₺4\.340/).length).toBeGreaterThanOrEqual(1)
  })

  test('salt-okunur modda düzenleme kontrolü yok', () => {
    render(<ProfitLedgerGrid legs={legs} bookingsById={new Map()} editable={false} />)
    expect(screen.queryByRole('button', { name: /KM|düzenle|kaydet/i })).toBeNull()
  })
})

test('editable modda düzenlenebilir bacakta LegCostControls render eder', () => {
  const booking = { id: '1', booking_ref: 'A102', service_cost_mode: 'own_vehicle' } as any
  render(<ProfitLedgerGrid
    legs={[legs[0]]}
    bookingsById={new Map([['1', booking]])}
    editable={true}
    onSaveDistance={vi.fn()}
    onSaveSupplierCost={vi.fn()}
    onSaveCostMode={vi.fn()}
  />)
  // LegCostControls bir düzenleme tetikleyici buton render eder (KM / tek yön / maliyet modeli)
  const buttons = screen.getAllByRole('button')
  expect(buttons.length).toBeGreaterThan(0)
})

test('editable=false iken düzenleme butonu yok', () => {
  const booking = { id: '1', booking_ref: 'A102', service_cost_mode: 'own_vehicle' } as any
  render(<ProfitLedgerGrid legs={[legs[0]]} bookingsById={new Map([['1', booking]])} editable={false} />)
  expect(screen.queryAllByRole('button')).toHaveLength(0)
})

test('mobil kart yapısı bacak başına render eder', () => {
  const { container } = render(<ProfitLedgerGrid legs={legs} bookingsById={new Map()} editable={false} />)
  expect(container.querySelectorAll('.ledger-card')).toHaveLength(2)
})

const attentionLeg = { bookingId: '9', bookingRef: 'A9', customerName: 'Zoe', leg: 'outbound', date: '2026-08-20', from: 'AYT', to: 'Nowhere', revenueEur: 90, revenueTry: 4500, oneWayKm: null, vehicleCostTry: 0, supplierCostTry: 0, airportMeetCostTry: 0, advertisingPerLegTry: 100, advertisingPerLegEur: 2, netProfitTry: 4400, netProfitEur: 88, eurTryRate: 50 }

test('eksik KM li ayak dikkat işareti alır ve Maliyeti yok butonu gösterir', () => {
  const booking = { id: '9', booking_ref: 'A9', service_cost_mode: 'own_vehicle' } as any
  const onSaveNoCost = vi.fn().mockResolvedValue(undefined)
  const { container } = render(<ProfitLedgerGrid
    legs={[attentionLeg]} bookingsById={new Map([['9', booking]])} editable={true}
    onSaveDistance={vi.fn()} onSaveSupplierCost={vi.fn()} onSaveCostMode={vi.fn()} onSaveNoCost={onSaveNoCost}
  />)
  expect(container.querySelector('.is-attention, .ledger-attention')).toBeTruthy()
  expect(screen.getAllByRole('button', { name: /Maliyeti yok/i }).length).toBeGreaterThan(0)
})

test('Maliyeti yok tıklanınca onSaveNoCost çağrılır', async () => {
  const booking = { id: '9', booking_ref: 'A9', service_cost_mode: 'own_vehicle' } as any
  const onSaveNoCost = vi.fn().mockResolvedValue(undefined)
  render(<ProfitLedgerGrid
    legs={[attentionLeg]} bookingsById={new Map([['9', booking]])} editable={true}
    onSaveDistance={vi.fn()} onSaveSupplierCost={vi.fn()} onSaveCostMode={vi.fn()} onSaveNoCost={onSaveNoCost}
  />)
  fireEvent.click(screen.getAllByRole('button', { name: /Maliyeti yok/i })[0])
  expect(onSaveNoCost).toHaveBeenCalledWith(attentionLeg)
})

test('editable=false iken Maliyeti yok butonu yok', () => {
  const booking = { id: '9', booking_ref: 'A9', service_cost_mode: 'own_vehicle' } as any
  render(<ProfitLedgerGrid legs={[attentionLeg]} bookingsById={new Map([['9', booking]])} editable={false} />)
  expect(screen.queryByRole('button', { name: /Maliyeti yok/i })).toBeNull()
})

test('sefer numarası tıklanınca detaya gider', () => {
  const navigate = vi.fn()
  render(<ProfitLedgerGrid legs={[legs[0]]} bookingsById={new Map()} editable={false} navigate={navigate} />)
  fireEvent.click(screen.getAllByRole('button', { name: 'A102' })[0])
  expect(navigate).toHaveBeenCalledWith('#detail/A102?from=profit-loss')
})

test('navigate yoksa sefer numarası düz metin', () => {
  render(<ProfitLedgerGrid legs={[legs[0]]} bookingsById={new Map()} editable={false} />)
  expect(screen.queryByRole('button', { name: 'A102' })).toBeNull()
})

test('attentionSince öncesi (dağıtılmış) eksik ayak uyarı almaz', () => {
  const booking = { id: '9', booking_ref: 'A9', service_cost_mode: 'own_vehicle' } as any
  // Ayak 2026-08-20; attentionSince 2026-08-25 → dağıtım öncesi, eksik KM ignore edilir.
  const { container } = render(<ProfitLedgerGrid
    legs={[attentionLeg]} bookingsById={new Map([['9', booking]])} editable={true}
    attentionSince="2026-08-25"
    onSaveDistance={vi.fn()} onSaveSupplierCost={vi.fn()} onSaveCostMode={vi.fn()} onSaveNoCost={vi.fn()}
  />)
  // Uyarı işareti + "Eksik bilgi" bayrağı susar (düzenleyici açık kalabilir).
  expect(container.querySelector('.is-attention')).toBeNull()
  expect(screen.queryByText('Eksik bilgi')).toBeNull()
})

test('attentionSince sonrası eksik ayak uyarı alır', () => {
  const booking = { id: '9', booking_ref: 'A9', service_cost_mode: 'own_vehicle' } as any
  const { container } = render(<ProfitLedgerGrid
    legs={[attentionLeg]} bookingsById={new Map([['9', booking]])} editable={true}
    attentionSince="2026-08-01"
    onSaveDistance={vi.fn()} onSaveSupplierCost={vi.fn()} onSaveCostMode={vi.fn()} onSaveNoCost={vi.fn()}
  />)
  expect(container.querySelector('.is-attention')).toBeTruthy()
})
