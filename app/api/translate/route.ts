import { NextRequest, NextResponse } from 'next/server'
import { lookupPhrase } from '@/lib/i18n/phrase-book'
import type { Locale } from '@/lib/i18n/types'

async function translateOne(text: string, locale: Locale): Promise<string> {
  if (!text?.trim() || locale === 'en') return text

  const fromBook = lookupPhrase(text, locale)
  if (fromBook) return fromBook

  const langpair = locale === 'hi' ? 'en|hi' : 'en|mr'
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 450))}&langpair=${langpair}`

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } })
    if (!res.ok) return text
    const data = await res.json()
    const translated = data?.responseData?.translatedText
    if (typeof translated === 'string' && translated.trim() && !translated.includes('MYMEMORY WARNING')) {
      return translated
    }
  } catch {
    // fall through
  }
  return text
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const locale = (body.locale || 'en') as Locale
    const texts: string[] = Array.isArray(body.texts) ? body.texts : body.text ? [body.text] : []

    if (!['en', 'hi', 'mr'].includes(locale)) {
      return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })
    }

    if (locale === 'en') {
      return NextResponse.json({ translations: texts })
    }

    const unique = [...new Set(texts.map((t) => String(t || '').trim()).filter(Boolean))]
    const map: Record<string, string> = {}

    // Translate sequentially with small delay to avoid rate limits on batches
    for (const text of unique) {
      map[text] = await translateOne(text, locale)
    }

    const translations = texts.map((t) => map[String(t || '').trim()] || t)
    return NextResponse.json({ translations, map })
  } catch (error: any) {
    console.error('Translate API error:', error)
    return NextResponse.json({ error: 'Translation failed', details: error.message }, { status: 500 })
  }
}
