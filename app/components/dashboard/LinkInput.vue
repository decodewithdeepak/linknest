<template>
  <div class="relative group" @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop">
    <div class="relative z-10 py-2 px-4 rounded-xl transition-all duration-300 border-2" :class="[
      isDragging
        ? 'bg-primary/10 border-primary border-dashed shadow-lg shadow-primary/20'
        : 'bg-linear-to-r from-primary/5 to-primary/10 border-primary/30 shadow-md hover:border-primary/50 hover:shadow-lg'
    ]">
      <form @submit.prevent="handleSubmit" class="flex items-center gap-2 sm:gap-3">
        <div class="shrink-0 flex items-center justify-center">
          <Icon :name="isDragging ? 'i-heroicons-arrow-down-tray' : 'i-heroicons-link'"
            class="w-6 h-6 transition-colors" :class="isDragging ? 'text-primary' : 'text-primary/70'" />
        </div>

        <input ref="inputRef" v-model="urlInput" type="url" placeholder="Paste your link here (or drag & drop)..."
          class="flex-1 bg-transparent border-none outline-none text-base font-medium h-10 min-w-0 placeholder:truncate placeholder:text-muted-foreground/70"
          :disabled="loading" />

        <UButton type="submit" :loading="loading" :disabled="!urlInput" color="primary" variant="solid" size="md"
          class="px-6 sm:px-8 transition-all duration-300 shrink-0 font-semibold">
          {{ loading ? 'Adding...' : 'Add Link' }}
        </UButton>
      </form>
    </div>

    <!-- Drag overlay effect -->
    <div v-if="isDragging"
      class="absolute inset-0 z-0 bg-primary/5 rounded-2xl backdrop-blur-sm border-2 border-primary border-dashed animate-pulse pointer-events-none">
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'add', url: string): void
}>()

const urlInput = ref('')
const isDragging = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const handleSubmit = () => {
  if (!urlInput.value) return
  emit('add', urlInput.value)
}

// Watch for loading to become false to clear input
watch(() => props.loading, (newVal, oldVal) => {
  if (oldVal && !newVal) {
    urlInput.value = ''
  }
})

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  const text = e.dataTransfer?.getData('text/plain') || e.dataTransfer?.getData('text/uri-list')

  if (text) {
    urlInput.value = text
    // Auto-submit after dropping
    handleSubmit()
  }
}
</script>
