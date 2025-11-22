import { requireAuth } from '../../../utils/auth'
import { getDb } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const linkId = getRouterParam(event, 'id')
  if (!linkId) {
    throw createError({ statusCode: 400, message: 'Link ID is required' })
  }

  const body = await readBody(event)
  const { category } = body

  if (!category) {
    throw createError({ statusCode: 400, message: 'Category is required' })
  }

  const pool = getDb()
  const client = await pool.connect()

  try {
    // Update category (only if it belongs to the user)
    const result = await client.query(
      'UPDATE links SET category = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [category, linkId, user.userId]
    )

    if (result.rows.length === 0) {
      throw createError({ statusCode: 404, message: 'Link not found or unauthorized' })
    }

    return { success: true, link: result.rows[0] }
  } catch (error: any) {
    console.error('❌ Error updating category:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to update category'
    })
  } finally {
    client.release()
  }
})

