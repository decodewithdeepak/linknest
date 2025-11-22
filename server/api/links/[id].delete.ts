import { getDb } from '../../utils/db'
import jwt from 'jsonwebtoken'
import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth-token')
  if (!token) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw createError({ statusCode: 500, message: 'AUTH_SECRET is not configured' })
  }

  let decoded: { id: number; email: string; name: string }
  try {
    decoded = jwt.verify(token, secret) as { id: number; email: string; name: string }
  } catch (error) {
    throw createError({ statusCode: 401, message: 'Invalid or expired token' })
  }

  const linkId = getRouterParam(event, 'id')
  if (!linkId) {
    throw createError({ statusCode: 400, message: 'Link ID is required' })
  }

  const pool = await getDb()
  const client = await pool.connect()

  try {
    // Delete link (only if it belongs to the user)
    const result = await client.query(
      'DELETE FROM links WHERE id = $1 AND user_id = $2 RETURNING id',
      [linkId, decoded.id]
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

