<template>
  <main class="max-w-full flex flex-col gap-8 min-h-[80vh] py-8 px-4 sm:px-6 lg:px-8">
    <div class="flex-1 flex flex-col max-w-7xl mx-auto w-full">
      <!-- Header Section -->
      <div class="flex flex-col gap-6 mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
              Smart Link Organizer
            </h1>
            <p class="text-muted-foreground text-lg">
              Manage your digital resources with AI-powered categorization
            </p>
          </div>
        </div>

        <!-- Add Link Section -->
        <div class="w-full max-w-2xl">
          <LinkInput 
            :loading="isLoading" 
            @add="handleAddLink"
          />
          <p v-if="error" class="mt-2 text-sm text-red-500 flex items-center gap-1">
            <Icon name="i-heroicons-exclamation-circle" />
            {{ error }}
          </p>
        </div>
      </div>

      <!-- Content Area -->
      <div v-if="links.length > 0" class="flex flex-col gap-6">
        <!-- Filters (Optional for now, but good placeholder) -->
        <div class="flex items-center justify-between overflow-x-auto pb-2">
          <div class="flex gap-2">
            <UButton 
              variant="soft" 
              size="sm" 
              color="primary"
            >
              All Links ({{ links.length }})
            </UButton>
            <!-- Dynamic categories could be added here -->
          </div>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="link in links" :key="link.id">
            <LinkCard 
              :link="link" 
              @delete="removeLink"
            />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-xl bg-muted/10">
        <div class="w-20 h-20 mb-6 rounded-full bg-muted flex items-center justify-center">
          <Icon name="i-heroicons-link" class="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 class="text-xl font-semibold mb-2">No links yet</h3>
        <p class="text-muted-foreground max-w-md mx-auto mb-6">
          Paste a URL above to get started. We'll automatically fetch details and categorize it for you.
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useLinkManager } from '../../composables/useLinkManager'
import LinkInput from '~/components/links/LinkInput.vue'
import LinkCard from '~/components/links/LinkCard.vue'

useSeoMeta({
  title: 'Smart Link Organizer - LinkNest',
  description: 'Manage and categorize your links automatically',
})

const { links, isLoading, error, addLink, removeLink } = useLinkManager()

const handleAddLink = async (url: string) => {
  await addLink(url)
}
</script>
