'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Search, ChevronRight, ChevronDown, Menu, X } from 'lucide-react'
import { useState, useEffect, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useT } from '@/components/language-provider'
import { localizeField } from '@/lib/i18n/localize'
import { useLocalizedContent, TranslatedText } from '@/components/translated-text'
import { textMatchesSearch, searchScore } from '@/lib/search'

interface Category {
  _id: string
  name: string
  nameHi?: string
  nameMr?: string
  slug: string
  isService?: boolean
  isProduct?: boolean
}

interface Puja {
  _id: string
  id?: string
  name: string
  nameHi?: string
  nameMr?: string
  category: string
  categorySlug?: string
  image: string
  shortDescription?: string
  shortDescriptionHi?: string
  shortDescriptionMr?: string
  description: string
  fullDescription?: string
  fullDescriptionHi?: string
  fullDescriptionMr?: string
  price?: number
  discount?: number
  features?: string[]
}

function pujaBelongsToCategory(puja: Puja, cat: Category) {
  const slugFromName = puja.category?.toLowerCase().replace(/\s+/g, '-')
  return (
    puja.categorySlug === cat.slug ||
    puja.category === cat.name ||
    slugFromName === cat.slug
  )
}

function SidebarPujaLink({ puja, onNavigate }: { puja: Puja; onNavigate?: () => void }) {
  const name = useLocalizedContent(puja as any, 'name')
  return (
    <Link
      href={`/puja/${puja.id}`}
      onClick={onNavigate}
      className="block pl-10 pr-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 border-b border-border/40 transition-colors"
    >
      {name}
    </Link>
  )
}

