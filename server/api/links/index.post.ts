import { requireAuth } from '../../utils/auth'
import { validateUrl } from '../../utils/validation'
import { getDb } from '../../utils/db'
import { initDatabase } from '../../utils/init-database'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  
  // Ensure links table exists
  await initDatabase()

  const body = await readBody(event)
  let { url, title, description, image, category } = body

  // Validate and sanitize URL
  url = validateUrl(url)

  const pool = getDb()
  const client = await pool.connect()

  try {
    // Check if link already exists for this user
    const existingLink = await client.query(
      'SELECT id FROM links WHERE user_id = $1 AND url = $2',
      [user.userId, url]
    )

    if (existingLink.rows.length > 0) {
      throw createError({ statusCode: 400, message: 'Link already exists' })
    }

    // Insert new link
    const result = await client.query(
      'INSERT INTO links (user_id, url, title, description, image, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user.userId, url, title || url, description || '', image, category || 'Other']
    )

    return { success: true, link: result.rows[0] }
  } catch (error: any) {
    console.error('❌ Error adding link:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to add link'
    })
  } finally {
    client.release()
  }
})

