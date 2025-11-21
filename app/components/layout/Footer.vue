<template>
  <footer class="border-t border-border bg-background py-8 mt-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-2.5 mb-4">
            <Logo size="lg" />
            <span class="font-semibold text-xl tracking-tighter">
              LinkNest
            </span>
          </div>
          <p class="text-sm text-muted-foreground max-w-md">
            Smart Link Organizer that automatically fetches and categorizes your links. 
            Paste, drag-drop, and let LinkNest do the rest.
          </p>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li>
              <NuxtLink to="/dashboard" class="hover:text-foreground transition-colors">
                Dashboard
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/links" class="hover:text-foreground transition-colors">
                All Links
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/favorites" class="hover:text-foreground transition-colors">
                Favorites
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Resources</h3>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#features" class="hover:text-foreground transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="#faq" class="hover:text-foreground transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="https://github.com/decodewithdeepak/linknest" target="_blank" class="hover:text-foreground transition-colors">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
        <p class="text-sm text-muted-foreground">
          © {{ new Date().getFullYear() }} LinkNest. All rights reserved.
        </p>
        
        <div class="flex items-center gap-6">
          <ClientOnly>
            <div class="flex items-center gap-3">
              <span class="text-sm text-muted-foreground">Theme</span>
              <button
                @click="toggleTheme"
                class="bg-primary/20 relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                role="switch"
                :aria-checked="isDark"
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
            </div>
          </ClientOnly>

          <div class="flex items-center gap-4">
            <a
              href="https://github.com/decodewithdeepak/linknest"
              target="_blank"
              class="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Icon name="i-simple-icons-github" class="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/decodewithdeepak"
              target="_blank"
              class="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Icon name="i-simple-icons-x" class="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const toggleTheme = () => colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
</script>

