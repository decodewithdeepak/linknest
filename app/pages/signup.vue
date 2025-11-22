<template>
  <div class="min-h-screen flex bg-background w-full">
    <!-- Left Side - Brand & Visuals -->
    <div class="hidden lg:flex w-1/2 relative bg-muted/30 text-foreground overflow-hidden border-r border-border">
      <div class="absolute inset-0 bg-grain opacity-20"></div>
      <div class="absolute inset-0 bg-linear-to-tr from-teal-500/10 via-background to-background"></div>

      <div class="absolute bottom-1/3 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>

      <div class="relative z-10 flex flex-col justify-between w-full p-12">
        <NuxtLink to="/" class="flex items-center gap-2 w-fit">
          <Logo size="lg" />
          <span class="font-bold text-2xl tracking-tight">LinkNest</span>
        </NuxtLink>

        <div class="max-w-lg">
          <h2 class="text-4xl font-bold mb-6 leading-tight">
            Start organizing <br />
            <span class="text-primary">in seconds</span>.
          </h2>
          <ul class="space-y-4 text-lg text-muted-foreground">
            <li class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="i-heroicons-check" class="w-4 h-4 text-primary" />
              </div>
              AI-powered categorization
            </li>
            <li class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="i-heroicons-check" class="w-4 h-4 text-primary" />
              </div>
              Smart search & tagging
            </li>
            <li class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="i-heroicons-check" class="w-4 h-4 text-primary" />
              </div>
              Cross-device sync
            </li>
          </ul>
        </div>

        <div class="flex items-center gap-4">
          <div class="p-4 rounded-2xl bg-background/50 backdrop-blur-md border border-border/50 max-w-sm">
            <p class="text-sm italic text-muted-foreground mb-2">"LinkNest completely transformed how I manage my research links. It's simply brilliant."</p>
            <div class="flex items-center gap-2">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" class="w-6 h-6 rounded-full" />
              <span class="text-xs font-semibold">Sarah Chen, Product Designer</span>
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
          <h1 class="text-2xl font-bold tracking-tight">Create an account</h1>
          <p class="text-sm text-muted-foreground mt-2">Join thousands of users organizing their digital life</p>
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

        <form class="space-y-4" @submit.prevent="handleSignup">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium leading-none" for="firstName">First Name</label>
              <input
                v-model="firstName"
                type="text"
                id="firstName"
                required
                class="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium leading-none" for="lastName">Last Name</label>
              <input
                v-model="lastName"
                type="text"
                id="lastName"
                required
                class="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium leading-none" for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="name@example.com"
              required
              class="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium leading-none" for="password">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                required
                minlength="8"
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
            <p class="text-xs text-muted-foreground">Must be at least 8 characters long</p>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="flex items-center gap-2">
              <Icon name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
              Creating Account...
            </span>
            <span v-else>Create Account</span>
          </button>
        </form>

        <p class="text-center text-sm text-muted-foreground">
          Already have an account?
          <NuxtLink to="/login" class="font-semibold text-primary hover:underline underline-offset-4">Sign in</NuxtLink>
        </p>

        <p class="text-center text-xs text-muted-foreground px-6">
          By clicking continue, you agree to our
          <a href="#" class="underline hover:text-primary">Terms of Service</a> and
          <a href="#" class="underline hover:text-primary">Privacy Policy</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '~/components/icons/Logo.vue'
import { ref } from 'vue'

definePageMeta({ layout: false })

const { register, login } = useAuth()
const toast = useToast()

const showPassword = ref(false)
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleSignup = async () => {
  if (!firstName.value || !lastName.value || !email.value || !password.value) {
    toast.add({
      title: 'Error',
      description: 'Please fill in all fields',
      color: 'red'
    })
    return
  }

  if (password.value.length < 8) {
    toast.add({
      title: 'Error',
      description: 'Password must be at least 8 characters long',
      color: 'red'
    })
    return
  }

  isLoading.value = true
  
  // Register
  const registerResult = await register(email.value, password.value, firstName.value, lastName.value)

  if (registerResult.success) {
    toast.add({
      title: 'Success',
      description: 'Account created! Logging you in...',
      color: 'green'
    })

    // Auto login
    const loginResult = await login(email.value, password.value)

    if (loginResult.success) {
      await navigateTo('/dashboard')
    } else {
      toast.add({
        title: 'Please login',
        description: 'Account created, please login manually',
        color: 'orange'
      })
      await navigateTo('/login')
    }
  } else {
    toast.add({
      title: 'Registration Failed',
      description: registerResult.error || 'An error occurred',
      color: 'red'
    })
  }

  isLoading.value = false
}
</script>
