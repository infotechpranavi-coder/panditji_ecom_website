'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ChevronRight, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Samagri {
    _id: string
    name: string
    price: number
    discount: number
    category: string
    image: string
    description: string
    stockStatus: string
}

interface Category {
    _id: string
    name: string
    slug: string
    isProduct: boolean
}

export default function PujanSamagriPage() {
    const [items, setItems] = useState<Samagri[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('All')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            const [samagriRes, categoriesRes] = await Promise.all([
                fetch('/api/samagri'),
                fetch('/api/categories')
            ])

            if (samagriRes.ok) {
                const data = await samagriRes.json()
                setItems(data)
            }

            if (categoriesRes.ok) {
                const catData = await categoriesRes.json()
                // Filter to show only product categories
                setCategories(catData.filter((cat: any) => cat.isProduct === true))
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const categoryList = ['All', ...categories.map(c => c.name)]

    const filteredItems = selectedCategory === 'All'
        ? items
        : items.filter(item => item.category === selectedCategory)

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/5 to-background">
            <Navbar />

            {/* Breadcrumb */}
            <div className="border-b border-border/50 px-4 bg-white/50 dark:bg-card/50 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl py-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors font-semibold">Home</Link>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground font-black">Pujan Samagri</span>
                    </div>
                </div>
            </div>

            <main className="flex-1 px-4 py-12">
                <div className="mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-1 w-12 bg-gradient-to-r from-accent to-primary rounded-full" />
                            <span className="text-xs font-bold text-accent uppercase tracking-wider">Sacred Items</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                            Pujan Samagri
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Authentic and pure samagri for all your sacred rituals and spiritual ceremonies.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-12 overflow-x-auto scrollbar-hide">
                        <div className="flex gap-3 pb-2">
                            {categoryList.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-8 py-3.5 rounded-2xl font-bold whitespace-nowrap transition-all duration-300 ${selectedCategory === cat
                                        ? 'bg-gradient-to-r from-accent to-primary text-white shadow-xl shadow-accent/20 scale-105'
                                        : 'bg-white dark:bg-card text-muted-foreground hover:bg-accent/10 hover:text-accent border-2 border-border hover:border-accent/50'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid Layout - Masonry Style */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
                            <p className="text-lg font-bold text-muted-foreground">Fetching sacred items...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredItems.map((item, index) => {
                                const isLarge = index % 5 === 0
                                return (
                                    <div
                                        key={item._id}
                                        className={`group bg-white dark:bg-card rounded-2xl border-2 border-border/50 overflow-hidden card-elevated hover:border-accent/50 hover:shadow-2xl transition-all duration-500 relative ${isLarge ? 'lg:col-span-2 lg:row-span-1' : ''
                                            }`}
                                    >
                                        {item.discount > 0 && (
                                            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold z-10 shadow-lg">
                                                -{item.discount}%
                                            </div>
                                        )}

                                        <div className={`relative ${isLarge ? 'h-64' : 'h-48'} bg-gradient-to-br from-accent/5 to-primary/5 flex items-center justify-center overflow-hidden`}>
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <ShoppingBag className="w-16 h-16 text-accent/20" />
                                            )}

                                            {item.stockStatus === 'out_of_stock' && (
                                                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                                                    <span className="bg-white/90 text-red-600 px-4 py-2 rounded-xl font-black text-sm uppercase">Out of Stock</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{item.category}</span>
                                            </div>
                                            <h3 className={`font-black ${isLarge ? 'text-2xl' : 'text-lg'} mb-2 text-gray-900 dark:text-white line-clamp-1`}>
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                                                {item.description || 'Authentic traditional samagri for your sacred rituals.'}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                                <div className="flex flex-col">
                                                    {item.discount > 0 && (
                                                        <span className="text-xs text-muted-foreground line-through opacity-60">₹{Math.round(item.price * (1 + item.discount / 100))}</span>
                                                    )}
                                                    <span className="text-xl font-black text-accent">₹{item.price}</span>
                                                </div>
                                                <button
                                                    className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent group-hover:text-white transition-all shadow-lg shadow-accent/5"
                                                    disabled={item.stockStatus === 'out_of_stock'}
                                                >
                                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && filteredItems.length === 0 && (
                        <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-border">
                            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No items found</h3>
                            <p className="text-muted-foreground">We couldn't find any samagri in this category.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
