<template>
  <div class="flex min-h-screen overflow-x-hidden">
    <!-- Desktop Sidebar -->
    <div class="hidden lg:block w-64 fixed left-0 top-0 h-screen border-r border-border bg-background z-40">
      <div class="h-full overflow-y-auto p-4">
        <Sidebar
          :selected-category="selectedCategory"
          :total-count="links.length"
          :recent-count="Math.min(recentLinks.length, 20)"
          :favorites-count="favoriteLinks.length"
          :categories="categoriesWithMeta"
          @select="handleCategorySelect"
          @create-category="handleCreateCategory"
          @edit-category="handleEditCategory"
          @delete-category="handleDeleteCategory"
        />
      </div>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden fixed inset-0 bg-black/50 z-40"
        @click="mobileMenuOpen = false"
      />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden fixed left-0 top-0 h-screen w-64 border-r border-border bg-background z-50 overflow-y-auto"
      >
        <div class="relative h-full">
          <!-- Close Button - Absolute positioned -->
          <button
            @click="mobileMenuOpen = false"
            class="absolute top-4 right-4 z-10 p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Icon name="i-heroicons-x-mark" class="w-5 h-5" />
          </button>
          
          <!-- Sidebar with Logo -->
          <div class="px-4 py-6 h-full">
            <Sidebar
              :selected-category="selectedCategory"
              :total-count="links.length"
              :recent-count="Math.min(recentLinks.length, 20)"
              :favorites-count="favoriteLinks.length"
              :categories="categoriesWithMeta"
              @select="handleMobileCategorySelect"
              @create-category="handleCreateCategory"
              @edit-category="handleEditCategory"
              @delete-category="handleDeleteCategory"
            />
          </div>
        </div>
      </div>
    </Transition>

    <!-- Main Content Area -->
    <main class="flex-1 min-h-screen lg:ml-64 min-w-0">
        <div class="max-w-7xl mx-auto w-full py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
          <!-- Mobile Menu Button -->
          <div class="lg:hidden mb-4">
            <button
              @click="mobileMenuOpen = true"
              class="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background hover:bg-muted transition-colors w-full"
            >
              <Icon name="i-heroicons-bars-3" class="w-5 h-5" />
              <span class="font-medium">
                {{ selectedCategory === null ? 'All Links' : selectedCategory === 'recent' ? 'Recent' : selectedCategory === 'favorites' ? 'Favorites' : selectedCategory }}
              </span>
              <Icon name="i-heroicons-chevron-down" class="w-4 h-4 ml-auto" />
            </button>
          </div>

          <!-- Header Section -->
          <div class="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
            <!-- Title -->
            <div class="shrink-0">
              <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
                Smart Link Organizer
              </h1>
              <p class="text-muted-foreground text-sm sm:text-base lg:text-lg">
                Manage your digital resources with AI-powered categorization
              </p>
            </div>

            <!-- Add Link Section -->
            <div class="w-full">
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
          <div v-if="links.length > 0">

            <!-- Search Bar -->
            <div class="mb-6">
              <div class="relative w-full">
                <Icon name="i-heroicons-magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="Search links by title, description or URL..." 
                  class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <!-- Links Grid -->
            <div v-if="filteredLinks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              <LinkCard 
                v-for="link in filteredLinks" 
                :key="link.id"
                :link="link"
                :categories="categories"
                @delete="handleRemoveLink"
                @toggle-favorite="handleToggleFavorite"
                @change-category="handleChangeCategory"
              />
            </div>

            <!-- No Results -->
            <div v-else class="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-xl bg-muted/5">
              <Icon name="i-heroicons-magnifying-glass" class="h-12 w-12 text-muted-foreground/50 mb-3" />
              <p class="text-muted-foreground">No links found</p>
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="mt-2 text-primary hover:underline text-sm"
              >
                Clear search
              </button>
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
    </div>
</template>

<script setup lang="ts">
import { useLinkManager } from '../composables/useLinkManager'
import LinkInput from '~/components/dashboard/LinkInput.vue'
import LinkCard from '~/components/dashboard/LinkCard.vue'
import Sidebar from '~/components/dashboard/Sidebar.vue'
import { useToasts } from '../composables/useToasts'

definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'Smart Link Organizer - LinkNest',
  description: 'Manage and categorize your links automatically',
})

const { links, customCategories, isLoading, error, addLink, removeLink, toggleFavorite, createCategory, updateCategory, deleteCategory, updateLinkCategory } = useLinkManager()
// useToasts is in `composables/useToasts.ts` and auto-imported by Nuxt
const { showToast } = useToasts()

const selectedCategory = ref<string | null>(null)
const searchQuery = ref('')
const mobileMenuOpen = ref(false)

// Clear search when category changes
watch(selectedCategory, () => {
  searchQuery.value = ''
})

// Derived state for unique categories
const categories = computed(() => {
  const cats = new Map<string, { name: string, color?: string }>()
  
  // Add custom categories first (they have colors)
  customCategories.value.forEach(c => {
    cats.set(c.name, c)
  })
  
  // Add categories from links if they don't exist yet
  links.value.forEach(l => {
    if (!cats.has(l.category)) {
      cats.set(l.category, { name: l.category })
    }
  })
  
  return Array.from(cats.values()).sort((a, b) => a.name.localeCompare(b.name))
})

// Categories with metadata for sidebar
const categoriesWithMeta = computed(() => {
  return categories.value.map(cat => ({
    name: cat.name,
    count: getCategoryCount(cat.name),
    icon: getCategoryIcon(cat.name),
    color: cat.color || getCategoryColor(cat.name),
    isCustom: !!cat.color // Only custom categories have a color property
  }))
})

