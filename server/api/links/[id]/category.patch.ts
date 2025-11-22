import { getDb } from '../../../utils/db'
import jwt from 'jsonwebtoken'
import { getCookie } from 'h3'
import { useRuntimeConfig } from '#app'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth-token')
  if (!token) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const runtimeConfig = useRuntimeConfig()
  const secret = runtimeConfig.authSecret || process.env.AUTH_SECRET
  if (!secret) {
    throw createError({ statusCode: 500, message: 'AUTH_SECRET is not set' })
  }

  let decoded: { userId: number }
  try {
    decoded = jwt.verify(token, secret) as { userId: number }
  } catch (error) {
    throw createError({ statusCode: 401, message: 'Invalid or expired token' })
  }

  const linkId = getRouterParam(event, 'id')
  if (!linkId) {
    throw createError({ statusCode: 400, message: 'Link ID is required' })
  }

  const body = await readBody(event)
  const { category } = body

  if (!category) {
    throw createError({ statusCode: 400, message: 'Category is required' })
  }

  const pool = await getDb()
  const client = await pool.connect()

  try {
    // Update category (only if it belongs to the user)
    const result = await client.query(
      'UPDATE links SET category = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [category, linkId, decoded.userId]
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

