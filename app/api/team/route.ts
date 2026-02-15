import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';

export async function GET() {
    try {
        await dbConnect();
        const members = await TeamMember.find({}).sort({ createdAt: -1 });
        return NextResponse.json(members);
    } catch (error: any) {
        console.error('Team API GET Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const member = await TeamMember.create(body);
        return NextResponse.json(member, { status: 201 });
    } catch (error: any) {
        console.error('Team API POST Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
