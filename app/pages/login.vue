<template>
  <div class="min-h-screen flex bg-background">
    <!-- Left Side - Brand & Visuals -->
    <div class="hidden lg:flex w-1/2 relative bg-muted/30 text-foreground overflow-hidden border-r border-border">
      <div class="absolute inset-0 bg-grain opacity-20"></div>
      <div class="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-background"></div>

      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>

      <div class="relative z-10 flex flex-col justify-between w-full p-12">
        <NuxtLink to="/" class="flex items-center gap-2 w-fit">
          <Logo size="lg" />
          <span class="font-bold text-2xl tracking-tight">LinkNest</span>
        </NuxtLink>

        <div class="max-w-lg">
          <h2 class="text-4xl font-bold mb-6 leading-tight">
            Your digital <br />
            <span class="text-primary">second brain</span>.
          </h2>
          <p class="text-lg text-muted-foreground leading-relaxed">
            Stop drowning in tabs. Join thousands of developers and designers who use LinkNest to organize their digital life with AI-powered precision.
          </p>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex -space-x-4">
            <img v-for="i in 4" :key="i" :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`" class="w-10 h-10 rounded-full border-2 border-background bg-muted" />
          </div>
          <div class="text-sm">
            <p class="font-semibold">Trusted by 10,000+ users</p>
            <div class="flex items-center gap-1 text-yellow-500">
              <Icon v-for="i in 5" :key="i" name="i-heroicons-star-solid" class="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Auth Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background relative">
      <div class="w-full max-w-md space-y-8">
        <div class="lg:hidden flex justify-center mb-8">
          <NuxtLink to="/" class="flex items-center gap-2">
            <Logo size="lg" />
            <span class="font-bold text-2xl">LinkNest</span>
          </NuxtLink>
        </div>

        <div class="text-center">
          <h1 class="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p class="text-sm text-muted-foreground mt-2">Enter your details to access your workspace</p>
        </div>

        <!-- OAuth Buttons (UI only) -->
        <div class="grid grid-cols-2 gap-4">
          <button
            type="button"
            disabled
            class="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl hover:bg-primary/5 hover:border-primary/30 transition-all group bg-background opacity-60 cursor-not-allowed"
          >
            <Icon name="i-simple-icons-github" class="w-5 h-5" />
            <span class="text-sm font-medium">GitHub</span>
          </button>
          <button
            type="button"
            disabled
            class="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl hover:bg-primary/5 hover:border-primary/30 transition-all group bg-background opacity-60 cursor-not-allowed"
          >
            <Icon name="i-simple-icons-google" class="w-5 h-5" />
            <span class="text-sm font-medium">Google</span>
          </button>
        </div>

        <USeparator label="OR CONTINUE WITH EMAIL" />

        <form class="space-y-4" @submit.prevent="handleLogin">
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none" for="email">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="name@example.com"
              required
              class="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium leading-none" for="password">Password</label>
              <a href="#" class="text-xs text-primary hover:underline font-medium">Forgot password?</a>
            </div>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                required
                class="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all pr-10"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle password visibility"
              >
                <Icon :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="flex items-center gap-2">
              <Icon name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
              Signing In...
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <p class="text-center text-sm text-muted-foreground">
          Don't have an account?
          <NuxtLink to="/signup" class="font-semibold text-primary hover:underline underline-offset-4">Sign up</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '~/components/icons/Logo.vue'
import { ref } from 'vue'

definePageMeta({ layout: false })

const { login } = useAuth()
const toast = useToast()

const showPassword = ref(false)
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) {
    toast.add({
      title: 'Error',
      description: 'Please fill in all fields',
      color: 'error'
    })
    return
  }

  isLoading.value = true
  
  const result = await login(email.value, password.value)

  if (result.success) {
    toast.add({
      title: 'Success',
      description: 'Logged in successfully!',
      color: 'success'
    })
    await navigateTo('/dashboard')
  } else {
    toast.add({
      title: 'Login Failed',
      description: result.error || 'Invalid credentials',
      color: 'error'
    })
  }

  isLoading.value = false
}
</script>
