'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ChevronRight, ArrowLeft, Flame, Focus as Lotus, BookOpen, Sparkles, Gift, Calendar, Check } from 'lucide-react'
import { useState } from 'react'

const servicesData = {
  1: {
    name: 'Daily Puja Ritual',
    price: 499,
    category: 'Daily Rituals',
    duration: '45 mins',
    description: 'Traditional daily puja performed by certified priests with proper mantras and rituals',
    icon: Flame,
    fullDescription: `Experience the divine through our authentic Daily Puja Ritual service. Our certified priests perform traditional prayers and worship ceremonies following Vedic principles. Each ritual is personalized to your preferences and spiritual goals.

The ritual includes proper preparation, sacred chanting (mantras), offerings, and blessings. All materials and items needed for the puja are provided by our trained priests.`,
    includes: [
      'Traditional mantra chanting',
      'Flower and incense offerings',
      'Blessed prasad (sacred food)',
      'Personal spiritual blessing',
      'Ritual completion certificate'
    ],
    highlights: [
      'Certified Vedic priests',
      'Authentic traditional methods',
      'Personalized experience',
      'Same-day booking available'
    ],
    reviews: 4.8,
    reviewCount: 245,
  },
  2: {
    name: 'Abhisheka Service',
    price: 799,
    category: 'Offerings',
    duration: '1 hour',
    description: 'Sacred offering with sacred water, honey, and flowers - a blessing ritual',
    icon: Lotus,
    fullDescription: `Abhisheka is one of the most sacred rituals in Hindu traditions. This service involves ceremonial bathing with sacred water, milk, honey, and other offerings. It is believed to bring cleansing, prosperity, and divine blessings.

Our priests perform this ancient ritual with utmost devotion and authenticity, following proper procedures and mantras.`,
    includes: [
      'Sacred water preparation',
      'Honey and milk offerings',
      'Fresh flower arrangements',
      'Mantras and chanting',
      'Blessed water to take home'
    ],
    highlights: [
      'Deeply spiritual experience',
      'Customizable offerings',
      'Beautiful presentation',
      'Family participation welcome'
    ],
    reviews: 4.9,
    reviewCount: 189,
  },
  3: {
    name: 'Vedic Consultation',
    price: 1999,
    category: 'Consultations',
    duration: '1 hour',
    description: 'Personal guidance from experienced vedic scholars and spiritual masters',
    icon: BookOpen,
    fullDescription: `Receive personalized guidance from our experienced Vedic scholars. Discuss your spiritual path, life questions, and seek wisdom from ancient Vedic teachings. This consultation is designed to provide clarity and direction in your spiritual journey.

Our consultants have deep knowledge of Vedic texts, yoga philosophy, and spiritual practices.`,
    includes: [
      '1-hour one-on-one consultation',
      'Personalized spiritual guidance',
      'Vedic wisdom sharing',
      'Meditation recommendations',
      'Follow-up resources'
    ],
    highlights: [
      'Expert scholars',
      'Confidential sessions',
      'Online or in-person options',
      'Customized guidance'
    ],
    reviews: 4.7,
    reviewCount: 156,
  },
  4: {
    name: 'Special Havan',
    price: 1499,
    category: 'Special Rituals',
    duration: '2 hours',
    description: 'Fire ritual for prosperity, peace, and spiritual purification',
    icon: Sparkles,
    fullDescription: `Havan (also known as Yajna) is a sacred fire ritual performed to invoke divine blessings. The ritual involves chanting Vedic mantras while offerings are made into a sacred fire. It is believed to purify the environment and bring prosperity and peace.

Our priests conduct this elaborate ritual with complete authenticity and devotion.`,
    includes: [
      'Sacred fire preparation',
      'Vedic mantra chanting',
      'Herbal and flower offerings',
      'Complete ritual materials',
      'Ash distribution for blessing'
    ],
    highlights: [
      'Most powerful ritual',
      'Full purification experience',
      'Excellent for life events',
      'Group participation possible'
    ],
    reviews: 4.9,
    reviewCount: 203,
  },
  5: {
    name: 'Festival Offerings',
    price: 699,
    category: 'Offerings',
    duration: '1.5 hours',
    description: 'Complete offerings for festivals and celebrations throughout the year',
    icon: Gift,
    fullDescription: `Celebrate festivals with proper traditions through our Festival Offerings service. Whether it's Diwali, Holi, Navratri, or any other important festival, we provide complete offerings and rituals.

Our priests ensure that all festival traditions are followed correctly and reverently.`,
    includes: [
      'Festival-specific decorations',
      'Traditional offerings',
      'Festive sweets and treats',
      'Rangoli designs',
      'Complete celebration setup'
    ],
    highlights: [
      'All festivals covered',
      'Traditional authenticity',
      'Family involvement',
      'Photo memories included'
    ],
    reviews: 4.8,
    reviewCount: 178,
  },
  6: {
    name: 'Event Planning & Ritual',
    price: 2499,
    category: 'Planning',
    duration: 'Custom',
    description: 'Complete planning and execution of major rituals and spiritual events',
    icon: Calendar,
    fullDescription: `For major life events like weddings, housewarming, or important ceremonies, we provide complete event planning with authentic ritual execution. Our team handles every detail to ensure a spiritually meaningful and beautifully executed event.`,
    includes: [
      'Complete event planning',
      'Multiple priest coordination',
      'Custom ritual design',
      'Full decoration setup',
      'Event documentation'
    ],
    highlights: [
      'Fully customized events',
      'Professional coordination',
      'Memorable experiences',
      'End-to-end management'
    ],
    reviews: 4.9,
    reviewCount: 134,
  },
  7: {
    name: 'Morning Aarti',
    price: 299,
    category: 'Daily Rituals',
    duration: '30 mins',
    description: 'Traditional morning worship and light ceremony to start your day',
    icon: Flame,
    fullDescription: `Begin your day with our Morning Aarti service. This brief but spiritually uplifting ritual involves the waving of lamps and incense while singing sacred hymns. It is the perfect way to connect with divine energy at the start of each day.`,
    includes: [
      'Sacred lamp waving',
      'Traditional hymn singing',
      'Incense offering',
      'Quick morning blessing',
      'Energized start to your day'
    ],
    highlights: [
      'Short and effective',
      'Morning-perfect timing',
      'Uplifting atmosphere',
      'Daily option available'
    ],
    reviews: 4.7,
    reviewCount: 267,
  },
  8: {
    name: 'Astrology Reading',
    price: 1299,
    category: 'Consultations',
    duration: '45 mins',
    description: 'Detailed birth chart analysis and personalized astrological guidance',
    icon: BookOpen,
    fullDescription: `Understand your destiny through our Astrology Reading service. Our certified astrologers analyze your birth chart to provide insights into your personality, life path, and future possibilities. Receive personalized recommendations based on ancient Vedic astrology.`,
    includes: [
      'Birth chart creation',
      'Chart analysis and interpretation',
      'Planetary position insights',
      'Remedial measures',
      'Future predictions'
    ],
    highlights: [
      'Vedic astrology expertise',
      'Detailed analysis',
      'Practical remedies',
      'Digital chart provided'
    ],
    reviews: 4.6,
    reviewCount: 198,
  },
}

