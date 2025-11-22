<template>
  <div class="min-h-screen flex w-full bg-background">
    <!-- Left Side - Brand & Visuals -->
    <div class="hidden lg:flex w-1/2 relative bg-muted/30 text-foreground overflow-hidden border-r border-border">
      <!-- Background Elements -->
      <div class="absolute inset-0 bg-grain opacity-20"></div>
      <div class="absolute top-0 left-0 w-full h-full bg-linear-to-tr from-teal-500/10 via-background to-background"></div>
      
      <!-- Animated Blobs -->
      <div class="absolute bottom-1/3 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>

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

        <!-- Testimonial/Footer -->
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
        <!-- Mobile Logo -->
        <div class="lg:hidden flex justify-center mb-8">
          <NuxtLink to="/" class="flex items-center gap-2">
            <Logo size="lg" />
            <span class="font-bold text-2xl">LinkNest</span>
          </NuxtLink>
        </div>

        <div class="text-center">
          <h1 class="text-2xl font-bold tracking-tight">Create an account</h1>
          <p class="text-sm text-muted-foreground mt-2">
            Join thousands of users organizing their digital life
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
            <span class="bg-background px-2 text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        <!-- Form -->
        <form class="space-y-4" @submit.prevent="handleSignup">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium leading-none" for="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName"
                class="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium leading-none" for="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName"
                class="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none" for="email">Email</label>
            <input 
              type="email" 
              id="email"
              placeholder="name@example.com"
              class="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all"
            />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none" for="password">Password</label>
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
            <p class="text-xs text-muted-foreground">Must be at least 8 characters long</p>
          </div>

          <button 
            type="submit"
            class="w-full flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        <p class="text-center text-sm text-muted-foreground">
          Already have an account? 
          <NuxtLink to="/login" class="font-semibold text-primary hover:underline underline-offset-4">
            Sign in
          </NuxtLink>
        </p>
        
        <p class="text-center text-xs text-muted-foreground px-6">
          By clicking continue, you agree to our <a href="#" class="underline hover:text-primary">Terms of Service</a> and <a href="#" class="underline hover:text-primary">Privacy Policy</a>.
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

const handleSignup = () => {
  // Handle signup logic
  console.log('Signup attempt')
  navigateTo('/dashboard')
}
</script>

