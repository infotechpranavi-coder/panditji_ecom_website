
'use client'

import { useState, useEffect } from 'react'
import { Upload, Trash2, CheckCircle, XCircle, Image as ImageIcon, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface Banner {
    _id: string
    title: string
    description: string
    imageUrl: string
    isActive: boolean
}

export function BannerManager() {
    const [banners, setBanners] = useState<Banner[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isUploading, setIsUploading] = useState(false)

    // Form State
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [file, setFile] = useState<File | null>(null)

    useEffect(() => {
        fetchBanners()
    }, [])

    const fetchBanners = async () => {
        try {
            const response = await fetch('/api/banners')
            if (response.ok) {
                const data = await response.json()
                setBanners(data)
            }
        } catch (error) {
            console.error('Error fetching banners:', error)
            toast.error('Failed to load banners')
        } finally {
            setIsLoading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
            // Create a preview URL
            const url = URL.createObjectURL(e.target.files[0])
            setImageUrl(url)
        }
    }

    const handleUpload = async () => {
        if (!file) {
            if (!imageUrl) {
                toast.error('Please select an image')
                return null
            }
            return imageUrl // Return existing URL if manually entered
        }

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) throw new Error('Upload failed')

            const data = await response.json()
            return data.url
        } catch (error) {
            console.error('Error uploading file:', error)
            toast.error('Failed to upload image')
            return null
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUploading(true)

        try {
            const uploadedUrl = await handleUpload()
            if (!uploadedUrl) {
                setIsUploading(false)
                return
            }

            const response = await fetch('/api/banners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl: uploadedUrl,
                    isActive: true, // Default to active for new implementations usually
                }),
            })

            if (response.ok) {
                toast.success('Banner added successfully')
                fetchBanners()
                // Reset form
                setTitle('')
                setDescription('')
                setImageUrl('')
                setFile(null)
            } else {
                toast.error('Failed to save banner')
            }
        } catch (error) {
            console.error('Error creating banner:', error)
            toast.error('Something went wrong')
        } finally {
            setIsUploading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this banner?')) return

        try {
            const response = await fetch(`/api/banners/${id}`, { method: 'DELETE' })
            if (response.ok) {
                toast.success('Banner deleted')
                fetchBanners()
            } else {
                toast.error('Failed to delete banner')
            }
        } catch (error) {
            console.error('Error deleting banner:', error)
        }
    }

    const toggleActive = async (banner: Banner) => {
        try {
            // If we contain logic to only allow ONE active, fetching will handle updating others
            // But for UI feedback, optimistic update or refetch is needed.
            // Our backend logic for POST/PATCH sets others to false if this is true.

            const response = await fetch(`/api/banners/${banner._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: true }), // Always set to true (click to activate)
            })

            if (response.ok) {
                toast.success('Banner activated')
                fetchBanners()
            }
        } catch (error) {
            toast.error('Failed to update banner')
        }
    }

    return (
        <div className="space-y-8">
            {/* Add New Banner Section */}
            <div className="bg-white dark:bg-card rounded-2xl p-6 border-2 border-border shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-primary" />
                    Add Hero Banner
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Banner Title (Optional)</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Title (leave empty for image-only)"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary bg-background"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Short subtitle for the banner"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary bg-background h-24"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Banner Image</label>
                            <div className="border-2 border-dashed border-border rounded-xl h-48 flex flex-col items-center justify-center p-4 relative bg-muted/20 hover:bg-muted/30 transition-colors">
                                {imageUrl ? (
                                    <img src={imageUrl} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                                ) : (
                                    <div className="text-center text-muted-foreground">
                                        <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">Click to upload or drag and drop</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                            {imageUrl && (
                                <button
                                    type="button"
                                    onClick={() => { setImageUrl(''); setFile(null); }}
                                    className="text-xs text-red-500 mt-2 hover:underline"
                                >
                                    Remove Image
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isUploading}
                            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                            {isUploading ? 'Uploading...' : 'Save Banner'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Existing Banners List */}
            <div className="bg-white dark:bg-card rounded-2xl p-6 border-2 border-border shadow-sm">
                <h2 className="text-xl font-bold mb-6">Existing Banners</h2>

                {isLoading ? (
                    <div className="flex justify-center p-8">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : banners.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
                        <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No banners found. Add one above to get started!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {banners.map((banner) => (
                            <div key={banner._id} className={`relative group rounded-xl border-2 overflow-hidden transition-all ${banner.isActive ? 'border-primary ring-2 ring-primary/20' : 'border-border opacity-70 hover:opacity-100'}`}>
                                <div className="aspect-video bg-muted relative">
                                    <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                                    {banner.isActive && (
                                        <div className="absolute top-2 right-2 px-2 py-1 bg-primary text-white text-xs font-bold rounded-md shadow-sm flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3" /> Active
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 bg-background">
                                    <h3 className="font-bold text-lg mb-1 truncate">{banner.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 h-10 mb-4">
                                        {banner.description || 'No description'}
                                    </p>

                                    <div className="flex items-center justify-between gap-3">
                                        {!banner.isActive && (
                                            <button
                                                onClick={() => toggleActive(banner)}
                                                className="flex-1 px-3 py-1.5 text-sm bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors font-medium"
                                            >
                                                Set Active
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(banner._id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-auto"
                                            title="Delete Banner"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
