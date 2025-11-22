import { compare, hash } from 'bcrypt-ts'
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
    const secret = process.env.AUTH_SECRET || 'change-this-secret-key'
    const decoded = jwt.verify(token, secret) as any

    const body = await readBody(event)
    const { currentPassword, newPassword } = body

    console.log('🔐 Password change attempt for user:', decoded.id)

    // Validate input
    if (!currentPassword || !newPassword) {
      throw createError({
        statusCode: 400,
        message: 'Current and new password required'
      })
    }

    // Validate new password length
    if (newPassword.length < 8) {
      throw createError({
        statusCode: 400,
        message: 'New password must be at least 8 characters'
      })
    }

    // Get user with current password
    const result = await query(
      'SELECT id, password FROM users WHERE id = $1',
      [decoded.id]
    )

    if (result.rows.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      })
    }

    const user = result.rows[0]

    // Verify current password
    const isValid = await compare(currentPassword, user.password)

    if (!isValid) {
      console.log('❌ Current password incorrect')
      throw createError({
        statusCode: 401,
        message: 'Current password is incorrect'
      })
    }

    // Hash new password
    const hashedPassword = await hash(newPassword, 10)

    // Update password in database
    await query(
      'UPDATE users SET password = $1 WHERE id = $2',
      [hashedPassword, user.id]
    )

    console.log('✅ Password changed successfully for user:', user.id)

    return {
      success: true,
      message: 'Password changed successfully'
    }
  } catch (error: any) {
    console.error('❌ Password change error:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Password change failed'
    })
  }
})

