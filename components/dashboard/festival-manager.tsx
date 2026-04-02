'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, Save, Calendar, Star, List } from 'lucide-react'

interface Festival {
  _id: string
  name: string
  date: string
  description?: string
  isImportant: boolean
}

export function FestivalManager() {
  const [festivals, setFestivals] = useState<Festival[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    isImportant: false
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchFestivals()
  }, [])

  const fetchFestivals = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/festivals')
      if (response.ok) {
        const data = await response.json()
        setFestivals(data)
      }
    } catch (error) {
      console.error('Error fetching festivals:', error)
      setError('Failed to fetch festivals')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setError('Festival name is required')
      return
    }

    try {
      const url = editingId ? `/api/festivals/${editingId}` : '/api/festivals'
      const method = editingId ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        fetchFestivals()
        resetForm()
      } else {
        setError('Failed to save festival')
      }
    } catch (error) {
      console.error('Error saving festival:', error)
      setError('Failed to save festival')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this festival?')) return
    try {
      const response = await fetch(`/api/festivals/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setFestivals(festivals.filter(p => p._id !== id))
      }
    } catch (error) {
      console.error('Error deleting festival:', error)
      setError('Failed to delete festival')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      isImportant: false
    })
    setIsAdding(false)
    setEditingId(null)
    setError('')
  }

  const startEdit = (f: Festival) => {
    setEditingId(f._id)
    setFormData({
      name: f.name,
      date: new Date(f.date).toISOString().split('T')[0],
      description: f.description || '',
      isImportant: f.isImportant
    })
    setIsAdding(true)
  }

  if (loading) return <div className="p-8 text-center animate-pulse">Loading Sacred Calendar...</div>

  return (
    <div className="bg-white dark:bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-primary flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          Festival & Sacred Occasions
        </h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:scale-105 transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add New Occasion
          </button>
        )}
      </div>

      {error && <div className="p-3 bg-red-100 text-red-600 rounded-lg mb-4 text-sm font-bold">{error}</div>}

      {isAdding && (
        <div className="bg-muted/30 rounded-xl p-6 mb-8 border-2 border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">{editingId ? 'Edit Occasion' : 'New Occasion'}</h3>
            <button onClick={resetForm} className="text-muted-foreground hover:text-red-500"><X className="w-5 h-5" /></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-black uppercase text-primary">Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Maha Shivratri" 
                className="w-full px-4 py-3 border-2 rounded-xl bg-background focus:border-primary outline-none transition-all font-bold"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-black uppercase text-primary">Date</label>
              <input 
                type="date" 
                value={formData.date} 
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-3 border-2 rounded-xl bg-background focus:border-primary outline-none transition-all font-bold"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-black uppercase text-primary">Brief Note (Optional)</label>
              <textarea 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Details of the sacred event..." 
                rows={2}
                className="w-full px-4 py-3 border-2 rounded-xl bg-background focus:border-primary outline-none transition-all font-bold"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={formData.isImportant} 
                onChange={e => setFormData({...formData, isImportant: e.target.checked})}
                className="w-5 h-5 rounded text-primary border-primary/20"
              />
              <span className="font-bold text-sm">Mark as Important Festival</span>
            </label>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSave}
              className="flex-1 py-4 bg-primary text-white rounded-xl font-black text-sm uppercase tracking-widest hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {editingId ? 'Update Occasion' : 'Publish Occasion'}
            </button>
            <button onClick={resetForm} className="px-8 py-4 bg-muted rounded-xl font-bold hover:bg-muted/80">Cancel</button>
          </div>
        </div>
      )}

      {/* List Table */}
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-left">
          <thead className="bg-muted text-xs font-black uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-6 py-4">Festival Name</th>
              <th className="px-6 py-4">Occasion Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {festivals.map(f => (
              <tr key={f._id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {f.name}
                    {f.isImportant && <Star className="w-3 h-3 text-red-500 fill-red-500" />}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-sm">
                  {new Date(f.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </td>
                <td className="px-6 py-4">
                  {f.isImportant ? (
                    <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-[10px] font-black uppercase tracking-widest">Crucial</span>
                  ) : (
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-[10px] font-black uppercase tracking-widest">Normal</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => startEdit(f)} className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(f._id)} className="p-2 hover:bg-red-100 text-red-500 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
