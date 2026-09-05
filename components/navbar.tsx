'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu, X, Phone, Search, User, ChevronDown, MapPin, Languages, Sparkles, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthModal } from './auth-modal'
import { useT } from './language-provider'
import { localizeField } from '@/lib/i18n/localize'
import { useLocalizedContent, useAutoText } from '@/components/translated-text'

interface Category {
  id: string
  _id?: string
  name: string
  nameHi?: string
  nameMr?: string
  slug: string
  description?: string
  showOnNavbar?: boolean
  isService?: boolean
  isProduct?: boolean
}

function NavCategoryLink({
  category,
  mobile = false,
}: {
  category: Category
  mobile?: boolean
}) {
  const name = useLocalizedContent(category as any, 'name')
  const href = category.isProduct
    ? `/pujan-samagri?category=${category.slug}`
    : `/services?category=${category.slug}`

  if (mobile) {
    return (
      <Link
        href={href}
        className="block px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-lg"
      >
        {name}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className="text-sm font-bold hover:text-primary transition-colors py-3 border-b-2 border-transparent hover:border-primary"
    >
      {name}
    </Link>
  )
}

export function Navbar() {
  const { t, locale, setLocale, locales } = useT()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [navbarCategories, setNavbarCategories] = useState<Category[]>([])
  const [searchType, setSearchType] = useState<'puja' | 'samagri'>('puja')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [isCityOpen, setIsCityOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isSiteLangOpen, setIsSiteLangOpen] = useState(false)
  const router = useRouter()

  const performSearch = () => {
    const searchParams = new URLSearchParams()
    if (searchQuery.trim()) searchParams.set('search', searchQuery.trim())
    if (selectedCity && selectedCity !== 'Choose City') searchParams.set('city', selectedCity)
    if (selectedLanguage && selectedLanguage !== 'Choose Lang') searchParams.set('lang', selectedLanguage)
    
    if (searchParams.toString()) {
      router.push(`/services?${searchParams.toString()}`)
      setIsMobileSearchOpen(false)
    }
  }

  const handlePujaSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch()
    }
  }

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
          .filter((cat: Category) => cat.showOnNavbar === true)
          .map((cat: Category) => ({
            id: cat.id || cat._id || '', 
            name: cat.name || '',
            nameHi: cat.nameHi || '',
            nameMr: cat.nameMr || '',
            slug: cat.slug || '', 
            description: cat.description || '',
            isService: cat.isService,
            isProduct: cat.isProduct
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
                <span className="font-medium">{t.callUs}: +91 7021324717</span>
              </Link>
            </div>
            <div className="relative flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSiteLangOpen((v) => !v)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/60 bg-background/80 hover:border-primary hover:text-primary transition-colors text-[11px] font-bold uppercase tracking-wide"
                aria-label={t.selectLanguage}
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{locales.find((l) => l.code === locale)?.nativeLabel || 'English'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSiteLangOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isSiteLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute right-0 top-full mt-2 min-w-[140px] bg-white dark:bg-card border-2 border-border rounded-xl shadow-xl z-[70] overflow-hidden"
                  >
                    {locales.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setLocale(item.code)
                          setIsSiteLangOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-primary/10 transition-colors ${
                          locale === item.code ? 'bg-primary/10 text-primary' : 'text-foreground'
                        }`}
                      >
                        <span className="font-bold">{item.nativeLabel}</span>
                        <span className="text-muted-foreground text-xs ml-2">{item.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-background border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start h-20 gap-4">
            {/* Logo — icon + name side by side, left-aligned */}
            <Link href="/" className="flex items-center gap-1.5 flex-shrink-0 group py-0.5 -ml-1">
              <div className="relative h-[68px] w-[68px] group-hover:scale-105 transition-transform">
                <Image 
                  src="/logo/bookpandit_logoonlu%20.png" 
                  alt="Book Panditji icon" 
                  fill 
                  className="object-contain" 
                  priority
                />
              </div>
              <div className="relative h-[44px] w-[130px] group-hover:scale-105 transition-transform">
                <Image 
                  src="/logo/bookpandit_log-name.png" 
                  alt="Book Panditji name" 
                  fill 
                  className="object-contain object-left" 
                  priority
                />
              </div>
            </Link>

            {/* Search Section */}
            <div className="flex-1 flex flex-col max-w-4xl hidden md:flex pt-1 pb-1 ml-2">

              {searchType === 'puja' ? (
                <div className="flex items-end gap-3">
                  {/* City Selector */}
                  <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase leading-none px-1 text-nowrap">{t.performPoojaIn}</span>
                    <div className="relative">
                      <button
                        onClick={() => { setIsCityOpen(!isCityOpen); setIsLangOpen(false); }}
                        className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-card border-2 border-border rounded-lg hover:border-primary transition-colors text-sm font-medium h-10"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className={`${!selectedCity ? 'text-muted-foreground italic' : ''} truncate`}>
                            {selectedCity || t.chooseCity}
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
                            <h4 className="text-primary font-bold mb-4">{t.selectYourCity}</h4>
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
                              <h4 className="text-primary font-bold mb-2">{t.forInternationalUsers}</h4>
                              <button
                                onClick={() => { setSelectedCity('Online E-Puja'); setIsCityOpen(false); }}
                                className={`px-4 py-2 rounded-lg border text-sm font-bold flex items-center gap-2 ${selectedCity === 'Online E-Puja' ? 'bg-primary text-white border-primary' : 'border-primary text-primary hover:bg-primary/5'}`}
                              >
                                {t.onlineEPuja}
                              </button>
                              <p className="text-[10px] text-muted-foreground mt-2 leading-tight">
                                {t.onlineEPujaNote}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Language Selector */}
                  <div className="w-44 flex flex-col gap-1.5 flex-shrink-0">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase leading-none px-1 text-nowrap">{t.priestPreference}</span>
                    <div className="relative">
                      <button
                        onClick={() => { setIsLangOpen(!isLangOpen); setIsCityOpen(false); }}
                        className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-card border-2 border-border rounded-lg hover:border-primary transition-colors text-sm font-medium h-10"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Languages className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className={`${!selectedLanguage ? 'text-muted-foreground italic' : ''} truncate`}>
                            {selectedLanguage || t.chooseLang}
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

                  {/* Puja Text Search Input */}
                  <div className="flex-[1.2] flex flex-col gap-1.5 min-w-0">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase leading-none px-1 text-nowrap">{t.searchPujaServices}</span>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handlePujaSearch}
                        className="w-full pl-10 pr-12 py-2 border-2 border-border rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-card text-sm font-medium placeholder:text-muted-foreground/60 transition-colors h-10"
                      />
                      <button 
                        onClick={performSearch}
                        className="absolute right-1 top-1 bottom-1 px-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-md hover:scale-105 active:scale-95 transition-all shadow-sm"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder={t.searchSamagriPlaceholder}
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
            <div className="flex items-center gap-4 flex-shrink-0 ml-auto">
              {/* Search Mode Toggle */}
              <div className="hidden md:flex bg-muted/60 p-0.5 rounded-full w-fit border border-border/50 shadow-sm">
                <button
                  onClick={() => setSearchType('puja')}
                  className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all ${searchType === 'puja' ? 'bg-primary text-white shadow-sm' : 'hover:bg-primary/10 text-muted-foreground'}`}
                >
                  {t.poojaServices}
                </button>
                <button
                  onClick={() => setSearchType('samagri')}
                  className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all ${searchType === 'samagri' ? 'bg-primary text-white shadow-sm' : 'hover:bg-primary/10 text-muted-foreground'}`}
                >
                  {t.pujanSamagri}
                </button>
              </div>
              <Link 
                href="/contact?subject=Online Puja" 
                className="hidden md:flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-full text-xs font-black shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all animate-pulse"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.onlinePuja}</span>
              </Link>
              <button
                className="md:hidden p-2 hover:bg-primary/10 rounded-lg text-primary"
                onClick={() => {
                  setIsMobileSearchOpen(!isMobileSearchOpen);
                  if (isOpen) setIsOpen(false);
                }}
                aria-label="Toggle search"
              >
                {isMobileSearchOpen ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
              </button>

              <button
                className="md:hidden p-2 hover:bg-primary/10 rounded-lg"
                onClick={() => {
                  setIsOpen(!isOpen);
                  if (isMobileSearchOpen) setIsMobileSearchOpen(false);
                }}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background border-b border-border/50 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mode Toggle */}
              <div className="flex bg-muted/60 p-1 rounded-xl border border-border/50">
                <button
                  onClick={() => setSearchType('puja')}
                  className={`flex-1 py-2 rounded-lg text-xs uppercase tracking-wider font-extrabold transition-all ${searchType === 'puja' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground'}`}
                >
                  {t.poojaServices}
                </button>
                <button
                  onClick={() => setSearchType('samagri')}
                  className={`flex-1 py-2 rounded-lg text-xs uppercase tracking-wider font-extrabold transition-all ${searchType === 'samagri' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground'}`}
                >
                  {t.pujanSamagri}
                </button>
              </div>

              {/* Input */}
              <div className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={searchType === 'puja' ? t.searchPujaPlaceholder : t.searchSamagriPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={searchType === 'puja' ? handlePujaSearch : undefined}
                    className="w-full pl-11 pr-4 py-3 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-xl outline-none transition-all font-bold text-sm shadow-inner"
                  />
                </div>
                <button 
                  onClick={performSearch}
                  className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Filters for Puja */}
              {searchType === 'puja' && (
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setIsCityOpen(!isCityOpen)}
                    className="flex items-center justify-between px-3 py-2 bg-white dark:bg-card border border-border rounded-lg text-[10px] font-black"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                      <span className="truncate">{selectedCity || 'CITY'}</span>
                    </div>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => setIsLangOpen(!isLangOpen)}
                    className="flex items-center justify-between px-3 py-2 bg-white dark:bg-card border border-border rounded-lg text-[10px] font-black"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Languages className="w-3 h-3 text-primary flex-shrink-0" />
                      <span className="truncate">{selectedLanguage || 'LANG'}</span>
                    </div>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Popups for City/Lang on Mobile */}
            <AnimatePresence>
              {isCityOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="px-4 pb-6"
                >
                  <div className="bg-white dark:bg-card rounded-xl border border-border p-4 shadow-xl">
                    <h4 className="text-primary font-black text-xs mb-3 flex items-center gap-2">
                       <MapPin className="w-3 h-3" /> SELECT CITY
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cities.map((city) => (
                        <button
                          key={city}
                          onClick={() => { setSelectedCity(city); setIsCityOpen(false); }}
                          className={`px-3 py-1 rounded-lg border text-[10px] font-black transition-all ${selectedCity === city ? 'bg-primary text-white border-primary' : 'border-primary text-primary hover:bg-primary/5'}`}
                        >
                          {city}
                        </button>
                      ))}
                      <button
                        onClick={() => { setSelectedCity('Online E-Puja'); setIsCityOpen(false); }}
                        className={`px-3 py-1 rounded-lg border text-[10px] font-black transition-all ${selectedCity === 'Online E-Puja' ? 'bg-primary text-white border-primary' : 'border-primary text-primary hover:bg-primary/5'}`}
                      >
                        Online E-Puja
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="px-4 pb-6"
                >
                  <div className="bg-white dark:bg-card rounded-xl border border-border p-4 shadow-xl">
                    <h4 className="text-primary font-black text-xs mb-3 flex items-center gap-2">
                       <Languages className="w-3 h-3" /> SELECT LANGUAGE
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => { setSelectedLanguage(lang); setIsLangOpen(false); }}
                          className={`px-3 py-1 rounded-lg border text-[10px] font-black transition-all ${selectedLanguage === lang ? 'bg-primary text-white border-primary' : 'border-primary text-primary hover:bg-primary/5'}`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Menu */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center gap-8 h-12">
            <Link href="/" className="text-sm font-bold hover:text-primary transition-colors py-3 border-b-2 border-transparent hover:border-primary">
              {t.home}
            </Link>
            <Link href="/about" className="text-sm font-bold hover:text-primary transition-colors py-3 border-b-2 border-transparent hover:border-primary">
              {t.aboutUs}
            </Link>
            <Link href="/astrology" className="text-sm font-bold hover:text-primary transition-colors py-3 border-b-2 border-transparent hover:border-primary">
              {t.astrologicalPredictions}
            </Link>
            {navbarCategories.map((category) => (
              <NavCategoryLink key={category.id} category={category} />
            ))}
            <Link href="/gallery" className="text-sm font-bold hover:text-primary transition-colors py-3 border-b-2 border-transparent hover:border-primary">
              {t.gallery}
            </Link>
            <Link href="/contact" className="text-sm font-bold hover:text-primary transition-colors py-3 border-b-2 border-transparent hover:border-primary">
              {t.contact}
            </Link>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="/" className="block px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-lg">
                {t.home}
              </Link>
              <Link href="/about" className="block px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-lg">
                {t.aboutUs}
              </Link>
              <Link href="/astrology" className="block px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-lg">
                {t.astrologicalPredictions}
              </Link>
              {navbarCategories.map((category) => (
                <NavCategoryLink key={category.id} category={category} mobile />
              ))}
              <Link href="/gallery" className="block px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-lg">
                {t.gallery}
              </Link>
              <Link href="/contact" className="block px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-lg">
                {t.contact}
              </Link>
              <Link
                href="/contact?subject=Online Puja"
                className="block mx-4 py-3 text-sm font-black text-white bg-gradient-to-r from-primary to-accent rounded-xl text-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all mt-2"
                onClick={() => setIsOpen(false)}
              >
                {t.onlinePuja}
              </Link>
              <button
                onClick={() => {
                  setIsAuthModalOpen(true)
                  setIsOpen(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary/10 rounded-lg"
              >
                {t.loginRegister}
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
