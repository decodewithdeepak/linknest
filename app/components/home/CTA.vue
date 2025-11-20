<template>
  <section class="py-20 relative overflow-hidden">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <!-- Gradient Border Container -->
      <div class="relative rounded-3xl p-1 bg-linear-to-br from-primary/20 via-teal-500/10 to-cyan-500/20">
        <div class="relative rounded-[calc(1.5rem-4px)] bg-background backdrop-blur-2xl p-12 sm:p-16 text-center border border-border/50">
          
          <!-- Background Effects -->
          <div class="absolute inset-0 overflow-hidden rounded-[calc(1.5rem-4px)] pointer-events-none">
            <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
            <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
          </div>

          <div class="relative z-10 max-w-3xl mx-auto">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 mb-6 shadow-lg shadow-primary/10">
              <Icon name="i-heroicons-rocket-launch" class="h-8 w-8 text-primary" />
            </div>

            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to <span class="bg-linear-to-r from-primary via-teal-500 to-cyan-500 bg-clip-text text-transparent">Organize</span>?
            </h2>
            
            <p class="text-base max-w-xl mx-auto text-muted-foreground mb-8">
              Join thousands of users who have simplified their digital life with LinkNest. 
              Start your journey to a clutter-free mind today.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <UButton
                to="/dashboard"
                size="xl"
                color="primary"
                class="group gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Get Started Free
                <Icon name="i-heroicons-arrow-right" class="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </UButton>
              
              <UButton
                to="https://github.com/yourusername/linknest"
                target="_blank"
                size="xl"
                variant="ghost"
                class="gap-2 text-muted-foreground hover:text-primary"
              >
                <Icon name="i-simple-icons-github" class="h-5 w-5 hover:text-primary" />
                Star on GitHub
              </UButton>
            </div>

            <!-- Trust Indicators -->
            <div class="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div class="flex items-center gap-2">
                <Icon name="i-heroicons-check-circle" class="h-5 w-5 text-primary" />
                <span>No credit card required</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="i-heroicons-check-circle" class="h-5 w-5 text-primary" />
                <span>Free forever plan</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="i-heroicons-check-circle" class="h-5 w-5 text-primary" />
                <span>Open Source</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
