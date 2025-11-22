import jwt from 'jsonwebtoken'
import { query } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    // Get token from cookie
    const token = getCookie(event, 'auth-token')

    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'Not authenticated'
      })
    }

    // Verify token
    const secret = process.env.AUTH_SECRET
    if (!secret) {
      throw createError({
        statusCode: 500,
        message: 'AUTH_SECRET is not configured'
      })
    }
    
    const decoded = jwt.verify(token, secret) as { id: number; email: string; name: string }

    // Get user's links
    const result = await query(
      `SELECT id, url, title, description, image, category, is_favorite, created_at 
       FROM links 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [decoded.id]
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

