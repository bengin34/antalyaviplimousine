// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import type { Booking } from '../types'

const mocks = vi.hoisted(() => ({ from: vi.fn(), updates: [] as Array<{ values: Record<string, unknown>; id: unknown; nullColumn: unknown }> }))

vi.mock('../lib/supabase', () => ({ supabase: { from: mocks.from } }))

import InboxPage from './InboxPage'

function booking(overrides: Partial<Booking>) {
  return {
    id: 'b-1', booking_ref: 'AVL-1', customer_name: 'Anna Schmidt', customer_phone: '+491701234567',
    pickup_location: 'airport', dropoff_location: 'belek', pickup_address: null, dropoff_address: null,
    pickup_date: '2099-01-10', pickup_time: '10:00', flight_arrival_time: '10:00', flight_number: 'TK123',
    trip_type: 'one_way', return_date: null, service_end_date: null, guests: 2, vehicle_type: 'vito',
    price_eur: 60, status: 'confirmed', payment_method: 'cash', notes: null, language: 'tr', hotel_name: 'Regnum',
    check_message_sent_at: null, confirm_message_sent_at: null, created_at: new Date().toISOString(),
    ...overrides,
  } as Booking
}

let rows: Booking[] = []

function installQueries() {
  mocks.from.mockImplementation(() => ({
    select: () => ({
      is: () => ({ in: () => ({ or: () => ({ order: () => Promise.resolve({ data: rows, error: null }) }) }) }),
      eq: (_column: string, id: unknown) => ({ single: () => Promise.resolve({ data: rows.find(row => row.id === id) ?? null, error: null }) }),
    }),
    update: (values: Record<string, unknown>) => ({
      eq: (_column: string, id: unknown) => ({
        is: (nullColumn: string) => {
          mocks.updates.push({ values, id, nullColumn })
          return Promise.resolve({ error: null })
        },
      }),
    }),
  }))
}

beforeEach(() => {
  mocks.from.mockReset()
  mocks.updates = []
  rows = [
    booking({ id: 'b-1', booking_ref: 'AVL-1', customer_name: 'Anna Schmidt' }),
    booking({ id: 'b-2', booking_ref: 'AVL-2', customer_name: 'Ivan Petrov', check_message_sent_at: '2026-10-03T08:00:00Z' }),
  ]
  installQueries()
})

afterEach(() => { cleanup(); vi.restoreAllMocks() })

describe('InboxPage', () => {
  test('splits new bookings by the next message they need', async () => {
    render(<InboxPage navigate={vi.fn()} />)
    const checkGroup = (await screen.findByText(/Kontrol mesajı bekleyenler/)).closest('section')!
    const confirmGroup = screen.getByText(/Onay mesajı bekleyenler/).closest('section')!
    expect(within(checkGroup).getByText('Anna Schmidt')).toBeInTheDocument()
    expect(within(confirmGroup).getByText('Ivan Petrov')).toBeInTheDocument()
    expect(within(checkGroup).getByRole('button', { name: /Kontrol mesajı gönder/ })).toBeInTheDocument()
    expect(within(confirmGroup).getByRole('button', { name: /Onay mesajı gönder/ })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Yeni/ })).toHaveTextContent('2')
  })

  test('sending the check message opens WhatsApp and moves the card to the confirm step', async () => {
    const popup = { closed: false, opener: {}, document: { title: '', body: { textContent: '' } }, location: { replace: vi.fn() }, close: vi.fn() }
    vi.spyOn(window, 'open').mockReturnValue(popup as unknown as Window)
    render(<InboxPage navigate={vi.fn()} />)
    const checkGroup = (await screen.findByText(/Kontrol mesajı bekleyenler/)).closest('section')!
    fireEvent.click(within(checkGroup).getByRole('button', { name: /Kontrol mesajı gönder/ }))

    await waitFor(() => expect(popup.location.replace).toHaveBeenCalledTimes(1))
    expect(String(popup.location.replace.mock.calls[0][0])).toContain('wa.me')
    expect(mocks.updates).toEqual([{ values: { check_message_sent_at: expect.any(String) }, id: 'b-1', nullColumn: 'check_message_sent_at' }])
    await waitFor(() => expect(screen.queryByText(/Kontrol mesajı bekleyenler/)).toBeNull())
    expect(within(screen.getByText(/Onay mesajı bekleyenler/).closest('section')!).getByText('Anna Schmidt')).toBeInTheDocument()
  })

  test('sending the confirmation removes the booking from the inbox', async () => {
    const popup = { closed: false, opener: {}, document: { title: '', body: { textContent: '' } }, location: { replace: vi.fn() }, close: vi.fn() }
    vi.spyOn(window, 'open').mockReturnValue(popup as unknown as Window)
    render(<InboxPage navigate={vi.fn()} />)
    const confirmGroup = (await screen.findByText(/Onay mesajı bekleyenler/)).closest('section')!
    fireEvent.click(within(confirmGroup).getByRole('button', { name: /Onay mesajı gönder/ }))

    await waitFor(() => expect(screen.queryByText('Ivan Petrov')).toBeNull())
    expect(mocks.updates[0]).toMatchObject({ id: 'b-2', nullColumn: 'confirm_message_sent_at' })
  })

  test('a booking handled outside WhatsApp can be cleared after confirming', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<InboxPage navigate={vi.fn()} />)
    const card = (await screen.findByText('Anna Schmidt')).closest('.inbox-card') as HTMLElement
    fireEvent.click(within(card).getByRole('button', { name: /Mesajsız işlendi say/ }))
    await waitFor(() => expect(screen.queryByText('Anna Schmidt')).toBeNull())
    expect(mocks.updates[0]).toMatchObject({ id: 'b-1', values: { confirm_message_sent_at: expect.any(String) } })
  })

  test('shows an empty state when nothing is waiting', async () => {
    rows = []
    render(<InboxPage navigate={vi.fn()} />)
    expect(await screen.findByText('Bekleyen yeni rezervasyon yok')).toBeInTheDocument()
  })
})
