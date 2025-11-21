<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="close"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <!-- Modal Content -->
        <div class="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-border">
            <div class="flex items-center gap-3">
              <div 
                class="w-10 h-10 rounded-lg flex items-center justify-center"
                :style="`background: linear-gradient(135deg, ${getCategoryGradient(category)})`"
              >
                <Icon :name="getCategoryIcon(category)" class="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 class="text-xl font-semibold">{{ category }}</h3>
                <p class="text-sm text-muted-foreground">{{ links.length }} {{ links.length === 1 ? 'link' : 'links' }}</p>
              </div>
            </div>
            <button
              @click="close"
              class="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Icon name="i-heroicons-x-mark" class="w-5 h-5" />
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <!-- Search Bar -->
            <div class="mb-6">
              <div class="relative">
                <Icon name="i-heroicons-magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="Search in this category..." 
                  class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <!-- Links Grid -->
            <div v-if="filteredLinks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <LinkCard 
                v-for="link in filteredLinks" 
                :key="link.id"
                :link="link" 
                @delete="handleDelete"
              />
            </div>

            <!-- No Results -->
            <div v-else class="flex flex-col items-center justify-center py-12 text-center">
              <Icon name="i-heroicons-magnifying-glass" class="h-12 w-12 text-muted-foreground/50 mb-3" />
              <p class="text-muted-foreground">No links found matching your search</p>
              <button
                @click="searchQuery = ''"
                class="mt-2 text-primary hover:underline"
              >
                Clear search
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Link } from '../../../types/link'

const props = defineProps<{
  modelValue: boolean
  category: string
  links: Link[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'delete': [id: string]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const searchQuery = ref('')

const filteredLinks = computed(() => {
  if (!searchQuery.value) return props.links
  
  const query = searchQuery.value.toLowerCase()
  return props.links.filter(link =>
    link.title.toLowerCase().includes(query) ||
    link.description.toLowerCase().includes(query) ||
    link.url.toLowerCase().includes(query) ||
    link.siteName.toLowerCase().includes(query)
  )
})

const close = () => {
  isOpen.value = false
  searchQuery.value = ''
}

const handleDelete = (id: string) => {
  emit('delete', id)
}

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

const getCategoryGradient = (category: string): string => {
  const gradients: Record<string, string> = {
    'Open Source': '#8b5cf6, #6366f1',
    'Portfolio': '#3b82f6, #06b6d4',
    'Blog': '#10b981, #14b8a6',
    'Tool': '#f59e0b, #f97316',
    'Learning': '#ec4899, #8b5cf6',
    'Video': '#ef4444, #dc2626',
    'Design': '#a855f7, #ec4899',
    'Other': '#6b7280, #4b5563'
  }
  return gradients[category] || '#6b7280, #4b5563'
}
</script>

