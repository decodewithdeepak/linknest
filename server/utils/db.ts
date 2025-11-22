import { Pool } from 'pg'

// Create a single pool instance
let pool: Pool | null = null

export function getDb() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL
    
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set')
    }
    
    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false
      }
    })
    console.log('✅ Database connection pool created')
  }
  return pool
}

// Helper function to run queries
export async function query(text: string, params?: any[]) {
  const db = getDb()
  try {
    const result = await db.query(text, params)
    return result
  } catch (error) {
    console.error('❌ Database query error:', error)
    throw error
  }
}

