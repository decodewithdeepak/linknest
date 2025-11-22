import jwt from 'jsonwebtoken'
import { query } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    // Get token from cookie
    const token = getCookie(event, 'auth-token')

    if (!token) {
      return { user: null }
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

    // Get fresh user data
    const result = await query(
      'SELECT id, email, name FROM users WHERE id = $1',
      [decoded.id]
    )

    if (result.rows.length === 0) {
      deleteCookie(event, 'auth-token')
      return { user: null }
    }

    return {
      user: result.rows[0]
    }
  } catch (error) {
    // Invalid token
    deleteCookie(event, 'auth-token')
    return { user: null }
  }
})
