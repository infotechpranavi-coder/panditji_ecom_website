'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowRight, Flame, Focus as Lotus, BookOpen, Sparkles } from 'lucide-react'

const featuredServices = [
  {
    id: 1,
    name: 'Daily Puja Ritual',
    price: 499,
    description: 'Traditional daily puja performed by certified priests',
    icon: Flame,
  },
  {
    id: 2,
    name: 'Abhisheka Service',
    price: 799,
    description: 'Sacred offering with sacred water and flowers',
    icon: Lotus,
  },
  {
    id: 3,
    name: 'Vedic Consultation',
    price: 1999,
    description: 'Personal guidance from experienced vedic scholars',
    icon: BookOpen,
  },
  {
    id: 4,
    name: 'Special Havan',
    price: 1499,
    description: 'Fire ritual for prosperity and peace',
    icon: Sparkles,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-semibold text-primary">✨ Sacred Traditions Online</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Experience <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Sacred Traditions</span> Delivered with Grace
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
              Connect with certified priests and spiritual guides to perform authentic Indian temple rituals, pujas, and offerings from the comfort of your home
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/services"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition flex items-center gap-2"
              >
                Explore Services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Popular Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our carefully curated selection of traditional spiritual services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="group bg-card rounded-lg p-6 hover:shadow-lg transition border border-border hover:border-primary/50"
                >
                  <div className="mb-4 p-3 w-fit bg-primary/10 rounded-lg group-hover:bg-primary/20 transition">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">₹{service.price}</span>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition inline-flex items-center gap-2"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Satisfied Devotees</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <p className="text-muted-foreground">Certified Priests</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">Authentic Traditions</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
