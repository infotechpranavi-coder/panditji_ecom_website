'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, Save } from 'lucide-react'

interface Category {
  id: string
  _id?: string
  name: string
  slug: string
  description: string
  showOnNavbar?: boolean
  isService: boolean
  isProduct: boolean
  createdAt: string
}

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    showOnNavbar: false,
    isService: true,
    isProduct: false
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        // Ensure all categories have default values for flags
        const normalizedCategories = data.map((cat: any) => ({
          ...cat,
          showOnNavbar: cat.showOnNavbar === true,
          isService: cat.isService !== false, // default true
          isProduct: cat.isProduct === true, // default false
          description: cat.description || '',
          name: cat.name || '',
          id: cat.id || cat._id,
        }))
        setCategories(normalizedCategories)
      } else {
        setError('Failed to fetch categories')
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      setError('Failed to fetch categories')
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async () => {
    if (!formData.name.trim()) {
      setError('Category name is required')
      return
    }

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim(),
          showOnNavbar: formData.showOnNavbar,
          isService: formData.isService,
          isProduct: formData.isProduct,
        }),
      })

      if (response.ok) {
        const newCategory = await response.json()
        const normalizedNewCategory = {
          ...newCategory,
          showOnNavbar: newCategory.showOnNavbar === true,
          isService: newCategory.isService !== false,
          isProduct: newCategory.isProduct === true,
          description: newCategory.description || '',
          name: newCategory.name || '',
          id: newCategory.id || newCategory._id,
        }
        setCategories([...categories, normalizedNewCategory])
        setFormData({
          name: '',
          description: '',
          showOnNavbar: false,
          isService: true,
          isProduct: false
        })
        setIsAdding(false)
        setError('')
        alert('Category added successfully!')
      } else {
        setError('Failed to add category')
      }
    } catch (error) {
      console.error('Error adding category:', error)
      setError('Failed to add category')
    }
  }

  const handleEditCategory = async (id: string) => {
    const category = categories.find(c => c.id === id)
    if (!category) return

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim(),
          showOnNavbar: formData.showOnNavbar,
          isService: formData.isService,
          isProduct: formData.isProduct,
        }),
      })

      if (response.ok) {
        setCategories(categories.map(c => c.id === id ? { ...c, ...formData } : c))
        setEditingId(null)
        setFormData({
          name: '',
          description: '',
          showOnNavbar: false,
          isService: true,
          isProduct: false
        })
        setError('')
        alert('Category updated successfully!')
      } else {
        setError('Failed to update category')
      }
    } catch (error) {
      console.error('Error updating category:', error)
      setError('Failed to update category')
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? Services/Products under this category will need to be reassigned.')) {
      return
    }

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setCategories(categories.filter(c => c.id !== id))
        alert('Category deleted successfully!')
      } else {
        setError('Failed to delete category')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      setError('Failed to delete category')
    }
  }

  const startEditing = (category: Category) => {
    setEditingId(category.id)
    setFormData({
      name: category.name || '',
      description: category.description || '',
      showOnNavbar: category.showOnNavbar === true,
      isService: category.isService !== false,
      isProduct: category.isProduct === true
    })
    setIsAdding(false)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData({
      name: '',
      description: '',
      showOnNavbar: false,
      isService: true,
      isProduct: false
    })
    setError('')
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading categories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Plus className="w-6 h-6 text-primary" />
          Manage Categories
        </h2>
        {!isAdding && !editingId && (
          <button
            onClick={() => {
              setIsAdding(true)
              setEditingId(null)
              setFormData({
                name: '',
                description: '',
                showOnNavbar: false,
                isService: true,
                isProduct: false
              })
              setError('')
            }}
            className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Category
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6 border-2 border-primary/20">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {editingId ? 'Edit Category' : 'Add New Category'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Daily Rituals"
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this category..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="showOnNavbar"
                  checked={formData.showOnNavbar === true}
                  onChange={(e) => setFormData({ ...formData, showOnNavbar: e.target.checked })}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="showOnNavbar" className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                  Show on Navbar
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isService"
                  checked={formData.isService === true}
                  onChange={(e) => setFormData({ ...formData, isService: e.target.checked })}
                  className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isService" className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                  Ritual Service
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isProduct"
                  checked={formData.isProduct === true}
                  onChange={(e) => setFormData({ ...formData, isProduct: e.target.checked })}
                  className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="isProduct" className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                  Samagri Product
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => editingId ? handleEditCategory(editingId) : handleAddCategory()}
                className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                {editingId ? 'Update' : 'Add'} Category
              </button>
              <button
                onClick={cancelEditing}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="space-y-3">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No categories found</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              Add your first category to get started!
            </p>
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary/50 transition-colors"
            >
              {editingId === category.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-semibold"
                  />
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`showOnNavbar-${category.id}`}
                        checked={formData.showOnNavbar === true}
                        onChange={(e) => setFormData({ ...formData, showOnNavbar: e.target.checked })}
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <label htmlFor={`showOnNavbar-${category.id}`} className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                        On Navbar
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`isService-${category.id}`}
                        checked={formData.isService === true}
                        onChange={(e) => setFormData({ ...formData, isService: e.target.checked })}
                        className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`isService-${category.id}`} className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                        Ritual
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`isProduct-${category.id}`}
                        checked={formData.isProduct === true}
                        onChange={(e) => setFormData({ ...formData, isProduct: e.target.checked })}
                        className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <label htmlFor={`isProduct-${category.id}`} className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                        Samagri
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCategory(category.id)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {category.description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Slug: {category.slug}
                      </p>
                      {category.showOnNavbar && (
                        <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-bold uppercase tracking-widest border border-primary/20">
                          Navbar
                        </span>
                      )}
                      {category.isService && (
                        <span className="text-[10px] px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-bold uppercase tracking-widest border border-blue-200 dark:border-blue-800">
                          Ritual
                        </span>
                      )}
                      {category.isProduct && (
                        <span className="text-[10px] px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full font-bold uppercase tracking-widest border border-orange-200 dark:border-orange-800">
                          Samagri
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEditing(category)}
                      className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                      title="Edit category"
                    >
                      <Edit className="w-5 h-5 text-primary" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete category"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
