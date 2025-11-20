<template>
  <main class="max-w-full flex flex-col min-h-full">
    <div class="flex-1 border border-border">
      <Hero />
      <div class="h-8 bg-dashed"></div>
      <Features />
      <div class="h-8 bg-dashed"></div>
      <FAQ />
      <div class="h-8 bg-dashed"></div>
      <CTA />
      <div class="h-8 bg-dashed"></div>
    </div>
  </main>
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

