export default defineNuxtRouteMiddleware(async (to) => {
  // Client-side route middleware for smooth navigation
  // Note: Server-side protection is handled by server/middleware/01.auth.ts
  
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

  // Client-side only - for smooth navigation without page reload
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
