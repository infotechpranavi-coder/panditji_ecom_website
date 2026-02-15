import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Samagri from '@/models/Samagri'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        await dbConnect()

        const samagri = await Samagri.find({}).sort({ createdAt: -1 })
        return NextResponse.json(samagri)
    } catch (error) {
        console.error('Error fetching samagri:', error)
        return NextResponse.json({ error: 'Failed to fetch samagri' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect()
        const body = await request.json()

        // Validate required fields
        if (!body.name || !body.price || !body.category) {
            return NextResponse.json(
                { error: 'Missing required fields: name, price, and category are required' },
                { status: 400 }
            )
        }

        const newSamagri = await Samagri.create({
            ...body,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        return NextResponse.json(newSamagri, { status: 201 })
    } catch (error: any) {
        console.error('Error creating samagri:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to create samagri' },
            { status: 500 }
        )
    }
}
