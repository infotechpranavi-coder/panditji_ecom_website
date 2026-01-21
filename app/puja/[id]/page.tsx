'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { ChevronRight, Facebook, Twitter, Linkedin, MessageCircle, Share2, Star, Check } from 'lucide-react'
import { useState } from 'react'

// Sample puja data - In production, fetch from API
const pujasData: Record<string, any> = {
  '1': {
    name: 'Diwali Puja',
    sku: 'DP-001',
    price: 8500,
    priceLabel: 'From',
    category: 'Festival',
    categorySlug: 'pujas-vrat',
    shortDescription: 'Celebrate the festival of lights with this auspicious Diwali puja that brings prosperity, happiness, and removes darkness from your life.',
    fullDescription: `Diwali, the festival of lights, is one of the most important Hindu festivals celebrated across India. This puja is performed to honor Goddess Lakshmi and Lord Ganesha, seeking their blessings for wealth, prosperity, and wisdom.

The ritual includes traditional lighting of diyas, elaborate decorations, sacred mantras, and offerings. It is believed to bring light into your life, remove obstacles, and invite divine blessings for a prosperous year ahead.

Benefits:
• Invokes blessings of Goddess Lakshmi for wealth and prosperity
• Removes darkness and negativity from life
• Brings happiness and joy to the family
• Ensures success in all endeavors
• Purifies the home and environment`,
    specifications: [
      { label: 'Duration', value: '2-3 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All puja materials and decorations' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
      { label: 'Best Time', value: 'Evening' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [
      { label: '11000 Chants', value: '11000' },
      { label: '21000 Chants', value: '21000' },
    ],
  },
  '2': {
    name: 'New Year Puja and Yagna',
    sku: 'NY-001',
    price: 5500,
    priceLabel: 'From',
    category: 'Festival',
    categorySlug: 'pujas-vrat',
    shortDescription: 'Start the new year with divine blessings through this sacred puja and yagna ceremony.',
    fullDescription: `Begin your new year on an auspicious note with this comprehensive puja and yagna ceremony. This ritual is performed to seek divine blessings for a prosperous, peaceful, and successful year ahead.

The ceremony combines traditional puja rituals with a sacred fire yagna, invoking the blessings of the divine for health, wealth, happiness, and spiritual growth.`,
    specifications: [
      { label: 'Duration', value: '2-3 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials for puja and yagna' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [
      { label: '11000 Chants', value: '11000' },
    ],
  },
  '3': {
    name: 'Kuber Puja & Yagna',
    sku: 'KP-001',
    price: 8500,
    priceLabel: 'From',
    category: 'Festival',
    categorySlug: 'pujas-vrat',
    shortDescription: 'Invoke the blessings of Lord Kuber, the god of wealth, through this powerful puja and yagna.',
    fullDescription: `Lord Kuber is the treasurer of the gods and the guardian of wealth. This puja and yagna is performed to seek his blessings for financial prosperity, stability, and abundance.

The ritual includes special mantras dedicated to Lord Kuber, fire offerings, and traditional worship. It is believed to attract wealth, remove financial obstacles, and ensure steady income flow.`,
    specifications: [
      { label: 'Duration', value: '2-3 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [
      { label: '11000 Chants', value: '11000' },
      { label: '21000 Chants', value: '21000' },
    ],
  },
  '4': {
    name: 'Mahakali Puja & Yagna',
    sku: 'MK-001',
    price: 9500,
    priceLabel: 'From',
    category: 'Festival',
    categorySlug: 'pujas-vrat',
    shortDescription: 'Seek the powerful blessings of Goddess Mahakali through this sacred puja and yagna ceremony.',
    fullDescription: `Goddess Mahakali is the fierce form of the Divine Mother, representing power, protection, and destruction of evil. This puja and yagna is performed to seek her blessings for protection, strength, and removal of negative energies.

The ritual is powerful and includes special mantras, fire offerings, and traditional worship. It helps remove obstacles, protects from negative influences, and brings courage and strength.`,
    specifications: [
      { label: 'Duration', value: '2-3 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [
      { label: '11000 Chants', value: '11000' },
      { label: '21000 Chants', value: '21000' },
    ],
  },
  '5': {
    name: 'Ganesh Chaturthi Puja',
    sku: 'GC-001',
    price: 4500,
    priceLabel: 'From',
    category: 'Pujas & Vrat',
    categorySlug: 'pujas-vrat',
    shortDescription: 'Celebrate the birth of Lord Ganesha with this auspicious puja that brings wisdom, prosperity, and removes obstacles.',
    fullDescription: `Ganesh Chaturthi is one of the most celebrated festivals in India, marking the birth of Lord Ganesha, the remover of obstacles and the god of wisdom and prosperity.

This puja is performed with great devotion and includes the installation of Ganesha idol, elaborate decorations, traditional offerings, and sacred mantras. The ritual is believed to bring good fortune, success in endeavors, and remove all obstacles from your path.

The puja includes:
• Ganesha idol installation and decoration
• Traditional offerings (modak, flowers, fruits)
• Vedic mantras and chanting
• Aarti ceremony
• Prasad distribution
• Blessings for prosperity and success`,
    specifications: [
      { label: 'Duration', value: '1.5-2 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'Idol, decorations, and all materials' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
      { label: 'Best Time', value: 'Morning or Evening' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [
      { label: '11000 Chants', value: '11000' },
      { label: '21000 Chants', value: '21000' },
    ],
  },
  '6': {
    name: 'Navratri Puja',
    sku: 'NV-001',
    price: 6500,
    priceLabel: 'From',
    category: 'Pujas & Vrat',
    categorySlug: 'pujas-vrat',
    shortDescription: 'Honor the nine forms of Goddess Durga during Navratri with this sacred puja ceremony.',
    fullDescription: `Navratri is a nine-night festival dedicated to the worship of Goddess Durga in her nine different forms. This puja is performed to seek the blessings of the Divine Mother for protection, strength, and spiritual growth.

Each day of Navratri is dedicated to a different form of the goddess, and the puja includes special mantras, offerings, and rituals for each form.`,
    specifications: [
      { label: 'Duration', value: '1-2 hours per day' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [
      { label: '11000 Chants', value: '11000' },
    ],
  },
  '7': {
    name: 'Satyanarayan Puja',
    sku: 'SN-001',
    price: 3500,
    priceLabel: 'From',
    category: 'Pujas & Vrat',
    categorySlug: 'pujas-vrat',
    shortDescription: 'Perform this auspicious Satyanarayan Puja to seek blessings of Lord Vishnu for peace and prosperity.',
    fullDescription: `Satyanarayan Puja is one of the most popular pujas in Hindu tradition, performed to honor Lord Vishnu in his form as Satyanarayan. This puja brings peace, prosperity, and harmony to the family.

The ritual includes reading of the Satyanarayan Katha, traditional offerings, and sacred mantras. It is often performed on special occasions, full moon days, or to fulfill vows.`,
    specifications: [
      { label: 'Duration', value: '2-3 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [
      { label: '11000 Chants', value: '11000' },
    ],
  },
  '8': {
    name: 'Lakshmi Puja',
    sku: 'LP-001',
    price: 5500,
    priceLabel: 'From',
    category: 'Pujas & Vrat',
    categorySlug: 'pujas-vrat',
    shortDescription: 'Invoke the blessings of Goddess Lakshmi for wealth, prosperity, and abundance.',
    fullDescription: `Goddess Lakshmi is the deity of wealth, prosperity, and fortune. This puja is performed to seek her blessings for financial stability, abundance, and overall prosperity in life.

The ritual includes special mantras, traditional offerings, and worship of the goddess. It is believed to attract wealth, remove financial obstacles, and bring prosperity to the family.`,
    specifications: [
      { label: 'Duration', value: '1.5-2 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [
      { label: '11000 Chants', value: '11000' },
    ],
  },
  '9': {
    name: 'Pradosh Vrat Pooja',
    sku: 'PV-001',
    price: 5000,
    priceLabel: 'From',
    category: 'Pujas & Vrat',
    categorySlug: 'pujas-vrat',
    shortDescription: 'Observe Pradosh Vrat and perform this sacred puja dedicated to Lord Shiva.',
    fullDescription: `Pradosh Vrat is observed on the 13th day of both lunar fortnights. This puja is dedicated to Lord Shiva and is performed during the Pradosh period (evening twilight).

The ritual is believed to bring peace, prosperity, and fulfillment of desires. It helps remove obstacles and brings divine blessings.`,
    specifications: [
      { label: 'Duration', value: '1-2 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [
      { label: '11000 Chants', value: '11000' },
    ],
  },
  '10': {
    name: 'Akarshan MahaPuja & Yagna',
    sku: 'AM-001',
    price: 11511,
    priceLabel: 'From',
    category: 'Pujas & Vrat',
    categorySlug: 'pujas-vrat',
    shortDescription: 'Perform this powerful MahaPuja and Yagna to attract positive energies and opportunities.',
    fullDescription: `Akarshan MahaPuja is a powerful ritual performed to attract positive energies, opportunities, and success. This comprehensive ceremony combines puja rituals with a sacred fire yagna.

The ritual helps attract what you desire, removes negative influences, and brings positive changes in life. It is particularly beneficial for career growth, relationships, and overall success.`,
    specifications: [
      { label: 'Duration', value: '3-4 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [
      { label: '11000 Chants', value: '11000' },
      { label: '21000 Chants', value: '21000' },
    ],
  },
  '11': {
    name: 'NavaDurga Puja & Homa',
    sku: 'ND-001',
    price: 27500,
    priceLabel: 'From',
    category: 'Pujas & Vrat',
    categorySlug: 'pujas-vrat',
    shortDescription: 'Worship all nine forms of Goddess Durga through this comprehensive puja and homa ceremony.',
    fullDescription: `NavaDurga Puja honors the nine forms of Goddess Durga, each representing different aspects of divine feminine energy. This elaborate ceremony includes puja rituals and a sacred fire homa.

The ritual brings protection, strength, wisdom, and spiritual growth. It is particularly powerful for removing obstacles, gaining courage, and achieving success in all endeavors.`,
    specifications: [
      { label: 'Duration', value: '4-5 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [
      { label: '11000 Chants', value: '11000' },
      { label: '21000 Chants', value: '21000' },
      { label: '51000 Chants', value: '51000' },
    ],
  },
  '12': {
    name: 'Kaal Sarp Dosh Nivaran Puja',
    sku: 'KS-001',
    price: 10500,
    priceLabel: 'From',
    category: 'Pujas & Vrat',
    categorySlug: 'pujas-vrat',
    shortDescription: 'Remedial puja to neutralize the effects of Kaal Sarp Dosh in your horoscope.',
    fullDescription: `Kaal Sarp Dosh is an astrological condition that occurs when all planets are positioned between Rahu and Ketu. This puja is performed to neutralize its negative effects and bring peace and prosperity.

The ritual includes special mantras, offerings, and prayers to Lord Shiva and other deities. It helps remove obstacles, brings relief from problems, and ensures overall well-being.`,
    specifications: [
      { label: 'Duration', value: '2-3 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [
      { label: '11000 Chants', value: '11000' },
      { label: '21000 Chants', value: '21000' },
    ],
  },
  '13': {
    name: 'Bal Gopal puja',
    sku: 'BG-001',
    price: 8500,
    priceLabel: 'From',
    category: 'Pujas & Vrat',
    categorySlug: 'pujas-vrat',
    shortDescription: 'Worship the divine child form of Lord Krishna through this beautiful Bal Gopal puja.',
    fullDescription: `Bal Gopal is the childhood form of Lord Krishna, representing innocence, joy, and divine love. This puja is performed to seek his blessings for happiness, peace, and protection of children.

The ritual includes special offerings, mantras, and worship of the divine child. It brings joy, removes worries, and ensures the well-being of children in the family.`,
    specifications: [
      { label: 'Duration', value: '1.5-2 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [
      { label: '11000 Chants', value: '11000' },
    ],
  },
  '14': {
    name: 'Root Chakra Balancing',
    sku: 'RC-001',
    price: 3500,
    priceLabel: 'From',
    category: 'Chakra Balancing',
    categorySlug: 'chakra-balancing',
    shortDescription: 'Balance your Root Chakra (Muladhara) for stability, security, and grounding.',
    fullDescription: `The Root Chakra (Muladhara) is the foundation of your energy system. This puja helps balance and activate this chakra, bringing stability, security, and a sense of grounding.

When balanced, the Root Chakra provides a strong foundation for all other chakras and helps you feel secure, stable, and connected to the earth.`,
    specifications: [
      { label: 'Duration', value: '1-1.5 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [],
  },
  '15': {
    name: 'Sacral Chakra Balancing',
    sku: 'SC-001',
    price: 3500,
    priceLabel: 'From',
    category: 'Chakra Balancing',
    categorySlug: 'chakra-balancing',
    shortDescription: 'Balance your Sacral Chakra (Svadhisthana) for creativity, passion, and emotional well-being.',
    fullDescription: `The Sacral Chakra (Svadhisthana) governs creativity, passion, and emotional expression. This puja helps balance this chakra, enhancing creativity, passion, and emotional well-being.

When balanced, the Sacral Chakra helps you express your emotions healthily, enhances creativity, and brings joy and passion into your life.`,
    specifications: [
      { label: 'Duration', value: '1-1.5 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [],
  },
  '16': {
    name: 'Solar Plexus Balancing',
    sku: 'SP-001',
    price: 4000,
    priceLabel: 'From',
    category: 'Chakra Balancing',
    categorySlug: 'chakra-balancing',
    shortDescription: 'Balance your Solar Plexus Chakra (Manipura) for confidence, power, and self-esteem.',
    fullDescription: `The Solar Plexus Chakra (Manipura) is the center of personal power, confidence, and self-esteem. This puja helps balance this chakra, enhancing confidence, personal power, and self-worth.

When balanced, the Solar Plexus Chakra helps you feel confident, empowered, and in control of your life.`,
    specifications: [
      { label: 'Duration', value: '1-1.5 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [],
  },
  '17': {
    name: 'Heart Chakra Balancing',
    sku: 'HC-001',
    price: 4500,
    priceLabel: 'From',
    category: 'Chakra Balancing',
    categorySlug: 'chakra-balancing',
    shortDescription: 'Balance your Heart Chakra (Anahata) for love, compassion, and emotional healing.',
    fullDescription: `The Heart Chakra (Anahata) is the center of love, compassion, and emotional healing. This puja helps balance this chakra, opening your heart to give and receive love.

When balanced, the Heart Chakra helps you experience love, compassion, and emotional healing. It brings harmony in relationships and helps you connect with others on a deeper level.`,
    specifications: [
      { label: 'Duration', value: '1-1.5 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [],
  },
  '18': {
    name: 'Throat Chakra Balancing',
    sku: 'TC-001',
    price: 4000,
    priceLabel: 'From',
    category: 'Chakra Balancing',
    categorySlug: 'chakra-balancing',
    shortDescription: 'Balance your Throat Chakra (Vishuddha) for communication, expression, and truth.',
    fullDescription: `The Throat Chakra (Vishuddha) governs communication, expression, and speaking your truth. This puja helps balance this chakra, enhancing your ability to communicate effectively and express yourself authentically.

When balanced, the Throat Chakra helps you communicate clearly, express your thoughts and feelings, and speak your truth with confidence.`,
    specifications: [
      { label: 'Duration', value: '1-1.5 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [],
  },
  '19': {
    name: 'Third Eye Balancing',
    sku: 'TE-001',
    price: 5000,
    priceLabel: 'From',
    category: 'Chakra Balancing',
    categorySlug: 'chakra-balancing',
    shortDescription: 'Balance your Third Eye Chakra (Ajna) for intuition, insight, and spiritual awareness.',
    fullDescription: `The Third Eye Chakra (Ajna) is the center of intuition, insight, and spiritual awareness. This puja helps balance this chakra, enhancing your intuition, inner vision, and spiritual awareness.

When balanced, the Third Eye Chakra helps you see beyond the physical realm, enhances your intuition, and brings clarity and insight into your life.`,
    specifications: [
      { label: 'Duration', value: '1-1.5 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    reviews: [],
    rating: 0,
    image: '/placeholder.jpg',
    japaOptions: [],
  },
}

export default function PujaDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const puja = pujasData[id]
  const [activeTab, setActiveTab] = useState<'description' | 'specification' | 'reviews'>('description')
  const [selectedJapa, setSelectedJapa] = useState(puja?.japaOptions?.[0]?.value || '')
  const [quantity, setQuantity] = useState(1)

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

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: any) => item.id === id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        id,
        name: puja.name,
        price: puja.price,
        quantity,
        japa: selectedJapa,
      })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    
    // Update cart count
    const cartCount = document.getElementById('cart-count')
    if (cartCount) {
      const total = cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
      cartCount.textContent = total.toString()
    }

    alert(`${puja.name} added to cart!`)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    window.location.href = '/checkout'
  }

  const handleWhatsAppBuy = () => {
    const message = `Hi, I want to book: ${puja.name} - ₹${puja.price}`
    window.open(`https://wa.me/911234567890?text=${encodeURIComponent(message)}`, '_blank')
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
              <Link href="/services" className="text-muted-foreground hover:text-foreground">Shop</Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link href={`/services?category=${puja.categorySlug}`} className="text-muted-foreground hover:text-foreground">{puja.category}</Link>
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
            {/* Left - Product Image */}
            <div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center">
                <div className="text-8xl opacity-30">🙏</div>
                {/* In production, use: <img src={puja.image} alt={puja.name} className="w-full h-full object-cover" /> */}
              </div>
              <p className="text-sm text-muted-foreground text-center">Roll over image to zoom in</p>
            </div>

            {/* Right - Product Details */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">{puja.name}</h1>
              <p className="text-sm text-muted-foreground mb-6">SKU: {puja.sku}</p>
              
              {/* Price */}
              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-1">{puja.priceLabel}:</div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">₹{puja.price.toLocaleString('en-IN')}</div>
              </div>

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
                  <button
                    onClick={() => setSelectedJapa(puja.japaOptions[0].value)}
                    className="text-sm text-primary hover:underline mt-2"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* Final Price */}
              <div className="mb-6 p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">₹{puja.price.toLocaleString('en-IN')}</div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full px-6 py-3 bg-gray-900 dark:bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                >
                  Add to cart
                </button>
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
                <Link href={`/services?category=${puja.categorySlug}`} className="text-primary hover:underline">
                  {puja.category}
                </Link>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border mb-6">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-4 px-2 font-semibold text-sm transition-colors ${
                  activeTab === 'description'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specification')}
                className={`pb-4 px-2 font-semibold text-sm transition-colors ${
                  activeTab === 'specification'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Specification
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 px-2 font-semibold text-sm transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Reviews ({puja.reviews.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="prose prose-sm max-w-none">
            {activeTab === 'description' && (
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {puja.fullDescription}
              </div>
            )}

            {activeTab === 'specification' && (
              <div className="space-y-4">
                {puja.specifications.map((spec: any, idx: number) => (
                  <div key={idx} className="flex border-b border-border/50 pb-3">
                    <div className="w-48 font-semibold text-gray-900 dark:text-white">{spec.label}:</div>
                    <div className="flex-1 text-gray-700 dark:text-gray-300">{spec.value}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                {puja.reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No reviews yet. Be the first to review this puja!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {puja.reviews.map((review: any, idx: number) => (
                      <div key={idx} className="border-b border-border/50 pb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-semibold">{review.name}</span>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
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
    </div>
  )
}
