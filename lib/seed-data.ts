// Seed data for initial display on Vercel
// This ensures data is visible even without a database

export const defaultCategories = [
  {
    id: '1',
    name: 'Daily Rituals',
    slug: 'daily-rituals',
    description: 'Daily puja and worship services',
    showOnNavbar: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Offerings',
    slug: 'offerings',
    description: 'Sacred offerings and abhisheka services',
    showOnNavbar: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Consultations',
    slug: 'consultations',
    description: 'Vedic consultations and guidance',
    showOnNavbar: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Special Rituals',
    slug: 'special-rituals',
    description: 'Special havan and fire rituals',
    showOnNavbar: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Planning',
    slug: 'planning',
    description: 'Event planning and ritual coordination',
    showOnNavbar: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Pujas & Vrat',
    slug: 'pujas-vrat',
    description: 'Traditional pujas and vrat observances',
    showOnNavbar: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Yagnas / Homas',
    slug: 'yagnas-homas',
    description: 'Sacred fire rituals and yagnas',
    showOnNavbar: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Dosha Nivaran',
    slug: 'dosha-nivaran',
    description: 'Remedial pujas for dosha removal',
    showOnNavbar: true,
    createdAt: new Date().toISOString(),
  },
]

export const defaultPujas = [
  {
    id: '1',
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
    duration: '2-3 hours',
    image: null,
    video: null,
    specifications: [
      { label: 'Duration', value: '2-3 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All puja materials and decorations' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
      { label: 'Best Time', value: 'Evening' },
    ],
    japaOptions: [
      { label: '11000 Chants', value: '11000' },
      { label: '21000 Chants', value: '21000' },
    ],
    features: ['Traditional rituals', 'Certified priests', 'Complete materials'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Ganesh Chaturthi Puja',
    sku: 'GC-001',
    price: 4500,
    priceLabel: 'From',
    category: 'Pujas & Vrat',
    categorySlug: 'pujas-vrat',
    shortDescription: 'Celebrate the birth of Lord Ganesha with this auspicious puja that brings wisdom, prosperity, and removes obstacles.',
    fullDescription: `Ganesh Chaturthi is one of the most celebrated festivals in India, marking the birth of Lord Ganesha, the remover of obstacles and the god of wisdom and prosperity.

This puja is performed with great devotion and includes the installation of Ganesha idol, elaborate decorations, traditional offerings, and sacred mantras. The ritual is believed to bring good fortune, success in endeavors, and remove all obstacles from your path.`,
    duration: '1.5-2 hours',
    image: null,
    video: null,
    specifications: [
      { label: 'Duration', value: '1.5-2 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'Idol, decorations, and all materials' },
      { label: 'Location', value: 'Home or Temple' },
      { label: 'Language', value: 'Sanskrit & Hindi' },
    ],
    japaOptions: [
      { label: '11000 Chants', value: '11000' },
    ],
    features: ['Idol installation', 'Traditional offerings', 'Blessings'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Lakshmi Puja',
    sku: 'LP-001',
    price: 5500,
    priceLabel: 'From',
    category: 'Pujas & Vrat',
    categorySlug: 'pujas-vrat',
    shortDescription: 'Invoke the blessings of Goddess Lakshmi for wealth, prosperity, and abundance.',
    fullDescription: `Goddess Lakshmi is the deity of wealth, prosperity, and fortune. This puja is performed to seek her blessings for financial stability, abundance, and overall prosperity in life.

The ritual includes special mantras, traditional offerings, and worship of the goddess. It is believed to attract wealth, remove financial obstacles, and bring prosperity to the family.`,
    duration: '1.5-2 hours',
    image: null,
    video: null,
    specifications: [
      { label: 'Duration', value: '1.5-2 hours' },
      { label: 'Priest Level', value: 'Certified Vedic Priest' },
      { label: 'Materials Included', value: 'All materials provided' },
      { label: 'Location', value: 'Home or Temple' },
    ],
    japaOptions: [
      { label: '11000 Chants', value: '11000' },
    ],
    features: ['Wealth blessings', 'Prosperity rituals'],
    createdAt: new Date().toISOString(),
  },
]
