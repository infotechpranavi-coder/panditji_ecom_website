import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const body = await request.json();
        const member = await TeamMember.findByIdAndUpdate(params.id, body, { new: true });
        if (!member) {
            return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
        }
        return NextResponse.json(member);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const member = await TeamMember.findByIdAndDelete(params.id);
        if (!member) {
            return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Team member deleted' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
