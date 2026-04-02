'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { useState, useEffect } from 'react'
import { ChevronRight, ShoppingBag, Package, Sparkles, MessageCircle, ArrowLeft } from 'lucide-react'

export default function SamagriDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [item, setItem] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchSamagri()
    }
  }, [id])

  const fetchSamagri = async () => {
    try {
      const response = await fetch(`/api/samagri/${id}`)
      if (response.ok) {
        const data = await response.json()
        setItem(data)
      }
    } catch (error) {
      console.error('Error fetching samagri:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsAppInquiry = () => {
    const message = `Hi, I am interested in Pujan Samagri: ${item.name}`
    window.open(`https://wa.me/917021324717?text=${encodeURIComponent(message)}`, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center bg-white dark:bg-card p-10 rounded-3xl border-2 border-border shadow-xl max-w-md">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-20" />
            <h1 className="text-3xl font-black mb-4">Item not found</h1>
            <Link href="/pujan-samagri" className="inline-flex items-center gap-2 text-accent border-b-2 border-accent font-bold hover:scale-105 transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to Pujan Samagri
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/5 to-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-white/50 dark:bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link href="/pujan-samagri" className="text-muted-foreground hover:text-foreground">Pujan Samagri</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground truncate max-w-[200px]">{item.name}</span>
          </div>
        </div>
      </div>

      <main className="flex-1 py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left - Media Section */}
            <div className="space-y-6">
              <div className="aspect-square rounded-3xl overflow-hidden border-4 border-white dark:border-card shadow-2xl bg-white dark:bg-card relative group">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted/30">
                    <ShoppingBag className="w-24 h-24 text-accent/20" />
                  </div>
                )}
                
                {item.stockStatus === 'out_of_stock' && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10">
                    <span className="bg-white/95 text-red-600 px-6 py-2.5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">Out of Stock</span>
                  </div>
                )}
              </div>

              <div className="p-6 bg-white dark:bg-card rounded-2xl border-2 border-border/50">
                 <h3 className="text-lg font-black text-primary mb-4 flex items-center gap-2 uppercase tracking-tighter">
                   <Sparkles className="w-5 h-5" /> Product Details
                 </h3>
                 <div className="space-y-3">
                   <div className="flex justify-between items-center py-2 border-b border-border/50">
                     <span className="text-sm font-bold text-muted-foreground">Category</span>
                     <span className="text-sm font-black text-foreground">{item.category}</span>
                   </div>
                   <div className="flex justify-between items-center py-2 border-b border-border/50">
                     <span className="text-sm font-bold text-muted-foreground">SKU</span>
                     <span className="text-sm font-black text-foreground">{item.sku || `SM-${id.slice(-6)}`}</span>
                   </div>
                   <div className="flex justify-between items-center py-2 border-b border-border/50">
                     <span className="text-sm font-bold text-muted-foreground">Purity</span>
                     <span className="text-sm font-black text-green-600">100% Authentic</span>
                   </div>
                   <div className="flex justify-between items-center py-2">
                     <span className="text-sm font-bold text-muted-foreground">Status</span>
                     <span className={`text-sm font-black uppercase tracking-tighter ${item.stockStatus === 'in_stock' ? 'text-green-600' : 'text-red-500'}`}>
                       {item.stockStatus === 'in_stock' ? 'Available' : 'Currently Unavailable'}
                     </span>
                   </div>
                 </div>
              </div>
            </div>

            {/* Right - Product Info Section */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
                  <Package className="w-4 h-4 text-accent" />
                  <span className="text-xs font-black text-accent uppercase tracking-widest">{item.category}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
                  {item.name}
                </h1>
                
                <div className="flex items-center gap-2 p-4 bg-muted/30 rounded-2xl border border-dashed border-border mb-8">
                   <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                   <p className="text-sm font-bold text-muted-foreground italic">Connect with us on WhatsApp to inquire about this sacred item.</p>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-xl font-bold mb-4">Description</h3>
                  <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line bg-white dark:bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
                    {item.description || "Authentic and pure samagri curated specifically for Vedic rituals. Our items are selected to ensure the highest spiritual efficacy and traditional adherence."}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-border/50">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full group px-8 py-5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-green-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
                  Inquire via WhatsApp
                </button>
                <p className="text-center text-[10px] text-muted-foreground mt-4 font-bold uppercase tracking-widest opacity-60">
                  Secure Your Sacred Items Directly with our Priests
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
