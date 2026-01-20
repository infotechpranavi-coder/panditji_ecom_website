export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground py-16 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-extrabold text-2xl mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              ✨ Book My Panditji
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
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">Contact</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">Blog</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">Facebook</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">Instagram</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">WhatsApp</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:text-white transition-all hover:translate-x-1 inline-block">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-sm opacity-95 text-center">
          <p className="font-semibold">&copy; 2024 Book My Panditji. All rights reserved. | Traditional Services, Modern Access</p>
        </div>
      </div>
    </footer>
  )
}
