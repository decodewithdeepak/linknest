<template>
  <main class="max-w-full flex flex-col gap-8 min-h-[80vh] py-8">
    <div class="flex-1 flex flex-col">
      <!-- Header Section -->
      <div class="border-b border-border bg-background py-6 sm:py-8 mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold mb-2">
              Dashboard
            </h1>
            <p class="text-muted-foreground">
              Your smart link organizer workspace
            </p>
          </div>
          <UButton size="lg" class="gap-2">
            <Icon name="i-heroicons-plus" class="h-5 w-5" />
            Add Link
          </UButton>
        </div>
      </div>

      <!-- Coming Soon Message -->
      <div class="flex items-center justify-center min-h-[50vh]">
        <div class="text-center max-w-md px-4">
          <div class="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-dashed border-border flex items-center justify-center">
            <Icon name="i-heroicons-rocket-launch" class="h-10 w-10 text-primary" />
          </div>
          <h2 class="text-2xl font-bold mb-3">
            Dashboard Coming Soon
          </h2>
          <p class="text-muted-foreground mb-6">
            The dashboard with drag-drop functionality and link management is currently under development. 
            Stay tuned for the full experience!
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <UButton to="/" variant="outline">
              Back to Home
            </UButton>
            <UButton to="https://github.com/decodewithdeepak/linknest" target="_blank" variant="ghost">
              <Icon name="i-simple-icons-github" class="h-4 w-4 mr-2" />
              Follow Progress
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Dashboard - LinkNest',
  description: 'Manage and organize your links with LinkNest dashboard',
})
</script>

