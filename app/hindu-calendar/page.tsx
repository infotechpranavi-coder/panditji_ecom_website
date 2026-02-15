'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ChevronLeft, ChevronRight, Calendar, Sparkles, Sun, Moon, Star, Info } from 'lucide-react'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Hindu months (Vikram Samvat calendar)
const hinduMonths = [
    'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha',
    'Shravana', 'Bhadrapada', 'Ashwin', 'Kartik',
    'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
]

// Tithis (lunar days)
const tithis = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya'
]

export default function HinduCalendarPage() {
    const [viewDate, setViewDate] = useState(new Date())
    const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate())

    const month = viewDate.getMonth()
    const year = viewDate.getFullYear()

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // Mock data generator for Hindu Tithis and Panchang
    // In a real app, this would come from an API or a complex astronomical library
    const getDayPanchang = useMemo(() => (day: number) => {
        const seed = (year * 10000) + ((month + 1) * 100) + day
        const tithiIndex = (day + month) % 30
        const isShukla = tithiIndex < 15

        return {
            tithi: tithis[tithiIndex],
            paksha: isShukla ? 'Shukla Paksha' : 'Krishna Paksha',
            hinduMonth: hinduMonths[(month + 2) % 12], // Approximate shift
            nakshatra: ['Pushya', 'Rohini', 'Ashwini', 'Magha', 'Revati'][seed % 5],
            yoga: ['Siddha', 'Shubha', 'Variyan', 'Vriddhi'][seed % 4],
            karana: ['Bava', 'Balava', 'Kaulava', 'Taitila'][seed % 4],
            sunrise: '06:' + (30 + (seed % 20)).toString().padStart(2, '0') + ' AM',
            sunset: '06:' + (15 + (seed % 20)).toString().padStart(2, '0') + ' PM',
            isAuspicious: (seed % 7) === 0 || (seed % 11) === 0
        }
    }, [month, year])

    const goToPreviousMonth = () => {
        setViewDate(new Date(year, month - 1, 1))
        setSelectedDay(null)
    }

    const goToNextMonth = () => {
        setViewDate(new Date(year, month + 1, 1))
        setSelectedDay(null)
    }

    const calendarDays = []
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i)
    }

    const panchangDetails = selectedDay ? getDayPanchang(selectedDay) : getDayPanchang(new Date().getDate())

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
            <Navbar />

            {/* Header */}
            <section className="bg-white dark:bg-slate-900 border-b border-border py-8 px-4">
                <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">Divine Calendar</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
                            Hindu Panchang <span className="text-primary">&</span> Calendar
                        </h1>
                        <p className="text-slate-500 mt-2 max-w-xl">
                            Relate Hindu Tithis and Pakshas with your normal calendar. Discover auspicious timings for every day.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl border border-border">
                        <button onClick={goToPreviousMonth} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="text-center min-w-[160px]">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white">
                                {monthNames[month]} {year}
                            </h2>
                            <p className="text-[10px] uppercase font-bold text-primary tracking-widest">
                                {panchangDetails.hinduMonth} Month
                            </p>
                        </div>
                        <button onClick={goToNextMonth} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </section>

            <main className="flex-1 px-4 py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Calendar Grid */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-border shadow-2xl overflow-hidden">
                                {/* Week Days Header */}
                                <div className="grid grid-cols-7 border-b border-border bg-slate-50 dark:bg-slate-800/50">
                                    {dayNames.map((day) => (
                                        <div key={day} className="py-4 text-center text-xs font-black text-slate-400 uppercase tracking-widest">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Days Grid */}
                                <div className="grid grid-cols-7 gap-px bg-border">
                                    {calendarDays.map((day, index) => {
                                        if (!day) return <div key={`empty-${index}`} className="bg-white dark:bg-slate-900 h-28 md:h-36" />

                                        const dayData = getDayPanchang(day)
                                        const isSelected = selectedDay === day
                                        const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()

                                        return (
                                            <div
                                                key={day}
                                                onClick={() => setSelectedDay(day)}
                                                className={`
                                                    relative h-28 md:h-36 p-2 md:p-3 transition-all cursor-pointer group
                                                    ${isSelected ? 'z-10 bg-primary/5 ring-2 ring-primary ring-inset' : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50'}
                                                    ${dayData.paksha === 'Shukla Paksha' ? 'border-l-4 border-l-amber-400' : 'border-l-4 border-l-indigo-400'}
                                                `}
                                            >
                                                {/* Date Number */}
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className={`
                                                        text-xl font-black transition-colors
                                                        ${isToday ? 'bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center -ml-1 shadow-md shadow-primary/30' : 'text-slate-900 dark:text-white group-hover:text-primary'}
                                                    `}>
                                                        {day}
                                                    </span>
                                                    {dayData.isAuspicious && (
                                                        <Sparkles className="w-4 h-4 text-amber-500 opacity-60" />
                                                    )}
                                                </div>

                                                {/* Tithi Text */}
                                                <div className="mt-2 flex flex-col gap-0.5">
                                                    <span className="text-[10px] md:text-xs font-bold text-slate-500 truncate leading-tight">
                                                        {dayData.tithi}
                                                    </span>
                                                    <span className={`
                                                        text-[8px] md:text-[10px] font-black uppercase tracking-tighter
                                                        ${dayData.paksha === 'Shukla Paksha' ? 'text-amber-600 dark:text-amber-400' : 'text-indigo-600 dark:text-indigo-400'}
                                                    `}>
                                                        {dayData.paksha === 'Shukla Paksha' ? 'Shukla' : 'Krishna'}
                                                    </span>
                                                </div>

                                                {/* Auspicious Indicator Dot */}
                                                <div className="absolute bottom-2 right-2 flex gap-1">
                                                    {dayData.isAuspicious && (
                                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap items-center gap-6 px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-border text-xs font-bold">
                                <span className="text-slate-500 uppercase tracking-widest mr-2">Legend:</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-white border-l-4 border-l-amber-400 rounded-sm" />
                                    <span className="text-slate-600 dark:text-slate-400">Shukla Paksha</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-white border-l-4 border-l-indigo-400 rounded-sm" />
                                    <span className="text-slate-600 dark:text-slate-400">Krishna Paksha</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-3 h-3 text-amber-500" />
                                    <span className="text-slate-600 dark:text-slate-400">Auspicious Day</span>
                                </div>
                            </div>
                        </div>

                        {/* Details Sidebar */}
                        <aside className="lg:col-span-4 sticky top-32 flex flex-col gap-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedDay || 'default'}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-primary/20 shadow-2xl overflow-hidden"
                                >
                                    <div className="bg-primary p-6 text-white">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm font-bold opacity-80 uppercase tracking-[0.2em]">Panchang Details</span>
                                            <Calendar className="w-5 h-5 opacity-80" />
                                        </div>
                                        <h3 className="text-3xl font-black">
                                            {selectedDay ? `${selectedDay} ${monthNames[month]}` : 'Today'}
                                        </h3>
                                        <p className="text-primary-foreground/80 font-bold mt-1 uppercase text-[10px] tracking-widest">
                                            Vikram Samvat 2081 • {panchangDetails.hinduMonth}
                                        </p>
                                    </div>

                                    <div className="p-8 space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-border">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Tithi</span>
                                                </div>
                                                <div className="text-sm font-black text-slate-900 dark:text-white">{panchangDetails.tithi}</div>
                                            </div>
                                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-border">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Moon className="w-3.5 h-3.5 text-indigo-500" />
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Paksha</span>
                                                </div>
                                                <div className="text-sm font-black text-slate-900 dark:text-white">{panchangDetails.paksha}</div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {[
                                                { label: 'Nakshatra', value: panchangDetails.nakshatra, icon: Star, color: 'text-blue-500' },
                                                { label: 'Yoga', value: panchangDetails.yoga, icon: Sparkles, color: 'text-purple-500' },
                                                { label: 'Karana', value: panchangDetails.karana, icon: Info, color: 'text-emerald-500' },
                                            ].map((item) => (
                                                <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                                                    <div className="flex items-center gap-3">
                                                        <item.icon className={`w-4 h-4 ${item.color}`} />
                                                        <span className="text-xs font-bold text-slate-500 uppercase">{item.label}</span>
                                                    </div>
                                                    <span className="text-sm font-black text-slate-900 dark:text-white">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-4 grid grid-cols-2 gap-6 border-t border-border">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Sun className="w-3 h-3 text-amber-500" />
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase">Sunrise</span>
                                                </div>
                                                <div className="text-xs font-black text-slate-700 dark:text-slate-300">{panchangDetails.sunrise}</div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Sun className="w-3 h-3 text-orange-500" />
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase">Sunset</span>
                                                </div>
                                                <div className="text-xs font-black text-slate-700 dark:text-slate-300">{panchangDetails.sunset}</div>
                                            </div>
                                        </div>

                                        <Link
                                            href="/gallery"
                                            className="block w-full py-4 bg-gradient-to-r from-primary to-accent text-white text-center rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                                        >
                                            Book This Auspicious Day
                                        </Link>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Tip Card */}
                            <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-3xl border-2 border-amber-200/50 flex gap-4">
                                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Info className="w-5 h-5 text-amber-600" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-black text-amber-800 dark:text-amber-400 uppercase tracking-wider">Spiritual Tip</h4>
                                    <p className="text-xs text-amber-700 dark:text-amber-500 leading-relaxed font-bold">
                                        Colors and dots represent sacred phases. Clicking a date reveals detailed astrological alignments for your rituals.
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
