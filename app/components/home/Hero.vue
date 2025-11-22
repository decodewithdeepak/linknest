<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden py-12 sm:py-20">
    <div class="max-w-7xl mx-auto px-6 sm:px-6 text-center w-full">
      <h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
        Your Digital <br />
        <span class="relative inline-block">
          <span class="bg-linear-to-r from-primary via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Second Brain
          </span>
          <svg class="absolute w-full h-3 -bottom-2 left-0 text-primary/30" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.00025 6.99997C25.8086 6.99995 42.7596 2.99996 71.0002 2.99996C99.2409 2.99997 119.519 7.00002 146 7.00004C172.481 7.00006 184.687 3.00005 198.001 3.00005" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </span>
      </h1>

      <p class="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
        Stop drowning in tabs. LinkNest automatically categorizes, tags, and organizes your links with AI-powered precision.
      </p>

      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-8 sm:mb-16 max-w-md sm:max-w-none mx-auto">
        <UButton
          to="/signup"
          size="lg"
          color="primary"
          class="group gap-2 w-full sm:w-auto justify-center text-sm sm:text-base"
        >
          <span class="">Start Organizing</span>
          <Icon name="i-heroicons-arrow-right" class="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
        </UButton>
        
        <UButton
          to="#features"
          size="lg"
          variant="ghost"
          class="gap-2 border border-primary/20 text-foreground hover:text-primary w-full sm:w-auto justify-center text-sm sm:text-base"
        >
          <Icon name="i-heroicons-play-circle" class="h-4 w-4 sm:h-5 sm:w-5" />
          Watch Demo
        </UButton>
      </div>

      <div class="relative max-w-4xl mx-auto group perspective-[1000px]">
        <div class="relative rounded-md border border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-2xl overflow-hidden transition-transform duration-700 transform-3d group-hover:transform-[perspective(1000px)_rotateY(-2deg)_rotateX(2deg)]">
          <div class="flex items-center gap-4 px-6 py-4 border-b border-white/10 bg-white/50 dark:bg-black/50">
            <div class="hidden sm:flex gap-2">
              <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div class="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
              <div class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
            <div class="flex-1 flex justify-center">
              <div class="flex items-center gap-2 px-4 py-1.5 rounded-sm bg-white/40 dark:bg-white/5 border border-white/10 text-xs text-muted-foreground w-64 justify-center font-mono shadow-sm">
                <Icon name="i-heroicons-lock-closed" class="w-3 h-3" />
                linknest.app/dashboard
              </div>
            </div>
            <div class="w-16"></div>
          </div>

          <div class="p-4 sm:p-8 bg-linear-to-br from-white/40 to-white/10 dark:from-black/40 dark:to-black/10 min-h-[300px] sm:min-h-[400px] text-left">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div class="group/card p-4 rounded-lg border border-white/20 bg-white/60 dark:bg-gray-900/60 hover:bg-white/80 dark:hover:bg-gray-900/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon name="i-simple-icons-dribbble" class="w-5 h-5 text-primary" />
                    </div>
                    <div class="min-w-0">
                      <h3 class="font-semibold text-sm truncate">Dribbble</h3>
                      <p class="text-xs text-muted-foreground truncate">dribbble.com</p>
                    </div>
                  </div>
                  <Icon name="i-heroicons-ellipsis-vertical" class="text-muted-foreground hover:text-foreground transition-colors" />
                </div>
                <div class="space-y-3">
                  <p class="text-xs text-muted-foreground line-clamp-2">Discover the world’s top designers & creatives. Inspiration for your next project.</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">Design</span>
                    <span class="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">Inspiration</span>
                  </div>
                </div>
              </div>

              <div class="group/card p-4 rounded-lg border border-white/20 bg-white/60 dark:bg-gray-900/60 hover:bg-white/80 dark:hover:bg-gray-900/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon name="i-simple-icons-supabase" class="w-5 h-5 text-primary" />
                    </div>
                    <div class="min-w-0">
                      <h3 class="font-semibold text-sm truncate">Supabase</h3>
                      <p class="text-xs text-muted-foreground truncate">supabase.com</p>
                    </div>
                  </div>
                  <Icon name="i-heroicons-ellipsis-vertical" class="text-muted-foreground hover:text-foreground transition-colors" />
                </div>
                <div class="space-y-3">
                  <p class="text-xs text-muted-foreground line-clamp-2">The open source Firebase alternative. Build a weekend project to scale to millions.</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">Backend</span>
                    <span class="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">Database</span>
                  </div>
                </div>
              </div>

              <div class="group/card p-4 rounded-lg border border-white/20 bg-white/60 dark:bg-gray-900/60 hover:bg-white/80 dark:hover:bg-gray-900/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon name="i-simple-icons-react" class="w-5 h-5 text-primary" />
                    </div>
                    <div class="min-w-0">
                      <h3 class="font-semibold text-sm truncate">React Docs</h3>
                      <p class="text-xs text-muted-foreground truncate">react.dev</p>
                    </div>
                  </div>
                  <Icon name="i-heroicons-ellipsis-vertical" class="text-muted-foreground hover:text-foreground transition-colors" />
                </div>
                <div class="space-y-3">
                  <p class="text-xs text-muted-foreground line-clamp-2">The library for web and native user interfaces. Build user interfaces out of individual pieces.</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">Frontend</span>
                    <span class="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">Docs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
</script>
