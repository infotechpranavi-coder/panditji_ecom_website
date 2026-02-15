import Link from 'next/link'
import { MapPin, Phone, Smartphone, Mail } from 'lucide-react'

export function Footer() {
  // City-wise pandit listings organized by language
  const cities = [
    {
      name: 'Mumbai',
      pandits: [
        { lang: 'Hindi', text: 'Hindi Pandits in Mumbai' },
        { lang: 'Tamil', text: 'Tamil Vadhyars in Mumbai' },
        { lang: 'Telugu', text: 'Telugu Purohits in Mumbai' },
        { lang: 'Kannada', text: 'Kannada Pujari in Mumbai' },
        { lang: 'Malayalam', text: 'Malayalam Pandits in Mumbai' },
      ]
    },
    {
      name: 'Pune',
      pandits: [
        { lang: 'Hindi', text: 'Hindi Pandits in Pune' },
        { lang: 'Tamil', text: 'Tamil Vadhyars in Pune' },
        { lang: 'Telugu', text: 'Telugu Purohits in Pune' },
        { lang: 'Marathi', text: 'Marathi Guruji in Pune' },
      ]
    },
    {
      name: 'Delhi',
      pandits: [
        { lang: 'Hindi', text: 'Hindi Pandits in Delhi' },
        { lang: 'Tamil', text: 'Tamil Vadhyars in Delhi' },
        { lang: 'Telugu', text: 'Telugu Purohits in Delhi' },
      ]
    },
    {
      name: 'Hyderabad',
      pandits: [
        { lang: 'Hindi', text: 'Hindi Pandits in Hyderabad' },
        { lang: 'Telugu', text: 'Telugu Purohits in Hyderabad' },
        { lang: 'Tamil', text: 'Tamil Vadhyars in Hyderabad' },
      ]
    },
    {
      name: 'Prayag',
      pandits: [
        { lang: 'Hindi', text: 'Sacred Rituals in Prayag' },
        { lang: 'Hindi', text: 'Triveni Sangam Puja' },
      ]
    },
    {
      name: 'Benaras Kashi',
      pandits: [
        { lang: 'Hindi', text: 'Ganga Aarti Services' },
        { lang: 'Hindi', text: 'Kashi Vishwanath Puja' },
      ]
    },
    {
      name: '12 Jyotirlingas',
      pandits: [
        { lang: 'Hindi', text: 'Rudraabhiashek Services' },
        { lang: 'Hindi', text: 'Special Jyotirlinga Puja' },
      ]
    },
  ]

  return (
    <footer className="bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section - Contact Info */}
        <div className="py-12 border-b border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-extrabold text-2xl mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                ✨ Book Panditji Seva
              </h3>
              <p className="text-sm opacity-95 leading-relaxed">
                Bringing authentic Online Puja services to your home with devotion and grace (Panditji Seva)
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Main Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/services" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">Temple Services</a></li>
                <li><a href="/hindu-calendar" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">Hindu Calendar</a></li>
                <li><a href="/about" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">About Us</a></li>
                <li><a href="/contact" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Policy Info</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">How we work</a></li>
                <li><a href="#" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">Privacy Policy</a></li>
                <li><a href="#" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">Terms of Use</a></li>
                <li><a href="#" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact Info</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2 items-start">
                  <Mail className="w-4 h-4 mt-0.5 opacity-70 flex-shrink-0" />
                  <a href="mailto:info@bookpanditjiseva.com" className="opacity-95 hover:text-white transition-colors">
                    info@bookpanditjiseva.com
                  </a>
                </li>
                <li className="flex gap-2 items-start">
                  <Phone className="w-4 h-4 mt-0.5 opacity-70 flex-shrink-0" />
                  <a href="tel:+917021324717" className="opacity-95 hover:text-white transition-colors">
                    +91 7021324717
                  </a>
                </li>
                <li className="flex gap-2 items-start">
                  <MapPin className="w-4 h-4 mt-0.5 opacity-70 flex-shrink-0" />
                  <span className="opacity-95 text-xs leading-relaxed">
                    Mira Road (E), Mumbai - 401107
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* City-wise Pandit Listings */}
        <div className="py-12 border-b border-white/20">
          <h3 className="font-bold text-xl mb-8 text-center">Find Pandits by City & Language</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {cities.map((city) => (
              <div key={city.name}>
                <h4 className="font-bold text-base mb-3 text-white">{city.name}</h4>
                <ul className="space-y-1.5 text-xs">
                  {city.pandits.map((pandit, idx) => (
                    <li key={idx}>
                      <a
                        href="/contact"
                        className="opacity-85 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block"
                      >
                        {pandit.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-6 text-sm opacity-95 text-center">
          <p className="font-semibold mb-2">&copy; 2026 Book Panditji Seva. All Rights Reserved.</p>
          <p className="text-xs opacity-80">
            Powered by{' '}
            <a
              href="https://pranaviinfotech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold border-b border-transparent hover:border-white transition-all"
            >
              Pranavi Infotech
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
