// @vitest-environment jsdom
import { describe, expect, test, vi } from 'vitest'
import { downloadCsv, ledgerToCsv, type CsvColumn } from './ledger-csv'

type Row = { name: string; eur: number | null; hours: number }
const rows: Row[] = [
  { name: 'Ayşe "Ay" Yılmaz', eur: 12.5, hours: 2 },
  { name: 'Veli', eur: null, hours: 1 },
]
const columns: CsvColumn<Row>[] = [
  { header: 'Yolcu', value: r => r.name },
  { header: 'Kâr €', value: r => r.eur, sum: true },
  { header: 'Otopark saat', value: r => r.hours },
]

describe('ledgerToCsv', () => {
  const csv = ledgerToCsv(rows, columns)
  const lines = csv.split('\r\n')

  test('starts with UTF-8 BOM and a quoted header row using ; separator', () => {
    expect(csv.charCodeAt(0)).toBe(0xfeff)
    expect(lines[0]).toBe('﻿"Yolcu";"Kâr €";"Otopark saat"')
  })

  test('quotes text (escaping inner quotes), writes numbers raw and null as empty', () => {
    expect(lines[1]).toBe('"Ayşe ""Ay"" Yılmaz";12.5;2')
    expect(lines[2]).toBe('"Veli";;1')
  })

  test('appends a Toplam row summing only sum:true columns', () => {
    expect(lines[3]).toBe('"Toplam";12.5;')
  })

  test('ends with CRLF', () => {
    expect(csv.endsWith('\r\n')).toBe(true)
  })

  test('preserves column order', () => {
    const reordered = ledgerToCsv(rows, [columns[2], columns[0]])
    expect(reordered.split('\r\n')[0]).toBe('﻿"Otopark saat";"Yolcu"')
  })
})

describe('downloadCsv', () => {
  test('creates a blob link with the given filename and clicks it', () => {
    const createObjectURL = vi.fn(() => 'blob:x')
    const revokeObjectURL = vi.fn()
    Object.assign(URL, { createObjectURL, revokeObjectURL })
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})

    downloadCsv('kar-zarar-tumu.csv', 'a;b')

    expect(createObjectURL).toHaveBeenCalledTimes(1)
    const anchor = click.mock.instances[0] as unknown as HTMLAnchorElement
    expect(anchor.download).toBe('kar-zarar-tumu.csv')
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:x')
    click.mockRestore()
  })
})
