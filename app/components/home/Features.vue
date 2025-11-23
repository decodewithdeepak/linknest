<template>
  <section id="features" class="py-12 sm:py-20 relative overflow-hidden">
    <div class="max-w-6xl mx-auto px-6 sm:px-6 relative z-10">
      <div class="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1 border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide uppercase mb-6 hover:bg-primary/10 transition-colors">
          <Icon name="i-heroicons-sparkles" class="h-4 w-4 text-primary" />
          <span class="text-sm font-medium">Features</span>
        </div>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Everything you need to <br />
          <span class="bg-linear-to-r from-primary via-teal-500 to-cyan-500 bg-clip-text text-transparent">organize effortlessly</span>
        </h2>
        <p class="max-w-lg mx-auto text-sm sm:text-base text-muted-foreground">
          LinkNest combines powerful automation with beautiful design, doing the heavy lifting so you can focus on what matters.
        </p>
      </div>

      <!-- Bento Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-6">
        <!-- Large Cards (2 columns each) -->
        <div
          v-for="(feature, index) in largeFeatures"
          :key="'large-' + index"
          class="md:col-span-3 lg:col-span-6 group relative p-5 sm:p-6 rounded-sm border border-border/50 bg-white/50 dark:bg-white/5 backdrop-blur-xl hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
        >
          <div class="absolute inset-0 rounded-sm bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-sm border border-border/50 bg-white dark:bg-white/10 flex items-center justify-center mb-3 sm:mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              <Icon :name="feature.icon" class="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            
            <h3 class="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">{{ feature.title }}</h3>
            <p class="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>

        <!-- Medium Cards (1.5 columns each) -->
        <div
          v-for="(feature, index) in mediumFeatures"
          :key="'medium-' + index"
          class="md:col-span-3 lg:col-span-4 group relative p-5 sm:p-6 rounded-sm border border-border/50 bg-white/50 dark:bg-white/5 backdrop-blur-xl hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
        >
          <div class="absolute inset-0 rounded-sm bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-sm border border-border/50 bg-white dark:bg-white/10 flex items-center justify-center mb-3 sm:mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              <Icon :name="feature.icon" class="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            
            <h3 class="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">{{ feature.title }}</h3>
            <p class="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>

        <!-- Small Cards (1 column each) -->
        <div
          v-for="(feature, index) in smallFeatures"
          :key="'small-' + index"
          class="md:col-span-3 lg:col-span-3 group relative p-5 sm:p-6 rounded-sm border border-border/50 bg-white/50 dark:bg-white/5 backdrop-blur-xl hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
        >
          <div class="absolute inset-0 rounded-sm bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-sm border border-border/50 bg-white dark:bg-white/10 flex items-center justify-center mb-3 sm:mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              <Icon :name="feature.icon" class="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            
            <h3 class="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">{{ feature.title }}</h3>
            <p class="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Large feature cards (6 columns each)
const largeFeatures = [
  {
    icon: 'i-heroicons-document-magnifying-glass',
    title: 'Auto Metadata Fetch',
    description: 'Automatically extracts title, description, thumbnail, and site name from any URL using Open Graph tags.'
  },
  {
    icon: 'i-heroicons-squares-2x2',
    title: 'Smart Categorization',
    description: 'AI-powered categorization automatically sorts your links into relevant categories based on content patterns.'
  }
]

// Medium-sized feature cards (4 columns each)
const mediumFeatures = [
  {
    icon: 'i-heroicons-cursor-arrow-rays',
    title: 'Drag & Drop',
    description: 'Simply drag and drop links from your browser or paste them directly. No forms, no hassle.'
  },
  {
    icon: 'i-heroicons-heart',
    title: 'Favorites & Tags',
    description: 'Mark important links as favorites and add custom tags for even better organization.'
  },
  {
    icon: 'i-heroicons-magnifying-glass',
    title: 'Instant Search',
    description: 'Powerful search functionality lets you find any link instantly by title, description, or category.'
  }
]

// Small feature cards (3 columns each)
const smallFeatures = [
  {
    icon: 'i-heroicons-rectangle-stack',
    title: 'Beautiful Display',
    description: 'Links are displayed in elegant cards with thumbnails, making your collection visually appealing.'
  },
  {
    icon: 'i-heroicons-moon',
    title: 'Dark Mode',
    description: 'Beautiful dark mode that\'s easy on the eyes, perfect for late-night browsing sessions.'
  },
  {
    icon: 'i-heroicons-device-phone-mobile',
    title: 'Fully Responsive',
    description: 'Works seamlessly on all devices - desktop, tablet, and mobile. Access your links anywhere.'
  },
  {
    icon: 'i-heroicons-shield-check',
    title: 'Fast & Secure',
    description: 'Built with modern tech stack for blazing-fast performance and enterprise-grade security.'
  }
]
</script>
