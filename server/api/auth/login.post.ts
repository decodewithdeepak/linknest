import { compare } from 'bcrypt-ts'
import jwt from 'jsonwebtoken'
import { query } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

    console.log('🔐 Login attempt for:', email)

    // Validate input
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email and password required'
      })
    }

    // Find user
    const result = await query(
      'SELECT id, email, name, password FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }

    const user = result.rows[0]

    // Verify password
    const isValid = await compare(password, user.password)

    if (!isValid) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }

    console.log('✅ Login successful:', user.email)

    // Create JWT token
    const secret = process.env.AUTH_SECRET
    if (!secret) {
      throw createError({
        statusCode: 500,
        message: 'AUTH_SECRET is not configured'
      })
    }
    
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name
      },
      secret,
      { expiresIn: '7d' }
    )

    // Set cookie
    setCookie(event, 'auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    }
  } catch (error: any) {
    console.error('❌ Login error:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Login failed'
    })
  }
})
