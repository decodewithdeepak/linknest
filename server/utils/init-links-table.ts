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
    
    // Create index on user_id for faster queries
    await query(`
      CREATE INDEX IF NOT EXISTS idx_links_user_id ON links(user_id)
    `)
    
    console.log('✅ Links table ready')
    isLinksTableInitialized = true
  } catch (error) {
    console.error('❌ Links table initialization error:', error)
  }
}

