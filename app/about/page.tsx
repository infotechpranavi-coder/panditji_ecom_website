'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ChevronRight, Heart, Users, Award, Flame } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border px-4">
        <div className="mx-auto max-w-7xl w-full py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">About Us</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 py-16 bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Bridging <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Sacred Traditions</span> with Modern Access
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Divya Puja is dedicated to preserving and sharing authentic Indian temple traditions with devotees worldwide, bringing spiritual services into the modern era.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="p-4 w-fit bg-primary/10 rounded-lg mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                To make authentic Indian temple rituals, pujas, and spiritual services accessible to everyone, regardless of their location or lifestyle. We believe in the power of traditions and their ability to bring peace, prosperity, and spiritual growth to modern lives.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to serve as a bridge between the ancient wisdom of our traditions and the contemporary needs of devotees seeking spiritual fulfillment.
              </p>
            </div>
            <div>
              <div className="p-4 w-fit bg-accent/10 rounded-lg mb-4">
                <Flame className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                To become the most trusted platform for authentic Indian spiritual services, where devotees can experience genuine rituals performed by qualified priests with deep knowledge of Vedic traditions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We envision a world where spiritual traditions thrive in the modern age, connecting millions of devotees to their roots and spiritual purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-bold text-lg mb-2">Authenticity</h3>
              <p className="text-muted-foreground">
                We perform all rituals following strict Vedic principles and traditional methods passed down through generations.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition">
              <div className="text-4xl mb-4">🙏</div>
              <h3 className="font-bold text-lg mb-2">Devotion</h3>
              <p className="text-muted-foreground">
                Every ritual is performed with utmost reverence and spiritual dedication, honoring the sacred traditions.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-bold text-lg mb-2">Trustworthiness</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards of integrity and transparency in all our services and dealings.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="font-bold text-lg mb-2">Compassion</h3>
              <p className="text-muted-foreground">
                We serve all devotees with equal respect and compassion, regardless of their background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Divya Puja?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 border border-border">
              <Award className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-3">Certified Priests</h3>
              <p className="text-muted-foreground">
                All our priests are thoroughly vetted and certified with years of experience in performing authentic rituals and ceremonies.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <Users className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-3">Personalized Service</h3>
              <p className="text-muted-foreground">
                Every ritual is customized to your specific needs, preferences, and spiritual goals, ensuring a truly personal experience.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <Heart className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-3">Complete Satisfaction</h3>
              <p className="text-muted-foreground">
                We stand behind our services with a satisfaction guarantee, committed to delivering excellence in every ritual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold mb-4 text-center">Our Team</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Our team consists of experienced spiritual guides, certified priests, and service coordinators dedicated to bringing authentic traditions to your doorstep.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'Pandit Sharma', role: 'Head Priest & Founder', specialty: 'Vedic Rituals' },
              { name: 'Dr. Ramakrishnan', role: 'Spiritual Guide', specialty: 'Vedic Knowledge' },
              { name: 'Pandit Gupta', role: 'Senior Priest', specialty: 'Havan & Pujas' },
              { name: 'Swami Anand', role: 'Consultant', specialty: 'Astrology & Mantras' },
            ].map((member, idx) => (
              <div key={idx} className="bg-card rounded-lg border border-border p-6 text-center hover:shadow-lg transition">
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🙏</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Devotees Served</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">25+</div>
              <p className="text-muted-foreground">Certified Priests</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">1000+</div>
              <p className="text-muted-foreground">Rituals Performed</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">4.8★</div>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Sacred Traditions?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Explore our authentic Indian temple services and begin your spiritual journey today.
          </p>
          <Link
            href="/services"
            className="px-8 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-primary-foreground/90 transition inline-block"
          >
            Explore Services
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
