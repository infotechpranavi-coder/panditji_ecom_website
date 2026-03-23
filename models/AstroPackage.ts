import mongoose from 'mongoose';

const AstroPackageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, default: '/session' },
  features: [{ type: String }],
  isPopular: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.AstroPackage || mongoose.model('AstroPackage', AstroPackageSchema);
