import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import AstroPackage from '@/models/AstroPackage'

export async function GET() {
  try {
    await dbConnect()
    const packages = await AstroPackage.find({}).sort({ order: 1, createdAt: 1 })
    return NextResponse.json(packages)
  } catch (error) {
    console.error('Error fetching astrology packages:', error)
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    const newPackage = await AstroPackage.create(body)
    return NextResponse.json(newPackage, { status: 201 })
  } catch (error: any) {
    console.error('Error creating astrology package:', error)
    return NextResponse.json({ error: error.message || 'Failed to create package' }, { status: 500 })
  }
}
