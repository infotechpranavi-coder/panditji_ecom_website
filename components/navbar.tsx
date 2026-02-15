'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, Phone, Search, User, ChevronDown, MapPin, Languages } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { AuthModal } from './auth-modal'

interface Category {
  id: string
  _id?: string
  name: string
  slug: string
  description?: string // Added description as optional based on the edit
  showOnNavbar?: boolean // Added showOnNavbar as optional based on the filter logic
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [navbarCategories, setNavbarCategories] = useState<Category[]>([]) // Changed type to Category[]
  const [searchType, setSearchType] = useState<'puja' | 'samagri'>('puja')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [isCityOpen, setIsCityOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)

  const cities = [
    'Mumbai', 'Pune', 'Prayag', 'Delhi', 'Hyderabad',
    'Benaras Kashi', '12 Jyotirlingas'
  ]

  const languages = [
    'Tamil', 'Hindi', 'Marathi', 'Telugu', 'Kannada', 'Malayalam', 'Bengali', 'English'
  ]

  useEffect(() => {
    fetchNavbarCategories()
  }, [])

  const fetchNavbarCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const categories: Category[] = await response.json() // Explicitly type categories
        // Only show categories that have showOnNavbar: true
        const navCategories = categories
          .filter((cat: Category) => cat.showOnNavbar === true) // Use Category type
          .map((cat: Category) => ({ // Use Category type
            id: cat.id || cat._id || '', // Ensure id is always present
            name: cat.name || '', // Ensure name is always present
            slug: cat.slug || '', // Ensure slug is always present
            description: cat.description || '', // Added description
          }))
        setNavbarCategories(navCategories)
      }
    } catch (error) {
      console.error('Error fetching navbar categories:', error)
    }
  }


  return (
    <nav className="sticky top-0 z-50 bg-background shadow-md">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6">
              <Link href="tel:+917021324717" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium">Call Us: +91 7021324717</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/hindu-calendar"
                className="flex items-center gap-1.5 px-3 py-1 hover:bg-primary/10 rounded-full transition-all group border border-transparent hover:border-primary/20"
              >
                <div className="w-5 h-5 truncate bg-primary/20 flex items-center justify-center rounded-sm">📅</div>
                <span className="font-bold text-[11px] group-hover:text-primary transition-colors">Hindu Calendar</span>
              </Link>
              <div className="h-4 w-px bg-border/50 mx-1 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-muted-foreground/60">
                <span className="font-bold text-[10px] uppercase tracking-widest">Language: Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-background border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                🕉️
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xl font-black text-primary">Book Panditji</span>
                  <span className="text-xl font-black text-accent">Seva</span>
                </div>
              </div>
            </Link>

            {/* Search Section */}
            <div className="flex-1 flex flex-col max-w-4xl hidden md:flex pt-1 pb-1">

              {searchType === 'puja' ? (
                <div className="flex items-end gap-3">
                  {/* City Selector */}
                  <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase leading-none px-1">Perform Pooja in</span>
                    <div className="relative">
                      <button
                        onClick={() => { setIsCityOpen(!isCityOpen); setIsLangOpen(false); }}
                        className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-card border-2 border-border rounded-lg hover:border-primary transition-colors text-sm font-medium h-10"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className={`${!selectedCity ? 'text-muted-foreground italic' : ''} truncate`}>
                            {selectedCity || 'Choose City'}
                          </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 ${isCityOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isCityOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-2 w-96 bg-white dark:bg-card p-6 rounded-2xl border-2 border-border shadow-2xl z-[60]"
                          >
                            <h4 className="text-primary font-bold mb-4">Select Your City</h4>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {cities.map((city) => (
                                <button
                                  key={city}
                                  onClick={() => { setSelectedCity(city); setIsCityOpen(false); }}
                                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${selectedCity === city ? 'bg-primary text-white border-primary' : 'border-primary text-primary hover:bg-primary/5'}`}
                                >
                                  {city}
                                </button>
                              ))}
                            </div>
                            <div className="border-t border-border pt-4">
                              <h4 className="text-primary font-bold mb-2">For International And Other Indian City Users</h4>
                              <button
                                onClick={() => { setSelectedCity('Online E-Puja'); setIsCityOpen(false); }}
                                className={`px-4 py-2 rounded-lg border text-sm font-bold flex items-center gap-2 ${selectedCity === 'Online E-Puja' ? 'bg-primary text-white border-primary' : 'border-primary text-primary hover:bg-primary/5'}`}
                              >
                                Online E-Puja (Zoom/Recording)
                              </button>
                              <p className="text-[10px] text-muted-foreground mt-2 leading-tight">
                                (For Devotees who are unable to participate in the Pooja. Prasad will be sent via Courier and the Pooja will be Streamed Live or Recorded)
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Language Selector */}
                  <div className="w-48 flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase leading-none px-1">Priest Preference</span>
                    <div className="relative">
                      <button
                        onClick={() => { setIsLangOpen(!isLangOpen); setIsCityOpen(false); }}
                        className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-card border-2 border-border rounded-lg hover:border-primary transition-colors text-sm font-medium h-10"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Languages className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className={`${!selectedLanguage ? 'text-muted-foreground italic' : ''} truncate`}>
                            {selectedLanguage || 'Choose Language'}
                          </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 ${isLangOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isLangOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-card p-4 rounded-xl border-2 border-border shadow-xl z-[60]"
                          >
                            <div className="flex flex-col gap-1">
                              {languages.map((lang) => (
                                <button
                                  key={lang}
                                  onClick={() => { setSelectedLanguage(lang); setIsLangOpen(false); }}
                                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedLanguage === lang ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                                >
                                  {lang}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Find Rudraksha, Gems, Samagri..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-border rounded-l-lg focus:outline-none focus:border-primary bg-background"
                  />
                  <button className="absolute right-0 top-0 h-full px-6 bg-gradient-to-r from-primary to-accent text-white rounded-r-lg hover:opacity-90 transition-opacity">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* User Actions / Search Toggle */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Search Mode Toggle */}
              <div className="hidden md:flex bg-muted/60 p-0.5 rounded-full w-fit border border-border/50 shadow-sm">
                <button
                  onClick={() => setSearchType('puja')}
                  className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all ${searchType === 'puja' ? 'bg-primary text-white shadow-sm' : 'hover:bg-primary/10 text-muted-foreground'}`}
                >
                  Pooja Services
                </button>
                <button
                  onClick={() => setSearchType('samagri')}
                  className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all ${searchType === 'samagri' ? 'bg-primary text-white shadow-sm' : 'hover:bg-primary/10 text-muted-foreground'}`}
                >
                  Pujan Samagri
                </button>
              </div>
              <button
                className="md:hidden p-2 hover:bg-primary/10 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center gap-8 h-12">
            <Link href="/" className="text-sm font-bold hover:text-primary transition-colors py-3 border-b-2 border-transparent hover:border-primary">
              Home
            </Link>
            <Link href="/about" className="text-sm font-bold hover:text-primary transition-colors py-3 border-b-2 border-transparent hover:border-primary">
              About Us
            </Link>
            <Link href="/astrology" className="text-sm font-bold hover:text-primary transition-colors py-3 border-b-2 border-transparent hover:border-primary">
              Astrological Predictions
            </Link>
            {navbarCategories.map((category) => (
              <Link
                key={category.id}
                href={`/services?category=${category.slug}`}
                className="text-sm font-bold hover:text-primary transition-colors py-3 border-b-2 border-transparent hover:border-primary"
              >
                {category.name}
              </Link>
            ))}
            <Link href="/gallery" className="text-sm font-bold hover:text-primary transition-colors py-3 border-b-2 border-transparent hover:border-primary">
              Gallery
            </Link>
            <Link href="/contact" className="text-sm font-bold hover:text-primary transition-colors py-3 border-b-2 border-transparent hover:border-primary">
              Contact
            </Link>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="/" className="block px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-lg">
                Home
              </Link>
              <Link href="/about" className="block px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-lg">
                About Us
              </Link>
              <Link href="/astrology" className="block px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-lg">
                Astrological Predictions
              </Link>
              {navbarCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/services?category=${category.slug}`}
                  className="block px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-lg"
                >
                  {category.name}
                </Link>
              ))}
              <Link href="/gallery" className="block px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-lg">
                Gallery
              </Link>
              <Link href="/contact" className="block px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-lg">
                Contact
              </Link>
              <button
                onClick={() => {
                  setIsAuthModalOpen(true)
                  setIsOpen(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-lg"
              >
                Log in / Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  )
}
