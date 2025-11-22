export const useAuth = () => {
  const user = useState('user', () => null as any)
  const loading = useState('auth-loading', () => true)

  // Get session
  const getSession = async () => {
    try {
      loading.value = true
      const data = await $fetch('/api/auth/session')
      user.value = data.user
      return data.user
    } catch (error) {
      user.value = null
      return null
    } finally {
      loading.value = false
    }
  }

  // Login
  const login = async (email: string, password: string) => {
    try {
      const data = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })
      user.value = data.user
      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.data?.message || 'Login failed' }
    }
  }

  // Register
  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const data = await $fetch('/api/auth/register', {
        method: 'POST',
        body: { email, password, firstName, lastName }
      })
      return { success: true, error: null, user: data.user }
    } catch (error: any) {
      return { success: false, error: error.data?.message || 'Registration failed' }
    }
  }

  // Logout
  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
      user.value = null
      await navigateTo('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Change password
  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await $fetch('/api/auth/change-password', {
        method: 'POST',
        body: { currentPassword, newPassword }
      })
      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.data?.message || 'Password change failed' }
    }
  }

  // Load session on mount (client-side only)
  if (process.client && loading.value) {
    getSession()
  }

  return {
    user,
    loading,
    login,
    register,
    logout,
    changePassword,
    getSession
  }
}
