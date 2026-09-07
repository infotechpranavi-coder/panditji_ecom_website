/**
 * Simple multilingual + near-match search (Google-like, not complex).
 * Works with English / Hindi / Marathi text and small typos.
 */

export function normalizeSearch(text: string): string {
  return String(text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Small Levenshtein distance for typo tolerance */
function editDistance(a: string, b: string): number {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length
  // Cap length for speed
  if (a.length > 32 || b.length > 32) {
    return a.includes(b) || b.includes(a) ? 0 : 99
  }

  const row = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let prev = i - 1
    row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const cur = row[j]
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        prev + cost
      )
      prev = cur
    }
  }
  return row[b.length]
}

function maxTypos(word: string): number {
  if (word.length >= 6) return 2
  if (word.length >= 3) return 1
  return 0
}

/** Word-level near match (substring or small typo) */
function wordNearMatch(hay: string, needle: string): boolean {
  if (!needle) return true
  if (hay.includes(needle) || needle.includes(hay)) return true
  if (Math.abs(hay.length - needle.length) > maxTypos(needle) + 1) return false
  return editDistance(hay, needle) <= maxTypos(needle)
}

/**
 * Returns true if query roughly matches text
 * (exact / contains / near-match tokens).
 */
export function fuzzyIncludes(haystack: string, query: string): boolean {
  const h = normalizeSearch(haystack)
  const q = normalizeSearch(query)
  if (!q) return true
  if (!h) return false
  if (h.includes(q)) return true

  const qTokens = q.split(' ').filter(Boolean)
  const hTokens = h.split(' ').filter(Boolean)
  if (!qTokens.length) return true

  // Every query word must near-match some haystack word
  return qTokens.every((qt) => hTokens.some((ht) => wordNearMatch(ht, qt)))
}

/** Match query against any of the given language fields */
export function textMatchesSearch(
  query: string,
  ...fields: Array<string | null | undefined>
): boolean {
  const q = String(query || '').trim()
  if (!q) return true
  return fields.some((field) => field && fuzzyIncludes(field, q))
}

/**
 * Score for ranking (higher = better).
 * Exact / starts-with beats contains, contains beats fuzzy.
 */
export function searchScore(
  query: string,
  ...fields: Array<string | null | undefined>
): number {
  const q = normalizeSearch(query)
  if (!q) return 0

  let best = 0
  for (const field of fields) {
    if (!field) continue
    const h = normalizeSearch(field)
    if (!h) continue

    if (h === q) best = Math.max(best, 100)
    else if (h.startsWith(q)) best = Math.max(best, 90)
    else if (h.includes(q)) best = Math.max(best, 75)
    else if (fuzzyIncludes(field, query)) {
      // Prefer shorter distance on first token
      const qt = q.split(' ')[0]
      const ht = h.split(' ')[0]
      const dist = editDistance(qt, ht)
      best = Math.max(best, Math.max(10, 60 - dist * 10))
    }
  }
  return best
}
