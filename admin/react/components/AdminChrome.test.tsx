// @vitest-environment jsdom
import { afterEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { AdminTabs } from './AdminChrome'

afterEach(cleanup)

describe('AdminTabs', () => {
  test('keeps the existing hash routes while navigating React views', () => {
    const navigate = vi.fn()
    render(<AdminTabs active="future" navigate={navigate} />)

    fireEvent.click(screen.getByRole('tab', { name: 'Geçmiş' }))
    fireEvent.click(screen.getByRole('tab', { name: 'Bütçe' }))
    fireEvent.click(screen.getByRole('tab', { name: 'Kâr/Zarar' }))

    expect(navigate.mock.calls).toEqual([
      ['#timeline?tab=past'],
      ['#budget'],
      ['#profit-loss'],
    ])
  })
})