// Recent links (last 20 added)
const recentLinks = computed(() => {
  return [...links.value]
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, 20)
})

const favoriteLinks = computed(() => {
  return links.value.filter(l => l.isFavorite)
})

// Get links based on selected category
const displayedLinks = computed(() => {
  if (selectedCategory.value === null) {
    return links.value
  } else if (selectedCategory.value === 'recent') {
    return recentLinks.value
  } else if (selectedCategory.value === 'favorites') {
    return favoriteLinks.value
  } else {
    return links.value.filter(l => l.category === selectedCategory.value)
  }
})

// Filter links by search query
const filteredLinks = computed(() => {
  if (!searchQuery.value) return displayedLinks.value
  
  const query = searchQuery.value.toLowerCase()
  return displayedLinks.value.filter(link =>
    link.title.toLowerCase().includes(query) ||
    link.description.toLowerCase().includes(query) ||
    link.url.toLowerCase().includes(query) ||
    link.siteName.toLowerCase().includes(query)
  )
})

// Get count for a category
const getCategoryCount = (category: string) => {
  return links.value.filter(l => l.category === category).length
}

const handleAddLink = async (url: string) => {
  const linksBefore = links.value.length
  await addLink(url)
  
  if (error.value) {
    showToast({
      title: 'Failed to Add Link',
      description: error.value,
      color: 'error',
      icon: 'i-heroicons-exclamation-circle'
    })
  } else if (links.value.length > linksBefore) {
    const newLink = links.value[0]
    if (newLink) {
      showToast({
        title: 'Link Added',
        description: `"${newLink.title}"`,
          color: 'success',
          icon: 'i-heroicons-check-circle'
      })
    }
    selectedCategory.value = null
  }
}

const handleCategorySelect = (category: string | null) => {
  selectedCategory.value = category
}

const handleMobileCategorySelect = (category: string | null) => {
  selectedCategory.value = category
  mobileMenuOpen.value = false
}

const handleCreateCategory = (data: { name: string, color: string }) => {
  const success = createCategory(data.name, data.color)
  if (success) {
    showToast({
      title: 'Category Created',
      description: `"${data.name}" has been created`,
      color: 'success',
      icon: 'i-heroicons-folder-plus',
    })
    selectedCategory.value = data.name
  } else {
    showToast({
      title: 'Category Exists',
      description: `A category named "${data.name}" already exists`,
      color: 'warning',
      icon: 'i-heroicons-information-circle',
    })
  }
}

const handleEditCategory = (data: { oldName: string, newName: string, newColor: string }) => {
  updateCategory(data.oldName, data.newName, data.newColor)
  showToast({
    title: 'Category Updated',
    description: `"${data.oldName}" renamed to "${data.newName}"`,
    color: 'success',
    icon: 'i-heroicons-pencil-square',
  })
  if (selectedCategory.value === data.oldName) {
    selectedCategory.value = data.newName
  }
}

const handleDeleteCategory = (categoryName: string) => {
  const affectedCount = links.value.filter(l => l.category === categoryName).length
  deleteCategory(categoryName)
  showToast({
    title: 'Category Deleted',
    description: affectedCount > 0 
      ? `"${categoryName}" removed. ${affectedCount} links moved to Other`
      : `"${categoryName}" removed`,
    color: 'error',
    icon: 'i-heroicons-trash',
  })
  if (selectedCategory.value === categoryName) {
    selectedCategory.value = null
  }
}

const handleChangeCategory = async (linkId: string, category: string) => {
  const link = links.value.find(l => l.id === linkId)
  const oldCategory = link?.category
  await updateLinkCategory(linkId, category)
  if (link) {
    showToast({
      title: 'Category Changed',
      description: `Moved "${link.title}" to ${category}`,
      color: 'info',
      icon: 'i-heroicons-arrow-right-circle',
    })
  }
}

const handleRemoveLink = async (linkId: string) => {
  const link = links.value.find(l => l.id === linkId)
  await removeLink(linkId)
  if (link) {
    showToast({
      title: 'Link Deleted',
      description: `"${link.title}" has been removed`,
      color: 'error',
      icon: 'i-heroicons-trash',
    })
  }
}

const handleToggleFavorite = async (linkId: string) => {
  const link = links.value.find(l => l.id === linkId)
  const wasFavorite = link?.isFavorite
  await toggleFavorite(linkId)
  if (link) {
    showToast({
      title: !wasFavorite ? 'Added to Favorites' : 'Removed from Favorites',
      description: `"${link.title}"`,
      color: !wasFavorite ? 'success' : 'neutral',
      icon: !wasFavorite ? 'i-heroicons-heart-solid' : 'i-heroicons-heart',
    })
  }
}

// Category icons and gradients
const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    'Open Source': 'i-heroicons-code-bracket',
    'Portfolio': 'i-heroicons-user-circle',
    'Blog': 'i-heroicons-document-text',
    'Tool': 'i-heroicons-wrench-screwdriver',
    'Learning': 'i-heroicons-academic-cap',
    'Video': 'i-heroicons-play-circle',
    'Design': 'i-heroicons-paint-brush',
    'Other': 'i-heroicons-folder'
  }
  return icons[category] || 'i-heroicons-folder'
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Open Source': '#10b981',
    'Portfolio': '#3b82f6',
    'Blog': '#8b5cf6',
    'Tool': '#f59e0b',
    'Learning': '#ec4899',
    'Video': '#ef4444',
    'Design': '#a855f7',
    'Development': '#10b981',
    'Productivity': '#3b82f6',
    'Social': '#ec4899',
    'Entertainment': '#ef4444',
    'Tools': '#f59e0b',
    'Other': '#6b7280'
  }
  return colors[category] || '#6b7280'
}
</script>
