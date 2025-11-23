<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden py-12 sm:py-20">
    <div class="max-w-7xl mx-auto px-6 sm:px-6 text-center w-full">
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
        Paste a Link. <br />
        <span class="relative inline-block">
          <span class="bg-linear-to-r from-primary via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Watch the Magic
          </span>
          <svg class="absolute w-full h-3 -bottom-2 left-0 text-primary/30" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.00025 6.99997C25.8086 6.99995 42.7596 2.99996 71.0002 2.99996C99.2409 2.99997 119.519 7.00002 146 7.00004C172.481 7.00006 184.687 3.00005 198.001 3.00005" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </span>
      </h1>

      <p class="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
        No forms. No folders. No thinking. Just paste any URL and LinkNest automatically fetches metadata, extracts images, and categorizes it instantly.
      </p>

      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-8 sm:mb-16 max-w-md sm:max-w-none mx-auto">
        <UButton
          to="/signup"
          size="lg"
          color="primary"
          class="group gap-2 w-full sm:w-auto justify-center text-sm sm:text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
        >
          <span class="">Get Started Free</span>
          <Icon name="i-heroicons-arrow-right" class="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
        </UButton>
        
        <UButton
          to="/login"
          size="lg"
          variant="ghost"
          class="gap-2 border border-primary/20 text-foreground hover:text-primary w-full sm:w-auto justify-center text-sm sm:text-base"
        >
          <Icon name="i-heroicons-arrow-right-on-rectangle" class="h-4 w-4 sm:h-5 sm:w-5" />
          Sign In
        </UButton>
      </div>

      <!-- Live Interactive Demo -->
      <LiveDemo />

      <div class="max-w-2xl mx-auto mt-12 sm:mt-20 border-t border-border/50 pt-8 sm:pt-12 px-4">
        <p class="text-xs sm:text-sm text-muted-foreground font-medium mb-6 sm:mb-8 uppercase tracking-widest">Trusted by organized people everywhere</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div class="flex items-center justify-center gap-1.5 sm:gap-2 font-bold text-base sm:text-xl"><Icon name="i-simple-icons-github" class="w-5 h-5 sm:w-6 sm:h-6"/> GitHub</div>
          <div class="flex items-center justify-center gap-1.5 sm:gap-2 font-bold text-base sm:text-xl"><Icon name="i-simple-icons-vercel" class="w-5 h-5 sm:w-6 sm:h-6"/> Vercel</div>
          <div class="flex items-center justify-center gap-1.5 sm:gap-2 font-bold text-base sm:text-xl"><Icon name="i-simple-icons-notion" class="w-5 h-5 sm:w-6 sm:h-6"/> Notion</div>
          <div class="flex items-center justify-center gap-1.5 sm:gap-2 font-bold text-base sm:text-xl"><Icon name="i-simple-icons-linear" class="w-5 h-5 sm:w-6 sm:h-6"/> Linear</div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
// No script needed - all logic is in LiveDemo component
</script>
