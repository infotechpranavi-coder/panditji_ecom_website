'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ChevronRight, X, Play, Image as ImageIcon, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

interface GalleryItem {
  _id: string
  title: string
  description: string
  mediaUrl: string
  mediaType: 'image' | 'video'
  category: string
  uploadedAt: string
}

// Demo data with beautiful Indian spiritual/temple images
const demoGalleryItems: GalleryItem[] = [
  {
    _id: '1',
    title: 'Diwali Celebration',
    description: 'Beautiful Diwali diyas lighting up the temple',
    mediaUrl: 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=800',
    mediaType: 'image',
    category: 'Festivals',
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Temple Architecture',
    description: 'Intricate carvings and divine architecture',
    mediaUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
    mediaType: 'image',
    category: 'General',
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: '3',
    title: 'Ganesh Chaturthi',
    description: 'Lord Ganesha idol decorated with flowers',
    mediaUrl: 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=800',
    mediaType: 'image',
    category: 'Festivals',
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: '4',
    title: 'Morning Aarti',
    description: 'Sacred morning prayers and rituals',
    mediaUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    mediaType: 'image',
    category: 'Rituals',
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: '5',
    title: 'Holi Colors',
    description: 'Vibrant colors of Holi celebration',
    mediaUrl: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800',
    mediaType: 'image',
    category: 'Festivals',
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: '6',
    title: 'Temple Bells',
    description: 'Traditional temple bells and offerings',
    mediaUrl: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800',
    mediaType: 'image',
    category: 'General',
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: '7',
    title: 'Puja Ceremony',
    description: 'Traditional puja ceremony with flowers and diyas',
    mediaUrl: 'https://images.unsplash.com/photo-1604608672516-f1b9b1a4a0b5?w=800',
    mediaType: 'image',
    category: 'Ceremonies',
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: '8',
    title: 'Rangoli Art',
    description: 'Beautiful rangoli designs at temple entrance',
    mediaUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
    mediaType: 'image',
    category: 'Events',
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: '9',
    title: 'Evening Prayers',
    description: 'Devotees gathered for evening aarti',
    mediaUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    mediaType: 'image',
    category: 'Rituals',
    uploadedAt: new Date().toISOString(),
  },
]

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null)

  const categories = ['All', 'Events', 'Ceremonies', 'Rituals', 'Festivals', 'General']

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch('/api/gallery')
      if (response.ok) {
        const data = await response.json()
        // If no items from API, use demo data
        setItems(data.length > 0 ? data : demoGalleryItems)
      } else {
        // Use demo data if API fails
        setItems(demoGalleryItems)
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error)
      // Use demo data on error
      setItems(demoGalleryItems)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border/50 px-4 bg-white/50 dark:bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-semibold">Gallery</span>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <section className="flex-1 px-4 py-12 pt-8">
        <div className="mx-auto max-w-7xl">
          {/* Category Filter */}
          <div className="mb-12 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-3.5 rounded-2xl font-bold whitespace-nowrap transition-all duration-300 ${selectedCategory === cat
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-2xl shadow-primary/50 scale-110 -translate-y-1'
                    : 'bg-white dark:bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary border-2 border-border hover:border-primary/50 hover:shadow-lg hover:scale-105'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">Loading divine moments...</p>
            </div>
          )}

          {/* Bento Grid Layout */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
              {filteredItems.map((item, index) => {
                // Create varied sizes for bento grid effect
                const isLarge = index % 7 === 0
                const isTall = index % 5 === 0 && !isLarge
                const isWide = index % 6 === 0 && !isLarge && !isTall

                return (
                  <div
                    key={item._id}
                    className={`group cursor-pointer relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ${isLarge ? 'md:col-span-2 md:row-span-2' :
                      isTall ? 'row-span-2' :
                        isWide ? 'md:col-span-2' :
                          ''
                      }`}
                    onClick={() => setLightboxItem(item)}
                  >
                    {/* Image/Video */}
                    <div className="absolute inset-0">
                      {item.mediaType === 'image' ? (
                        <img
                          src={item.mediaUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="relative w-full h-full">
                          <video
                            src={item.mediaUrl}
                            className="w-full h-full object-cover"
                            muted
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
                            <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                              <Play className="w-10 h-10 text-primary ml-1" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-gradient-to-r from-primary to-accent text-white rounded-full text-xs font-bold shadow-lg">
                            {item.category}
                          </span>
                          {item.mediaType === 'video' && (
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-bold">
                              Video
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-xl md:text-2xl text-white mb-2 drop-shadow-lg">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="text-sm text-white/90 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 border-4 border-transparent group-hover:border-primary/50 rounded-3xl transition-all duration-300" />
                  </div>
                )
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredItems.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No items found</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setLightboxItem(null)}
        >
          <button
            onClick={() => setLightboxItem(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 group"
          >
            <X className="w-7 h-7 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-2 rounded-2xl">
              {lightboxItem.mediaType === 'image' ? (
                <img
                  src={lightboxItem.mediaUrl}
                  alt={lightboxItem.title}
                  className="w-full h-auto max-h-[75vh] object-contain rounded-xl shadow-2xl"
                />
              ) : (
                <video
                  src={lightboxItem.mediaUrl}
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[75vh] object-contain rounded-xl shadow-2xl"
                />
              )}
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 bg-gradient-to-r from-primary to-accent rounded-full">
                <span className="text-sm font-bold text-white">{lightboxItem.category}</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">{lightboxItem.title}</h3>
              {lightboxItem.description && (
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">{lightboxItem.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
