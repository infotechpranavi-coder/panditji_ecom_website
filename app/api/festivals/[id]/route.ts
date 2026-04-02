import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Festival from '@/models/Festival'

export async function PUT(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()
        const { id } = await params
        const body = await request.json()
        const updatedFestival = await Festival.findByIdAndUpdate(id, body, { new: true })
        if (!updatedFestival) return NextResponse.json({ error: 'Festival not found' }, { status: 404 })
        return NextResponse.json(updatedFestival)
    } catch (error: any) {
        console.error('Error updating festival:', error)
        return NextResponse.json({ error: error.message || 'Failed to update festival' }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()
        const { id } = await params
        const deletedFestival = await Festival.findByIdAndDelete(id)
        if (!deletedFestival) return NextResponse.json({ error: 'Festival not found' }, { status: 404 })
        return NextResponse.json({ message: 'Festival deleted successfully' })
    } catch (error: any) {
        console.error('Error deleting festival:', error)
        return NextResponse.json({ error: error.message || 'Failed to delete festival' }, { status: 500 })
    }
}
