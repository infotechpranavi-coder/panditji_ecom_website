'use client'

import React from "react"

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ChevronRight, CheckCircle2 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
  })
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    setMounted(true)
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(cart)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate order placement
    setOrderPlaced(true)
    localStorage.setItem('cart', JSON.stringify([]))
    
    // Update cart count
    const cartCount = document.getElementById('cart-count')
    if (cartCount) {
      cartCount.textContent = '0'
    }

    setTimeout(() => {
      // Redirect or show success
    }, 2000)
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

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="mb-6 flex justify-center">
              <CheckCircle2 className="w-20 h-20 text-primary animate-bounce" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed! 🙏</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for booking our services. We will contact you shortly to confirm the date and time of your service.
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8">
              <p className="text-sm mb-2">Order ID: <span className="font-bold">#DP{Math.floor(Math.random() * 100000)}</span></p>
              <p className="text-sm mb-2">Amount: <span className="font-bold text-primary">₹{total.toFixed(2)}</span></p>
              <p className="text-sm">Status: <span className="font-bold text-primary">Confirmed</span></p>
            </div>
            <Link
              href="/"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition inline-block"
            >
              Return Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Link href="/services" className="text-primary hover:underline">
              Browse Services
            </Link>
          </div>
        </div>
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
            <Link href="/cart" className="text-muted-foreground hover:text-foreground">Cart</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Checkout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-1 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Booking Information</h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      placeholder="400001"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Special Requests (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    placeholder="Any special requirements or preferences..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-card rounded-lg border border-border p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-primary rounded-lg bg-primary/5 cursor-pointer">
                    <input type="radio" name="payment" value="card" defaultChecked className="mr-3" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center p-4 border border-border rounded-lg hover:border-primary/50 cursor-pointer transition">
                    <input type="radio" name="payment" value="upi" className="mr-3" />
                    <span className="font-medium">UPI</span>
                  </label>
                  <label className="flex items-center p-4 border border-border rounded-lg hover:border-primary/50 cursor-pointer transition">
                    <input type="radio" name="payment" value="bank" className="mr-3" />
                    <span className="font-medium">Bank Transfer</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition"
              >
                Place Order & Pay
              </button>
            </form>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-card rounded-lg border border-border p-8">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border max-h-96 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (5%)</span>
                    <span className="font-semibold">₹{tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total Amount</span>
                    <span className="text-2xl font-bold text-primary">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-xs text-muted-foreground mb-2">✓ Secure payment</p>
                  <p className="text-xs text-muted-foreground mb-2">✓ 100% authentic rituals</p>
                  <p className="text-xs text-muted-foreground">✓ Satisfaction guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
