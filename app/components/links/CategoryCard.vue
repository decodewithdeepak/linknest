<template>
  <div 
    @click="$emit('select', category)"
    class="group relative bg-gradient-to-br from-card to-card/50 border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer hover:-translate-y-1 p-6"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" :style="`background: radial-gradient(circle at 20% 50%, ${getCategoryGradient(category)} 0%, transparent 50%)`"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Icon & Count -->
      <div class="flex items-start justify-between mb-4">
        <div 
          class="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
          :style="`background: linear-gradient(135deg, ${getCategoryGradient(category)})`"
        >
          <Icon :name="getCategoryIcon(category)" class="w-6 h-6 text-white" />
        </div>
        
        <div class="text-right">
          <div class="text-2xl font-bold">{{ count }}</div>
          <div class="text-xs text-muted-foreground">{{ count === 1 ? 'Link' : 'Links' }}</div>
        </div>
      </div>

      <!-- Category Name -->
      <h3 class="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {{ category }}
      </h3>

      <!-- Preview Favicons (if available) -->
      <div v-if="previewLinks.length > 0" class="flex items-center gap-1 mb-3">
        <div 
          v-for="(link, idx) in previewLinks.slice(0, 4)" 
          :key="link.id"
          class="w-7 h-7 rounded-md overflow-hidden border border-border/50 bg-white dark:bg-muted flex items-center justify-center"
          :style="`transform: translateX(-${idx * 3}px); z-index: ${4 - idx}`"
        >
          <img 
            v-if="link.favicon" 
            :src="link.favicon" 
            :alt="link.siteName"
            class="w-4 h-4 object-contain"
          />
          <Icon v-else name="i-heroicons-link" class="w-3 h-3 text-muted-foreground/50" />
        </div>
        <span v-if="count > 4" class="text-xs text-muted-foreground ml-2">
          +{{ count - 4 }}
        </span>
      </div>

      <!-- View Button -->
      <div class="flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
        <span>View all</span>
        <Icon name="i-heroicons-arrow-right" class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>

    <!-- Hover Effect -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </div>
</template>

<script setup lang="ts">
import type { Link } from '../../../types/link'

defineProps<{
  category: string
  count: number
  previewLinks: Link[]
}>()

defineEmits<{
  select: [category: string]
}>()

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

