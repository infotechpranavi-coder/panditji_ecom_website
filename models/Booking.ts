import mongoose, { Schema, Document } from 'mongoose'

export interface IBooking extends Document {
    pujaId: mongoose.Types.ObjectId;
    pujaName: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress?: string;
    date: string;
    bookingTime?: string;
    japa?: string;
    quantity: number;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    emailSent: boolean;
    createdAt: Date;
}

const BookingSchema: Schema = new Schema({
    pujaId: { type: Schema.Types.ObjectId, ref: 'Puja', required: true },
    pujaName: { type: String, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerAddress: { type: String },
    date: { type: String, required: true },
    bookingTime: { type: String },
    japa: { type: String },
    quantity: { type: Number, default: 1 },
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    emailSent: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema)
