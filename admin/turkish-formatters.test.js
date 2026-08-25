import { test, expect } from 'vitest'
import { whatsappURL, languageFromPhone } from './turkish-formatters.js'

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

test('languageFromPhone detects Turkish numbers in local and international formats', () => {
  expect(languageFromPhone('0555 111 22 33')).toBe('tr')
  expect(languageFromPhone('5551112233')).toBe('tr')
  expect(languageFromPhone('+90 555 111 22 33')).toBe('tr')
  expect(languageFromPhone('0090 555 111 22 33')).toBe('tr')
})

test('languageFromPhone detects German, Russian, French and Arabic calling codes', () => {
  expect(languageFromPhone('+49 151 23456789')).toBe('de')
  expect(languageFromPhone('+7 916 123 45 67')).toBe('ru')
  expect(languageFromPhone('+380 63 123 45 67')).toBe('ru')
  expect(languageFromPhone('+33 6 12 34 56 78')).toBe('fr')
  expect(languageFromPhone('+971 50 123 4567')).toBe('ar')
  expect(languageFromPhone('+20 100 123 4567')).toBe('ar')
})

test('languageFromPhone falls back to English for unmapped or empty numbers', () => {
  expect(languageFromPhone('+1 415 555 0132')).toBe('en')
  expect(languageFromPhone('')).toBe('en')
  expect(languageFromPhone(undefined)).toBe('en')
})
