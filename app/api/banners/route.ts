
import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import { Banner } from '@/models/Banner'

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase()

        // Check if we want only the active one for the homepage
        const { searchParams } = new URL(req.url)
        const activeOnly = searchParams.get('active') === 'true'

        if (activeOnly) {
            // Get the most recently created active banner
            const banner = await Banner.findOne({ isActive: true }).sort({ createdAt: -1 })
            return NextResponse.json(banner)
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
        console.log('API POST /api/banners called');
        await connectToDatabase()
        console.log('Database connected');

        const body = await req.json()
        console.log('Request body:', body);

        // If setting this as active, deactivate others
        if (body.isActive) {
            console.log('Deactivating other banners...');
            await Banner.updateMany({}, { $set: { isActive: false } })
        }

        console.log('Creating new banner...');
        const banner = await Banner.create(body)
        console.log('Banner created:', banner);

        return NextResponse.json(banner, { status: 201 })
    } catch (error: any) {
        console.error('Error creating banner:', error)
        return NextResponse.json(
            { error: 'Failed to create banner', details: error.message },
            { status: 500 }
        )
    }
}
