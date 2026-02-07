import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Puja from '@/models/Puja'
import Booking from '@/models/Booking'

export async function GET() {
    try {
        await dbConnect()

        const totalPujas = await Puja.countDocuments()
        const totalBookings = await Booking.countDocuments()

        // Calculate total revenue from confirmed and completed bookings
        const revenueResult = await Booking.aggregate([
            { $match: { status: { $in: ['confirmed', 'completed'] } } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ])

        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0

        return NextResponse.json({
            totalPujas,
            totalBookings,
            totalRevenue,
        })
    } catch (error: any) {
        console.error('Error fetching dashboard stats:', error)
        return NextResponse.json({
            totalPujas: 0,
            totalBookings: 0,
            totalRevenue: 0,
            error: error.message
        })
    }
}
