<template>
  <footer class="py-12 sm:py-20 relative overflow-hidden px-6 sm:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12">
        <!-- Brand Section -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-2.5 mb-4">
            <Logo size="lg" />
            <span class="font-bold text-2xl tracking-tight">
              LinkNest
            </span>
          </div>
          <p class="text-sm text-muted-foreground max-w-md leading-relaxed mb-6">
            Smart Link Organizer that automatically fetches and categorizes your links. 
            Paste, drag-drop, and let LinkNest do the rest.
          </p>
          
          <!-- Social Links -->
          <div class="flex items-center gap-4">
            <a
              href="https://github.com/decodewithdeepak/linknest"
              target="_blank"
              class="w-10 h-10 rounded-lg border border-border bg-background hover:bg-primary/5 hover:border-primary/30 flex items-center justify-center transition-all"
              aria-label="GitHub"
            >
              <Icon name="i-simple-icons-github" class="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/decodewithdeepak"
              target="_blank"
              class="w-10 h-10 rounded-lg border border-border bg-background hover:bg-primary/5 hover:border-primary/30 flex items-center justify-center transition-all"
              aria-label="Twitter"
            >
              <Icon name="i-simple-icons-x" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Quick Links</h3>
          <ul class="space-y-3 text-sm">
            <li>
              <NuxtLink to="/" class="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group">
                <Icon name="i-heroicons-home" class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/login" class="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group">
                <Icon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                Login
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/signup" class="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group">
                <Icon name="i-heroicons-user-plus" class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                Sign Up
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Resources</h3>
          <ul class="space-y-3 text-sm">
            <li>
              <a href="#features" class="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group">
                <Icon name="i-heroicons-sparkles" class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                Features
              </a>
            </li>
            <li>
              <a href="#faq" class="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group">
                <Icon name="i-heroicons-question-mark-circle" class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                FAQ
              </a>
            </li>
            <li>
              <a href="https://github.com/decodewithdeepak/linknest" target="_blank" class="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group">
                <Icon name="i-simple-icons-github" class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

    <!-- Bottom Section -->
    <div class="mt-12 sm:mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p class="text-xs sm:text-sm text-muted-foreground">
        © {{ new Date().getFullYear() }} LinkNest. Built with 
        <span class="text-primary">♥</span> 
        by 
        <a href="https://deepakmodi.tech" target="_blank" class="text-primary hover:underline">Deepak Modi</a>
      </p>
      
      <div class="flex items-center gap-3">
        <span class="text-xs sm:text-sm text-muted-foreground">Theme</span>
        <ThemeToggle />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

