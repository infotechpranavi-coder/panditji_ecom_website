import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Puja from '@/models/Puja';

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await context.params;
        const body = await request.json();
        const { user, rating, comment, date } = body;

        if (!user || !rating || !comment) {
            return NextResponse.json(
                { error: 'Name, rating, and comment are required' },
                { status: 400 }
            );
        }

        const puja = await Puja.findById(id);

        if (!puja) {
            // Try fallback for custom 'id' field if not found by ObjectID
            const fallbackPuja = await Puja.findOne({ id: id });
            if (!fallbackPuja) {
                return NextResponse.json({ error: 'Puja not found' }, { status: 404 });
            }

            fallbackPuja.reviews.push({ user, rating, comment, date: date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }) });
            await fallbackPuja.save();
            return NextResponse.json({ message: 'Review added successfully', reviews: fallbackPuja.reviews });
        }

        puja.reviews.push({ user, rating, comment, date: date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }) });
        await puja.save();

        return NextResponse.json({ message: 'Review added successfully', reviews: puja.reviews });
    } catch (error: any) {
        console.error('Error adding review:', error);
        return NextResponse.json(
            { error: 'Failed to add review', details: error.message },
            { status: 500 }
        );
    }
}
