<template>
  <div class="flex flex-wrap gap-1.5">
    <button
      v-for="color in colors"
      :key="color"
      type="button"
      :class="[
        'w-5 h-5 rounded-md border-2 transition-all hover:scale-110',
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

// Custom colors - slightly different from predefined categories
const colors = [
  '#dc2626', // Red (darker)
  '#ea580c', // Orange (darker)
  '#d97706', // Amber (darker)
  '#ca8a04', // Yellow (darker)
  '#65a30d', // Lime (darker)
  '#16a34a', // Green (darker)
  '#059669', // Emerald (darker)
  '#0d9488', // Teal (darker)
  '#0891b2', // Cyan (darker)
  '#0284c7', // Sky (darker)
  '#2563eb', // Blue (darker)
  '#4f46e5', // Indigo (darker)
  '#7c3aed', // Purple (darker)
  '#9333ea', // Violet (darker)
  '#c026d3', // Fuchsia (darker)
  '#db2777', // Pink (darker)
  '#e11d48', // Rose (darker)
  '#52525b', // Gray (darker)
]
</script>

