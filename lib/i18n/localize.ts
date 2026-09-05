import type { Locale } from '@/lib/i18n/types'

type LocalizedRecord = Record<string, unknown>

/**
 * Pick a localized field value.
 * Example: field "name" → name (en) | nameHi (hi) | nameMr (mr)
 * Falls back to English if the translation is empty.
 */
export function localizeField(
  item: LocalizedRecord | null | undefined,
  field: string,
  locale: Locale
): string {
  if (!item) return ''

  const base = String(item[field] ?? '')
  if (locale === 'en') return base

  const suffix = locale === 'hi' ? 'Hi' : 'Mr'
  const translated = item[`${field}${suffix}`]
  if (typeof translated === 'string' && translated.trim()) {
    return translated
  }
  return base
}

export function localizePuja(item: LocalizedRecord | null | undefined, locale: Locale) {
  if (!item) return null
  return {
    ...item,
    name: localizeField(item, 'name', locale),
    shortDescription: localizeField(item, 'shortDescription', locale),
    fullDescription: localizeField(item, 'fullDescription', locale) || localizeField(item, 'description', locale),
    description: localizeField(item, 'description', locale) || localizeField(item, 'shortDescription', locale),
    category: localizeField(item, 'category', locale) || String(item.category || ''),
    priceLabel: localizeField(item, 'priceLabel', locale) || String(item.priceLabel || ''),
  }
}

export function localizeCategory(item: LocalizedRecord | null | undefined, locale: Locale) {
  if (!item) return null
  return {
    ...item,
    name: localizeField(item, 'name', locale),
    description: localizeField(item, 'description', locale),
  }
}

export function localizeSamagri(item: LocalizedRecord | null | undefined, locale: Locale) {
  if (!item) return null
  return {
    ...item,
    name: localizeField(item, 'name', locale),
    description: localizeField(item, 'description', locale),
    category: localizeField(item, 'category', locale) || String(item.category || ''),
  }
}
