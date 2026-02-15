'use client'

import { useState, useEffect } from 'react'
import { Plus, Upload, X, ImageIcon } from 'lucide-react'

interface SamagriFormData {
    name: string
    price: number
    discount: number
    category: string
    categorySlug: string
    image: string | null
    description: string
    sku: string
    stockStatus: 'in_stock' | 'out_of_stock'
}

interface Category {
    id: string
    name: string
    slug: string
}

interface AddSamagriFormProps {
    editingSamagri?: any
    onCancelEdit?: () => void
}

export function AddSamagriForm({ editingSamagri, onCancelEdit }: AddSamagriFormProps) {
    const [formData, setFormData] = useState<SamagriFormData>({
        name: '',
        price: 0,
        discount: 0,
        category: '',
        categorySlug: '',
        image: null,
        description: '',
        sku: '',
        stockStatus: 'in_stock',
    })
    const [categories, setCategories] = useState<Category[]>([])
    const [loadingCategories, setLoadingCategories] = useState(true)
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        if (editingSamagri) {
            setFormData({
                name: editingSamagri.name || '',
                price: editingSamagri.price || 0,
                discount: editingSamagri.discount || 0,
                category: editingSamagri.category || '',
                categorySlug: editingSamagri.categorySlug || '',
                image: editingSamagri.image || null,
                description: editingSamagri.description || '',
                sku: editingSamagri.sku || '',
                stockStatus: editingSamagri.stockStatus || 'in_stock',
            })
        }
    }, [editingSamagri])

    const fetchCategories = async () => {
        try {
            setLoadingCategories(true)
            const response = await fetch('/api/categories')
            if (response.ok) {
                const data = await response.json()
                const normalized = data
                    .filter((cat: any) => cat.isProduct === true)
                    .map((cat: any) => ({
                        ...cat,
                        id: cat.id || cat._id
                    }))
                setCategories(normalized)
            }
        } catch (error) {
            console.error('Error fetching categories:', error)
        } finally {
            setLoadingCategories(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => {
            const updated = {
                ...prev,
                [name]: (name === 'price' || name === 'discount') ? parseFloat(value) || 0 : value,
            }
            if (name === 'category') {
                const selectedCategory = categories.find(c => c.name === value)
                updated.categorySlug = selectedCategory ? selectedCategory.slug : value.toLowerCase().replace(/\s+/g, '-')
            }
            return updated
        })
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            const uploadFormData = new FormData()
            uploadFormData.append('file', file)
            uploadFormData.append('folder', 'samagri')
            uploadFormData.append('resource_type', 'image')

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData,
            })

            if (!response.ok) throw new Error('Upload failed')

            const data = await response.json()
            setFormData(prev => ({ ...prev, image: data.secure_url }))
            alert('✅ Image uploaded successfully!')
        } catch (error) {
            console.error('Upload error:', error)
            alert('❌ Failed to upload image.')
        } finally {
            setIsUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.price || !formData.category) {
            alert('Please fill in required fields.')
            return
        }

        try {
            const isEditing = !!editingSamagri
            const url = isEditing ? `/api/samagri/${editingSamagri.id || editingSamagri._id}` : '/api/samagri'
            const method = isEditing ? 'PATCH' : 'POST'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error('Failed to save')

            alert(`✅ Samagri ${isEditing ? 'updated' : 'added'} successfully!`)

            if (isEditing && onCancelEdit) {
                onCancelEdit()
            } else {
                setFormData({
                    name: '', price: 0, discount: 0, category: '', categorySlug: '',
                    image: null, description: '', sku: '', stockStatus: 'in_stock',
                })
            }
            window.location.reload()
        } catch (error) {
            alert(`❌ Error: ${error}`)
        }
    }

    return (
        <div className="bg-white dark:bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                    <Plus className="w-6 h-6 text-primary" />
                    {editingSamagri ? 'Edit Samagri' : 'Add New Samagri'}
                </h2>
                {editingSamagri && onCancelEdit && (
                    <button onClick={onCancelEdit} className="px-4 py-2 text-sm font-semibold border-2 rounded-lg transition-colors">
                        Cancel Edit
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Item Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-gray-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">SKU</label>
                        <input type="text" name="sku" value={formData.sku} onChange={handleInputChange} className="w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-gray-900" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Price (INR) *</label>
                        <input type="number" name="price" value={formData.price} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-gray-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Discount (%)</label>
                        <input type="number" name="discount" value={formData.discount} onChange={handleInputChange} className="w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-gray-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Category *</label>
                        <select name="category" value={formData.category} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-gray-900">
                            <option value="">Select Category</option>
                            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Stock Status</label>
                    <select name="stockStatus" value={formData.stockStatus} onChange={handleInputChange} className="w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-gray-900">
                        <option value="in_stock">In Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-gray-900 resize-none" />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Image</label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors">
                            <Upload className="w-5 h-5 text-gray-400" />
                            <span className="text-sm">{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={isUploading} />
                        </label>
                        {formData.image && (
                            <div className="flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-green-500" />
                                <span className="text-sm text-green-600">Uploaded</span>
                                <button type="button" onClick={() => setFormData(p => ({ ...p, image: null }))} className="p-1"><X className="w-4 h-4 text-red-500" /></button>
                            </div>
                        )}
                    </div>
                </div>

                <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                    {editingSamagri ? 'Update Samagri' : 'Add Samagri'}
                </button>
            </form>
        </div>
    )
}
