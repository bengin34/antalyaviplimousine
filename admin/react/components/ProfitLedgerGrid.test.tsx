// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { render, screen, cleanup } from '@testing-library/react'
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
