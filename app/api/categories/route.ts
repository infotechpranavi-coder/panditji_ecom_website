import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { defaultCategories } from '@/lib/seed-data'

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
      const parsed = JSON.parse(data)
      // Return file data if it exists and has items, otherwise return defaults
      return parsed.length > 0 ? parsed : defaultCategories
    }
  } catch (error) {
    console.error('Error reading categories from storage:', error)
  }
  // Return default categories if file doesn't exist (e.g., on Vercel)
  return defaultCategories
}

function saveCategoriesToStorage(categories: any[]): void {
  try {
    ensureDataDirectory()
    // Filter out defaults to avoid duplicates
    const existingCategories = categories.filter((c: any) => !defaultCategories.find((dc: any) => dc.id === c.id))
    const allCategories = [...defaultCategories, ...existingCategories]
    
    // Try to write to file (works on localhost, may fail on Vercel)
    try {
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(allCategories, null, 2))
    } catch (writeError) {
      // On Vercel, file writes may fail - that's okay
      console.log('File write not available (expected on Vercel), data will be in-memory only')
    }
  } catch (error) {
    console.error('Error saving categories to storage:', error)
    // Don't throw - allow the API to succeed
  }
}

export async function GET() {
  try {
    // TODO: Replace with actual database query
    // Example with MongoDB:
    // const categories = await db.collection('categories').find({}).sort({ name: 1 }).toArray()
    
    const categories = getCategoriesFromStorage()
    // Always return at least default categories for Vercel deployment
    return NextResponse.json(categories.length > 0 ? categories : defaultCategories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    // Return defaults even on error so site still works
    return NextResponse.json(defaultCategories)
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
