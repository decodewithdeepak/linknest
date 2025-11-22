import { query } from './db'

let isInitialized = false

/**
 * Initialize all database tables and indexes
 * This function is idempotent and can be called multiple times safely
 */
export async function initDatabase() {
  if (isInitialized) return
  
  try {
    console.log('🔄 Initializing database...')

    // 1. Create users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    await query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
    `)
    
    console.log('  ✅ Users table ready')

    // 2. Create categories table
    await query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        color VARCHAR(7) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, name)
      )
    `)
    
    await query(`
      CREATE INDEX IF NOT EXISTS idx_categories_user_id ON categories(user_id)
    `)
    
    await query(`
      CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name)
    `)
    
    console.log('  ✅ Categories table ready')

    // 3. Create links table
    await query(`
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        url TEXT NOT NULL,
        title TEXT,
        description TEXT,
        image TEXT,
        category VARCHAR(100),
        is_favorite BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    // Create indexes for faster queries
    await query(`
      CREATE INDEX IF NOT EXISTS idx_links_user_id ON links(user_id)
    `)
    
    await query(`
      CREATE INDEX IF NOT EXISTS idx_links_category ON links(category)
    `)
    
    await query(`
      CREATE INDEX IF NOT EXISTS idx_links_is_favorite ON links(is_favorite)
    `)
    
    await query(`
      CREATE INDEX IF NOT EXISTS idx_links_user_category ON links(user_id, category)
    `)
    
    await query(`
      CREATE INDEX IF NOT EXISTS idx_links_user_favorite ON links(user_id, is_favorite)
    `)
    
    console.log('  ✅ Links table ready')
    console.log('✅ Database initialization complete')
    
    isInitialized = true
  } catch (error) {
    console.error('❌ Database initialization error:', error)
    throw error
  }
}

/**
 * Legacy exports for backward compatibility
 * These will be removed in a future version
 * @deprecated Use initDatabase() instead
 */
export const initLinksTable = initDatabase
export const initCategoriesTable = initDatabase

