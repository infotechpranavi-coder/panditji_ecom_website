import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

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
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading pujas from storage:', error)
  }
  return []
}

function savePujaToStorage(puja: any): any {
  try {
    ensureDataDirectory()
    const pujas = getPujasFromStorage()
    const newPuja = {
      id: `PUJA_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      ...puja,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    pujas.push(newPuja)
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(pujas, null, 2))
    return newPuja
  } catch (error) {
    console.error('Error saving puja to storage:', error)
    throw error
  }
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
