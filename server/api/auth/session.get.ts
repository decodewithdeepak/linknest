import { optionalAuth } from '../../utils/auth'
import { query } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    // Try to get authenticated user
    const authUser = await optionalAuth(event)

    if (!authUser) {
      return { user: null }
    }

    // Get fresh user data from database
    const result = await query(
      'SELECT id, email, name FROM users WHERE id = $1',
      [authUser.userId]
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
