import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { sendBookingEmail } from '@/lib/email'

export async function GET() {
  try {
    await connectToDatabase()
    const bookings = await Booking.find({}).sort({ createdAt: -1 })
    return NextResponse.json(bookings)
  } catch (error: any) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings', details: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const body = await req.json()

    // Create booking in database
    const booking = await Booking.create(body)

    // Attempt to send email
    let emailSent = false
    try {
      const emailResult = await sendBookingEmail(body)
      if (emailResult.success) {
        emailSent = true
        // Update booking with email sent status
        await Booking.findByIdAndUpdate(booking._id, { emailSent: true })
      }
    } catch (emailError) {
      console.error('Email notification failed:', emailError)
    }

    return NextResponse.json({
      success: true,
      booking,
      emailSent
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating booking:', error)
    return NextResponse.json({
      error: 'Failed to create booking',
      details: error.message
    }, { status: 500 })
  }
}
