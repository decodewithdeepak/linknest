/**
 * Server middleware for authentication
 * Handles both:
 * 1. Protecting routes (redirect to login if not authenticated)
 * 2. Redirecting auth pages (redirect to dashboard if already authenticated)
 */
export default eventHandler(async (event) => {
  const path = event.node.req.url || ''

  // Skip API and internal routes
  if (path.startsWith('/api/') || path.startsWith('/_nuxt/') || path.startsWith('/__nuxt_error')) {
    return
  }

  // Define route types
  const protectedRoutes = ['/dashboard']
  const authRoutes = ['/login', '/signup']

  const isProtected = protectedRoutes.some(route => path.startsWith(route))
  const isAuthRoute = authRoutes.includes(path)

  // Skip if neither protected nor auth route
  if (!isProtected && !isAuthRoute) {
    return
  }

  // Check for auth token
  const token = getCookie(event, 'auth-token')
  const secret = process.env.AUTH_SECRET

  if (!secret) {
    console.error('❌ AUTH_SECRET is not configured')
    if (isProtected) {
      return sendRedirect(event, '/login', 302)
    }
    return
  }

  // Verify token if present
  let isAuthenticated = false
  if (token) {
    try {
      const jwt = await import('jsonwebtoken')
      jwt.default.verify(token, secret)
      isAuthenticated = true
    } catch (error) {
      // Invalid or expired token
      console.warn('⚠️ Invalid token detected for:', path)
      deleteCookie(event, 'auth-token')
      isAuthenticated = false
    }
  }

  // Handle protected routes
  if (isProtected && !isAuthenticated) {
    return sendRedirect(event, '/login', 302)
  }

  // Handle auth routes (redirect if already logged in)
  if (isAuthRoute && isAuthenticated) {
    console.log('🔄 Redirecting authenticated user from', path, 'to /dashboard')
    return sendRedirect(event, '/dashboard', 302)
  }
})

