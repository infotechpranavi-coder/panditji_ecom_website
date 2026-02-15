'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ChevronRight, Heart, Users, Award, Flame, User as UserIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    try {
      const response = await fetch('/api/team')
      if (response.ok) {
        const data = await response.json()
        setTeamMembers(data)
      }
    } catch (error) {
      console.error('Error fetching team:', error)
    } finally {
      setLoading(false)
    }
  }

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
      <section className="px-4 py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/15 to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,200,0,0.15),transparent_50%)]" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="inline-block mb-6 px-4 py-1 bg-primary/20 rounded-full">
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">About Us</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-balance leading-tight">
            Bridging <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">Sacred Traditions</span> with Modern Access
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Book My Panditji is dedicated to preserving and sharing authentic Indian temple traditions with devotees worldwide through innovative e-puja services, bringing spiritual ceremonies into the digital era.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-20 gradient-section-1 relative">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-10 card-elevated border border-primary/20 hover:border-primary/40 transition-all">
              <div className="p-5 w-fit bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl mb-6 shadow-lg">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Our Mission</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed text-lg">
                To make authentic Indian temple rituals, pujas, and spiritual services accessible to everyone through e-puja platforms, regardless of their location or lifestyle. We believe in the power of traditions and their ability to bring peace, prosperity, and spiritual growth to modern lives.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Our mission is to serve as a digital bridge between the ancient wisdom of our traditions and the contemporary needs of devotees seeking spiritual fulfillment through online ceremonies.
              </p>
            </div>
            <div className="bg-gradient-to-br from-accent/10 via-accent/5 to-transparent rounded-2xl p-10 card-elevated border border-accent/20 hover:border-accent/40 transition-all">
              <div className="p-5 w-fit bg-gradient-to-br from-accent/30 to-accent/10 rounded-xl mb-6 shadow-lg">
                <Flame className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Our Vision</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed text-lg">
                To become the most trusted e-puja platform for authentic Indian spiritual services, where devotees can experience genuine rituals performed by qualified priests with deep knowledge of Vedic traditions through live virtual ceremonies.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We envision a world where spiritual traditions thrive in the digital age, connecting millions of devotees globally to their roots and spiritual purpose through innovative e-puja services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-20 gradient-section-2 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1 bg-primary/10 rounded-full">
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">Values</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '✨', title: 'Authenticity', desc: 'We perform all rituals following strict Vedic principles and traditional methods passed down through generations.', color: 'from-primary/20 to-primary/5' },
              { icon: '🙏', title: 'Devotion', desc: 'Every ritual is performed with utmost reverence and spiritual dedication, honoring the sacred traditions.', color: 'from-accent/20 to-accent/5' },
              { icon: '🤝', title: 'Trustworthiness', desc: 'We maintain the highest standards of integrity and transparency in all our services and dealings.', color: 'from-primary/20 to-accent/5' },
              { icon: '💝', title: 'Compassion', desc: 'We serve all devotees with equal respect and compassion, regardless of their background.', color: 'from-accent/20 to-primary/5' },
            ].map((value, index) => (
              <div key={index} className={`bg-gradient-to-br ${value.color} rounded-2xl p-8 card-elevated border border-border/50 hover:border-primary/50 transition-all group`}>
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                <h3 className="font-bold text-xl mb-4 group-hover:text-primary transition-colors">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-20 gradient-section-3 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Why Choose Book My Panditji?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the difference of authentic traditions and dedicated service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'Certified Priests', desc: 'All our priests are thoroughly vetted and certified with years of experience in performing authentic rituals and ceremonies.', color: 'from-primary/20 to-primary/5' },
              { icon: Users, title: 'Personalized Service', desc: 'Every ritual is customized to your specific needs, preferences, and spiritual goals, ensuring a truly personal experience.', color: 'from-accent/20 to-accent/5' },
              { icon: Heart, title: 'Complete Satisfaction', desc: 'We stand behind our services with a satisfaction guarantee, committed to delivering excellence in every ritual.', color: 'from-primary/20 to-accent/5' },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className={`bg-gradient-to-br ${item.color} rounded-2xl p-10 card-elevated border border-border/50 hover:border-primary/50 transition-all group`}>
                  <div className="p-4 w-fit bg-gradient-to-br from-primary/30 to-accent/20 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 py-20 gradient-section-1 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1 bg-primary/10 rounded-full">
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our team consists of experienced spiritual guides, certified priests, and service coordinators dedicated to bringing authentic traditions to your doorstep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : teamMembers.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-muted/10 rounded-2xl border border-dashed border-border">
                <p className="text-muted-foreground italic">Meet our dedicated team of spiritual guides and priests coming soon.</p>
              </div>
            ) : (
              teamMembers.map((member, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${idx % 2 === 0 ? 'from-primary/20 to-primary/5' : 'from-accent/20 to-accent/5'} rounded-2xl border border-border/50 p-8 text-center card-elevated hover:border-primary/50 transition-all group`}>
                  <div className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden border-2 border-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center">
                        <span className="text-4xl text-primary/40">🙏</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-sm text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.specialty}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-20 gradient-section-2 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,200,0,0.1),transparent_70%)]" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Devotees Served', icon: '🙏' },
              { number: '25+', label: 'Certified Priests', icon: '✨' },
              { number: '1000+', label: 'Rituals Performed', icon: '🕉️' },
              { number: '4.8★', label: 'Average Rating', icon: '⭐' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-8 bg-card rounded-2xl border border-border/50 card-elevated hover:border-primary/50 transition-all">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-5xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                  {stat.number}
                </div>
                <p className="text-lg font-semibold text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Experience Sacred Traditions?</h2>
          <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto leading-relaxed">
            Explore our authentic Indian temple services and begin your spiritual journey today.
          </p>
          <Link
            href="/services"
            className="px-10 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:bg-white/90 hover:scale-105 transition-all duration-300 inline-block shadow-2xl"
          >
            Explore Services
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
