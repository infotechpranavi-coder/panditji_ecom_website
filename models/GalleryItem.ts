import mongoose from 'mongoose'

const GalleryItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
    },
    mediaUrl: {
        type: String,
        required: true,
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        required: true,
    },
    thumbnail: {
        type: String,
        default: null,
    },
    category: {
        type: String,
        default: 'General',
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
})

export default mongoose.models.GalleryItem || mongoose.model('GalleryItem', GalleryItemSchema)
