
import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import { Banner } from '@/models/Banner'

// Helper function to handle params safely for Next.js 16
async function getParams(params: any): Promise<{ id: string }> {
    if (params instanceof Promise) {
        return await params
    }
    return params
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // Type as Promise for Next.js 15/16
) {
    try {
        await connectToDatabase()
        const { id } = await getParams(params) // Await the params

        const deletedBanner = await Banner.findByIdAndDelete(id)

        if (!deletedBanner) {
            return NextResponse.json(
                { error: 'Banner not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ message: 'Banner deleted successfully' })
    } catch (error) {
        console.error('Error deleting banner:', error)
        return NextResponse.json(
            { error: 'Failed to delete banner' },
            { status: 500 }
        )
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase()
        const { id } = await getParams(params)
        const body = await req.json()

        // If making active, deactivate others
        if (body.isActive) {
            await Banner.updateMany({ _id: { $ne: id } }, { isActive: false })
        }

        const updatedBanner = await Banner.findByIdAndUpdate(id, body, { new: true })

        if (!updatedBanner) {
            return NextResponse.json(
                { error: 'Banner not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(updatedBanner)
    } catch (error) {
        console.error('Error updating banner:', error)
        return NextResponse.json(
            { error: 'Failed to update banner' },
            { status: 500 }
        )
    }
}
