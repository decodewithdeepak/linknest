<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div class="max-w-full flex flex-col min-h-full">
        <div class="flex-1 border border-border">
          <Hero />
          <div class="h-8 bg-striped"></div>
          <Features />
          <div class="h-8 bg-striped"></div>
          <FAQ />
          <div class="h-8 bg-striped"></div>
          <CTA />
          <div class="h-8 bg-striped"></div>
          <Footer />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'LinkNest - Smart Link Organizer',
  description: 'Automatically fetch and categorize your links. Simply paste or drag-drop any link, and LinkNest handles the rest. No manual input required.',
  ogTitle: 'LinkNest - Smart Link Organizer',
  ogDescription: 'Automatically fetch and categorize your links. Simply paste or drag-drop any link, and LinkNest handles the rest.',
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
})
</script>