function ExpandableCategory({
  cat,
  selected,
  expanded,
  pujas,
  onSelect,
  onNavigate,
}: {
  cat: Category
  selected: boolean
  expanded: boolean
  pujas: Puja[]
  onSelect: () => void
  onNavigate?: () => void
}) {
  const name = useLocalizedContent(cat as any, 'name')

  return (
    <div className="border-b border-border/70">
      <button
        type="button"
        onClick={onSelect}
        className={`w-full flex items-center gap-2 px-4 py-3.5 text-left text-sm font-semibold transition-colors ${
          selected || expanded
            ? 'bg-primary text-white'
            : 'bg-white dark:bg-card text-foreground hover:bg-primary/5'
        }`}
      >
        {expanded ? (
          <ChevronDown className="w-4 h-4 flex-shrink-0" />
        ) : (
          <ChevronRight className={`w-4 h-4 flex-shrink-0 ${selected ? 'text-white' : 'text-muted-foreground'}`} />
        )}
        <span className="truncate flex-1">{name}</span>
        <span className={`text-[10px] font-bold ${selected || expanded ? 'text-white/80' : 'text-muted-foreground'}`}>
          {pujas.length}
        </span>
      </button>

      {expanded && (
        <div className="bg-muted/20 border-t border-border/40">
          {pujas.length > 0 ? (
            pujas.map((puja) => (
              <SidebarPujaLink key={puja.id} puja={puja} onNavigate={onNavigate} />
            ))
          ) : (
            <p className="pl-10 pr-4 py-3 text-xs text-muted-foreground">
              <TranslatedText text="No pujas in this category yet." />
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function ServiceGridCard({ service }: { service: Puja }) {
  const name = useLocalizedContent(service as any, 'name')

  return (
    <Link
      href={`/puja/${service.id}`}
      className="group bg-white dark:bg-card border border-border rounded-sm overflow-hidden shadow-sm hover:shadow-md hover:border-primary/40 transition-all"
    >
      <div className="relative aspect-square bg-muted/30 overflow-hidden">
        {service.image && service.image !== '/placeholder.jpg' ? (
          <img
            src={service.image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">🙏</div>
        )}
        {service.discount ? (
          <div className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">
            -{service.discount}%
          </div>
        ) : null}
      </div>
      <div className="px-3 py-3 text-center border-t border-border/60">
        <h3 className="text-sm font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 min-h-[2.5rem]">
          {name}
        </h3>
      </div>
    </Link>
  )
}

function ServicesContent() {
  const { t, locale } = useT()
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  const initialSearch = searchParams.get('search') || ''

  const [pujas, setPujas] = useState<Puja[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [expandedSlug, setExpandedSlug] = useState<string | null>(
    initialCategory !== 'all' ? initialCategory : null
  )
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) {
      setSelectedCategory(cat)
      setExpandedSlug(cat)
    } else {
      setSelectedCategory('all')
    }
    const q = searchParams.get('search')
    if (q !== null) setSearchQuery(q)
  }, [searchParams])

  const fetchData = async () => {
    try {
      const [pujasRes, categoriesRes] = await Promise.all([
        fetch('/api/pujas'),
        fetch('/api/categories'),
      ])

      if (pujasRes.ok && categoriesRes.ok) {
        const pujasData = await pujasRes.json()
        const categoriesData = await categoriesRes.json()

        setPujas(
          pujasData.map((p: any) => ({
            ...p,
            id: p.id || p._id,
            categorySlug: p.categorySlug || p.category?.toLowerCase().replace(/\s+/g, '-'),
          }))
        )

        setCategories(
          categoriesData.filter((cat: any) => cat.isService === true && cat.isProduct !== true)
        )
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const pujasByCategory = useMemo(() => {
    const map: Record<string, Puja[]> = {}
    categories.forEach((cat) => {
      map[cat.slug] = pujas.filter((p) => pujaBelongsToCategory(p, cat))
    })
    return map
  }, [categories, pujas])

  const selectCategory = (slug: string) => {
    setSelectedCategory(slug)
    setExpandedSlug(slug === 'all' ? null : slug)
    setMobileSidebarOpen(false)
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all') params.delete('category')
    else params.set('category', slug)
    const qs = params.toString()
    router.push(qs ? `/services?${qs}` : '/services', { scroll: false })
  }

  const toggleExpand = (slug: string) => {
    // Already open → just collapse (do not touch URL, or useEffect will re-open it)
    if (expandedSlug === slug) {
      setExpandedSlug(null)
      return
    }

    // Open this category and show its pujas in the grid
    setSelectedCategory(slug)
    setExpandedSlug(slug)
    setMobileSidebarOpen(false)
    const params = new URLSearchParams(searchParams.toString())
    params.set('category', slug)
    router.push(`/services?${params.toString()}`, { scroll: false })
  }

  const selectedCategoryName = useMemo(() => {
    if (selectedCategory === 'all') return t.allRituals
    const cat = categories.find((c) => c.slug === selectedCategory)
    if (!cat) return t.allRituals
    return localizeField(cat as any, 'name', locale) || cat.name
  }, [selectedCategory, categories, locale, t.allRituals])

  const filteredPujas = useMemo(() => {
    const urlCity = searchParams.get('city')?.toLowerCase() || ''
    const urlLang = searchParams.get('lang')?.toLowerCase() || ''
    const q = searchQuery.trim()

    const matched = pujas.filter((puja) => {
      let matchesCat = selectedCategory === 'all'
      if (!matchesCat) {
        const cat = categories.find((c) => c.slug === selectedCategory)
        matchesCat = cat
          ? pujaBelongsToCategory(puja, cat)
          : puja.categorySlug === selectedCategory ||
            puja.category?.toLowerCase().replace(/\s+/g, '-') === selectedCategory
      }

      const matchesSearch = textMatchesSearch(
        q,
        puja.name,
        puja.nameHi,
        puja.nameMr,
        puja.shortDescription,
        puja.shortDescriptionHi,
        puja.shortDescriptionMr,
        puja.description,
        puja.fullDescription,
        puja.fullDescriptionHi,
        puja.fullDescriptionMr,
        puja.category
      )

      const searchBlob = [
        puja.name,
        puja.nameHi || '',
        puja.nameMr || '',
        puja.category,
        puja.shortDescription || '',
        puja.description || '',
        puja.fullDescription || '',
        (puja.features || []).join(' '),
      ]
        .join(' ')
        .toLowerCase()

      const matchesCity = !urlCity || searchBlob.includes(urlCity)
      const matchesLang = !urlLang || searchBlob.includes(urlLang)

      return matchesCat && matchesSearch && matchesCity && matchesLang
    })

    if (!q) return matched

    // Rank better / closer matches first (Google-like)
    return [...matched].sort((a, b) => {
      const scoreA = searchScore(
        q,
        a.name,
        a.nameHi,
        a.nameMr,
        a.shortDescription,
        a.category
      )
      const scoreB = searchScore(
        q,
        b.name,
        b.nameHi,
        b.nameMr,
        b.shortDescription,
        b.category
      )
      return scoreB - scoreA
    })
  }, [pujas, selectedCategory, searchQuery, searchParams, categories])

  const closeMobile = () => setMobileSidebarOpen(false)

  const sidebar = (
    <aside className="bg-white dark:bg-card border border-border overflow-hidden shadow-sm">
      <div className="px-4 py-4 border-b border-border bg-muted/30">
        <h2 className="text-lg font-black text-foreground tracking-tight">
          <TranslatedText text="Puja Services" />
        </h2>
      </div>
      <nav className="max-h-[75vh] overflow-y-auto">
        <button
          type="button"
          onClick={() => selectCategory('all')}
          className={`w-full flex items-center gap-2 px-4 py-3.5 text-left text-sm font-semibold border-b border-border/70 transition-colors ${
            selectedCategory === 'all'
              ? 'bg-primary text-white'
              : 'bg-white dark:bg-card text-foreground hover:bg-primary/5'
          }`}
        >
          <ChevronRight className={`w-4 h-4 flex-shrink-0 ${selectedCategory === 'all' ? 'text-white' : 'text-muted-foreground'}`} />
          <span className="truncate">{t.allRituals}</span>
        </button>

        {categories.map((cat) => (
          <ExpandableCategory
            key={cat._id}
            cat={cat}
            selected={selectedCategory === cat.slug}
            expanded={expandedSlug === cat.slug}
            pujas={pujasByCategory[cat.slug] || []}
            onSelect={() => toggleExpand(cat.slug)}
            onNavigate={closeMobile}
          />
        ))}
      </nav>
    </aside>
  )

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f5f2] dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 px-4 py-8 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="lg:hidden mb-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen((v) => !v)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-card border border-border font-bold text-sm shadow-sm"
            >
              {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <TranslatedText text="Categories" />
            </button>
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-card border border-border text-sm font-medium outline-none focus:border-primary"
              />
            </div>
          </div>

          {mobileSidebarOpen && <div className="lg:hidden mb-6">{sidebar}</div>}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="hidden lg:block lg:col-span-3 sticky top-28">{sidebar}</div>

            <div className="lg:col-span-9">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    {selectedCategoryName}
                  </p>
                  <h1 className="text-2xl md:text-3xl font-black text-foreground">
                    <TranslatedText text="Select Pooja To Perform" />
                  </h1>
                </div>
                <div className="hidden sm:block relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-card border border-border text-sm font-medium outline-none focus:border-primary"
                  />
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="aspect-[3/4] bg-white border border-border animate-pulse" />
                  ))}
                </div>
              ) : filteredPujas.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                  {filteredPujas.map((service) => (
                    <ServiceGridCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-card border border-dashed border-border p-12 md:p-16 text-center">
                  <Search className="w-10 h-10 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-black mb-2">{t.noResults}</h3>
                  <p className="text-muted-foreground mb-6 text-sm">
                    <TranslatedText text="We couldn't find any services matching your current selection." />
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      selectCategory('all')
                      setSearchQuery('')
                    }}
                    className="px-6 py-2.5 bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    <TranslatedText text="Reset Filters" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col bg-[#f7f5f2] dark:bg-slate-950">
          <Navbar />
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            <p className="mt-4 text-muted-foreground font-bold">Loading...</p>
          </div>
          <Footer />
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  )
}
