import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Temporary file-based storage until database is connected
const STORAGE_FILE = path.join(process.cwd(), 'data', 'categories.json')

function ensureDataDirectory() {
  const dataDir = path.dirname(STORAGE_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

function getCategoriesFromStorage(): any[] {
  try {
    ensureDataDirectory()
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
    ensureDataDirectory()
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(categories, null, 2))
  } catch (error) {
    console.error('Error saving categories to storage:', error)
    throw error
  }
}

export async function GET() {
  try {
    // TODO: Replace with actual database query
    // Example with MongoDB:
    // const categories = await db.collection('categories').find({}).sort({ name: 1 }).toArray()
    
    const categories = getCategoriesFromStorage()
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // TODO: Replace with actual database insert
    // Example with MongoDB:
    // const result = await db.collection('categories').insertOne({
    //   name: body.name,
    //   slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
    //   description: body.description || '',
    //   showOnNavbar: body.showOnNavbar || false,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // })
    
    const categories = getCategoriesFromStorage()
    const newCategory = {
      id: `CAT_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
      description: body.description || '',
      showOnNavbar: body.showOnNavbar || false,
      createdAt: new Date().toISOString(),
    }
    
    categories.push(newCategory)
    saveCategoriesToStorage(categories)
    
    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
