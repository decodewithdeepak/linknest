import { query } from './db'

let isInitialized = false

export async function initDatabase() {
  if (isInitialized) return
  
  try {
    // Create users table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    // Create index on email for faster lookups
    await query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
    `)
    
    console.log('✅ Users table and indexes ready')
    isInitialized = true
  } catch (error) {
    console.error('❌ Database initialization error:', error)
  }
}

