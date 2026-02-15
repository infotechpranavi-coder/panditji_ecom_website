'use client'

import { useState, useEffect } from 'react'
import { Upload, Trash2, Image as ImageIcon, Video, Search, X } from 'lucide-react'

interface GalleryItem {
    _id: string
    title: string
    description: string
    mediaUrl: string
    mediaType: 'image' | 'video'
    thumbnail: string | null
    category: string
    uploadedAt: string
}

export function GalleryManager() {
    const [items, setItems] = useState<GalleryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterCategory, setFilterCategory] = useState('all')
    const [isUploading, setIsUploading] = useState(false)
    const [uploadType, setUploadType] = useState<'image' | 'video' | null>(null)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        mediaUrl: '',
        mediaType: 'image' as 'image' | 'video',
        category: 'Events',
    })

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        try {
            const response = await fetch('/api/gallery')
            if (response.ok) {
                const data = await response.json()
                setItems(data)
            }
        } catch (error) {
            console.error('Error fetching gallery items:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        setUploadType(type)

        try {
            const uploadFormData = new FormData()
            uploadFormData.append('file', file)
            uploadFormData.append('folder', 'panditji/gallery')
            uploadFormData.append('resource_type', type === 'image' ? 'image' : 'video')

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData,
            })

            if (!response.ok) {
                throw new Error('Upload failed')
            }

            const data = await response.json()
            setFormData(prev => ({
                ...prev,
                mediaUrl: data.secure_url,
                mediaType: type,
            }))

            alert(`✅ ${type === 'image' ? 'Image' : 'Video'} uploaded successfully!`)
        } catch (error: any) {
            console.error('Upload error:', error)
            alert(`❌ Failed to upload ${type}`)
        } finally {
            setIsUploading(false)
            setUploadType(null)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.mediaUrl) {
            alert('Please provide a title and upload media')
            return
        }

        try {
            const response = await fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error('Failed to add gallery item')
            }

            alert('✅ Gallery item added successfully!')
            setFormData({
                title: '',
                description: '',
                mediaUrl: '',
                mediaType: 'image',
                category: 'Events',
            })
            fetchItems()
        } catch (error: any) {
            console.error('Error adding gallery item:', error)
            alert('❌ Failed to add gallery item')
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return

        try {
            const response = await fetch(`/api/gallery/${id}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                setItems(prev => prev.filter(item => item._id !== id))
                alert('Gallery item deleted successfully!')
            } else {
                alert('Failed to delete gallery item')
            }
        } catch (error) {
            console.error('Error deleting gallery item:', error)
            alert('Failed to delete gallery item')
        }
    }

    const filteredItems = items.filter(item => {
        const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = filterCategory === 'all' || item.category === filterCategory
        return matchesSearch && matchesCategory
    })

    if (loading) {
        return (
            <div className="bg-white dark:bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading gallery...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Upload Form */}
            <div className="bg-white dark:bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Upload className="w-6 h-6 text-primary" />
                    Add to Gallery
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                required
                                placeholder="e.g., Diwali Celebration 2024"
                                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            >
                                <option value="Events">Events</option>
                                <option value="Ceremonies">Ceremonies</option>
                                <option value="Rituals">Rituals</option>
                                <option value="Festivals">Festivals</option>
                                <option value="General">General</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            rows={3}
                            placeholder="Brief description..."
                            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                        />
                    </div>

                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary transition-colors">
                            <Upload className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {isUploading && uploadType === 'image' ? 'Uploading...' : 'Upload Image'}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, 'image')}
                                className="hidden"
                                disabled={isUploading}
                            />
                        </label>

                        <label className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary transition-colors">
                            <Upload className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {isUploading && uploadType === 'video' ? 'Uploading...' : 'Upload Video'}
                            </span>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleFileUpload(e, 'video')}
                                className="hidden"
                                disabled={isUploading}
                            />
                        </label>

                        {formData.mediaUrl && (
                            <div className="flex items-center gap-2 px-4 py-3 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg">
                                {formData.mediaType === 'image' ? (
                                    <ImageIcon className="w-5 h-5 text-green-500" />
                                ) : (
                                    <Video className="w-5 h-5 text-green-500" />
                                )}
                                <span className="text-sm text-green-600 dark:text-green-400">Uploaded</span>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, mediaUrl: '' }))}
                                    className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                                >
                                    <X className="w-4 h-4 text-red-500" />
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                    >
                        Add to Gallery
                    </button>
                </form>
            </div>

            {/* Gallery List */}
            <div className="bg-white dark:bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                        Gallery Items ({items.length})
                    </h2>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search gallery..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                    </div>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    >
                        <option value="all">All Categories</option>
                        <option value="Events">Events</option>
                        <option value="Ceremonies">Ceremonies</option>
                        <option value="Rituals">Rituals</option>
                        <option value="Festivals">Festivals</option>
                        <option value="General">General</option>
                    </select>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-600 dark:text-gray-400 text-lg">No gallery items found</p>
                        </div>
                    ) : (
                        filteredItems.map((item) => (
                            <div
                                key={item._id}
                                className="border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-primary/50 transition-colors group"
                            >
                                <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                                    {item.mediaType === 'image' ? (
                                        <img
                                            src={item.mediaUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <video
                                            src={item.mediaUrl}
                                            className="w-full h-full object-cover"
                                            muted
                                        />
                                    )}
                                    <div className="absolute top-2 right-2">
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                                            {item.description}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full font-semibold">
                                            {item.category}
                                        </span>
                                        <span className="text-gray-500">
                                            {item.mediaType === 'image' ? <ImageIcon className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
