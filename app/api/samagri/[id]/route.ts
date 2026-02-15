import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Samagri from '@/models/Samagri'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect()
        const samagri = await Samagri.findById(params.id)
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
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect()
        const body = await request.json()
        const updatedSamagri = await Samagri.findByIdAndUpdate(
            params.id,
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
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect()
        const deletedSamagri = await Samagri.findByIdAndDelete(params.id)
        if (!deletedSamagri) {
            return NextResponse.json({ error: 'Samagri not found' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Samagri deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete samagri' }, { status: 500 })
    }
}
