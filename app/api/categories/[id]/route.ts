import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const STORAGE_FILE = path.join(process.cwd(), 'data', 'categories.json')

function getCategoriesFromStorage(): any[] {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const data = fs.readFileSync(STORAGE_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading categories from storage:', error)
  }
  return []
}

function saveCategoriesToStorage(categories: any[]): void {
  try {
    const dataDir = path.dirname(STORAGE_FILE)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(categories, null, 2))
  } catch (error) {
    console.error('Error saving categories to storage:', error)
    throw error
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // TODO: Replace with actual database delete
    // Example with MongoDB:
    // const result = await db.collection('categories').deleteOne({ _id: new ObjectId(id) })
    
    const categories = getCategoriesFromStorage()
    const filtered = categories.filter((c: any) => c.id !== id)
    saveCategoriesToStorage(filtered)
    
    return NextResponse.json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    // TODO: Replace with actual database update
    // Example with MongoDB:
    // const result = await db.collection('categories').updateOne(
    //   { _id: new ObjectId(id) },
    //   { $set: { ...body, updatedAt: new Date() } }
    // )
    
    const categories = getCategoriesFromStorage()
    const index = categories.findIndex((c: any) => c.id === id)
    if (index !== -1) {
      categories[index] = { ...categories[index], ...body, updatedAt: new Date().toISOString() }
      saveCategoriesToStorage(categories)
      return NextResponse.json({ message: 'Category updated successfully', ...categories[index] })
    } else {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}
