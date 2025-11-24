import { compare, hash } from 'bcrypt-ts'
import jwt from 'jsonwebtoken'
import { requireAuth, optionalAuth } from '../../utils/auth'
import { query } from '../../utils/db'
import { initDatabase } from '../../utils/init-database'
import { validateEmail, validatePassword } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const method = event.method
  const path = event.path

  // Route to appropriate handler based on path
  if (path.includes('/login')) {
    return await login(event)
  } else if (path.includes('/register')) {
    return await register(event)
  } else if (path.includes('/logout')) {
    return await logout(event)
  } else if (path.includes('/session')) {
    return await getSession(event)
  } else if (path.includes('/change-password')) {
    return await changePassword(event)
  } else {
    throw createError({ statusCode: 404, message: 'Auth endpoint not found' })
  }
})

// POST /api/auth/login - User login
async function login(event: any) {
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
}

// POST /api/auth/register - User registration
async function register(event: any) {
  try {
    // Initialize database (creates table if needed)
    await initDatabase()
    
    const body = await readBody(event)
    const { email, password, firstName, lastName } = body

    console.log('📧 Registration attempt for:', email)

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      throw createError({
        statusCode: 400,
        message: 'All fields are required'
      })
    }

    // Validate email
    if (!validateEmail(email)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid email format'
      })
    }

    // Validate password
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      throw createError({
        statusCode: 400,
        message: passwordValidation.message || 'Invalid password'
      })
    }

    // Check if user exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )

    if (existingUser.rows.length > 0) {
      throw createError({
        statusCode: 400,
        message: 'Email already registered'
      })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const result = await query(
      'INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, `${firstName} ${lastName}`, hashedPassword]
    )

    const newUser = result.rows[0]
    console.log('✅ User created:', newUser.email)

    return {
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
    }
  } catch (error: any) {
    console.error('❌ Registration error:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Registration failed'
    })
  }
}

// POST /api/auth/logout - User logout
async function logout(event: any) {
  deleteCookie(event, 'auth-token')
  return { success: true }
}

// GET /api/auth/session - Get current session
async function getSession(event: any) {
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
}

// POST /api/auth/change-password - Change user password
async function changePassword(event: any) {
  try {
    const authUser = await requireAuth(event)

    const body = await readBody(event)
    const { currentPassword, newPassword } = body

    console.log('🔐 Password change attempt for user:', authUser.userId)

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
      [authUser.userId]
    )

    if (result.rows.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      })
    }

    const dbUser = result.rows[0]

    // Verify current password
    const isValid = await compare(currentPassword, dbUser.password)

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
      [hashedPassword, dbUser.id]
    )

    console.log('✅ Password changed successfully for user:', dbUser.id)

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
}

