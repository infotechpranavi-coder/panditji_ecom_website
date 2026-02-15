'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { BookingModal } from '@/components/booking-modal'
import { useState, useEffect } from 'react'
import { ChevronRight, Facebook, Twitter, Linkedin, MessageCircle, Share2, Star, Check, Sparkles } from 'lucide-react'

export default function PujaDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [puja, setPuja] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'description' | 'specification' | 'reviews' | 'faq'>('description')
  const [selectedJapa, setSelectedJapa] = useState('')
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    user: '',
    email: '',
    rating: 5,
    comment: ''
  })
  const [submittingReview, setSubmittingReview] = useState(false)

  useEffect(() => {
    if (id) {
      fetchPuja()
    }
  }, [id])

  const fetchPuja = async () => {
    try {
      const response = await fetch(`/api/pujas/${id}`)
      if (response.ok) {
        const data = await response.json()
        setPuja({
          ...data,
          id: data.id || data._id
        })
        if (data.japaOptions?.length > 0) {
          setSelectedJapa(data.japaOptions[0].value)
        }
      }
    } catch (error) {
      console.error('Error fetching puja:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewForm.user || !reviewForm.comment) {
      alert('Please fill in your name and review.')
      return
    }

    setSubmittingReview(true)
    try {
      const response = await fetch(`/api/pujas/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewForm),
      })

      if (response.ok) {
        alert('Review submitted successfully!')
        setReviewForm({ user: '', email: '', rating: 5, comment: '' })
        fetchPuja() // Refresh data
      } else {
        const error = await response.json()
        alert(`Failed to submit review: ${error.error}`)
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setSubmittingReview(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!puja) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Puja not found</h1>
            <Link href="/" className="text-primary hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleBuyNow = () => {
    setIsBookingModalOpen(true)
  }

  const handleWhatsAppBuy = () => {
    const message = `Hi, I want to book: ${puja.name} - ₹${puja.price}`
    window.open(`https://wa.me/917021324717?text=${encodeURIComponent(message)}`, '_blank')
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Check out ${puja.name} on Book My Panditji`

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-white dark:bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link href="/gallery" className="text-muted-foreground hover:text-foreground">Gallery</Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link href={`/gallery?category=${puja.categorySlug || 'pujas-vrat'}`} className="text-muted-foreground hover:text-foreground">{puja.category}</Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{puja.name}</span>
            </div>

            {/* Social Sharing Icons */}
            <div className="flex items-center gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </a>
              <a
                href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                aria-label="Share on Pinterest"
              >
                <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                aria-label="Share on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-1 px-4 py-8 bg-white dark:bg-card">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Left - Product Media */}
            <div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4 aspect-square flex items-center justify-center relative">
                {puja.image && puja.image !== '/placeholder.jpg' ? (
                  <img src={puja.image} alt={puja.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-9xl opacity-30">🙏</div>
                )}
              </div>

              {/* Video Preview if available */}
              {puja.video && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Video Preview
                  </h3>
                  <div className="aspect-video rounded-xl overflow-hidden shadow-xl border-2 border-primary/20 bg-black">
                    <video src={puja.video} controls className="w-full h-full">
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}
            </div>

            {/* Right - Product Details */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">{puja.name}</h1>
              <p className="text-sm text-muted-foreground mb-6">SKU: {puja.sku || `PUJA-${id}`}</p>

              {/* Short Description */}
              <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {puja.shortDescription}
              </p>

              {/* Japa Option */}
              {puja.japaOptions && puja.japaOptions.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Japa:
                  </label>
                  <select
                    value={selectedJapa}
                    onChange={(e) => setSelectedJapa(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  >
                    {puja.japaOptions.map((option: any) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleBuyNow}
                  className="w-full px-6 py-3 bg-gradient-to-r from-accent to-accent/90 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleWhatsAppBuy}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Buy On WhatsApp
                </button>
              </div>

              {/* Category */}
              <div className="text-sm text-muted-foreground">
                Category:{' '}
                <Link href={`/gallery?category=${puja.categorySlug || 'pujas-vrat'}`} className="text-primary hover:underline">
                  {puja.category}
                </Link>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border/50 mb-8 overflow-x-auto">
            <div className="flex gap-4 md:gap-8 min-w-max">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-4 px-4 font-bold text-sm transition-all relative ${activeTab === 'description'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                Description
                {activeTab === 'description' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-[0_-2px_6px_rgba(var(--primary),0.3)]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('specification')}
                className={`pb-4 px-4 font-bold text-sm transition-all relative ${activeTab === 'specification'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                Specification
                {activeTab === 'specification' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-[0_-2px_6px_rgba(var(--primary),0.3)]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 px-4 font-bold text-sm transition-all relative ${activeTab === 'reviews'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                Reviews ({puja.reviews?.length || 0})
                {activeTab === 'reviews' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-[0_-2px_6px_rgba(var(--primary),0.3)]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`pb-4 px-4 font-bold text-sm transition-all relative ${activeTab === 'faq'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                FAQ
                {activeTab === 'faq' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-[0_-2px_6px_rgba(var(--primary),0.3)]" />
                )}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'description' && (
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line pb-12 text-base">
                {puja.fullDescription || puja.description}
              </div>
            )}

            {activeTab === 'specification' && (
              <div className="space-y-4 pb-12">
                {puja.specifications?.map((spec: any, idx: number) => (
                  <div key={idx} className="flex border-b border-border/10 pb-4">
                    <div className="w-48 font-bold text-gray-900 dark:text-white uppercase text-xs tracking-wider">{spec.label}:</div>
                    <div className="flex-1 text-gray-700 dark:text-gray-300 text-sm">{spec.value}</div>
                  </div>
                )) || (
                    <div className="text-muted-foreground italic">No specifications available for this puja.</div>
                  )}
                {puja.duration && (
                  <div className="flex border-b border-border/10 pb-4">
                    <div className="w-48 font-bold text-gray-900 dark:text-white uppercase text-xs tracking-wider">Duration:</div>
                    <div className="flex-1 text-gray-700 dark:text-gray-300 text-sm">{puja.duration}</div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="pb-12 space-y-12">
                {/* Review List */}
                <div className="space-y-6">
                  {!puja.reviews || puja.reviews.length === 0 ? (
                    <div className="p-8 bg-muted/20 rounded-2xl border border-dashed border-border text-center">
                      <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {puja.reviews.map((review: any, idx: number) => (
                        <div key={idx} className="bg-white dark:bg-card/50 p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative">
                          <div className="flex flex-col items-end absolute top-6 right-6 text-right">
                            <span className="font-bold text-gray-900 dark:text-white">{review.user}</span>
                            <span className="text-xs text-muted-foreground">{review.date || 'Nov 08, 2024'}</span>
                          </div>

                          <div className="pr-32">
                            <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{review.comment}"</p>
                          </div>

                          <div className="flex flex-col items-end">
                            <span className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-tighter">Rating</span>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{review.rating}/5</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add Review Form */}
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-3xl border border-primary/20">
                  <h3 className="text-2xl font-black mb-2">Add a review</h3>
                  <p className="text-sm text-muted-foreground mb-8">Your email address will not be published. Required fields are marked <span className="text-red-500">*</span></p>

                  <form onSubmit={handleReviewSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Your rating <span className="text-red-500">*</span></label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                            className="transition-transform hover:scale-125"
                          >
                            <Star className={`w-6 h-6 ${star <= reviewForm.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="comment" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Your review <span className="text-red-500">*</span></label>
                      <textarea
                        id="comment"
                        required
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        className="w-full h-32 px-4 py-3 bg-white dark:bg-gray-900 border-2 border-border/50 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="user" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Name <span className="text-red-500">*</span></label>
                        <input
                          id="user"
                          type="text"
                          required
                          value={reviewForm.user}
                          onChange={(e) => setReviewForm({ ...reviewForm, user: e.target.value })}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-border/50 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email <span className="text-red-500">*</span></label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={reviewForm.email}
                          onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-border/50 rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="px-10 py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                      {submittingReview ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="pb-12 space-y-4">
                {(!puja.faqs || puja.faqs.length === 0) ? (
                  <div className="p-8 bg-muted/20 rounded-2xl border border-dashed border-border text-center">
                    <p className="text-muted-foreground">No FAQs available for this puja yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {puja.faqs.map((faq: any, idx: number) => (
                      <div key={idx} className="bg-white dark:bg-card/50 p-6 rounded-2xl border border-border shadow-sm">
                        <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {faq.question}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Default FAQs if none specific */}
                {(!puja.faqs || puja.faqs.length === 0) && (
                  <div className="mt-8 space-y-4">
                    <h3 className="text-lg font-bold mb-4">General Questions</h3>
                    {[
                      { q: 'How can I book this Puja?', a: 'You can book by clicking "Buy Now" and filling the form, or via WhatsApp.' },
                      { q: 'What are the requirements?', a: 'Once booked, our Panditji will contact you with the list of required samagri or details.' },
                      { q: 'Can I perform this Puja online?', a: 'Yes, we specialize in e-Puja and online rituals via video conferencing.' }
                    ].map((faq, i) => (
                      <div key={i} className="bg-white dark:bg-card/50 p-6 rounded-2xl border border-border shadow-sm">
                        <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                          {faq.q}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        puja={puja}
        selectedJapa={selectedJapa}
      />
    </div>
  )
}
