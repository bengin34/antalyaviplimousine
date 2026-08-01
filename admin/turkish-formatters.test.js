import { test, expect } from 'vitest'
import { whatsappURL } from './turkish-formatters.js'

test('no text arg returns bare wa.me link (unchanged)', () => {
  expect(whatsappURL('+90 555 111 22 33')).toBe('https://wa.me/905551112233')
})

test('text arg appends url-encoded ?text=', () => {
  const url = whatsappURL('05551112233', 'Merhaba & hoş geldiniz')
  expect(url).toBe('https://wa.me/905551112233?text=' + encodeURIComponent('Merhaba & hoş geldiniz'))
})

test('empty/undefined text keeps bare link', () => {
  expect(whatsappURL('05551112233', '')).toBe('https://wa.me/905551112233')
})
