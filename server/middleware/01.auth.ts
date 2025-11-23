/**
 * Server middleware for authentication
 * Runs BEFORE page rendering for all requests
 * Note: Named with "01." prefix to ensure it runs first
 */
export default eventHandler(async (event) => {
  const path = event.node.req.url || ''
  
  // Only protect page routes, not API routes (they have their own protection)
  if (path.startsWith('/api/') || path.startsWith('/_nuxt/') || path.startsWith('/__nuxt_error')) {
    return // Skip API and internal routes
  }
  
  // List of protected page routes
  const protectedRoutes = ['/dashboard']
  const isProtected = protectedRoutes.some(route => path.startsWith(route))
  
  if (!isProtected) {
    return // Not a protected route
  }
  
  // Check for auth token
  const token = getCookie(event, 'auth-token')
  
  if (!token) {
    // No token, redirect to login
    return sendRedirect(event, '/login', 302)
  }

  // Verify token
  const secret = process.env.AUTH_SECRET
  
  if (!secret) {
    console.error('❌ AUTH_SECRET is not configured')
    return sendRedirect(event, '/login', 302)
  }

  try {
    const jwt = await import('jsonwebtoken')
    jwt.default.verify(token, secret)
    // Token is valid, allow request to continue
  } catch (error) {
    // Invalid or expired token
    console.warn('⚠️ Invalid token detected for:', path)
    deleteCookie(event, 'auth-token')
    return sendRedirect(event, '/login', 302)
  }
})

