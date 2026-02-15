import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
    name: string;
    role: string;
    specialty: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const TeamMemberSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        role: { type: String, required: true },
        specialty: { type: String },
        image: { type: String, required: true, default: '/placeholder.jpg' },
    },
    { timestamps: true }
);

export default mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
