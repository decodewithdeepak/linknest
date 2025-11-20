<template>
  <main class="max-w-full flex flex-col gap-8 min-h-[80vh] py-8">
    <div class="flex-1 flex flex-col">
      <!-- Header Section -->
      <div class="border-b border-border bg-background py-6 sm:py-8 mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold mb-2">
              All Links
            </h1>
            <p class="text-muted-foreground">
              Browse and manage your entire link collection
            </p>
          </div>
          <div class="flex gap-2">
            <UInput
              placeholder="Search links..."
              icon="i-heroicons-magnifying-glass"
              size="lg"
              class="w-full sm:w-64"
            />
            <UButton size="lg" variant="outline">
              <Icon name="i-heroicons-funnel" class="h-5 w-5" />
            </UButton>
          </div>
        </div>
      </div>

      <!-- Coming Soon Message -->
      <div class="flex items-center justify-center min-h-[50vh]">
        <div class="text-center max-w-md px-4">
          <div class="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-dashed border-border flex items-center justify-center">
            <Icon name="i-heroicons-link" class="h-10 w-10 text-primary" />
          </div>
          <h2 class="text-2xl font-bold mb-3">
            Links Page Coming Soon
          </h2>
          <p class="text-muted-foreground mb-6">
            Your beautifully organized link collection with categories, tags, and search will be available soon.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <UButton to="/" variant="outline">
              Back to Home
            </UButton>
            <UButton to="/dashboard">
              Go to Dashboard
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'All Links - LinkNest',
  description: 'Browse your entire link collection',
})
</script>

