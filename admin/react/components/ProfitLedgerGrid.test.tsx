// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
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
