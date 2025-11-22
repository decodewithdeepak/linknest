import { Pool } from 'pg'

// Create a single pool instance
let pool: Pool | null = null

export function getDB() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
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
  const db = getDB()
  try {
    const result = await db.query(text, params)
    return result
  } catch (error) {
    console.error('❌ Database query error:', error)
    throw error
  }
}

