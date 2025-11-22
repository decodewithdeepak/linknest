<template>
  <div class="space-y-3 p-3 bg-muted/30 rounded-lg">
    <input
      ref="inputRef"
      v-model="categoryName"
      type="text"
      :placeholder="placeholder"
      class="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
      @keyup.enter="handleSubmit"
      @keyup.esc="$emit('cancel')"
    />
    
    <ColorPicker v-model="color" />
    
    <div class="flex gap-2">
      <UButton
        color="primary"
        size="sm"
        class="flex-1"
        @click="handleSubmit"
        :disabled="!categoryName.trim()"
      >
        {{ submitLabel }}
      </UButton>
      <UButton
        color="gray"
        variant="ghost"
        size="sm"
        @click="$emit('cancel')"
      >
        Cancel
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ColorPicker from './ColorPicker.vue'

const props = defineProps<{
  initialName?: string
  initialColor?: string
  placeholder?: string
  submitLabel?: string
}>()

const emit = defineEmits<{
  submit: [data: { name: string, color: string }]
  cancel: []
}>()

const categoryName = ref(props.initialName || '')
const color = ref(props.initialColor || '#8b5cf6')
const inputRef = ref<HTMLInputElement | null>(null)

const handleSubmit = () => {
  if (categoryName.value.trim()) {
    emit('submit', {
      name: categoryName.value.trim(),
      color: color.value
    })
  }
}

// Auto-focus input when component mounts
onMounted(() => {
  nextTick(() => {
    inputRef.value?.focus()
  })
})
</script>

