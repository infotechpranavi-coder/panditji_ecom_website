'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Search, Filter, ArrowRight, Sparkles, ChevronRight, LayoutGrid, Heart } from 'lucide-react'
import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface Category {
    _id: string
    name: string
    slug: string
    isService?: boolean
    isProduct?: boolean
}

interface Puja {
    _id: string
    id?: string
    name: string
    category: string
    categorySlug?: string
    image: string
    shortDescription?: string
    description: string
    price?: number
    discount?: number
}

export default function ServicesPage() {
    const searchParams = useSearchParams()
    const initialCategory = searchParams.get('category') || 'all'

    const [pujas, setPujas] = useState<Puja[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState(initialCategory)
    const [searchQuery, setSearchQuery] = useState('')

    const heroRef = useRef<HTMLElement>(null)
    const [showSticky, setShowSticky] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When hero is NOT intersecting (out of view), show sticky
                setShowSticky(!entry.isIntersecting)
            },
            { threshold: 0 }
        )

        if (heroRef.current) {
            observer.observe(heroRef.current)
        }

        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current)
            }
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const cat = searchParams.get('category')
        if (cat) setSelectedCategory(cat)
    }, [searchParams])

    const fetchData = async () => {
        try {
            const [pujasRes, categoriesRes] = await Promise.all([
                fetch('/api/pujas'),
                fetch('/api/categories')
            ])

            if (pujasRes.ok && categoriesRes.ok) {
                const pujasData = await pujasRes.json()
                const categoriesData = await categoriesRes.json()

                setPujas(pujasData.map((p: any) => ({ ...p, id: p.id || p._id })))
                // Filter to show only service categories
                setCategories(categoriesData.filter((cat: any) => cat.isService !== false))
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredPujas = useMemo(() => {
        return pujas.filter(puja => {
            const matchesCategory = selectedCategory === 'all' ||
                puja.categorySlug === selectedCategory ||
                puja.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
            const matchesSearch = puja.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                puja.description?.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesCategory && matchesSearch
        })
    }, [pujas, selectedCategory, searchQuery])

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
            <Navbar />

            {/* Hero Section - Matching Homepage Style */}
            <section ref={heroRef} id="hero-section" className="bg-white dark:bg-slate-900 border-b border-border py-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,100,0,0.05),transparent_50%)]" />
                <div className="mx-auto max-w-7xl relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-2xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-xs font-bold text-primary uppercase tracking-widest">Divine Services</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                                Traditional <span className="text-primary italic">Sacred Rituals</span>
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
                                Experience sacred rituals performed with authentic Vedic traditions by certified priests.
                            </p>
                        </div>

                        <div className="w-full md:w-[450px] mt-6 md:mt-0">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                                <div className="relative flex items-center bg-white dark:bg-slate-800 border-2 border-border/50 rounded-2xl overflow-hidden shadow-lg group-focus-within:border-primary transition-all">
                                    <div className="pl-5 text-slate-400 group-focus-within:text-primary transition-colors">
                                        <Search className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Find Pujas, Vrats or Homas..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-4 py-4 bg-transparent outline-none font-bold text-slate-700 dark:text-white placeholder:text-slate-400"
                                    />
                                    <div className="pr-2">
                                        <button className="px-6 py-2 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-3 px-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Popular:</span>
                                <div className="flex gap-2">
                                    {['Ganesh Puja', 'Satyanarayan', 'Homa'].map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => setSearchQuery(tag)}
                                            className="text-[10px] font-bold text-primary hover:underline"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Default Category Bar (Non-sticky, visible when at top) */}
            {!showSticky && (
                <div className="bg-white dark:bg-slate-900 border-b border-border">
                    <div className="mx-auto max-w-7xl px-4 py-4 flex gap-3 overflow-x-auto scrollbar-hide">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all text-sm ${selectedCategory === 'all'
                                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary border border-transparent'
                                }`}
                        >
                            All Rituals
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat._id}
                                onClick={() => setSelectedCategory(cat.slug)}
                                className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all text-sm ${selectedCategory === cat.slug
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary border border-transparent'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Sticky Navigation Bar - Combines Categories & Search (Visible only during scroll) */}
            {/* The offset exactly matches the Navbar height (40px + 80px + 48px = 168px) */}
            <div className={`bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-border sticky top-[168px] z-40 shadow-sm transition-all duration-500 transform ${showSticky ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
                <div className="mx-auto max-w-7xl px-4 py-3">
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        {/* Categories (Scrollable horizontally) */}
                        <div className="flex-1 overflow-x-auto scrollbar-hide w-full">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className={`px-5 py-2 rounded-xl font-bold whitespace-nowrap transition-all text-xs uppercase tracking-widest ${selectedCategory === 'all'
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary border border-transparent'
                                        }`}
                                >
                                    All
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat._id}
                                        onClick={() => setSelectedCategory(cat.slug)}
                                        className={`px-5 py-2 rounded-xl font-bold whitespace-nowrap transition-all text-xs uppercase tracking-widest ${selectedCategory === cat.slug
                                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary border border-transparent'
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Integrated Search Bar */}
                        <div className="w-full lg:w-72">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search on this page..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-primary rounded-xl transition-all outline-none text-sm font-bold"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Grid Section - Matching Homepage layout */}
            <main className="flex-1 px-4 py-16">
                <div className="mx-auto max-w-7xl">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : filteredPujas.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredPujas.map((service, index) => {
                                return (
                                    <Link
                                        key={service.id}
                                        href={`/puja/${service.id}`}
                                        className="group bg-white dark:bg-card rounded-2xl border-2 border-border/50 overflow-hidden card-elevated hover:border-accent/50 hover:shadow-2xl transition-all duration-300 relative"
                                    >
                                        {service.discount && (
                                            <div className="absolute top-4 right-4 bg-gradient-to-br from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold z-10 shadow-lg">
                                                -{service.discount}%
                                            </div>
                                        )}
                                        <div className="relative h-48 bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 flex items-center justify-center overflow-hidden">
                                            {service.image && service.image !== '/placeholder.jpg' ? (
                                                <img
                                                    src={service.image}
                                                    alt={service.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <>
                                                    <div className="text-8xl opacity-20 group-hover:scale-110 transition-transform duration-300">🙏</div>
                                                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                                                </>
                                            )}
                                        </div>
                                        <div className="p-6 bg-white dark:bg-card">
                                            <h3 className="font-black text-lg mb-2 text-gray-900 dark:text-primary group-hover:text-accent transition-colors line-clamp-1">
                                                {service.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-6 line-clamp-2 font-medium">
                                                {service.shortDescription || service.description || 'Authentic traditional rituals performed with devotion and Vedic accuracy.'}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                                <span className="text-xs font-black text-accent uppercase tracking-widest">View Details</span>
                                                <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent group-hover:text-white transition-all">
                                                    <ArrowRight className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-border p-20 text-center">
                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full items-center justify-center flex mx-auto mb-6">
                                <Search className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No Results Found</h3>
                            <p className="text-slate-500 max-w-sm mx-auto mb-8 font-medium">
                                We couldn't find any services matching your current selection.
                            </p>
                            <button
                                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                                className="px-8 py-3 bg-primary text-white rounded-xl font-black shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
