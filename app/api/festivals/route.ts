import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Festival from '@/models/Festival'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const month = searchParams.get('month')
    const year = searchParams.get('year')

    let query: any = {}
    if (month !== null && year !== null) {
      const m = parseInt(month)
      const y = parseInt(year)
      const startDate = new Date(y, m, 1)
      const endDate = new Date(y, m + 1, 0, 23, 59, 59)
      query.date = { $gte: startDate, $lte: endDate }
    }

    const festivals = await Festival.find(query).sort({ date: 1 })
    return NextResponse.json(festivals)
  } catch (error) {
    console.error('Error fetching festivals:', error)
    return NextResponse.json({ error: 'Failed to fetch festivals' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    const newFestival = await Festival.create(body)
    return NextResponse.json(newFestival, { status: 201 })
  } catch (error: any) {
    console.error('Error creating festival:', error)
    return NextResponse.json({ error: error.message || 'Failed to create festival' }, { status: 500 })
  }
}
