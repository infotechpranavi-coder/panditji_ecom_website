import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import { Banner } from '@/models/Banner'

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase()

        const { searchParams } = new URL(req.url)
        const activeOnly = searchParams.get('active') === 'true'

        if (activeOnly) {
            // All active banners for homepage slider (oldest first so order is stable)
            const banners = await Banner.find({ isActive: true }).sort({ createdAt: 1 })
            return NextResponse.json(banners)
        }

        const banners = await Banner.find({}).sort({ createdAt: -1 })
        return NextResponse.json(banners)
    } catch (error) {
        console.error('Error fetching banners:', error)
        return NextResponse.json(
            { error: 'Failed to fetch banners' },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase()

        const body = await req.json()

        // New banners default to active so they appear in the homepage slider
        const banner = await Banner.create({
            ...body,
            isActive: body.isActive !== undefined ? body.isActive : true,
        })

        return NextResponse.json(banner, { status: 201 })
    } catch (error: any) {
        console.error('Error creating banner:', error)
        return NextResponse.json(
            { error: 'Failed to create banner', details: error.message },
            { status: 500 }
        )
    }
}
