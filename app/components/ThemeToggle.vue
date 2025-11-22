<template>
  <ClientOnly>
    <button
      @click="toggleTheme"
      class="bg-primary/20 relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
      role="switch"
      :aria-checked="isDark"
      :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <span
        class="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform"
        :class="isDark ? 'translate-x-6' : 'translate-x-1'"
      />
      <Icon
        :name="isDark ? 'i-heroicons-moon-solid' : 'i-heroicons-sun-solid'"
        class="absolute h-3 w-3 transition-all"
        :class="isDark ? 'left-1.5 text-white' : 'right-1.5 text-muted-foreground'"
      />
    </button>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const toggleTheme = () => colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
</script>
