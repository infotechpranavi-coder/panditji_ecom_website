import Link from 'next/link'
import { MapPin, Phone, Smartphone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground py-16 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-extrabold text-2xl mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              ✨ Book Panditji Seva
            </h3>
            <p className="text-sm opacity-95 leading-relaxed">
              Bringing authentic traditional Indian temple services to your home with devotion and grace
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/services" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">Daily Pujas</a></li>
              <li><a href="/services" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">Rituals & Ceremonies</a></li>
              <li><a href="/services" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">Offerings</a></li>
              <li><a href="/services" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">Consultations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/about" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">About Us</a></li>
              <li><Link href="/contact" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">Contact</Link></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">Blog</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="opacity-70 flex-shrink-0 w-5 h-5 text-white" />
                <span className="opacity-95 leading-relaxed">
                  B-10/303, Ramjash CHS, Ramdev park, near bhakti Ram mandir, Mira Road (E) - 401107
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="opacity-70 flex-shrink-0 w-5 h-5 text-white" />
                <span className="opacity-95">
                  <a href="tel:+917021324717" className="hover:text-white transition-colors">+91 7021324717</a> (Primary)
                </span>
              </li>
              <li className="flex gap-3">
                <Smartphone className="opacity-70 flex-shrink-0 w-5 h-5 text-white" />
                <div className="flex flex-col gap-1">
                  <span className="opacity-95">
                    <a href="tel:+919320955282" className="hover:text-white transition-colors">+91 9320955282</a>
                  </span>
                  <span className="opacity-95">
                    <a href="tel:+919594429032" className="hover:text-white transition-colors">+91 9594429032</a>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-sm opacity-95 text-center flex flex-col items-center gap-4">
          <p className="font-semibold">&copy; 2026 Book Panditji Seva. All rights reserved. | Traditional Services, Modern Access</p>
          <p className="text-xs opacity-80 flex items-center gap-1">
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
