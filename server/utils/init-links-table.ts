import { query } from './db'

let isLinksTableInitialized = false

export async function initLinksTable() {
  if (isLinksTableInitialized) return
  
  try {
    // Create links table
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
    
    // Composite index for common queries (user + category)
    await query(`
      CREATE INDEX IF NOT EXISTS idx_links_user_category ON links(user_id, category)
    `)
    
    // Composite index for user + favorite queries
    await query(`
      CREATE INDEX IF NOT EXISTS idx_links_user_favorite ON links(user_id, is_favorite)
    `)
    
    console.log('✅ Links table and indexes ready')
    isLinksTableInitialized = true
  } catch (error) {
    console.error('❌ Links table initialization error:', error)
  }
}

