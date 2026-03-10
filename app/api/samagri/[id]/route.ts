import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Samagri from '@/models/Samagri'

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()
        const { id } = await context.params
        const samagri = await Samagri.findById(id)
        if (!samagri) {
            return NextResponse.json({ error: 'Samagri not found' }, { status: 404 })
        }
        return NextResponse.json(samagri)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch samagri' }, { status: 500 })
    }
}

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()
        const { id } = await context.params
        const body = await request.json()
        const updatedSamagri = await Samagri.findByIdAndUpdate(
            id,
            { ...body, updatedAt: new Date() },
            { new: true }
        )
        if (!updatedSamagri) {
            return NextResponse.json({ error: 'Samagri not found' }, { status: 404 })
        }
        return NextResponse.json(updatedSamagri)
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to update samagri' }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()
        const { id } = await context.params
        const deletedSamagri = await Samagri.findByIdAndDelete(id)
        if (!deletedSamagri) {
            return NextResponse.json({ error: 'Samagri not found' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Samagri deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete samagri' }, { status: 500 })
    }
}
