'use client'

import React, { useEffect, useState } from 'react'
import { useT } from '@/components/language-provider'
import type { Locale } from '@/lib/i18n/types'
import { getCachedTranslation, loadLocalCache, lookupPhrase, setCachedTranslation } from '@/lib/i18n/phrase-book'
import { localizeField } from '@/lib/i18n/localize'

const pending = new Map<string, Promise<string>>()

async function fetchTranslation(text: string, locale: Locale): Promise<string> {
  if (!text?.trim() || locale === 'en') return text

  const cached = getCachedTranslation(text, locale)
  if (cached) return cached

  const key = `${locale}::${text}`
  const existing = pending.get(key)
  if (existing) return existing

  const promise = (async () => {
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, locale }),
      })
      if (!res.ok) return text
      const data = await res.json()
      const translated = data.translations?.[0] || data.map?.[text] || text
      if (translated && translated !== text) {
        setCachedTranslation(text, locale, translated)
      }
      return translated
    } catch {
      return text
    } finally {
      pending.delete(key)
    }
  })()

  pending.set(key, promise)
  return promise
}

/** Auto-translate any English string to the active locale */
export function useAutoText(english: string | null | undefined): string {
  const { locale } = useT()
  const source = String(english || '')
  const [text, setText] = useState(() => getCachedTranslation(source, locale) || source)

  useEffect(() => {
    loadLocalCache(locale)
    if (!source) {
      setText('')
      return
    }
    if (locale === 'en') {
      setText(source)
      return
    }

    const instant = lookupPhrase(source, locale) || getCachedTranslation(source, locale)
    if (instant) {
      setText(instant)
      return
    }

    setText(source) // show English briefly
    let cancelled = false
    fetchTranslation(source, locale).then((result) => {
      if (!cancelled) setText(result)
    })
    return () => {
      cancelled = true
    }
  }, [source, locale])

  return text
}

/**
 * Prefer admin-provided translation; otherwise auto-translate English field.
 */
export function useLocalizedContent(
  item: Record<string, unknown> | null | undefined,
  field: string
): string {
  const { locale } = useT()
  const english = String(item?.[field] ?? '')
  const suffix = locale === 'hi' ? 'Hi' : locale === 'mr' ? 'Mr' : ''
  const manual = suffix ? String(item?.[`${field}${suffix}`] ?? '').trim() : ''
  const auto = useAutoText(manual ? '' : english)

  if (locale === 'en') return english
  if (manual) return manual
  return auto || localizeField(item, field, locale) || english
}

export function TranslatedText({
  text,
  className,
  as: Component = 'span',
}: {
  text: string
  className?: string
  as?: React.ElementType
}) {
  const translated = useAutoText(text)
  return <Component className={className}>{translated}</Component>
}
