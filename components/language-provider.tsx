'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { defaultLocale, locales, type Locale } from '@/lib/i18n/types'
import { translations } from '@/lib/i18n/translations'

const STORAGE_KEY = 'bps_locale'

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (typeof translations)[Locale]
  locales: typeof locales
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function isLocale(value: string | null): value is Locale {
  return value === 'en' || value === 'hi' || value === 'mr'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (isLocale(saved)) {
        setLocaleState(saved)
      }
    } catch {
      // ignore
    } finally {
      setReady(true)
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    document.documentElement.lang = locale
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      // ignore
    }
  }, [locale, ready])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
      locales,
    }),
    [locale, setLocale]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}

/** Safe hook that falls back to English if provider is missing */
export function useT() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    return {
      locale: defaultLocale as Locale,
      setLocale: (_: Locale) => {},
      t: translations.en,
      locales,
    }
  }
  return ctx
}
