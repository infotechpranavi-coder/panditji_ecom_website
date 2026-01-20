'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ChevronRight, Trash2, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(cart)
  }, [])

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    // Update cart count
    const cartCount = document.getElementById('cart-count')
    if (cartCount) {
      const total = updatedCart.reduce((sum, item) => sum + item.quantity, 0)
      cartCount.textContent = total.toString()
    }
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    // Update cart count
    const cartCount = document.getElementById('cart-count')
    if (cartCount) {
      const total = updatedCart.reduce((sum, item) => sum + item.quantity, 0)
      cartCount.textContent = total.toString()
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.05
  const total = subtotal + tax

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1" />
        <Footer />
      </div>
    )
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
            <span className="text-foreground font-medium">Shopping Cart</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-1 px-4 py-12 gradient-section-1">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground">Review your selected services</p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6 animate-bounce">🛒</div>
              <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Your cart is empty
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
                Start adding services to book your spiritual experience
              </p>
              <Link
                href="/services"
                className="px-10 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 shadow-lg"
              >
                Browse Services <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-gradient-to-br from-card via-card to-primary/5 rounded-2xl border border-border/50 p-6 card-elevated hover:border-primary/50 transition-all">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex-1">
                          <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                          <p className="text-muted-foreground">₹{item.price} per service</p>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-3 border-2 border-border rounded-xl p-2 bg-background">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-primary/10 hover:text-primary rounded-lg transition font-bold text-lg"
                            >
                              −
                            </button>
                            <span className="w-10 text-center font-bold text-lg">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-primary/10 hover:text-primary rounded-lg transition font-bold text-lg"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right min-w-[100px]">
                            <p className="text-sm text-muted-foreground mb-1">Subtotal</p>
                            <p className="text-2xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">₹{item.price * item.quantity}</p>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-3 text-destructive hover:bg-destructive/10 rounded-xl transition hover:scale-110"
                          >
                            <Trash2 className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-20 bg-gradient-to-br from-card via-card to-primary/5 rounded-2xl border border-border/50 p-8 card-elevated">
                  <h2 className="text-2xl font-extrabold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-8 pb-6 border-b border-border/50">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Subtotal</span>
                      <span className="font-bold text-lg">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Tax (5%)</span>
                      <span className="font-bold text-lg">₹{tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mb-8 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xl font-bold">Total</span>
                      <span className="text-3xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">₹{total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Including all taxes</p>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full px-6 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center block mb-4 shadow-lg"
                  >
                    Proceed to Checkout
                  </Link>

                  <Link
                    href="/services"
                    className="w-full px-6 py-4 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary/10 transition-all duration-300 text-center block"
                  >
                    Continue Shopping
                  </Link>

                  <div className="mt-8 pt-6 border-t border-border/50 space-y-3 text-sm">
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span> Secure checkout
                    </p>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span> Expert service delivery
                    </p>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span> Money-back guarantee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
