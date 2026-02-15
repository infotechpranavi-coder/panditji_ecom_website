import mongoose, { Schema, Document } from 'mongoose';

export interface ISamagri extends Document {
    name: string;
    price: number;
    discount?: number;
    category: string;
    categorySlug?: string;
    image?: string;
    description?: string;
    sku?: string;
    stockStatus?: 'in_stock' | 'out_of_stock';
    createdAt: Date;
    updatedAt: Date;
}

const SamagriSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        category: { type: String, required: true },
        categorySlug: { type: String },
        image: { type: String, default: '/placeholder.jpg' },
        description: { type: String },
        sku: { type: String },
        stockStatus: {
            type: String,
            enum: ['in_stock', 'out_of_stock'],
            default: 'in_stock'
        },
    },
    { timestamps: true }
);

export default mongoose.models.Samagri || mongoose.model<ISamagri>('Samagri', SamagriSchema);
