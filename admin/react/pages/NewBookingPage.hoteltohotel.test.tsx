// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'

const mocks = vi.hoisted(() => ({ from: vi.fn() }))

vi.mock('../lib/supabase', () => ({ supabase: { from: mocks.from } }))

import NewBookingPage from './NewBookingPage'

afterEach(cleanup)

const open = () => render(<NewBookingPage navigate={() => {}} />)

/** The form has no ids, so each control is found by the label above it. */
const select = (container: HTMLElement, label: string) => {
  const field = [...container.querySelectorAll('.form-field')]
    .find(node => node.querySelector('.form-label')?.textContent === label)
  if (!field) throw new Error(`no field labelled ${label}`)
  return field.querySelector('select')!
}
const field = (container: HTMLElement) =>
  [...container.querySelectorAll('.form-label')].find(label => label.textContent === 'Varış oteli')

describe('manual booking destination hotel field', () => {
  test('appears once both ends of the journey are hotels', () => {
    const { container } = open()
    const pickup = select(container, 'Alış *')
    const dropoff = select(container, 'Varış *')

    // Airport arrival: the single hotel field already names the destination.
    expect(field(container)).toBeUndefined()

    fireEvent.change(pickup, { target: { value: 'hotel' } })
    fireEvent.change(dropoff, { target: { value: 'bodrum' } })
    expect(field(container)).toBeDefined()

    // A region slug at the pick-up is a hotel too — the admin list offers both.
    fireEvent.change(pickup, { target: { value: 'belek' } })
    expect(field(container)).toBeDefined()

    // Nothing to name when the journey ends at the airport.
    fireEvent.change(dropoff, { target: { value: 'airport' } })
    expect(field(container)).toBeUndefined()
  })

  test('stays hidden for the Land of Legends excursion, which ends at the park', () => {
    const { container } = open()
    const pickup = select(container, 'Alış *')
    const dropoff = select(container, 'Varış *')
    fireEvent.change(pickup, { target: { value: 'hotel' } })
    fireEvent.change(dropoff, { target: { value: 'bodrum' } })
    expect(field(container)).toBeDefined()

    fireEvent.change(select(container, 'Sefer türü'), { target: { value: 'land_of_legends' } })
    expect(field(container)).toBeUndefined()
  })
})
