import jwt from 'jsonwebtoken'
import { H3Event, getCookie } from 'h3'

export interface AuthUser {
  userId: number
  email: string
  name: string
}

/**
 * Verify JWT token and return decoded user data
 * Throws 401 error if token is invalid or missing
 */
export async function requireAuth(event: H3Event): Promise<AuthUser> {
  const token = getCookie(event, 'auth-token')
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Not authenticated'
    })
  }

  const secret = process.env.AUTH_SECRET
  
  if (!secret) {
    throw createError({
      statusCode: 500,
      message: 'AUTH_SECRET is not configured'
    })
  }

  try {
    const decoded = jwt.verify(token, secret) as AuthUser
    return decoded
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'Invalid or expired token'
    })
  }
}

/**
 * Optional auth - returns user if authenticated, null otherwise
 * Does not throw errors
 */
export async function optionalAuth(event: H3Event): Promise<AuthUser | null> {
  try {
    return await requireAuth(event)
  } catch {
    return null
  }
}

