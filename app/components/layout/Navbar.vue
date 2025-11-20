<template>
  <header class="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
    <nav
      class="flex items-center gap-4 py-3 px-6 rounded-full border border-border/40 bg-background/60 backdrop-blur-xl shadow-lg shadow-primary/5 transition-all duration-300 hover:border-primary/20 max-w-4xl w-full"
    >
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <Logo size="md" />
        <span class="font-bold text-lg tracking-tight hidden sm:block">LinkNest</span>
      </NuxtLink>

      <div class="flex-1" />

      <!-- Navigation Links (Desktop) -->
      <div class="hidden md:flex items-center gap-1">
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

      <div class="h-4 w-px bg-border/50 hidden md:block mx-2"></div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <UButton
          to="https://github.com/yourusername/linknest"
          target="_blank"
          variant="ghost"
          color="neutral"
          size="sm"
          icon="i-simple-icons-github"
          class="rounded-full hover:bg-primary/10 hover:text-primary active:bg-primary/20 transition-colors"
          aria-label="GitHub"
        />

        <ClientOnly>
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
            class="rounded-full hover:bg-primary/10 hover:text-primary active:bg-primary/20 transition-colors"
            @click="toggleTheme"
            aria-label="Toggle Theme"
          />
        </ClientOnly>
        
        <UButton
          to="/dashboard"
          size="sm"
          color="primary"
          variant="solid"
          class="rounded-full px-4 ml-2 hidden sm:flex"
        >
          Get Started
        </UButton>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Links', path: '/links' },
  { label: 'Favorites', path: '/favorites' }
]

const toggleTheme = () => {
  isDark.value = !isDark.value
}
</script>
