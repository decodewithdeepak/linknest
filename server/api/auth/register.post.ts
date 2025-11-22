import { hash } from 'bcrypt-ts'
import { query } from '../../utils/db'
import { initDatabase } from '../../utils/init-db'
import { validateEmail, validatePassword } from '../../utils/validation'

export default defineEventHandler(async (event) => {
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
})
