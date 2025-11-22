<template>
  <div 
    class="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full"
  >
    <!-- Image Section -->
    <div class="aspect-video w-full overflow-hidden relative p-2">
      <img 
        v-if="link.image && !imageError" 
        :src="link.image" 
        :alt="link.title"
        class="w-full h-full object-cover rounded-xl"
        @error="handleImageError"
      />
      <div v-else class="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-primary/10 via-primary/5 to-transparent rounded-xl">
        <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
          <Icon name="i-heroicons-link" class="w-8 h-8 text-primary" />
        </div>
        <p class="text-xs text-muted-foreground font-medium px-4 text-center line-clamp-2">
          {{ link.siteName }}
        </p>
      </div>
      
      <!-- Category Badge -->
      <div class="absolute -top-1 left-0">
        <div ref="badgeRef">
          <span 
            class="inline-flex items-center gap-1 px-2 py-1 rounded-br-xl text-xs font-medium text-white transition-opacity"
            :class="{ 'cursor-pointer hover:opacity-80': categories && categories.length > 0 }"
            :style="{ backgroundColor: getCategoryColor(link.category) }"
            @click.stop="categories && categories.length > 0 ? toggleDropdown() : null"
          >
            {{ link.category }}
            <Icon v-if="categories && categories.length > 0" name="i-heroicons-chevron-down" class="w-3 h-3" />
          </span>
        </div>
      </div>
      
    </div>

    <!-- Content Section -->
    <div class="p-4 flex flex-col flex-1">
      <div class="flex items-center gap-2 mb-2">
        <img 
          v-if="link.favicon" 
          :src="link.favicon" 
          class="w-4 h-4 rounded-full"
          alt=""
        />
        <span class="text-xs text-muted-foreground font-medium truncate">
          {{ link.siteName }}
        </span>
        <span class="text-xs text-muted-foreground/50">•</span>
        <span class="text-xs text-muted-foreground/50">
          {{ formatDate(link.dateAdded) }}
        </span>
      </div>

      <a :href="link.url" target="_blank" rel="noopener noreferrer" class="block group-hover:text-primary transition-colors mb-2">
        <h3 class="font-semibold leading-tight line-clamp-2" :title="link.title">
          {{ link.title }}
        </h3>
      </a>

      <p class="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1" :title="link.description">
        {{ link.description || 'No description available' }}
      </p>
      
      <div class="pt-3 border-t border-border flex items-center justify-between mt-auto">
        <div class="flex gap-1">
          <!-- Favorite Button -->
          <UButton 
            :icon="link.isFavorite ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'" 
            :color="link.isFavorite ? 'error' : 'error'" 
            variant="ghost"
            size="xs"
            @click.prevent="$emit('toggleFavorite', link.id)"
            :title="link.isFavorite ? 'Remove from favorites' : 'Add to favorites'"
          />
          <!-- Delete Button -->
          <UButton 
            icon="i-heroicons-trash" 
            color="warning" 
            variant="ghost"
            size="xs"
            @click.prevent="handleDelete"
            title="Delete link"
          />
          <!-- Copy Button -->
          <UButton 
            :icon="copied ? 'i-heroicons-check' : 'i-heroicons-clipboard'"
            :color="copied ? 'success' : 'success'"
            variant="ghost"
            size="xs"
            @click="copyToClipboard(link.url)"
            :title="copied ? 'Copied!' : 'Copy URL'"
          />
        </div>
        <UButton 
          :to="link.url"
          target="_blank"
          variant="ghost"
          size="xs"
          trailing-icon="i-heroicons-arrow-top-right-on-square"
        >
          Visit
        </UButton>
      </div>
    </div>
  </div>

  <!-- Teleport Dropdown Menu to body -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div 
        v-if="isDropdownOpen && dropdownPosition"
        ref="dropdownRef"
        :style="{
          position: 'fixed',
          top: dropdownPosition.top + 'px',
          left: dropdownPosition.left + 'px',
          zIndex: 9999
        }"
        class="w-48 max-h-64 overflow-y-auto rounded-lg border border-border bg-background shadow-xl py-1"
      >
        <button
          v-for="cat in categories"
          :key="cat.name"
          @click.stop="handleCategoryChange(cat.name)"
          class="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center justify-between"
        >
          <span>{{ cat.name }}</span>
          <Icon 
            v-if="cat.name === link.category" 
            name="i-heroicons-check" 
            class="w-4 h-4 text-primary"
          />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Link } from '../../../types/link'

const props = defineProps<{
  link: Link
  categories?: Array<{ name: string, color?: string }>
}>()

const emit = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'toggleFavorite', id: string): void
  (e: 'changeCategory', id: string, category: string): void
}>()

const copied = ref(false)
const imageError = ref(false)
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const badgeRef = ref<HTMLElement | null>(null)
const dropdownPosition = ref<{ top: number, left: number } | null>(null)

// Toggle dropdown and calculate position
const toggleDropdown = () => {
  if (!isDropdownOpen.value && badgeRef.value) {
    const rect = badgeRef.value.getBoundingClientRect()
    dropdownPosition.value = {
      top: rect.bottom + 4, // 4px margin
      left: rect.left
    }
  }
  isDropdownOpen.value = !isDropdownOpen.value
}

// Handle category change
const handleCategoryChange = (categoryName: string) => {
  if (categoryName !== props.link.category) {
    emit('changeCategory', props.link.id, categoryName)
  }
  isDropdownOpen.value = false
}

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      isDropdownOpen.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})

const handleImageError = (e: Event) => {
  imageError.value = true
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

const handleDelete = () => {
  if (confirm(`Are you sure you want to delete "${props.link.title}"?`)) {
    emit('delete', props.link.id)
  }
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Import category utility
import { getCategoryColor as getColor } from '../../utils/categories'

// Get category color
const getCategoryColor = (category: string): string => {
  return getColor(category, props.categories)
}
</script>
