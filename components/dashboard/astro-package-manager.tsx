'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, Save, Star, List } from 'lucide-react'

interface AstroPackage {
  id: string
  _id?: string
  name: string
  price: number
  unit: string
  features: string[]
  isPopular: boolean
  order: number
  updatedAt?: string
}

export function AstroPackageManager() {
  const [packages, setPackages] = useState<AstroPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    unit: '/session',
    features: '',
    isPopular: false,
    order: 0
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/astro-packages')
      if (response.ok) {
        const data = await response.json()
        setPackages(data.map((p: any) => ({
          ...p,
          id: p.id || p._id,
          features: p.features || []
        })))
      }
    } catch (error) {
      console.error('Error fetching packages:', error)
      setError('Failed to fetch packages')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setError('Package name is required')
      return
    }

    const payload = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f !== '')
    }

    try {
      const url = editingId ? `/api/astro-packages/${editingId}` : '/api/astro-packages'
      const method = editingId ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        alert(`Package ${editingId ? 'updated' : 'added'} successfully!`)
        fetchPackages()
        resetForm()
      } else {
        setError('Failed to save package')
      }
    } catch (error) {
      console.error('Error saving package:', error)
      setError('Failed to save package')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return

    try {
      const response = await fetch(`/api/astro-packages/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setPackages(packages.filter(p => p.id !== id))
        alert('Package deleted successfully!')
      }
    } catch (error) {
      console.error('Error deleting package:', error)
      setError('Failed to delete package')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      unit: '/session',
      features: '',
      isPopular: false,
      order: 0
    })
    setIsAdding(false)
    setEditingId(null)
    setError('')
  }

  const startEdit = (pkg: AstroPackage) => {
    setEditingId(pkg.id)
    setFormData({
      name: pkg.name,
      price: pkg.price,
      unit: pkg.unit,
      features: pkg.features.join(', '),
      isPopular: pkg.isPopular,
      order: pkg.order
    })
    setIsAdding(true)
  }

  if (loading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading Astro Packages...</div>

  return (
    <div className="bg-white dark:bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Star className="w-6 h-6 text-primary" />
          Astrology Prediction Packages
        </h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Package
          </button>
        )}
      </div>

      {error && <div className="p-3 bg-red-100 text-red-600 rounded-lg mb-4 text-sm font-bold">{error}</div>}

      {isAdding && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8 border-2 border-primary/20 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">{editingId ? 'Edit Package' : 'Create New Package'}</h3>
            <button onClick={resetForm} className="text-muted-foreground hover:text-red-500 transition-colors"><X className="w-5 h-5" /></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold opacity-70">Package Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. 15 Minutes" 
                className="w-full px-4 py-2 border-2 rounded-lg bg-white dark:bg-gray-900 outline-none focus:border-primary transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70">Price (₹)</label>
                <input 
                  type="number" 
                  value={formData.price} 
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  className="w-full px-4 py-2 border-2 rounded-lg bg-white dark:bg-gray-900 outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70">Unit</label>
                <input 
                  type="text" 
                  value={formData.unit} 
                  onChange={e => setFormData({...formData, unit: e.target.value})}
                  placeholder="/session" 
                  className="w-full px-4 py-2 border-2 rounded-lg bg-white dark:bg-gray-900 outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold opacity-70">Features (Comma separated)</label>
              <textarea 
                value={formData.features} 
                onChange={e => setFormData({...formData, features: e.target.value})}
                placeholder="Personal Kundli Discussion, One Topic Guidance, remedies, etc." 
                rows={3}
                className="w-full px-4 py-2 border-2 rounded-lg bg-white dark:bg-gray-900 outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            <div className="flex items-center gap-6 md:col-span-2 bg-white dark:bg-gray-900 p-4 rounded-xl border border-border mt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={formData.isPopular} 
                  onChange={e => setFormData({...formData, isPopular: e.target.checked})}
                  className="w-5 h-5 rounded text-primary border-2 border-primary/20"
                />
                <span className="font-bold text-sm group-hover:text-primary transition-colors">Mark as Most Popular</span>
              </label>
              
              <div className="flex items-center gap-3">
                <span className="font-bold text-sm opacity-70">Display Order:</span>
                <input 
                  type="number" 
                  value={formData.order} 
                  onChange={e => setFormData({...formData, order: Number(e.target.value)})}
                  className="w-20 px-3 py-1 border-2 rounded-lg text-center font-bold"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSave}
              className="flex-1 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <Save className="w-5 h-5" />
              {editingId ? 'Update Package' : 'Publish Package'}
            </button>
            <button onClick={resetForm} className="px-8 py-3 bg-muted rounded-xl font-bold hover:bg-muted/80 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <div key={pkg.id} className={`group bg-white dark:bg-gray-900/50 rounded-2xl border-2 p-6 transition-all relative ${pkg.isPopular ? 'border-primary shadow-lg ring-1 ring-primary/20' : 'border-border'}`}>
            {pkg.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                Most Popular
              </div>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-black text-xl text-primary">{pkg.name}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black">₹{pkg.price}</span>
                  <span className="text-xs text-muted-foreground font-bold">{pkg.unit}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => startEdit(pkg)} className="p-2 bg-primary/10 rounded-lg text-primary hover:bg-primary hover:text-white transition-all"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(pkg.id)} className="p-2 bg-red-100 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="space-y-2 mb-4 border-t border-border/50 pt-4">
              {pkg.features.map((f, i) => (
                <div key={i} className="flex gap-2 text-xs font-bold text-muted-foreground items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1 flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            
            <div className="text-[10px] font-black text-muted-foreground flex justify-between uppercase tracking-widest opacity-40">
              <span>Order: {pkg.order}</span>
              <span>Updated: {new Date(pkg.updatedAt || '').toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
