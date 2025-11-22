<template>
  <div 
    :draggable="!isMobile"
    @dragstart="onDragStart"
    :class="[
      'group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full',
      !isMobile && 'cursor-move active:cursor-grabbing active:scale-95'
    ]"
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
      <div class="absolute top-0 left-0">
        <UBadge :color="getCategoryColor(link.category)" variant="soft" class="bg-background">
          {{ link.category }}
        </UBadge>
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
</template>

<script setup lang="ts">
import type { Link } from '../../../types/link'

const props = defineProps<{
  link: Link
}>()

const emit = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'toggleFavorite', id: string): void
}>()

const copied = ref(false)
const imageError = ref(false)
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

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

// Map categories to supported badge colors: "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral"
const getCategoryColor = (category: string): "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral" => {
  const colors: Record<string, "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral"> = {
    'Open Source': 'success',
    'Portfolio': 'primary',
    'Blog': 'info',
    'Tool': 'warning',
    'Learning': 'success',
    'Video': 'error',
    'Design': 'primary',
    'Other': 'neutral'
  }
  return colors[category] || 'neutral'
}

const onDragStart = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', props.link.id)
  }
}
</script>
