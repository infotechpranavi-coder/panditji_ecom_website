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
      <section className="flex-1 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Start adding services to book your spiritual experience
              </p>
              <Link
                href="/services"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition inline-flex items-center gap-2"
              >
                Browse Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-card rounded-lg border border-border p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                        <p className="text-muted-foreground">₹{item.price} per service</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 border border-border rounded-lg p-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 hover:bg-muted rounded transition"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-muted rounded transition"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Subtotal</p>
                          <p className="text-xl font-bold text-primary">₹{item.price * item.quantity}</p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition ml-4"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-20 bg-card rounded-lg border border-border p-8">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6 pb-6 border-b border-border">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (5%)</span>
                      <span className="font-semibold">₹{tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold text-primary">₹{total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Including all taxes</p>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition text-center block mb-3"
                  >
                    Proceed to Checkout
                  </Link>

                  <Link
                    href="/services"
                    className="w-full px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition text-center block"
                  >
                    Continue Shopping
                  </Link>

                  <div className="mt-6 pt-6 border-t border-border space-y-2 text-xs text-muted-foreground">
                    <p>✓ Secure checkout</p>
                    <p>✓ Expert service delivery</p>
                    <p>✓ Money-back guarantee</p>
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
