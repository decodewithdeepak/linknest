<template>
  <header class="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
    <nav class="flex items-center gap-4 py-3 px-6 rounded-full border border-border/40 bg-background/60 backdrop-blur-xl shadow-lg shadow-primary/5 transition-all duration-300 hover:border-primary/20 max-w-4xl w-full">
      <NuxtLink to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Logo size="lg" />
        <span class="font-bold text-lg tracking-tight">LinkNest</span>
      </NuxtLink>

      <div class="flex-1" />

      <div class="hidden md:flex items-center gap-2">
        <UButton
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          variant="ghost"
          color="neutral"
          size="sm"
          class="rounded-full hover:bg-primary/10 hover:text-primary active:bg-primary/20 transition-colors"
          :class="{ 'text-primary bg-primary/5': route.path === item.path }"
        >
          {{ item.label }}
        </UButton>
      </div>

      <div class="h-4 w-px bg-border hidden md:block mx-2"></div>

      <div class="flex items-center gap-2">
        <UButton
          to="/signup"
          size="sm"
          color="primary"
          variant="solid"
          class="rounded-full px-4"
        >
          Get Started
        </UButton>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Features', path: '/#features' },
  { label: 'Login', path: '/login' },
]
</script>
