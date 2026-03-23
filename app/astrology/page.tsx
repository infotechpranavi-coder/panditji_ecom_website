'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { ChevronRight, Calendar, Clock, MapPin, Mail, Phone, Search, Heart, MessageSquare, ArrowRight, Star, Sparkles, CheckCircle2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface AstroPackage {
  id: string
  _id?: string
  name: string
  price: number
  unit: string
  features: string[]
  isPopular: boolean
  order: number
}

export default function AstrologyPage() {
  const [packages, setPackages] = useState<AstroPackage[]>([])
  const [selectedPackage, setSelectedPackage] = useState<AstroPackage | null>(null)
  const formRef = useRef<HTMLDivElement>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    email: '',
    contactNumber: '',
    lookingFor: '',
    healthIssue: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recommendedPujas, setRecommendedPujas] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Packages
        const pkgRes = await fetch('/api/astro-packages')
        if (pkgRes.ok) {
          const data = await pkgRes.json()
          setPackages(data.map((p: any) => ({ ...p, id: p.id || p._id })))
        }

        // Fetch Recommended Pujas
        const pujaRes = await fetch('/api/pujas')
        if (pujaRes.ok) {
          const data = await pujaRes.json()
          const normalized = data.slice(0, 3).map((p: any) => ({
            ...p,
            id: p.id || p._id
          }))
          setRecommendedPujas(normalized)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectPackage = (pkg: AstroPackage) => {
    setSelectedPackage(pkg)
    // Smooth scroll to form
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you'd send formData + selectedPackage.id to your backend
      await new Promise(resolve => setTimeout(resolve, 1500))

      alert(`✅ Thank you, ${formData.name}! Your request for "${selectedPackage?.name || 'Astrological Prediction'}" has been submitted. Our certified astrologers will contact you soon.`)

      // Reset
      setFormData({
        name: '',
        dateOfBirth: '',
        timeOfBirth: '',
        placeOfBirth: '',
        email: '',
        contactNumber: '',
        lookingFor: '',
        healthIssue: '',
        message: '',
      })
      setSelectedPackage(null)
    } catch (error) {
      alert('❌ Failed to submit your request. Please try again.')
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border/50 bg-white dark:bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Astrological Predictions</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-primary/5 via-accent/5 to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,160,0,0.15),transparent_70%)] opacity-50" />
        <div className="mx-auto max-w-7xl px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white dark:bg-card/50 backdrop-blur-md rounded-full border border-primary/20 mb-8 shadow-xl">
            <Star className="w-5 h-5 text-primary animate-spin-slow" />
            <span className="text-sm font-black text-primary uppercase tracking-[0.2em]">Divine Guidance</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            Vedic Astrology
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            Discover your destiny through ancient Vedic wisdom. Get precise predictions and personalized remedies from our master astrologers.
          </p>
        </div>
      </section>

      {/* Pricing Packages Section - only shown if packages exist */}
      {packages.length > 0 && (
        <section className="px-4 py-16 pb-0">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-3">Consultation Tiers</p>
              <h2 className="text-3xl md:text-4xl font-black mb-3 text-gray-900 dark:text-white">Select Your Session</h2>
              <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-accent rounded-full mb-4" />
              <p className="text-muted-foreground font-medium max-w-xl leading-relaxed">Choose the guidance that best fits your spiritual journey. Our certified astrologers offer deep insights into your destiny.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {packages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className={`relative group flex flex-col p-8 rounded-[2rem] border-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                    selectedPackage?.id === pkg.id 
                    ? 'border-primary bg-primary/[0.02] shadow-[0_20px_50px_-12px_rgba(255,160,0,0.3)] scale-[1.02]' 
                    : 'border-border/40 bg-white dark:bg-card shadow-sm hover:shadow-2xl hover:border-primary/40 hover:-translate-y-2'
                  }`}
                  onClick={() => handleSelectPackage(pkg)}
                >
                  {/* Premium Background Accent */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] -z-10 transition-opacity duration-500 ${selectedPackage?.id === pkg.id ? 'bg-primary/20 opacity-100' : 'bg-accent/10 opacity-0 group-hover:opacity-100'}`} />
                  
                  {/* Popular Badge */}
                  {pkg.isPopular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-gradient-to-br from-primary to-accent text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-lg border-l border-b border-primary/20">
                        Popular
                      </div>
                    </div>
                  )}

                  {/* Card Header */}
                  <div className="mb-8">
                    <h3 className={`text-xl font-black mb-2 transition-colors duration-300 ${selectedPackage?.id === pkg.id ? 'text-primary' : 'text-gray-900 dark:text-white group-hover:text-primary'}`}>
                      {pkg.name}
                    </h3>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black tracking-tight">₹{pkg.price}</span>
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{pkg.unit}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="flex-1 space-y-4 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex gap-3 items-start group/feat">
                        <div className={`mt-0.5 p-0.5 rounded-full transition-colors duration-300 flex-shrink-0 ${selectedPackage?.id === pkg.id ? 'bg-green-500/20 text-green-600' : 'bg-primary/10 text-primary group-hover/feat:bg-green-500/20 group-hover/feat:text-green-600'}`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-semibold text-muted-foreground leading-snug transition-colors duration-300 group-hover:text-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className={`mt-auto pt-6 border-t border-border/20 transition-all duration-300 ${selectedPackage?.id === pkg.id ? 'opacity-100' : 'opacity-100'}`}>
                    {selectedPackage?.id === pkg.id ? (
                      <div className="w-full py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/30 animate-in fade-in zoom-in-95 duration-300">
                        Active Selection <span className="text-sm">✓</span>
                      </div>
                    ) : (
                      <button className="w-full py-3 px-6 bg-muted/60 text-muted-foreground group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-95 shadow-inner hover:shadow-lg hover:shadow-primary/20">
                        Choose This Plan
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking Form Section */}
      <section ref={formRef} className="px-4 py-24 scroll-mt-24">
        <div className="mx-auto max-w-4xl relative">
          {/* Form Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6 text-accent">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-black uppercase tracking-widest">Reserve Your Slot</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-3">Book Your Consultation</h2>
            {packages.length > 0 && selectedPackage && (
               <div className="inline-block px-6 py-2 bg-primary/20 text-primary text-base font-black rounded-full border-2 border-primary/30 shadow-inner">
                Selected: {selectedPackage.name} — ₹{selectedPackage.price}
               </div>
            )}
            {packages.length > 0 && !selectedPackage && (
              <p className="text-muted-foreground font-bold">Please select a plan above to activate the form.</p>
            )}
          </div>

          {/* Premium Form - always active if no packages, else needs selection */}
          <div className={`bg-white dark:bg-card p-8 md:p-12 rounded-[3.5rem] border-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden transition-all duration-700 ${packages.length > 0 && !selectedPackage ? 'opacity-40 grayscale pointer-events-none' : 'opacity-100'}`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 blur-[80px] -z-10" />
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 group">
                  <label className="text-sm font-black text-muted-foreground ml-1 uppercase tracking-widest group-focus-within:text-primary transition-colors">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-6 py-5 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-[1.5rem] outline-none transition-all font-bold shadow-sm"
                  />
                </div>
                
                <div className="space-y-2 group">
                  <label className="text-sm font-black text-muted-foreground ml-1 uppercase tracking-widest group-focus-within:text-primary transition-colors">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground opacity-50" />
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="+91 00000 00000"
                      className="w-full pl-14 pr-6 py-5 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-[1.5rem] outline-none transition-all font-bold shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                    <label className="text-sm font-black text-muted-foreground ml-1 uppercase tracking-widest group-focus-within:text-primary transition-colors">Date of Birth *</label>
                    <div className="relative">
                        <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground opacity-50" />
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-14 pr-6 py-5 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-[1.5rem] outline-none transition-all font-bold shadow-sm"
                        />
                    </div>
                </div>

                <div className="space-y-2 group">
                    <label className="text-sm font-black text-muted-foreground ml-1 uppercase tracking-widest group-focus-within:text-primary transition-colors">Time of Birth *</label>
                    <div className="relative">
                        <Clock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground opacity-50" />
                        <input
                            type="time"
                            name="timeOfBirth"
                            value={formData.timeOfBirth}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-14 pr-6 py-5 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-[1.5rem] outline-none transition-all font-bold shadow-sm"
                        />
                    </div>
                </div>

                <div className="md:col-span-2 space-y-2 group">
                    <label className="text-sm font-black text-muted-foreground ml-1 uppercase tracking-widest group-focus-within:text-primary transition-colors">Place of Birth *</label>
                    <div className="relative">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground opacity-50" />
                        <input
                            type="text"
                            name="placeOfBirth"
                            value={formData.placeOfBirth}
                            onChange={handleInputChange}
                            required
                            placeholder="City, State, Country"
                            className="w-full pl-14 pr-6 py-5 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-[1.5rem] outline-none transition-all font-bold shadow-sm"
                        />
                    </div>
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-sm font-black text-muted-foreground ml-1 uppercase tracking-widest group-focus-within:text-primary transition-colors">Specific Question / Notes</label>
                <div className="relative">
                  <MessageSquare className="absolute left-6 top-6 w-5 h-5 text-muted-foreground opacity-50" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Would you like us to focus on Career, Marriage, Health, or Wealth?"
                    className="w-full pl-14 pr-6 py-5 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-[2rem] outline-none transition-all font-bold shadow-sm resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !selectedPackage}
                className="w-full py-6 bg-gradient-to-r from-primary to-accent text-white rounded-[2rem] font-black text-2xl shadow-[0_20px_40px_-10px_rgba(255,160,0,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(255,160,0,0.6)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:grayscale"
              >
                {isSubmitting ? (
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Book Reservation</span>
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Recommended Pujas Section */}
      <section className="px-4 py-24 bg-gradient-to-b from-transparent to-primary/5">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-sm font-black text-primary uppercase tracking-widest mb-4">Divine Remedies</p>
              <h2 className="text-4xl md:text-5xl font-black">Spiritual Recommendations</h2>
            </div>
            <Link href="/services" className="px-8 py-3 bg-white dark:bg-card border-2 border-border/50 rounded-2xl font-black hover:border-primary hover:text-primary transition-all shadow-lg flex items-center gap-2">
              Explore All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedPujas.map((puja) => (
              <Link
                key={puja.id}
                href={`/puja/${puja.id}`}
                className="group bg-white dark:bg-card rounded-[2.5rem] border-2 border-border/50 overflow-hidden shadow-xl hover:border-primary/70 hover:-translate-y-2 transition-all duration-500 flex flex-col"
              >
                <div className="relative h-64 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 flex items-center justify-center overflow-hidden">
                  {puja.discount > 0 && (
                    <div className="absolute top-6 right-6 bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-2 rounded-2xl text-xs font-black z-10 shadow-xl">
                      -{puja.discount}% OFF
                    </div>
                  )}
                  {puja.image && puja.image !== '/placeholder.jpg' ? (
                    <img src={puja.image} alt={puja.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="text-8xl opacity-10 group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0">🙏</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-black text-2xl mb-3 group-hover:text-primary transition-colors line-clamp-1">
                    {puja.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2 font-bold leading-relaxed">
                    {puja.shortDescription || puja.description || 'Authentic traditional rituals facilitated by certified Vedic scholars.'}
                  </p>
                  <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">View Details</span>
                    <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
