import { requireAuth } from '../../utils/auth'
import { getDb } from '../../utils/db'
import { initDatabase } from '../../utils/init-database'

const PREDEFINED_CATEGORIES = [
  { name: 'Development', color: '#10b981' },
  { name: 'Open Source', color: '#22c55e' },
  { name: 'Portfolio', color: '#3b82f6' },
  { name: 'Productivity', color: '#0ea5e9' },
  { name: 'Blog', color: '#8b5cf6' },
  { name: 'Design', color: '#a855f7' },
  { name: 'Tool', color: '#f59e0b' },
  { name: 'Learning', color: '#ec4899' },
  { name: 'Social', color: '#f97316' },
  { name: 'Video', color: '#ef4444' },
  { name: 'Entertainment', color: '#dc2626' },
  { name: 'Other', color: '#6b7280' }
]

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  await initDatabase()

  const pool = getDb()
  const client = await pool.connect()

  try {
    // Check if user already has categories
    const existing = await client.query(
      'SELECT COUNT(*) as count FROM categories WHERE user_id = $1',
      [user.userId]
    )

    if (parseInt(existing.rows[0].count) > 0) {
      return { success: true, message: 'Categories already exist', seeded: false }
    }

    // Insert all predefined categories
    const insertPromises = PREDEFINED_CATEGORIES.map(cat =>
      client.query(
        'INSERT INTO categories (user_id, name, color) VALUES ($1, $2, $3)',
        [user.userId, cat.name, cat.color]
      )
    )

    await Promise.all(insertPromises)

    console.log(`✅ Seeded ${PREDEFINED_CATEGORIES.length} categories for user ${user.userId}`)

    return { 
      success: true, 
      message: `Seeded ${PREDEFINED_CATEGORIES.length} categories`,
      seeded: true 
    }
  } catch (error: any) {
    console.error('❌ Error seeding categories:', error.message)
    throw createError({
      statusCode: 500,
      message: 'Failed to seed categories'
    })
  } finally {
    client.release()
  }
})

