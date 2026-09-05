import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    id?: string;
    name: string;
    nameHi?: string;
    nameMr?: string;
    slug: string;
    description?: string;
    descriptionHi?: string;
    descriptionMr?: string;
    showOnNavbar?: boolean;
    isService: boolean;
    isProduct: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
    {
        id: { type: String },
        name: { type: String, required: true },
        nameHi: { type: String, default: '' },
        nameMr: { type: String, default: '' },
        slug: { type: String, required: true, unique: true },
        description: { type: String, default: '' },
        descriptionHi: { type: String, default: '' },
        descriptionMr: { type: String, default: '' },
        showOnNavbar: { type: Boolean, default: false },
        isService: { type: Boolean, default: true },
        isProduct: { type: Boolean, default: false },
    },
    { timestamps: true }
);

if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Category;
}

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
