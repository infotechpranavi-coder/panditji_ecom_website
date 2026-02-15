'use client'

import { useState, useEffect } from 'react'
import { Plus, Upload, X, User, Edit2, Trash2, ShieldCheck } from 'lucide-react'

interface TeamMember {
    _id?: string
    id?: string
    name: string
    role: string
    specialty: string
    image: string
}

export function TeamManager() {
    const [members, setMembers] = useState<TeamMember[]>([])
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<TeamMember>({
        name: '',
        role: '',
        specialty: '',
        image: '',
    })
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        fetchMembers()
    }, [])

    const fetchMembers = async () => {
        try {
            const response = await fetch('/api/team')
            if (response.ok) {
                const data = await response.json()
                setMembers(data)
            }
        } catch (error) {
            console.error('Error fetching team members:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            const uploadFormData = new FormData()
            uploadFormData.append('file', file)
            uploadFormData.append('folder', 'team')
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
        if (!formData.name || !formData.role || !formData.image) {
            alert('Please fill in Name, Role and Upload an Image.')
            return
        }

        try {
            const url = isEditing ? `/api/team/${editingId}` : '/api/team'
            const method = isEditing ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                alert(`✅ Team member ${isEditing ? 'updated' : 'added'} successfully!`)
                resetForm()
                fetchMembers()
            } else {
                throw new Error('Failed to save team member')
            }
        } catch (error) {
            console.error('Error saving member:', error)
            alert('❌ Failed to save team member.')
        }
    }

    const handleEdit = (member: TeamMember) => {
        setIsEditing(true)
        setEditingId(member._id || member.id || null)
        setFormData({
            name: member.name,
            role: member.role,
            specialty: member.specialty,
            image: member.image,
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this team member?')) return

        try {
            const response = await fetch(`/api/team/${id}`, { method: 'DELETE' })
            if (response.ok) {
                alert('✅ Team member deleted successfully!')
                fetchMembers()
            }
        } catch (error) {
            console.error('Error deleting member:', error)
            alert('❌ Failed to delete team member.')
        }
    }

    const resetForm = () => {
        setFormData({ name: '', role: '', specialty: '', image: '' })
        setIsEditing(false)
        setEditingId(null)
    }

    return (
        <div className="space-y-8">
            {/* Form Section */}
            <div className="bg-white dark:bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                    <Plus className="w-6 h-6 text-primary" />
                    {isEditing ? 'Edit Team Member' : 'Add New Team Member'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Member Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g., Pandit Sharma"
                                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Role / Designation *</label>
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g., Head Priest"
                                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Expertise / Specialty</label>
                        <input
                            type="text"
                            name="specialty"
                            value={formData.specialty}
                            onChange={handleInputChange}
                            placeholder="e.g., Vedic Rituals, Astrology"
                            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Member Image *</label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary transition-colors">
                                <Upload className="w-5 h-5 text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {isUploading ? 'Uploading...' : 'Upload Photo'}
                                </span>
                                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={isUploading} />
                            </label>
                            {formData.image && (
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                        >
                            {isEditing ? 'Update Member' : 'Add Team Member'}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-3.5 border-2 border-gray-300 text-gray-600 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List Section */}
            <div className="bg-white dark:bg-card rounded-2xl border-2 border-border p-6 shadow-lg">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                    Active Team Members
                </h2>

                {loading ? (
                    <div className="py-12 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : members.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
                        No team members added yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {members.map((member) => (
                            <div key={member._id || member.id} className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-border relative">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 bg-primary/10 flex items-center justify-center">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-8 h-8 text-primary/40" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 dark:text-white truncate">{member.name}</h3>
                                        <p className="text-xs text-primary font-semibold truncate">{member.role}</p>
                                        <p className="text-[10px] text-muted-foreground truncate">{member.specialty}</p>
                                    </div>
                                </div>

                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(member)}
                                        className="p-1.5 bg-white shadow-md rounded-lg text-blue-600 hover:text-blue-700 transition-colors"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member._id || member.id || '')}
                                        className="p-1.5 bg-white shadow-md rounded-lg text-red-600 hover:text-red-700 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
