import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import { Banner } from '@/models/Banner'

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase()

        const { searchParams } = new URL(req.url)
        const activeOnly = searchParams.get('active') === 'true'

        if (activeOnly) {
            const banners = await Banner.find({ isActive: true }).sort({ sequence: 1, createdAt: 1 })
            return NextResponse.json(banners)
        }

        const banners = await Banner.find({}).sort({ sequence: 1, createdAt: 1 })
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

        let sequence = Number(body.sequence)
        if (!Number.isFinite(sequence) || sequence < 1) {
            const last = await Banner.findOne({}).sort({ sequence: -1 }).select('sequence')
            sequence = (last?.sequence || 0) + 1
        }

        const banner = await Banner.create({
            ...body,
            sequence,
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
