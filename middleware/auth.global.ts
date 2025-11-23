export default defineNuxtRouteMiddleware(async (to) => {
  // This middleware runs on BOTH server and client for complete protection
  
  // Protected routes
  const protectedRoutes = ['/dashboard']
  const isProtected = protectedRoutes.some(route => to.path.startsWith(route))
  
  // Auth routes (login, signup)
  const authRoutes = ['/login', '/signup']
  const isAuthRoute = authRoutes.includes(to.path)

  // Skip if not a protected or auth route
  if (!isProtected && !isAuthRoute) {
    return
  }

  const { user, getSession } = useAuth()

  // Always check session on server-side for protected routes
  if (process.server && isProtected) {
    await getSession()
    
    if (!user.value) {
      return navigateTo('/login')
    }
  }

  // Client-side checks
  if (process.client) {
    // Refresh session if not loaded
    if (user.value === null) {
      await getSession()
    }

    if (isProtected && !user.value) {
      // Redirect to login if accessing protected route without auth
      return navigateTo('/login')
    }

    if (isAuthRoute && user.value) {
      // Redirect logged-in users away from auth pages
      return navigateTo('/dashboard')
    }
  }
})
