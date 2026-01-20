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
      <section className="px-4 py-12 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our complete range of authentic traditional Indian temple services, performed by certified priests with decades of experience
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="flex-1 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          {/* Category Filter */}
          <div className="mb-10 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredServices.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.id}
                  className="bg-card rounded-lg border border-border hover:shadow-lg transition overflow-hidden group"
                >
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-xs px-3 py-1 bg-accent/20 text-accent rounded-full font-medium">
                        {service.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <span>⏱️ {service.duration}</span>
                    </div>
                  </div>

                  <div className="px-6 pb-6 border-t border-border pt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">₹{service.price}</span>
                    <Link
                      href={`/services/${service.id}`}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition inline-flex items-center gap-2"
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
