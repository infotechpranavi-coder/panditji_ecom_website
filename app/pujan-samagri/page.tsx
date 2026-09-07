'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ChevronRight, ChevronDown, ShoppingBag, Loader2, Menu, X } from 'lucide-react'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useT } from '@/components/language-provider'
import { useLocalizedContent, TranslatedText } from '@/components/translated-text'

interface Samagri {
  _id: string
  name: string
  nameHi?: string
  nameMr?: string
  price: number
  discount: number
  category: string
  categorySlug?: string
  image: string
  description: string
  descriptionHi?: string
  descriptionMr?: string
  stockStatus: string
}

interface Category {
  _id: string
  name: string
  nameHi?: string
  nameMr?: string
  slug: string
  isProduct: boolean
}

function SidebarItem({
  label,
  selected,
  onSelect,
}: {
  label: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center gap-2 px-4 py-3.5 text-left text-sm font-semibold border-b border-border/70 transition-colors ${
        selected
          ? 'bg-primary text-white'
          : 'bg-white dark:bg-card text-foreground hover:bg-primary/5'
      }`}
    >
      {selected ? (
        <ChevronDown className="w-4 h-4 flex-shrink-0" />
      ) : (
        <ChevronRight className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
    </button>
  )
}

function LocalizedCatItem({
  cat,
  selected,
  onSelect,
}: {
  cat: Category
  selected: boolean
  onSelect: () => void
}) {
  const name = useLocalizedContent(cat as any, 'name')
  return <SidebarItem label={name} selected={selected} onSelect={onSelect} />
}

function SamagriCard({ item }: { item: Samagri }) {
  const name = useLocalizedContent(item as any, 'name')

  return (
    <Link
      href={`/pujan-samagri/${item._id}`}
      className="group bg-white dark:bg-card border border-border rounded-sm overflow-hidden shadow-sm hover:shadow-md hover:border-primary/40 transition-all"
    >
      <div className="relative aspect-square bg-muted/30 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
          </div>
        )}
        {item.stockStatus === 'out_of_stock' && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-red-600 px-3 py-1 text-xs font-black uppercase">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="px-3 py-3 text-center border-t border-border/60">
        <h3 className="text-sm font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 min-h-[2.5rem]">
          {name}
        </h3>
        <p className="text-xs font-semibold text-foreground mt-1">₹{item.price}</p>
      </div>
    </Link>
  )
}

function SamagriContent() {
  const { t } = useT()
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlCategory = searchParams.get('category')

  const [items, setItems] = useState<Samagri[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSlug, setSelectedSlug] = useState('all')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (urlCategory && categories.length > 0) {
      const found = categories.find((c) => c.slug === urlCategory || c.name === urlCategory)
      if (found) setSelectedSlug(found.slug)
    } else if (!urlCategory) {
      setSelectedSlug('all')
    }
  }, [urlCategory, categories])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [samagriRes, categoriesRes] = await Promise.all([
        fetch('/api/samagri'),
        fetch('/api/categories'),
      ])

      if (samagriRes.ok) {
        setItems(await samagriRes.json())
      }

      if (categoriesRes.ok) {
        const catData = await categoriesRes.json()
        setCategories(catData.filter((cat: any) => cat.isProduct === true))
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const selectCategory = (slug: string) => {
    setSelectedSlug(slug)
    setMobileSidebarOpen(false)
    if (slug === 'all') router.push('/pujan-samagri', { scroll: false })
    else router.push(`/pujan-samagri?category=${slug}`, { scroll: false })
  }

  const filteredItems =
    selectedSlug === 'all'
      ? items
      : items.filter(
          (item) =>
            item.categorySlug === selectedSlug ||
            item.category?.toLowerCase().replace(/\s+/g, '-') === selectedSlug ||
            categories.find((c) => c.slug === selectedSlug)?.name === item.category
        )

  const sidebar = (
    <aside className="bg-white dark:bg-card border border-border overflow-hidden shadow-sm">
      <div className="px-4 py-4 border-b border-border bg-muted/30">
        <h2 className="text-lg font-black text-foreground tracking-tight">{t.pujanSamagri}</h2>
      </div>
      <nav className="max-h-[70vh] overflow-y-auto">
        <SidebarItem
          label={t.allCategories}
          selected={selectedSlug === 'all'}
          onSelect={() => selectCategory('all')}
        />
        {categories.map((cat) => (
          <LocalizedCatItem
            key={cat._id}
            cat={cat}
            selected={selectedSlug === cat.slug}
            onSelect={() => selectCategory(cat.slug)}
          />
        ))}
      </nav>
    </aside>
  )

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f5f2] dark:bg-slate-950">
      <Navbar />

      <div className="border-b border-border/50 px-4 bg-white/70 dark:bg-card/50">
        <div className="mx-auto max-w-7xl py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground font-semibold">
              {t.home}
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-black">{t.pujanSamagri}</span>
          </div>
        </div>
      </div>

      <main className="flex-1 px-4 py-8 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="lg:hidden mb-4">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen((v) => !v)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-card border border-border font-bold text-sm shadow-sm"
            >
              {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <TranslatedText text="Categories" />
            </button>
          </div>

          {mobileSidebarOpen && <div className="lg:hidden mb-6">{sidebar}</div>}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="hidden lg:block lg:col-span-3 sticky top-28">{sidebar}</div>

            <div className="lg:col-span-9">
              <h1 className="text-2xl md:text-3xl font-black text-foreground mb-6">
                <TranslatedText text="Select Samagri" />
              </h1>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                  <p className="font-bold text-muted-foreground">{t.loading}</p>
                </div>
              ) : filteredItems.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                  {filteredItems.map((item) => (
                    <SamagriCard key={item._id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white border border-dashed border-border">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                  <h3 className="text-xl font-bold mb-2">{t.noResults}</h3>
                  <p className="text-muted-foreground text-sm">
                    <TranslatedText text="We couldn't find any samagri in this category." />
                  </p>
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

export default function PujanSamagriPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      }
    >
      <SamagriContent />
    </Suspense>
  )
}
