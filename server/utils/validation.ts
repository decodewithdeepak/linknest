/**
 * Validate and sanitize a URL
 * @param url - The URL to validate
 * @returns Sanitized URL
 * @throws Error if URL is invalid
 */
export function validateUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    throw createError({
      statusCode: 400,
      message: 'URL is required and must be a string'
    })
  }

  // Trim whitespace
  url = url.trim()

  // Check if URL is too long (prevent DOS)
  if (url.length > 2048) {
    throw createError({
      statusCode: 400,
      message: 'URL is too long (max 2048 characters)'
    })
  }

  try {
    const parsed = new URL(url)

    // Only allow http/https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw createError({
        statusCode: 400,
        message: 'Only HTTP and HTTPS protocols are allowed'
      })
    }

    // Prevent localhost/internal IPs in production
    if (process.env.NODE_ENV === 'production') {
      const hostname = parsed.hostname.toLowerCase()

      // Block localhost
      if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
        throw createError({
          statusCode: 400,
          message: 'Localhost URLs are not allowed'
        })
      }

      // Block private IP ranges
      if (
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.') ||
        hostname.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)
      ) {
        throw createError({
          statusCode: 400,
          message: 'Private IP addresses are not allowed'
        })
      }

      // Block file:// and other dangerous protocols
      if (parsed.protocol === 'file:') {
        throw createError({
          statusCode: 400,
          message: 'File URLs are not allowed'
        })
      }
    }

    // Return normalized URL
    return parsed.href
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 400,
      message: 'Invalid URL format'
    })
  }
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (!password || password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' }
  }

  if (password.length > 128) {
    return { valid: false, message: 'Password is too long (max 128 characters)' }
  }

  // Optional: Add more password strength requirements
  // const hasUpperCase = /[A-Z]/.test(password)
  // const hasLowerCase = /[a-z]/.test(password)
  // const hasNumber = /[0-9]/.test(password)
  // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  return { valid: true }
}

