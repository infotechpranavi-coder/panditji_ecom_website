
import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IBanner extends Document {
    title: string
    description?: string
    imageUrl: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

const BannerSchema = new Schema<IBanner>(
    {
        title: { type: String }, // Made optional
        description: { type: String },
        imageUrl: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
)

// Force model rebuild in development to pick up schema changes
if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Banner
}

export const Banner: Model<IBanner> = mongoose.models.Banner || mongoose.model<IBanner>('Banner', BannerSchema)
