<template>
  <main class="max-w-full flex flex-col gap-8 min-h-[80vh] py-8 px-4 sm:px-6 lg:px-8">
    <div class="flex-1 flex flex-col max-w-7xl mx-auto w-full">
      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <!-- Left: Title -->
        <div class="flex-shrink-0">
          <h1 class="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
            Smart Link Organizer
          </h1>
          <p class="text-muted-foreground text-lg">
            Manage your digital resources with AI-powered categorization
          </p>
        </div>

        <!-- Right: Add Link Section -->
        <div class="w-full sm:w-[600px] max-w-3xl">
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
        <!-- Search and Filters -->
        <div class="flex flex-col gap-4">
           <!-- Search Input -->
           <div class="relative">
              <Icon name="i-heroicons-magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search links by title, description or URL..." 
                class="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
           </div>

           <!-- Category Filters -->
           <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <UButton 
              variant="soft" 
              size="sm" 
              :color="selectedCategory === null ? 'primary' : 'neutral'"
              class="whitespace-nowrap"
              @click="selectedCategory = null"
            >
              All Links ({{ links.length }})
            </UButton>
            
            <UButton
              v-for="category in categories"
              :key="category"
              variant="soft"
              size="sm"
              :color="selectedCategory === category ? 'primary' : 'neutral'"
              class="whitespace-nowrap"
              @click="selectedCategory = category"
            >
              {{ category }} ({{ getCategoryCount(category) }})
            </UButton>
          </div>
        </div>

        <!-- Grid -->
        <div v-if="filteredLinks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="link in filteredLinks" :key="link.id">
            <LinkCard 
              :link="link" 
              @delete="removeLink"
            />
          </div>
        </div>

        <!-- No Results State -->
        <div v-else class="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-xl bg-muted/5">
           <Icon name="i-heroicons-magnifying-glass" class="h-8 w-8 text-muted-foreground mb-2" />
           <p class="text-muted-foreground">No links found matching your criteria</p>
           <UButton 
             variant="link" 
             color="primary" 
             @click="clearFilters"
             class="mt-2"
           >
             Clear filters
           </UButton>
        </div>
      </div>

      <!-- Empty State (No links at all) -->
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

const searchQuery = ref('')
const selectedCategory = ref<string | null>(null)

// Derived state for unique categories
const categories = computed(() => {
  const cats = new Set(links.value.map(l => l.category))
  return Array.from(cats).sort()
})

// Filter logic
const filteredLinks = computed(() => {
  return links.value.filter(link => {
    // Filter by Category
    if (selectedCategory.value && link.category !== selectedCategory.value) {
      return false
    }

    // Filter by Search Query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      return (
        link.title.toLowerCase().includes(query) ||
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.siteName.toLowerCase().includes(query)
      )
    }

    return true
  })
})

const getCategoryCount = (category: string) => {
  return links.value.filter(l => l.category === category).length
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = null
}

const handleAddLink = async (url: string) => {
  await addLink(url)
  // Clear search/filters so the new link is visible if desired
  // clearFilters() 
}
</script>
