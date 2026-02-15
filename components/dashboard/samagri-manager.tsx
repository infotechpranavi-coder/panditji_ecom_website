'use client'

import { useState, useEffect } from 'react'
import { Search, Edit2, Trash2, Package, Loader2, AlertCircle } from 'lucide-react'

interface Samagri {
    _id: string
    name: string
    price: number
    category: string
    stockStatus: string
    sku: string
}

interface SamagriManagerProps {
    onEdit: (samagri: any) => void
}

export function SamagriManager({ onEdit }: SamagriManagerProps) {
    const [samagris, setSamagris] = useState<Samagri[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [deletingId, setDeletingId] = useState<string | null>(null)

    useEffect(() => {
        fetchSamagri()
    }, [])

    const fetchSamagri = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/samagri')
            if (response.ok) {
                const data = await response.json()
                setSamagris(data)
            }
        } catch (error) {
            console.error('Error fetching samagri:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return

        setDeletingId(id)
        try {
            const response = await fetch(`/api/samagri/${id}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                setSamagris(prev => prev.filter(s => s._id !== id))
                alert('✅ Item deleted successfully.')
            } else {
                throw new Error('Failed to delete')
            }
        } catch (error) {
            alert('❌ Failed to delete item.')
        } finally {
            setDeletingId(null)
        }
    }

    const filteredSamagri = samagris.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.sku.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground font-medium">Loading items...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-card border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSamagri.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white dark:bg-card rounded-2xl border-2 border-border p-5 hover:shadow-lg transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <Package className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 rounded-lg transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    disabled={deletingId === item._id}
                                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {deletingId === item._id ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <h3 className="font-bold text-lg mb-1 line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{item.category} • {item.sku || 'No SKU'}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                            <span className="text-lg font-black text-primary">₹{item.price}</span>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.stockStatus === 'in_stock'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                    : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                }`}>
                                {item.stockStatus === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                    </div>
                ))}

                {filteredSamagri.length === 0 && (
                    <div className="col-span-full py-12 text-center">
                        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-medium text-muted-foreground">No items found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
