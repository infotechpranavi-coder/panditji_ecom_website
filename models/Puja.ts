import mongoose, { Schema, Document } from 'mongoose';

export interface IPuja extends Document {
    name: string;
    nameHi?: string;
    nameMr?: string;
    price: number;
    category: string;
    categorySlug?: string;
    image?: string;
    video?: string;
    shortDescription?: string;
    shortDescriptionHi?: string;
    shortDescriptionMr?: string;
    fullDescription?: string;
    fullDescriptionHi?: string;
    fullDescriptionMr?: string;
    duration?: string;
    sku?: string;
    priceLabel?: string;
    priceLabelHi?: string;
    priceLabelMr?: string;
    japaOptions?: { label: string; value: string }[];
    specifications?: { label: string; value: string }[];
    reviews?: { user: string; rating: number; comment: string; date?: string }[];
    faqs?: { question: string; answer: string }[];
    features?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const PujaSchema: Schema = new Schema(
    {
        id: { type: String },
        name: { type: String, required: true },
        nameHi: { type: String, default: '' },
        nameMr: { type: String, default: '' },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        categorySlug: { type: String },
        image: { type: String, default: '/placeholder.jpg' },
        video: { type: String },
        shortDescription: { type: String },
        shortDescriptionHi: { type: String, default: '' },
        shortDescriptionMr: { type: String, default: '' },
        fullDescription: { type: String },
        fullDescriptionHi: { type: String, default: '' },
        fullDescriptionMr: { type: String, default: '' },
        duration: { type: String },
        sku: { type: String },
        priceLabel: { type: String, default: 'Starting from' },
        priceLabelHi: { type: String, default: '' },
        priceLabelMr: { type: String, default: '' },
        japaOptions: [
            {
                label: { type: String },
                value: { type: String },
            },
        ],
        specifications: [
            {
                label: { type: String },
                value: { type: String },
            },
        ],
        reviews: [
            {
                user: { type: String },
                rating: { type: Number },
                comment: { type: String },
                date: { type: String },
            },
        ],
        faqs: [
            {
                question: { type: String },
                answer: { type: String },
            },
        ],
        features: { type: [String], default: [] },
    },
    { timestamps: true }
);

if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Puja;
}

export default mongoose.models.Puja || mongoose.model<IPuja>('Puja', PujaSchema);
