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

const fullBooking = { id: '1', booking_ref: 'A102', customer_name: 'Ali', trip_type: 'one_way', pickup_location: 'airport', dropoff_location: 'side', pickup_date: '2026-08-18', price_eur: 85, status: 'completed', service_cost_mode: 'own_vehicle' } as any

test('editable kendi-araç ayağında KM hücresinde düzenleme ikonu var', () => {
  render(<ProfitLedgerGrid
    legs={[legs[0]]} bookingsById={new Map([['1', fullBooking]])} editable={true}
    today="2026-09-01" onBookingSaved={vi.fn()}
  />)
  expect(screen.getAllByRole('button', { name: 'Maliyet düzenle' }).length).toBeGreaterThan(0)
})

test('düzenleme ikonuna tıklayınca maliyet modalı açılır', () => {
  render(<ProfitLedgerGrid
    legs={[legs[0]]} bookingsById={new Map([['1', fullBooking]])} editable={true}
    today="2026-09-01" onBookingSaved={vi.fn()}
  />)
  fireEvent.click(screen.getAllByRole('button', { name: 'Maliyet düzenle' })[0])
  expect(screen.getByRole('dialog')).toBeInTheDocument()
})

test('editable=false iken düzenleme ikonu yok', () => {
  render(<ProfitLedgerGrid legs={[legs[0]]} bookingsById={new Map([['1', fullBooking]])} editable={false} />)
  expect(screen.queryByRole('button', { name: 'Maliyet düzenle' })).toBeNull()
})

test('mobil kart yapısı bacak başına render eder', () => {
  const { container } = render(<ProfitLedgerGrid legs={legs} bookingsById={new Map()} editable={false} />)
  expect(container.querySelectorAll('.ledger-card')).toHaveLength(2)
})

const attentionLeg = { bookingId: '9', bookingRef: 'A9', customerName: 'Zoe', leg: 'outbound', date: '2026-08-20', from: 'AYT', to: 'Nowhere', revenueEur: 90, revenueTry: 4500, oneWayKm: null, vehicleCostTry: 0, supplierCostTry: 0, airportMeetCostTry: 0, advertisingPerLegTry: 100, advertisingPerLegEur: 2, netProfitTry: 4400, netProfitEur: 88, eurTryRate: 50 }

test('eksik KM li kendi-araç ayağı dikkat işareti + düzenleme ikonu alır', () => {
  const booking = { id: '9', booking_ref: 'A9', service_cost_mode: 'own_vehicle' } as any
  const { container } = render(<ProfitLedgerGrid
    legs={[attentionLeg]} bookingsById={new Map([['9', booking]])} editable={true}
    today="2026-09-01" onBookingSaved={vi.fn()}
  />)
  expect(container.querySelector('.is-attention')).toBeTruthy()
  expect(screen.getAllByRole('button', { name: 'Maliyet düzenle' }).length).toBeGreaterThan(0)
})

const dailyMissingLeg = { bookingId: 'd', bookingRef: 'D1', customerName: 'Deniz', leg: 'day-1', date: '2026-08-20', from: 'Günlük', to: 'Günlük', revenueEur: 100, revenueTry: 5000, oneWayKm: null, vehicleCostTry: 0, supplierCostTry: 0, airportMeetCostTry: 0, advertisingPerLegTry: 0, advertisingPerLegEur: 0, netProfitTry: 5000, netProfitEur: 100, eurTryRate: 50, isDailyChauffeur: true, distanceSource: 'daily-missing', dayId: 'day-1' }

test('günlük hizmet eksik KM ayağı Maliyeti yok butonu gösterir ve çağırır', () => {
  const booking = { id: 'd', booking_ref: 'D1', trip_type: 'daily_chauffeur' } as any
  const onSaveNoCost = vi.fn().mockResolvedValue(undefined)
  render(<ProfitLedgerGrid
    legs={[dailyMissingLeg]} bookingsById={new Map([['d', booking]])} editable={true}
    today="2026-09-01" onSaveNoCost={onSaveNoCost}
  />)
  fireEvent.click(screen.getAllByRole('button', { name: /Maliyeti yok/i })[0])
  expect(onSaveNoCost).toHaveBeenCalledWith(dailyMissingLeg)
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
    attentionSince="2026-08-25" today="2026-09-01" onBookingSaved={vi.fn()}
  />)
  // Uyarı işareti + "Eksik bilgi" bayrağı susar (düzenleyici açık kalabilir).
  expect(container.querySelector('.is-attention')).toBeNull()
  expect(screen.queryByText('Eksik bilgi')).toBeNull()
})

test('attentionSince sonrası eksik ayak uyarı alır', () => {
  const booking = { id: '9', booking_ref: 'A9', service_cost_mode: 'own_vehicle' } as any
  const { container } = render(<ProfitLedgerGrid
    legs={[attentionLeg]} bookingsById={new Map([['9', booking]])} editable={true}
    attentionSince="2026-08-01" today="2026-09-01" onBookingSaved={vi.fn()}
  />)
  expect(container.querySelector('.is-attention')).toBeTruthy()
})
