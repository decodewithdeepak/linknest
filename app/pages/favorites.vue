<template>
  <main class="max-w-full flex flex-col gap-8 min-h-[80vh] py-8">
    <div class="flex-1 flex flex-col">
      <!-- Header Section -->
      <div class="border-b border-border bg-background py-6 sm:py-8 mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
              <Icon name="i-heroicons-heart-solid" class="h-7 w-7 text-red-500" />
              Favorites
            </h1>
            <p class="text-muted-foreground">
              Your most important and frequently accessed links
            </p>
          </div>
        </div>
      </div>

      <!-- Coming Soon Message -->
      <div class="flex items-center justify-center min-h-[50vh]">
        <div class="text-center max-w-md px-4">
          <div class="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-dashed border-border flex items-center justify-center">
            <Icon name="i-heroicons-heart" class="h-10 w-10 text-red-500" />
          </div>
          <h2 class="text-2xl font-bold mb-3">
            Favorites Coming Soon
          </h2>
          <p class="text-muted-foreground mb-6">
            Mark your most important links as favorites and access them quickly. This feature is under development.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <UButton to="/" variant="outline">
              Back to Home
            </UButton>
            <UButton to="/links">
              Browse All Links
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Favorites - LinkNest',
  description: 'Your favorite links collection',
})
</script>

