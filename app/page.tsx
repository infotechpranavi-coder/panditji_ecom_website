'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CalendarWidget } from '@/components/calendar-widget'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { ArrowRight, Phone, Calendar, Sparkles, CheckCircle2, Star, Flame, Heart, Shield, Clock, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const festivalServices: any[] = []
const pujaVratServices: any[] = []
const latestPujas: any[] = []
const chakraBalancing: any[] = []

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [pujas, setPujas] = useState<any[]>([])
  const [heroBanner, setHeroBanner] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPujas()
    fetchBanner()
  }, [])

  const fetchBanner = async () => {
    try {
      const response = await fetch('/api/banners?active=true')
      if (response.ok) {
        const data = await response.json()
        if (data && data._id) {
          setHeroBanner(data)
        }
      }
    } catch (error) {
      console.error('Error fetching banner:', error)
    }
  }

  const fetchPujas = async () => {
    try {
      const response = await fetch('/api/pujas', { cache: 'no-store' })
      if (response.ok) {
        const data = await response.json()
        const normalized = data.map((p: any) => ({
          ...p,
          id: p.id || p._id
        }))
        setPujas(normalized)
      }
    } catch (error) {
      console.error('Error fetching pujas:', error)
    } finally {
      setLoading(false)
    }
  }

  // Derive sections from dynamic data
  const festivalServices = pujas.filter(p => p.category === 'Festival' || p.category === 'Pujas & Vrat').slice(0, 4)
  const latestPujas = pujas.slice(-5).reverse()
  const pujaVratServices = pujas.filter(p => p.category === 'Pujas & Vrat').slice(0, 4)
  const chakraBalancing = pujas.filter(p => p.category === 'Chakra Balancing').slice(0, 6)

  // Use fallback data if API returns empty during initial setup
  const displayFestivalServices = festivalServices

  const displayLatestPujas = latestPujas


  const getCurrentCards = () => {
    const total = displayFestivalServices.length
    const largeCard = displayFestivalServices[currentIndex]
    const smallCard1 = displayFestivalServices[(currentIndex + 1) % total]
    const smallCard2 = displayFestivalServices[(currentIndex + 2) % total]
    return { largeCard, smallCard1, smallCard2 }
  }

  const nextCards = () => {
    setCurrentIndex((prev) => (prev + 1) % displayFestivalServices.length)
  }

  const prevCards = () => {
    setCurrentIndex((prev) => (prev - 1 + displayFestivalServices.length) % displayFestivalServices.length)
  }

  const { largeCard, smallCard1, smallCard2 } = getCurrentCards()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section - Conditional Rendering */}
      {heroBanner ? (
        // Dynamic Hero Banner
        <section className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroBanner.imageUrl}
              alt={heroBanner.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay removed as per user request */}
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
            {(heroBanner.title || heroBanner.description) && (
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4 animate-fade-in">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-sm font-bold text-white">Online Puja & e-Puja Services</span>
                </div>

                {heroBanner.title && (
                  <h1 className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-lg tracking-tight mb-6">
                    {heroBanner.title}
                  </h1>
                )}

                {heroBanner.description && (
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md mb-8">
                    {heroBanner.description}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="tel:+917021324717"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Contact Us</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        // Fallback: Original Creative Asymmetric Layout
        <section className="relative px-4 py-12 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,200,0,0.08),transparent_50%)]" />
          <div className="mx-auto max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Content - Takes 7 columns */}
              <div className="lg:col-span-7 space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-full border border-primary/20 shadow-lg">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-sm font-bold text-primary">✨ Online e-Puja Services</span>
                </div>

                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                    Connect with{' '}
                    <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                      Divine Traditions
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                    Book authentic e-puja and online puja services performed by certified priests. Experience sacred rituals from anywhere, anytime.
                  </p>
                </div>

                {/* CTA Section */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="/services"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="tel:+917021324717"
                    className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white dark:text-gray-200 rounded-xl font-bold text-lg hover:bg-gray-100/10 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center shadow-lg transform"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call: +91 7021324717
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6">
                  {[
                    { icon: Users, value: '500+', label: 'Devotees' },
                    { icon: Award, value: '25+', label: 'Priests' },
                    { icon: Star, value: '4.8', label: 'Rating' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/10">
                      <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-extrabold text-primary mb-1">{stat.value}</div>
                      <div className="text-xs font-medium text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Visual - Takes 5 columns, Creative Layout */}
              <div className="lg:col-span-5 relative">
                <div className="relative">
                  {/* Main Card - Glassmorphism */}
                  <div className="bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 backdrop-blur-xl rounded-3xl p-8 border border-primary/20 shadow-2xl">
                    <div className="space-y-6">
                      {/* Icon Circle */}
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-xl">
                        <div className="text-6xl">🕉️</div>
                      </div>

                      {/* Feature Cards */}
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { icon: Shield, text: 'Certified' },
                          { icon: Heart, text: 'Authentic' },
                          { icon: Clock, text: 'On Time' },
                          { icon: Flame, text: 'Divine' },
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-white/50 dark:bg-card/50 backdrop-blur-sm rounded-xl border border-primary/10 text-center hover:scale-105 transition-transform">
                            <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                            <div className="text-xs font-semibold text-primary">{item.text}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent/30 to-primary/30 rounded-2xl rotate-12 blur-sm animate-pulse" />
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full -rotate-12 blur-sm animate-pulse delay-300" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Puja Section - Professional Title Design */}
      {displayLatestPujas.length > 0 && (
        <section className="px-4 py-16 relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
          <div className="mx-auto max-w-7xl relative z-10">
            {/* Professional Section Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-1 w-12 bg-gradient-to-r from-red-600 to-red-500 rounded-full" />
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Latest</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                LATEST PUJA
              </h2>
              <p className="text-lg text-muted-foreground">Discover our newest puja services</p>
            </div>

            {/* Horizontal Scrollable Cards */}
            <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              <div className="flex gap-6 min-w-max md:min-w-0 md:grid md:grid-cols-2 lg:grid-cols-5">
                {displayLatestPujas.map((service) => (
                  <Link
                    key={service.id}
                    href={`/puja/${service.id}`}
                    className="group flex-shrink-0 w-72 md:w-auto bg-white dark:bg-card rounded-xl border-2 border-border/50 overflow-hidden card-elevated hover:border-primary/70 hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-52 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 flex items-center justify-center overflow-hidden">
                      {service.image && service.image !== '/placeholder.jpg' ? (
                        <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,0,0.1),transparent)]" />
                          <div className="text-7xl opacity-30 group-hover:scale-110 transition-transform duration-300">🕉️</div>
                        </>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col bg-white dark:bg-card">
                      <h3 className="font-bold text-lg mb-2 text-primary group-hover:text-accent transition-colors line-clamp-1">
                        {service.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
                        {service.shortDescription || 'Experience the divine blessings of this sacred puja ritual'}
                      </p>
                      <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                        <span className="text-sm font-bold text-primary">View Details</span>
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                          <ArrowRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Services - Creative Grid Layout */}
      {displayFestivalServices.length > 0 && (
        <section className="px-4 py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
          <div className="mx-auto max-w-7xl relative z-10">
            {/* Professional Section Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Featured</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                Popular Festival Pujas
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Choose from our curated selection of authentic traditional services
              </p>
            </div>

            {/* Calendar and Puja Cards Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Calendar on Left - Matching Cards Height */}
              <div className="lg:col-span-1 flex">
                <div className="w-full self-stretch">
                  <CalendarWidget />
                </div>
              </div>

              {/* Puja Cards on Right with Navigation */}
              <div className="lg:col-span-2">
                <div className="relative">
                  {/* Navigation Arrows */}
                  {displayFestivalServices.length > 1 && (
                    <div className="flex items-center justify-end gap-2 mb-4">
                      <button
                        onClick={prevCards}
                        className="p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all hover:scale-110"
                        aria-label="Previous cards"
                      >
                        <ChevronLeft className="w-5 h-5 text-primary" />
                      </button>
                      <button
                        onClick={nextCards}
                        className="p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all hover:scale-110"
                        aria-label="Next cards"
                      >
                        <ChevronRight className="w-5 h-5 text-primary" />
                      </button>
                    </div>
                  )}

                  {/* Cards Grid - 3 Cards Only */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Large Featured Card */}
                    {largeCard && (
                      <Link
                        href={`/puja/${largeCard.id}`}
                        key={`large-${currentIndex}`}
                        className="group md:col-span-2 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 rounded-2xl border-2 border-primary/20 overflow-hidden card-elevated hover:border-primary/50 hover:shadow-2xl transition-all duration-300 relative"
                      >
                        <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-white rounded-lg text-xs font-bold z-10">
                          Featured
                        </div>
                        <div className="relative h-64 flex items-center justify-center p-8">
                          {largeCard.image && largeCard.image !== '/placeholder.jpg' ? (
                            <img src={largeCard.image} alt={largeCard.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                          ) : (
                            <div className="text-9xl opacity-20 group-hover:opacity-30 transition-opacity">🕉️</div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                        </div>
                        <div className="p-6 bg-background/80 backdrop-blur-sm">
                          <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">
                            {largeCard.name}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {(largeCard.shortDescription || largeCard.description || 'Experience the divine blessings of this sacred festival puja').split(' ').slice(0, 4).join(' ')}
                            {(largeCard.shortDescription || largeCard.description || '').split(' ').length > 4 ? '...' : ''}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-primary">View Details</span>
                            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                              <ArrowRight className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* Small Card 1 */}
                    {smallCard1 && displayFestivalServices.length > 1 && (
                      <Link
                        href={`/puja/${smallCard1.id}`}
                        key={`small1-${currentIndex}`}
                        className="group bg-white dark:bg-card rounded-2xl border-2 border-border/50 overflow-hidden card-elevated hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col"
                      >
                        <div className="relative h-40 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 flex items-center justify-center overflow-hidden">
                          {smallCard1.image && smallCard1.image !== '/placeholder.jpg' ? (
                            <img src={smallCard1.image} alt={smallCard1.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                          ) : (
                            <div className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-300">🕉️</div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-primary group-hover:text-primary transition-colors line-clamp-1">
                            {smallCard1.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                            {smallCard1.shortDescription || smallCard1.name || 'Sacred traditional puja celebration'}
                          </p>
                          <div className="mt-auto pt-3 border-t border-border/50 flex items-center justify-between">
                            <span className="text-xs font-bold text-primary">View Details</span>
                            <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                              <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white transition-colors" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* Small Card 2 */}
                    {smallCard2 && displayFestivalServices.length > 2 && (
                      <Link
                        href={`/puja/${smallCard2.id}`}
                        key={`small2-${currentIndex}`}
                        className="group bg-white dark:bg-card rounded-2xl border-2 border-border/50 overflow-hidden card-elevated hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col"
                      >
                        <div className="relative h-40 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 flex items-center justify-center overflow-hidden">
                          {smallCard2.image && smallCard2.image !== '/placeholder.jpg' ? (
                            <img src={smallCard2.image} alt={smallCard2.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                          ) : (
                            <div className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-300">🕉️</div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-primary group-hover:text-primary transition-colors line-clamp-1">
                            {smallCard2.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                            {smallCard2.shortDescription || 'Experience authentic Vedic traditions'}
                          </p>
                          <div className="mt-auto pt-3 border-t border-border/50 flex items-center justify-between">
                            <span className="text-xs font-bold text-primary">View Details</span>
                            <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                              <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white transition-colors" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section - Separate Professional Section */}
      <section className="px-4 py-16 relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="mx-auto max-w-7xl relative z-10">
          {/* Professional Section Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-1 w-12 bg-white/80 rounded-full" />
              <span className="text-xs font-bold text-white/90 uppercase tracking-wider">Benefits</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
              Why Choose Us?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl">
              Experience the difference of authentic traditional services
            </p>
          </div>

          {/* Why Choose Us Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Certified Priests', desc: 'All priests are verified and certified' },
              { icon: Clock, title: 'Flexible Timing', desc: 'Book at your convenience' },
              { icon: Heart, title: 'Authentic Rituals', desc: 'Traditional methods preserved' },
              { icon: Star, title: 'Satisfaction Guaranteed', desc: '100% authentic experience' },
            ].map((item, i) => (
              <div key={i} className="group bg-white/95 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 card-elevated hover:border-white/40 hover:shadow-xl transition-all duration-300">
                <div className="mb-6 flex items-center justify-start">
                  <item.icon className="w-10 h-10 text-gray-900 dark:text-white stroke-1" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Puja & Vrat Section - Creative Masonry Style */}
      {pujaVratServices.length > 0 && (
        <section className="px-4 py-16 bg-gradient-to-b from-background via-accent/5 to-background relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,200,0,0.05),transparent_50%)]" />
          <div className="mx-auto max-w-7xl relative z-10">
            {/* Professional Section Header */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-1 w-12 bg-gradient-to-r from-accent to-primary rounded-full" />
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">Traditional</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                    Puja & Vrat Services
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl">
                    Traditional rituals and vrat services performed with devotion and authenticity
                  </p>
                </div>
                <Link
                  href="/services"
                  className="hidden md:flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 rounded-xl font-semibold text-primary transition-all"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Creative Grid - Mix of sizes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pujaVratServices.map((service, index) => {
                const isLarge = index === 0
                return (
                  <Link
                    key={service.id}
                    href={`/puja/${service.id}`}
                    className={`group bg-white dark:bg-card rounded-2xl border-2 border-border/50 overflow-hidden card-elevated hover:border-accent/50 hover:shadow-xl transition-all duration-300 relative ${isLarge ? 'sm:col-span-2 lg:col-span-2' : ''
                      }`}
                  >
                    {service.discount && (
                      <div className="absolute top-4 right-4 bg-gradient-to-br from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold z-10 shadow-lg">
                        -{service.discount}%
                      </div>
                    )}
                    <div className={`relative ${isLarge ? 'h-56' : 'h-44'} bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 flex items-center justify-center overflow-hidden`}>
                      {service.image && service.image !== '/placeholder.jpg' ? (
                        <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      ) : (
                        <>
                          <div className="text-8xl opacity-20 group-hover:scale-110 transition-transform duration-300">🙏</div>
                          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                        </>
                      )}
                    </div>
                    <div className={`${isLarge ? 'p-6' : 'p-5'} bg-white dark:bg-card`}>
                      <h3 className={`font-bold ${isLarge ? 'text-xl' : 'text-lg'} mb-2 text-gray-900 dark:text-primary group-hover:text-accent transition-colors line-clamp-1`}>
                        {service.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {service.shortDescription || 'Authentic traditional rituals performed by experts'}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <span className="text-sm font-bold text-accent">View Details</span>
                        <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent group-hover:text-white transition-all">
                          <ArrowRight className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Chakra Balancing Section - Professional Title Design */}
      {chakraBalancing.length > 0 && (
        <section className="px-4 py-16 relative overflow-hidden bg-gradient-to-b from-muted/20 to-background">
          <div className="mx-auto max-w-7xl relative z-10">
            {/* Professional Section Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full" />
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Spiritual</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                CHAKRA BALANCING
              </h2>
              <p className="text-lg text-muted-foreground">Restore harmony and balance through sacred rituals</p>
            </div>

            {/* Grid Layout for Chakra Services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {chakraBalancing.map((service) => (
                <Link
                  key={service.id}
                  href={`/puja/${service.id}`}
                  className="group bg-white dark:bg-card rounded-xl border-2 border-border/50 overflow-hidden card-elevated hover:border-primary/70 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-48 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-indigo-500/10 flex items-center justify-center overflow-hidden">
                    {service.image && service.image !== '/placeholder.jpg' ? (
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15),transparent)]" />
                        <div className="text-7xl opacity-30 group-hover:scale-110 transition-transform duration-300">🌀</div>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col bg-white dark:bg-card">
                    <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-primary group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                      {service.name}
                    </h3>
                    <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">View Details</span>
                      <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust & Stats Section - Creative Layout */}
      <section className="px-4 py-16 relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Side - Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Achievements</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                Trusted by Devotees Worldwide
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join thousands of satisfied devotees who have experienced authentic traditional puja services with our certified priests.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 rounded-xl font-semibold text-primary transition-all"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right Side - Stats Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '500+', label: 'Happy Devotees', icon: Users, color: 'from-primary to-accent' },
                  { number: '25+', label: 'Certified Priests', icon: Award, color: 'from-accent to-primary' },
                  { number: '1000+', label: 'Pujas Completed', icon: CheckCircle2, color: 'from-primary to-accent' },
                  { number: '4.8★', label: 'Average Rating', icon: Star, color: 'from-accent to-primary' },
                ].map((stat, index) => (
                  <div key={index} className="p-6 bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-border/50 card-elevated hover:border-primary/50 transition-all group">
                    <stat.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <div className={`text-3xl font-extrabold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.number}
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
