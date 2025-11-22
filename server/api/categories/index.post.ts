import { requireAuth } from '../../utils/auth'
import { getDb } from '../../utils/db'
import { initDatabase } from '../../utils/init-database'
import { validateRequired, handleApiError } from '../../utils/api-response'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  await initDatabase()

  const body = await readBody(event)
  validateRequired(body, ['name', 'color'])
  
  const { name, color } = body

  // Validate color format (hex color)
  if (!/^#[0-9A-F]{6}$/i.test(color)) {
    throw createError({ statusCode: 400, message: 'Invalid color format. Use hex color (e.g., #10b981)' })
  }

  const pool = getDb()
  const client = await pool.connect()

  try {
    // Check if category already exists for this user
    const existing = await client.query(
      'SELECT id FROM categories WHERE user_id = $1 AND LOWER(name) = LOWER($2)',
      [user.userId, name]
    )

    if (existing.rows.length > 0) {
      throw createError({ statusCode: 409, message: 'Category already exists' })
    }

    // Create new category
    const result = await client.query(
      'INSERT INTO categories (user_id, name, color) VALUES ($1, $2, $3) RETURNING *',
      [user.userId, name, color]
    )

    return { success: true, category: result.rows[0] }
  } catch (error: any) {
    return handleApiError(error, 'Create category')
  } finally {
    client.release()
  }
})

