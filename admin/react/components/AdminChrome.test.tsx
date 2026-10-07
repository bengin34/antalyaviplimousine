// @vitest-environment jsdom
import { afterEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { AdminTabs } from './AdminChrome'

afterEach(cleanup)

describe('AdminTabs', () => {
  test('navigates React views via their hash routes', () => {
    const navigate = vi.fn()
    render(<AdminTabs active="budget" navigate={navigate} />)

    fireEvent.click(screen.getByRole('tab', { name: 'Transferler' }))
    fireEvent.click(screen.getByRole('tab', { name: 'Kâr/Zarar' }))
    fireEvent.click(screen.getByRole('tab', { name: '📱 Şoför' }))

    expect(navigate.mock.calls).toEqual([
      ['#timeline'],
      ['#profit-loss'],
      ['#driver-comms'],
    ])
  })

  test('opens the Yeni inbox and shows how many bookings wait for a message', () => {
    const navigate = vi.fn()
    render(<AdminTabs active="timeline" navigate={navigate} inboxCount={3} />)
    const inbox = screen.getByRole('tab', { name: /Yeni/ })
    expect(inbox.textContent).toContain('3')
    fireEvent.click(inbox)
    expect(navigate).toHaveBeenCalledWith('#inbox')
  })

  test('hides the inbox badge when nothing is waiting', () => {
    render(<AdminTabs active="timeline" navigate={vi.fn()} inboxCount={0} />)
    expect(screen.getByRole('tab', { name: '🆕 Yeni' }).textContent).toBe('🆕 Yeni')
  })

  test('no longer renders removed past/future/cancelled tabs', () => {
    render(<AdminTabs active="timeline" navigate={vi.fn()} />)
    expect(screen.queryByRole('tab', { name: 'Gelecek' })).toBeNull()
    expect(screen.queryByRole('tab', { name: 'Geçmiş' })).toBeNull()
    expect(screen.queryByRole('tab', { name: 'İptaller' })).toBeNull()
  })
})
