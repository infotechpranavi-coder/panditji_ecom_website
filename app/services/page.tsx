'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ChevronRight, ArrowRight, Flame, Focus as Lotus, BookOpen, Sparkles, Gift, Calendar } from 'lucide-react'
import { useState } from 'react'

const allServices = [
  {
    id: 1,
    category: 'Daily Rituals',
    name: 'Daily Puja Ritual',
    price: 499,
    description: 'Traditional daily puja performed by certified priests',
    duration: '45 mins',
    icon: Flame,
  },
  {
    id: 2,
    category: 'Offerings',
    name: 'Abhisheka Service',
    price: 799,
    description: 'Sacred offering with sacred water and flowers',
    duration: '1 hour',
    icon: Lotus,
  },
  {
    id: 3,
    category: 'Consultations',
    name: 'Vedic Consultation',
    price: 1999,
    description: 'Personal guidance from experienced vedic scholars',
    duration: '1 hour',
    icon: BookOpen,
  },
  {
    id: 4,
    category: 'Special Rituals',
    name: 'Special Havan',
    price: 1499,
    description: 'Fire ritual for prosperity and peace',
    duration: '2 hours',
    icon: Sparkles,
  },
  {
    id: 5,
    category: 'Offerings',
    name: 'Festival Offerings',
    price: 699,
    description: 'Complete offerings for festivals and celebrations',
    duration: '1.5 hours',
    icon: Gift,
  },
  {
    id: 6,
    category: 'Planning',
    name: 'Event Planning & Ritual',
    price: 2499,
    description: 'Complete planning and execution of major rituals',
    duration: 'Custom',
    icon: Calendar,
  },
  {
    id: 7,
    category: 'Daily Rituals',
    name: 'Morning Aarti',
    price: 299,
    description: 'Traditional morning worship and light ceremony',
    duration: '30 mins',
    icon: Flame,
  },
  {
    id: 8,
    category: 'Consultations',
    name: 'Astrology Reading',
    price: 1299,
    description: 'Detailed birth chart analysis and guidance',
    duration: '45 mins',
    icon: BookOpen,
  },
]

const categories = ['All', 'Daily Rituals', 'Offerings', 'Consultations', 'Special Rituals', 'Planning']

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredServices = selectedCategory === 'All'
    ? allServices
    : allServices.filter(s => s.category === selectedCategory)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border px-4">
        <div className="mx-auto max-w-7xl py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Services</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="px-4 py-16 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-primary/5" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="inline-block mb-6 px-4 py-1 bg-primary/20 rounded-full">
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">Services</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Explore our complete range of authentic traditional Indian temple services, performed by certified priests with decades of experience
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="flex-1 px-4 py-12 gradient-section-1">
        <div className="mx-auto max-w-7xl">
          {/* Category Filter */}
          <div className="mb-12 overflow-x-auto">
            <div className="flex gap-3 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg scale-105'
                      : 'bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredServices.map((service, index) => {
              const Icon = service.icon
              const gradients = [
                'from-primary/20 via-primary/10 to-accent/20',
                'from-accent/20 via-accent/10 to-primary/20',
                'from-primary/20 via-accent/20 to-primary/10',
              ]
              const gradient = gradients[index % gradients.length]
              return (
                <div
                  key={service.id}
                  className={`bg-gradient-to-br ${gradient} rounded-2xl border border-border/50 hover:border-primary/50 card-elevated overflow-hidden group relative`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="p-8 relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-4 bg-gradient-to-br from-primary/30 to-accent/20 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <span className="text-xs px-4 py-2 bg-white/80 backdrop-blur-sm text-primary rounded-full font-bold shadow-sm">
                        {service.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border/50">
                      <span className="flex items-center gap-2">⏱️ <span className="font-semibold">{service.duration}</span></span>
                    </div>
                  </div>

                  <div className="px-8 pb-8 pt-0 flex items-center justify-between relative z-10">
                    <span className="text-3xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">₹{service.price}</span>
                    <Link
                      href={`/services/${service.id}`}
                      className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl text-sm font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 shadow-lg"
                    >
                      View <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No services found in this category</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
