'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import {
    Phone,
    Mail,
    MapPin,
    Send,
    MessageSquare,
    Clock,
    ChevronRight,
    Sparkles,
    PhoneCall,
    Smartphone
} from 'lucide-react'

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })

        setTimeout(() => setIsSubmitted(false), 5000)
    }

    const contactInfo = [
        {
            icon: <MapPin className="w-8 h-8 text-primary" />,
            title: "Visit Us",
            details: [
                "B-10/303, Ramjash CHS, Ramdev park,",
                "near bhakti Ram mandir,",
                "Mira Road (E) - 401107"
            ],
            link: "https://maps.google.com/?q=Ramjash+CHS+Mira+Road"
        },
        {
            icon: <PhoneCall className="w-8 h-8 text-primary" />,
            title: "Call Us",
            details: [
                "+91 70213 24717 (Primary)",
                "+91 93209 55282",
                "+91 95944 29032"
            ],
            link: "tel:+917021324717"
        },
        {
            icon: <Mail className="w-8 h-8 text-primary" />,
            title: "Email Us",
            details: [
                "info@bookpanditjiseva.com",
                "support@bookpanditjiseva.com"
            ],
            link: "mailto:info@bookpanditjiseva.com"
        }
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            {/* Breadcrumb */}
            <div className="border-b border-border/50 px-4">
                <div className="mx-auto max-w-7xl w-full py-4 text-sm flex items-center gap-2">
                    <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">Contact Us</span>
                </div>
            </div>

            {/* Hero Header */}
            <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-primary/5 via-accent/5 to-transparent">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,200,0,0.1),transparent_70%)]" />
                <div className="mx-auto max-w-7xl px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20 mb-6 shadow-sm">
                        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-sm font-bold text-primary tracking-wide">Connect With Divine Grace</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                        Contact Us
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Have questions about our e-puja services? Reach out to us for spiritual guidance and authentic traditional online rituals.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="px-4 -mt-12 mb-20 relative z-20">
                <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
                    {contactInfo.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white dark:bg-card p-10 rounded-3xl border-2 border-border/50 shadow-xl hover:shadow-2xl hover:border-primary/50 hover:scale-[1.02] transition-all group relative overflow-hidden text-center"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                {item.icon}
                            </div>
                            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:rotate-6 transition-all">
                                {React.cloneElement(item.icon, { className: 'w-10 h-10 text-primary group-hover:text-white transition-colors' })}
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                            <div className="space-y-2">
                                {item.details.map((line, i) => (
                                    <p key={i} className="text-muted-foreground font-medium leading-relaxed">{line}</p>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* Contact Form & Messaging */}
            <section className="px-4 py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
                <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Message Side */}
                    <div className="space-y-10 order-2 lg:order-1">
                        <div className="inline-block p-4 bg-primary/10 rounded-2xl border border-primary/20">
                            <MessageSquare className="w-10 h-10 text-primary" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                                Send us a <span className="text-primary">Message</span>
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                Whether you need guidance on e-puja services, want to book a virtual ceremony, or have questions about our online spiritual offerings, we're here to help.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Our team of experienced pandits is available to assist you with personalized e-puja services from the comfort of your home.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 text-accent">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground">Quick Response</h4>
                                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                                    <Smartphone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground">WhatsApp Support</h4>
                                    <p className="text-sm text-muted-foreground">Always active</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Premium Form Side */}
                    <div className="order-1 lg:order-2">
                        <div className="bg-white dark:bg-card p-10 md:p-12 rounded-[2.5rem] border-2 border-border/50 shadow-2xl relative overflow-hidden card-elevated">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl -z-10" />

                            {isSubmitted ? (
                                <div className="py-20 text-center space-y-6 animate-fade-in">
                                    <div className="w-24 h-24 bg-green-500/20 text-green-600 rounded-full flex items-center justify-center mx-auto scale-110">
                                        <Send className="w-10 h-10 animate-pulse" />
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-green-600">Message Sent!</h3>
                                    <p className="text-muted-foreground font-medium">Thank you for reaching out. We'll be in touch soon.</p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-primary font-bold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-muted-foreground ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="John Doe"
                                                className="w-full px-6 py-4 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-2xl outline-none transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-muted-foreground ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="john@example.com"
                                                className="w-full px-6 py-4 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-2xl outline-none transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-muted-foreground ml-1">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            placeholder="Puja Inquiry"
                                            className="w-full px-6 py-4 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-2xl outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-muted-foreground ml-1">Your Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            placeholder="How can we help you today?"
                                            rows={5}
                                            className="w-full px-6 py-4 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-2xl outline-none transition-all font-medium resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-5 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <Send className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="px-4 py-20 pb-0">
                <div className="mx-auto max-w-7xl">
                    <div className="h-[450px] w-full rounded-[3rem] border-4 border-white dark:border-card shadow-2xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.485295171732!2d72.853372!3d19.283333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDE3JzAwLjAiTiA3MsKwNTEnMTIuMSJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="brightness-90 contrast-125"
                        />
                        <div className="absolute inset-0 pointer-events-none border-[12px] border-white/10 rounded-[2.5rem]" />
                    </div>
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </div>
    )
}
