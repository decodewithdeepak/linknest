import { requireAuth } from '../../utils/auth'
import { getDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const linkId = getRouterParam(event, 'id')
  if (!linkId) {
    throw createError({ statusCode: 400, message: 'Link ID is required' })
  }

  const pool = getDb()
  const client = await pool.connect()

  try {
    // Delete link (only if it belongs to the user)
    const result = await client.query(
      'DELETE FROM links WHERE id = $1 AND user_id = $2 RETURNING id',
      [linkId, user.userId]
    )

    if (result.rows.length === 0) {
      throw createError({ statusCode: 404, message: 'Link not found or unauthorized' })
    }

    return { success: true, message: 'Link deleted successfully' }
  } catch (error: any) {
    console.error('❌ Error deleting link:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to delete link'
    })
  } finally {
    client.release()
  }
})

