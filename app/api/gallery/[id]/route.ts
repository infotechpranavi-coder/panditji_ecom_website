import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import GalleryItem from '@/models/GalleryItem'

export const dynamic = 'force-dynamic'

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()
        const { id } = await context.params

        const item = await GalleryItem.findById(id)
        if (!item) {
            return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 })
        }

        return NextResponse.json(item)
    } catch (error) {
        console.error('Error fetching gallery item:', error)
        return NextResponse.json({ error: 'Failed to fetch gallery item' }, { status: 500 })
    }
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()
        const { id } = await context.params
        const body = await request.json()

        const item = await GalleryItem.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        if (!item) {
            return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 })
        }

        return NextResponse.json(item)
    } catch (error) {
        console.error('Error updating gallery item:', error)
        return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()
        const { id } = await context.params

        const item = await GalleryItem.findByIdAndDelete(id)
        if (!item) {
            return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Gallery item deleted successfully' })
    } catch (error) {
        console.error('Error deleting gallery item:', error)
        return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 })
    }
}
