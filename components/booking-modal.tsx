'use client'

import React, { useState } from 'react'
import { X, Send, Phone, User, Mail, Calendar, CheckCircle2, MapPin, Clock } from 'lucide-react'

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    puja: any;
    selectedJapa?: string;
}

export function BookingModal({ isOpen, onClose, puja, selectedJapa }: BookingModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerAddress: '',
        date: '',
        bookingTime: '',
    })

    if (!isOpen) return null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const bookingData = {
                ...formData,
                pujaId: puja.id,
                pujaName: puja.name,
                japa: selectedJapa,
                totalPrice: puja.price,
                quantity: 1,
            }

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            })

            if (response.ok) {
                setIsSuccess(true)
                setTimeout(() => {
                    onClose()
                    setIsSuccess(false)
                    setFormData({ customerName: '', customerEmail: '', customerPhone: '', customerAddress: '', date: '', bookingTime: '' })
                }, 3000)
            } else {
                alert('Failed to submit booking. Please try again.')
            }
        } catch (error) {
            console.error('Booking error:', error)
            alert('An error occurred. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-card w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden relative border border-primary/20">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                {isSuccess ? (
                    <div className="p-12 text-center space-y-6 animate-scale-in">
                        <div className="w-20 h-20 bg-green-500/20 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-foreground">Booking Successful!</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We have received your request for <strong>{puja.name}</strong>. Our team will contact you shortly on {formData.customerPhone} to confirm the details.
                        </p>
                        <div className="pt-4">
                            <button
                                onClick={onClose}
                                className="px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:shadow-primary/30 transition-all"
                            >
                                Close Window
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="bg-primary/5 p-8 border-b border-primary/10">
                            <h2 className="text-2xl font-extrabold text-foreground mb-2">Book Your Puja</h2>
                            <p className="text-muted-foreground text-sm font-medium">Selected: <span className="text-primary">{puja.name}</span></p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="text"
                                            name="customerName"
                                            required
                                            value={formData.customerName}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className="w-full pl-12 pr-6 py-4 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-2xl outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                type="email"
                                                name="customerEmail"
                                                required
                                                value={formData.customerEmail}
                                                onChange={handleChange}
                                                placeholder="your@email.com"
                                                className="w-full pl-12 pr-4 py-4 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-2xl outline-none transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                type="tel"
                                                name="customerPhone"
                                                required
                                                value={formData.customerPhone}
                                                onChange={handleChange}
                                                placeholder="+91 00000 00000"
                                                className="w-full pl-12 pr-4 py-4 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-2xl outline-none transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Address (For Puja Location)</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                                        <textarea
                                            name="customerAddress"
                                            required
                                            value={formData.customerAddress}
                                            onChange={handleChange}
                                            placeholder="Your full address where the puja is to be performed"
                                            rows={2}
                                            className="w-full pl-12 pr-6 py-4 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-2xl outline-none transition-all font-medium resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Preferred Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                type="date"
                                                name="date"
                                                required
                                                value={formData.date}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-6 py-4 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-2xl outline-none transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Preferred Time</label>
                                        <div className="relative">
                                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                type="time"
                                                name="bookingTime"
                                                required
                                                value={formData.bookingTime}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-6 py-4 bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-2xl outline-none transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-5 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-extrabold text-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>Confirm Booking</span>
                                            <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-[10px] text-muted-foreground mt-4 font-medium">
                                    By clicking confirm, you agree to our terms of priest booking. Our priest will carry all necessary Samagri if requested.
                                </p>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}
