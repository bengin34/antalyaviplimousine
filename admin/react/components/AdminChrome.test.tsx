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

  test('no longer renders removed past/future/cancelled tabs', () => {
    render(<AdminTabs active="timeline" navigate={vi.fn()} />)
    expect(screen.queryByRole('tab', { name: 'Gelecek' })).toBeNull()
    expect(screen.queryByRole('tab', { name: 'Geçmiş' })).toBeNull()
    expect(screen.queryByRole('tab', { name: 'İptaller' })).toBeNull()
  })
})
