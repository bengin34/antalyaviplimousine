// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { EditableCell } from './EditableCell'

afterEach(cleanup)

function renderNumber(overrides: Partial<Parameters<typeof EditableCell>[0]> = {}) {
  const onSave = vi.fn().mockResolvedValue(undefined)
  const utils = render(<EditableCell
    kind="number" value="€10,00" rawValue="10" label="Ali gidiş kâr" onSave={onSave} {...overrides}
  />)
  return { ...utils, onSave }
}

describe('EditableCell', () => {
  test('disabled → düz metin, buton yok', () => {
    render(<EditableCell kind="number" value="€10,00" rawValue="10" label="x" disabled onSave={vi.fn()} />)
    expect(screen.getByText('€10,00')).toBeInTheDocument()
    expect(screen.queryByRole('button')).toBeNull()
  })

  test('tıklayınca input açılır, Enter kaydeder ve kapanır', async () => {
    const { onSave } = renderNumber()
    fireEvent.click(screen.getByRole('button', { name: 'Ali gidiş kâr' }))
    const input = screen.getByRole('textbox', { name: 'Ali gidiş kâr' })
    fireEvent.change(input, { target: { value: '12,5' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    await waitFor(() => expect(onSave).toHaveBeenCalledWith('12,5'))
    await waitFor(() => expect(screen.queryByRole('textbox')).toBeNull())
  })

  test('Escape iptal eder, kaydetmez', () => {
    const { onSave } = renderNumber()
    fireEvent.click(screen.getByRole('button'))
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '99' } })
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(onSave).not.toHaveBeenCalled()
    expect(screen.queryByRole('textbox')).toBeNull()
  })

  test('blur değişmiş değeri kaydeder, değişmemişse sadece kapatır', async () => {
    const { onSave } = renderNumber()
    fireEvent.click(screen.getByRole('button'))
    fireEvent.blur(screen.getByRole('textbox'))
    expect(onSave).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button'))
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '11' } })
    fireEvent.blur(screen.getByRole('textbox'))
    await waitFor(() => expect(onSave).toHaveBeenCalledWith('11'))
  })

  test('validate hata dönerse kaydetmez ve hatayı gösterir', () => {
    const { onSave } = renderNumber({ validate: raw => raw === 'bad' ? 'Geçersiz' : null })
    fireEvent.click(screen.getByRole('button'))
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'bad' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSave).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent('Geçersiz')
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('onSave reddederse hata gösterir ve düzenlemede kalır', async () => {
    const onSave = vi.fn().mockRejectedValue(new Error('x'))
    renderNumber({ onSave })
    fireEvent.click(screen.getByRole('button'))
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '5' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Kaydedilemedi'))
    expect(onSave).toHaveBeenCalled()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('select seçilince hemen kaydeder', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined)
    render(<EditableCell
      kind="select" value="Kendi aracımız" rawValue="own_vehicle" label="Ali gidiş model" onSave={onSave}
      options={[{ value: 'own_vehicle', label: 'Kendi aracımız' }, { value: 'no_cost', label: 'Maliyeti yok' }]}
    />)
    fireEvent.click(screen.getByRole('button', { name: 'Ali gidiş model' }))
    fireEvent.change(screen.getByRole('combobox', { name: 'Ali gidiş model' }), { target: { value: 'no_cost' } })
    await waitFor(() => expect(onSave).toHaveBeenCalledWith('no_cost'))
    await waitFor(() => expect(screen.queryByRole('combobox')).toBeNull())
  })

  test('money: para birimi seçilebilir, ₺ girdisi kur ile €ya çevrilip kaydedilir', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined)
    render(<EditableCell
      kind="money" storedCurrency="EUR" rate={50} value="€60,00 · ₺3.000,00" rawValue="60"
      label="Ali gidiş maliyet" onSave={onSave}
    />)
    fireEvent.click(screen.getByRole('button', { name: 'Ali gidiş maliyet' }))
    const input = screen.getByRole('textbox', { name: 'Ali gidiş maliyet' })
    const currency = screen.getByRole('combobox', { name: 'Ali gidiş maliyet para birimi' })
    // € → ₺ geçişinde görünen tutar da çevrilir (60 € = 3000 ₺).
    fireEvent.change(currency, { target: { value: 'TRY' } })
    expect(input).toHaveValue('3000')
    // ₺1.500 girildi → 30 € olarak kaydedilir.
    fireEvent.change(input, { target: { value: '1500' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    await waitFor(() => expect(onSave).toHaveBeenCalledWith('30'))
  })

  test('money: ₺ saklanan hücrede € girdisi ₺ye çevrilir', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined)
    render(<EditableCell
      kind="money" storedCurrency="TRY" rate={50} value="₺2.750,00" rawValue="2750"
      label="Zeynep dönüş tedarikçi maliyeti" onSave={onSave}
    />)
    fireEvent.click(screen.getByRole('button', { name: 'Zeynep dönüş tedarikçi maliyeti' }))
    const input = screen.getByRole('textbox', { name: 'Zeynep dönüş tedarikçi maliyeti' })
    fireEvent.change(screen.getByRole('combobox', { name: 'Zeynep dönüş tedarikçi maliyeti para birimi' }), { target: { value: 'EUR' } })
    fireEvent.change(input, { target: { value: '40' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    await waitFor(() => expect(onSave).toHaveBeenCalledWith('2000'))
  })

  test('money: kur yoksa para birimi seçici gösterilmez', () => {
    render(<EditableCell kind="money" storedCurrency="EUR" rate={0} value="€60,00" rawValue="60" label="Kursuz" onSave={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: 'Kursuz' }))
    expect(screen.getByRole('textbox', { name: 'Kursuz' })).toBeInTheDocument()
    expect(screen.queryByRole('combobox')).toBeNull()
  })

  test('money: para birimi değişse de tutar aynı kalırsa kaydetmez', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined)
    render(<EditableCell
      kind="money" storedCurrency="EUR" rate={50} value="€60,00" rawValue="60" label="Ali gidiş kâr" onSave={onSave}
    />)
    fireEvent.click(screen.getByRole('button', { name: 'Ali gidiş kâr' }))
    fireEvent.change(screen.getByRole('combobox', { name: 'Ali gidiş kâr para birimi' }), { target: { value: 'TRY' } })
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Ali gidiş kâr' }), { key: 'Enter' })
    expect(onSave).not.toHaveBeenCalled()
  })

  test('autoOpen düzenleme modunda başlar, kapanınca onEditEnd çağrılır', () => {
    const onEditEnd = vi.fn()
    renderNumber({ autoOpen: true, onEditEnd })
    const input = screen.getByRole('textbox')
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(onEditEnd).toHaveBeenCalledTimes(1)
  })
})
