// Client-side storage helper for pujas
// This is a temporary solution until database is connected
// In production, all data should come from the API/database

const STORAGE_KEY = 'panditji_pujas'

export interface Puja {
  id: string
  name: string
  sku: string
  price: number
  priceLabel: string
  category: string
  categorySlug: string
  shortDescription: string
  fullDescription: string
  duration: string
  image: string | null
  video: string | null
  specifications: Array<{ label: string; value: string }>
  japaOptions: Array<{ label: string; value: string }>
  features: string[]
  createdAt: string
  updatedAt?: string
}

export function getPujasFromLocalStorage(): Puja[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return []
  }
}

export function savePujaToLocalStorage(puja: Puja): void {
  if (typeof window === 'undefined') return
  
  try {
    const pujas = getPujasFromLocalStorage()
    pujas.push(puja)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pujas))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export function updatePujaInLocalStorage(puja: Puja): void {
  if (typeof window === 'undefined') return
  
  try {
    const pujas = getPujasFromLocalStorage()
    const index = pujas.findIndex(p => p.id === puja.id)
    if (index !== -1) {
      pujas[index] = { ...puja, updatedAt: new Date().toISOString() }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pujas))
    }
  } catch (error) {
    console.error('Error updating localStorage:', error)
  }
}

export function deletePujaFromLocalStorage(id: string): void {
  if (typeof window === 'undefined') return
  
  try {
    const pujas = getPujasFromLocalStorage()
    const filtered = pujas.filter(p => p.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Error deleting from localStorage:', error)
  }
}
