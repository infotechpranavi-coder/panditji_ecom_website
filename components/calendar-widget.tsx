'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react'

interface CalendarWidgetProps {
    onDateSelect?: (date: Date) => void
}

export function CalendarWidget({ onDateSelect }: CalendarWidgetProps) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()

    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const handleDateClick = (day: number, isPrevMonth: boolean = false, isNextMonth: boolean = false) => {
        let date: Date
        if (isPrevMonth) {
            date = new Date(year, month - 1, day)
        } else if (isNextMonth) {
            date = new Date(year, month + 1, day)
        } else {
            date = new Date(year, month, day)
        }
        setSelectedDate(date)
        onDateSelect?.(date)
    }

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    const isSelected = (day: number, isPrevMonth: boolean = false, isNextMonth: boolean = false) => {
        if (!selectedDate) return false
        const checkDate = isPrevMonth
            ? new Date(year, month - 1, day)
            : isNextMonth
                ? new Date(year, month + 1, day)
                : new Date(year, month, day)
        return checkDate.toDateString() === selectedDate.toDateString()
    }

    const isToday = (day: number) => {
        const today = new Date()
        return year === today.getFullYear() && month === today.getMonth() && day === today.getDate()
    }

    // Generate calendar days
    const calendarDays: Array<{ day: number; isPrevMonth: boolean; isNextMonth: boolean }> = []

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        calendarDays.push({ day: daysInPrevMonth - i, isPrevMonth: true, isNextMonth: false })
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push({ day, isPrevMonth: false, isNextMonth: false })
    }

    // Next month days (to fill the grid)
    const remainingDays = 42 - calendarDays.length
    for (let day = 1; day <= remainingDays; day++) {
        calendarDays.push({ day, isPrevMonth: false, isNextMonth: true })
    }

    return (
        <div className="bg-card rounded-2xl border border-border/50 p-6 card-elevated h-full flex flex-col min-h-[600px]">
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={goToPreviousMonth}
                    className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-2xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {monthNames[month]} {year}
                </h3>
                <button
                    onClick={goToNextMonth}
                    className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
                {dayNames.map((day) => (
                    <div key={day} className="text-center text-sm font-bold text-primary py-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map(({ day, isPrevMonth, isNextMonth }, index) => {
                    const selected = isSelected(day, isPrevMonth, isNextMonth)
                    const today = !isPrevMonth && !isNextMonth && isToday(day)

                    return (
                        <button
                            key={index}
                            onClick={() => handleDateClick(day, isPrevMonth, isNextMonth)}
                            className={`
                aspect-square p-2 rounded-lg text-sm font-medium transition-all
                ${isPrevMonth || isNextMonth
                                    ? 'text-muted-foreground/50 hover:bg-muted/50'
                                    : 'hover:bg-primary/10'
                                }
                ${selected
                                    ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg scale-105'
                                    : ''
                                }
                ${today && !selected
                                    ? 'bg-primary/20 text-primary font-bold border-2 border-primary'
                                    : ''
                                }
              `}
                        >
                            {day}
                        </button>
                    )
                })}
            </div>

            {/* Upcoming Festivals Section */}
            <div className="mt-6 mb-4">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <h4 className="text-sm font-bold text-primary">Upcoming Festivals</h4>
                </div>
                <div className="space-y-2.5">
                    {[
                        { date: '14', festival: 'Makar Sankranti' },
                        { date: '26', festival: 'Republic Day' },
                        { date: '8', festival: 'Maha Shivratri' },
                    ].map((item, i) => (
                        <div key={i} className="p-3 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 rounded-xl border border-primary/20 flex items-center gap-3 hover:shadow-md hover:border-primary/40 transition-all cursor-pointer">
                            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-bold text-primary">{item.date}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">{item.festival}</p>
                                <p className="text-xs text-muted-foreground">Book Puja Now</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Plan Your Festivals Section */}
            <div className="mt-auto">
                <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
                    <p className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Plan Your Festivals with Book My Panditji
                    </p>
                    <div className="bg-accent/20 dark:bg-accent/10 p-3 rounded-lg border border-accent/30">
                        <p className="text-xs text-gray-800 dark:text-gray-200 font-bold leading-relaxed">
                            Note: Please Click on highlighted dates to show Festivals
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
