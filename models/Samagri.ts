import mongoose, { Schema, Document } from 'mongoose';

export interface ISamagri extends Document {
    name: string;
    nameHi?: string;
    nameMr?: string;
    price: number;
    discount?: number;
    category: string;
    categorySlug?: string;
    image?: string;
    description?: string;
    descriptionHi?: string;
    descriptionMr?: string;
    sku?: string;
    stockStatus?: 'in_stock' | 'out_of_stock';
    createdAt: Date;
    updatedAt: Date;
}

const SamagriSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        nameHi: { type: String, default: '' },
        nameMr: { type: String, default: '' },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        category: { type: String, required: true },
        categorySlug: { type: String },
        image: { type: String, default: '/placeholder.jpg' },
        description: { type: String },
        descriptionHi: { type: String, default: '' },
        descriptionMr: { type: String, default: '' },
        sku: { type: String },
        stockStatus: {
            type: String,
            enum: ['in_stock', 'out_of_stock'],
            default: 'in_stock'
        },
    },
    { timestamps: true }
);

if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Samagri;
}

export default mongoose.models.Samagri || mongoose.model<ISamagri>('Samagri', SamagriSchema);
