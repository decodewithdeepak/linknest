import { requireAuth } from '../../utils/auth'
import { query } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const user = await requireAuth(event)

    // Get user's links
    const result = await query(
      `SELECT id, url, title, description, image, category, is_favorite, created_at 
       FROM links 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [user.userId]
    )

    return {
      success: true,
      links: result.rows
    }
  } catch (error: any) {
    console.error('❌ Error fetching links:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch links'
    })
  }
})

