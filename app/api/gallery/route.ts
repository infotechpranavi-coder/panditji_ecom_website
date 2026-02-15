import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import GalleryItem from '@/models/GalleryItem'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        await dbConnect()
        const items = await GalleryItem.find({}).sort({ uploadedAt: -1 })
        return NextResponse.json(items)
    } catch (error) {
        console.error('Error fetching gallery items:', error)
        return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect()
        const body = await request.json()

        const newItem = await GalleryItem.create(body)
        return NextResponse.json(newItem, { status: 201 })
    } catch (error) {
        console.error('Error creating gallery item:', error)
        return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 })
    }
}
