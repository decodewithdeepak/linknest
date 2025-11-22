<template>
  <section class="py-12 sm:py-20 relative overflow-hidden">
    <div class="max-w-5xl mx-auto px-6 sm:px-6">
      <div class="relative rounded-2xl sm:rounded-3xl p-1 bg-linear-to-br from-primary/20 via-teal-500/10 to-cyan-500/20">
        <div class="relative rounded-xl sm:rounded-[calc(1.5rem-4px)] bg-background backdrop-blur-2xl p-8 sm:p-12 md:p-16 text-center border border-border/50">
          <div class="absolute inset-0 overflow-hidden rounded-xl sm:rounded-[calc(1.5rem-4px)] pointer-events-none">
            <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
            <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
          </div>

          <div class="relative z-10 max-w-3xl mx-auto">
            <div class="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 mb-4 sm:mb-6 shadow-lg shadow-primary/10">
              <Icon name="i-heroicons-rocket-launch" class="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>

            <h2 class="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4 px-2">
              Ready to <span class="bg-linear-to-r from-primary via-teal-500 to-cyan-500 bg-clip-text text-transparent">Organize</span>?
            </h2>
            
            <p class="text-sm sm:text-base max-w-xl mx-auto text-muted-foreground mb-6 sm:mb-8 px-4">
              Join thousands of users who have simplified their digital life with LinkNest. 
              Start your journey to a clutter-free mind today.
            </p>

            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-6 sm:mb-8 max-w-md sm:max-w-none mx-auto">
              <UButton
                to="/signup"
                size="lg"
                color="primary"
                class="group gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center text-sm sm:text-base"
              >
                Get Started Free
                <Icon name="i-heroicons-arrow-right" class="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </UButton>
              
              <UButton
                to="https://github.com/decodewithdeepak/linknest"
                target="_blank"
                size="lg"
                variant="ghost"
                class="gap-2 text-muted-foreground hover:text-primary w-full sm:w-auto justify-center text-sm sm:text-base"
              >
                <Icon name="i-simple-icons-github" class="h-4 w-4 sm:h-5 sm:w-5 hover:text-primary" />
                Star on GitHub
              </UButton>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground px-4">
              <div class="flex items-center gap-1.5 sm:gap-2">
                <Icon name="i-heroicons-check-circle" class="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                <span class="whitespace-nowrap">No credit card</span>
              </div>
              <div class="flex items-center gap-1.5 sm:gap-2">
                <Icon name="i-heroicons-check-circle" class="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                <span class="whitespace-nowrap">Free forever</span>
              </div>
              <div class="flex items-center gap-1.5 sm:gap-2">
                <Icon name="i-heroicons-check-circle" class="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                <span class="whitespace-nowrap">Open Source</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
