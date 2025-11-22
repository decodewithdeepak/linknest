export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware on server
  if (process.server) return

  const { user, getSession } = useAuth()

  // Refresh session if not loaded
  if (user.value === null) {
    await getSession()
  }

  // Protected routes
  const protectedRoutes = ['/dashboard']
  const isProtected = protectedRoutes.some(route => to.path.startsWith(route))

  if (isProtected && !user.value) {
    return navigateTo('/login')
  }

  // Redirect logged-in users away from auth pages
  const authRoutes = ['/login', '/signup']
  const isAuthRoute = authRoutes.includes(to.path)

  if (isAuthRoute && user.value) {
    return navigateTo('/dashboard')
  }
})
