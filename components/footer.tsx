export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Divya Puja</h3>
            <p className="text-sm opacity-90">
              Bringing authentic traditional Indian temple services to your home
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#" className="hover:opacity-100">Daily Pujas</a></li>
              <li><a href="#" className="hover:opacity-100">Rituals & Ceremonies</a></li>
              <li><a href="#" className="hover:opacity-100">Offerings</a></li>
              <li><a href="#" className="hover:opacity-100">Consultations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#" className="hover:opacity-100">About Us</a></li>
              <li><a href="#" className="hover:opacity-100">Contact</a></li>
              <li><a href="#" className="hover:opacity-100">Blog</a></li>
              <li><a href="#" className="hover:opacity-100">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#" className="hover:opacity-100">Facebook</a></li>
              <li><a href="#" className="hover:opacity-100">Instagram</a></li>
              <li><a href="#" className="hover:opacity-100">WhatsApp</a></li>
              <li><a href="#" className="hover:opacity-100">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-sm opacity-90 text-center">
          <p>&copy; 2024 Divya Puja. All rights reserved. | Traditional Services, Modern Access</p>
        </div>
      </div>
    </footer>
  )
}
