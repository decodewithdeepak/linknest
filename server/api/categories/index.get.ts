import { requireAuth } from '../../utils/auth'
import { getDb } from '../../utils/db'
import { initDatabase } from '../../utils/init-database'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  await initDatabase()

  const pool = getDb()
  const client = await pool.connect()

  try {
    const result = await client.query(
      'SELECT id, name, color, created_at FROM categories WHERE user_id = $1 ORDER BY name ASC',
      [user.userId]
    )

    return { success: true, categories: result.rows }
  } catch (error: any) {
    console.error('❌ Error fetching categories:', error.message)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch categories'
    })
  } finally {
    client.release()
  }
})

