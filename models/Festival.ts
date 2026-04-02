import mongoose, { Schema, Document } from 'mongoose';

export interface IFestival extends Document {
  name: string;
  date: Date;
  description?: string;
  isImportant: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FestivalSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    isImportant: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Festival || mongoose.model<IFestival>('Festival', FestivalSchema);
