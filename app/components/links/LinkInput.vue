<template>
  <div 
    class="relative group"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <div 
      class="relative z-10 p-1 rounded-xl transition-all duration-300"
      :class="[
        isDragging ? 'bg-primary/10 ring-2 ring-primary border-primary border-dashed' : 'bg-background border border-border shadow-sm hover:border-primary/50'
      ]"
    >
      <form @submit.prevent="handleSubmit" class="flex items-center gap-2 p-2">
        <div class="flex-shrink-0 pl-2">
          <Icon 
            :name="isDragging ? 'i-heroicons-arrow-down-tray' : 'i-heroicons-link'" 
            class="w-6 h-6 text-muted-foreground transition-colors"
            :class="{ 'text-primary': isDragging }"
          />
        </div>
        
        <input
          ref="inputRef"
          v-model="urlInput"
          type="url"
          placeholder="Paste your link here (or drag & drop)..."
          class="flex-1 bg-transparent border-none outline-none text-base h-10 placeholder:text-muted-foreground/60"
          :disabled="loading"
        />

        <UButton 
          type="submit" 
          :loading="loading"
          :disabled="!urlInput"
          color="primary"
          variant="solid"
          size="md"
          class="px-6 transition-all duration-300"
        >
          {{ loading ? 'Adding...' : 'Add Link' }}
        </UButton>
      </form>
    </div>

    <!-- Drag overlay effect -->
    <div 
      v-if="isDragging" 
      class="absolute inset-0 z-0 bg-primary/5 rounded-xl backdrop-blur-sm border-2 border-primary border-dashed animate-pulse pointer-events-none"
    >
      <div class="absolute inset-0 flex items-center justify-center text-primary font-medium">
        Drop link to add
      </div>
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
  urlInput.value = ''
}

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  const text = e.dataTransfer?.getData('text/plain') || e.dataTransfer?.getData('text/uri-list')
  
  if (text) {
    // Simple URL validation/extraction could go here if needed
    urlInput.value = text
    handleSubmit()
  }
}
</script>

