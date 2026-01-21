import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { defaultPujas } from '@/lib/seed-data'

// Temporary file-based storage until database is connected
// TODO: Replace with actual database connection (MongoDB, PostgreSQL, etc.)

const STORAGE_FILE = path.join(process.cwd(), 'data', 'pujas.json')

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.dirname(STORAGE_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

function getPujasFromStorage(): any[] {
  try {
    ensureDataDirectory()
    if (fs.existsSync(STORAGE_FILE)) {
      const data = fs.readFileSync(STORAGE_FILE, 'utf-8')
      const parsed = JSON.parse(data)
      // Return file data if it exists and has items, otherwise return defaults
      return parsed.length > 0 ? parsed : defaultPujas
    }
  } catch (error) {
    console.error('Error reading pujas from storage:', error)
  }
  // Return default pujas if file doesn't exist (e.g., on Vercel)
  return defaultPujas
}

function savePujaToStorage(puja: any): any {
  const newPuja = {
    id: `PUJA_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    ...puja,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  
  try {
    ensureDataDirectory()
    const pujas = getPujasFromStorage()
    // Filter out defaults to avoid duplicates
    const existingPujas = pujas.filter((p: any) => !defaultPujas.find((dp: any) => dp.id === p.id))
    existingPujas.push(newPuja)
    
    // Try to write to file (works on localhost, may fail on Vercel)
    try {
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(existingPujas, null, 2))
    } catch (writeError) {
      // On Vercel, file writes may fail - that's okay, we still return the new puja
      console.log('File write not available (expected on Vercel), data will be in-memory only')
    }
  } catch (error) {
    console.error('Error saving puja to storage:', error)
    // Don't throw - still return the new puja so the API succeeds
  }
  
  return newPuja
}

export async function GET() {
  try {
    // TODO: Replace with actual database query
    // Example with MongoDB:
    // const pujas = await db.collection('pujas').find({}).toArray()
    
    const pujas = getPujasFromStorage()
    return NextResponse.json(pujas)
  } catch (error) {
    console.error('Error fetching pujas:', error)
    return NextResponse.json({ error: 'Failed to fetch pujas' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, and category are required' },
        { status: 400 }
      )
    }
    
    // TODO: Replace with actual database insert
    // Example with MongoDB:
    // const result = await db.collection('pujas').insertOne({
    //   ...body,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // })
    
    const newPuja = savePujaToStorage(body)
    
    return NextResponse.json(newPuja, { status: 201 })
  } catch (error) {
    console.error('Error creating puja:', error)
    return NextResponse.json({ error: 'Failed to create puja' }, { status: 500 })
  }
}
