/**
 * Muhasebe grid'i için CSV üretimi. Türkçe Excel'in dosyayı çift tıklayınca
 * doğru açması için UTF-8 BOM + `;` ayırıcı + CRLF kullanılır.
 */
export interface CsvColumn<T> {
  header: string
  value: (row: T) => string | number | null | undefined
  /** true ise "Toplam" satırında bu kolonun sayısal değerleri toplanır. */
  sum?: boolean
}

const BOM = '﻿'
const SEP = ';'
const EOL = '\r\n'

function cell(value: string | number | null | undefined): string {
  if (value == null || value === '') return ''
  if (typeof value === 'number') return String(value)
  return `"${String(value).replace(/"/g, '""')}"`
}

function round2(value: number) {
  return Math.round(value * 100) / 100
}

export function ledgerToCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const header = columns.map(column => cell(column.header)).join(SEP)
  const body = rows.map(row => columns.map(column => cell(column.value(row))).join(SEP))
  const totals = columns.map((column, index) => {
    if (column.sum) {
      const total = rows.reduce((sum, row) => {
        const value = column.value(row)
        return sum + (typeof value === 'number' ? value : 0)
      }, 0)
      return String(round2(total))
    }
    return index === 0 ? cell('Toplam') : ''
  }).join(SEP)
  return BOM + [header, ...body, totals].join(EOL) + EOL
}

/** Tarayıcıda dosya indirme; test ortamında `URL.createObjectURL` mock'lanır. */
export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