export default function ServiceDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const service = servicesData[id as keyof typeof servicesData]
  const [quantity, setQuantity] = useState(1)

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service not found</h1>
            <Link href="/services" className="text-primary hover:underline">
              Back to Services
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const Icon = service.icon

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: any) => item.id === id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        id,
        name: service.name,
        price: service.price,
        quantity,
      })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    
    // Update cart count
    const cartCount = document.getElementById('cart-count')
    if (cartCount) {
      const total = cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
      cartCount.textContent = total.toString()
    }

    alert(`${service.name} added to cart!`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border px-4">
        <div className="mx-auto max-w-7xl py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link href="/services" className="text-muted-foreground hover:text-foreground">Services</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{service.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-1 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <Link href="/services" className="text-primary hover:underline mb-8 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left - Service Info */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-4 bg-primary/10 rounded-lg w-fit">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-sm px-3 py-1 bg-accent/20 text-accent rounded-full font-medium">
                    {service.category}
                  </div>
                </div>
                <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold">★ {service.reviews}</span>
                    <span className="text-muted-foreground">({service.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8 prose prose-sm max-w-none">
                <p className="text-lg text-muted-foreground mb-6 whitespace-pre-line">
                  {service.fullDescription}
                </p>
              </div>

              {/* What's Included */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                <ul className="space-y-3">
                  {service.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Why Choose This Service</h2>
                <div className="grid grid-cols-2 gap-4">
                  {service.highlights.map((highlight, idx) => (
                    <div key={idx} className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="font-medium">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-card rounded-lg border border-border p-8">
                <div className="mb-6">
                  <div className="text-sm text-muted-foreground mb-2">Price</div>
                  <div className="text-4xl font-bold text-primary mb-2">₹{service.price}</div>
                  <div className="text-sm text-muted-foreground">⏱️ Duration: {service.duration}</div>
                </div>

                <div className="mb-6 border-t border-border pt-6">
                  <label className="block text-sm font-medium mb-3">Quantity</label>
                  <div className="flex items-center gap-3 border border-border rounded-lg p-2 w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 hover:bg-muted rounded transition"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 hover:bg-muted rounded transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Total Price</div>
                  <div className="text-2xl font-bold">₹{service.price * quantity}</div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition mb-3"
                >
                  Add to Cart
                </button>

                <button className="w-full px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition">
                  Book Now
                </button>

                <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span>✓</span>
                    <span>Certified priests</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span>✓</span>
                    <span>Authentic rituals</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span>✓</span>
                    <span>Satisfaction guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
