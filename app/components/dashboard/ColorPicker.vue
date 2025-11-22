<template>
  <div class="flex flex-wrap gap-1.5">
    <button
      v-for="color in colors"
      :key="color"
      type="button"
      :class="[
        'w-7 h-7 rounded-lg border-2 transition-all hover:scale-110',
        modelValue === color ? 'border-white ring-2 ring-primary' : 'border-transparent'
      ]"
      :style="{ backgroundColor: color }"
      @click="$emit('update:modelValue', color)"
      :title="`Select ${color}`"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [color: string]
}>()

const colors = [
  '#ef4444', // Red
  '#f97316', // Orange
  '#f59e0b', // Amber
  '#eab308', // Yellow
  '#84cc16', // Lime
  '#22c55e', // Green
  '#10b981', // Emerald
  '#14b8a6', // Teal
  '#06b6d4', // Cyan
  '#0ea5e9', // Sky
  '#3b82f6', // Blue
  '#6366f1', // Indigo
  '#8b5cf6', // Purple
  '#a855f7', // Violet
  '#d946ef', // Fuchsia
  '#ec4899', // Pink
  '#f43f5e', // Rose
  '#6b7280', // Gray
]
</script>

