<template>
  <div class="min-h-screen flex w-full bg-background">
    <!-- Left Side - Brand & Visuals -->
    <div class="hidden lg:flex w-1/2 relative bg-muted/30 text-foreground overflow-hidden border-r border-border">
      <!-- Background Elements -->
      <div class="absolute inset-0 bg-grain opacity-20"></div>
      <div class="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/10 via-background to-background"></div>
      
      <!-- Animated Blobs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-between w-full p-12">
        <!-- Logo -->
        <div>
          <NuxtLink to="/" class="flex items-center gap-2 w-fit">
            <Logo size="lg" />
            <span class="font-bold text-2xl tracking-tight">LinkNest</span>
          </NuxtLink>
        </div>

        <!-- Hero Text -->
        <div class="max-w-lg">
          <h2 class="text-4xl font-bold mb-6 leading-tight">
            Your digital <br />
            <span class="text-primary">second brain</span>.
          </h2>
          <p class="text-lg text-muted-foreground leading-relaxed">
            Stop drowning in tabs. Join thousands of developers and designers who use LinkNest to organize their digital life with AI-powered precision.
          </p>
        </div>

        <!-- Testimonial/Footer -->
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
        <!-- Mobile Logo (visible only on small screens) -->
        <div class="lg:hidden flex justify-center mb-8">
          <NuxtLink to="/" class="flex items-center gap-2">
            <Logo size="lg" />
            <span class="font-bold text-2xl">LinkNest</span>
          </NuxtLink>
        </div>

        <div class="text-center">
          <h1 class="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p class="text-sm text-muted-foreground mt-2">
            Enter your details to access your workspace
          </p>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-4">
          <button class="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl hover:bg-primary/5 hover:border-primary/30 transition-all group bg-background">
            <Icon name="i-simple-icons-github" class="w-5 h-5 group-hover:text-primary transition-colors" />
            <span class="text-sm font-medium group-hover:text-primary transition-colors">GitHub</span>
          </button>
          <button class="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl hover:bg-primary/5 hover:border-primary/30 transition-all group bg-background">
            <Icon name="i-simple-icons-google" class="w-5 h-5 group-hover:text-primary transition-colors" />
            <span class="text-sm font-medium group-hover:text-primary transition-colors">Google</span>
          </button>
        </div>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t border-border"></span>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <!-- Form -->
        <form class="space-y-4" @submit.prevent="handleLogin">
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="email">Email</label>
            <input 
              type="email" 
              id="email"
              placeholder="name@example.com"
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
                :type="showPassword ? 'text' : 'password'"
                id="password"
                class="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all pr-10"
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <button 
            type="submit"
            class="w-full flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <p class="text-center text-sm text-muted-foreground">
          Don't have an account? 
          <NuxtLink to="/signup" class="font-semibold text-primary hover:underline underline-offset-4">
            Sign up
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '~/components/icons/Logo.vue'

definePageMeta({
  layout: false
})

const showPassword = ref(false)

const handleLogin = () => {
  // Handle login logic
  console.log('Login attempt')
  navigateTo('/dashboard')
}
</script>

