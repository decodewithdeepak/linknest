import { getDb } from '../../utils/db'
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

  const body = await readBody(event)
  const { url, title, description, image, category } = body

  if (!url) {
    throw createError({ statusCode: 400, message: 'URL is required' })
  }

  const pool = await getDb()
  const client = await pool.connect()

  try {
    // Check if link already exists for this user
    const existingLink = await client.query(
      'SELECT id FROM links WHERE user_id = $1 AND url = $2',
      [decoded.userId, url]
    )

    if (existingLink.rows.length > 0) {
      throw createError({ statusCode: 400, message: 'Link already exists' })
    }

    // Insert new link
    const result = await client.query(
      'INSERT INTO links (user_id, url, title, description, image, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [decoded.userId, url, title || url, description || '', image, category || 'Other']
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

