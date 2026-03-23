import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import AstroPackage from '@/models/AstroPackage'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const id = params.id
    const body = await request.json()
    const updatedPackage = await AstroPackage.findByIdAndUpdate(id, body, { new: true })
    if (!updatedPackage) return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    return NextResponse.json(updatedPackage)
  } catch (error: any) {
    console.error('Error updating astrology package:', error)
    return NextResponse.json({ error: error.message || 'Failed to update package' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const deletedPackage = await AstroPackage.findByIdAndDelete(params.id)
    if (!deletedPackage) return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    return NextResponse.json({ message: 'Package deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting astrology package:', error)
    return NextResponse.json({ error: error.message || 'Failed to delete package' }, { status: 500 })
  }
}
