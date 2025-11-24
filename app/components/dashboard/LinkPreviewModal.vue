<template>
    <UModal v-model:open="isOpen" title="Link Preview" :ui="{
        content: 'max-w-sm bg-background',
        header: 'border-b border-border bg-background',
        body: 'bg-background',
        overlay: 'bg-black/10 backdrop-blur'
    }">
        <template #body>
            <div v-if="link" class="space-y-4">
                <!-- Link Card Preview - Same as original -->
                <div class="bg-card border border-border rounded-lg overflow-hidden relative">
                    <!-- Category Badge - Clickable -->
                    <div ref="badgeRef" class="absolute -top-1 left-0 z-10">
                        <span
                            class="inline-flex items-center gap-1 px-2 py-1 rounded-br-lg text-[10px] font-medium text-white shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                            :style="{ backgroundColor: getCategoryColor(selectedCategory) }" @click="toggleDropdown">
                            <Icon :name="getCategoryIcon(selectedCategory)" class="w-3 h-3" />
                            {{ selectedCategory }}
                            <Icon name="i-heroicons-chevron-down" class="w-2.5 h-2.5" />
                        </span>
                    </div>

                    <!-- Category Dropdown -->
                    <div v-if="showDropdown"
                        class="absolute top-6 left-0 z-20 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[150px]"
                        @click.stop>
                        <button v-for="cat in categoryOptions" :key="cat.value"
                            class="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2 transition-colors"
                            :class="{ 'bg-muted': cat.value === selectedCategory }" @click="selectCategory(cat.value)">
                            <Icon :name="getCategoryIcon(cat.value)" class="w-4 h-4" />
                            <span>{{ cat.label }}</span>
                        </button>
                    </div>

                    <!-- Header -->
                    <div class="flex items-center justify-between p-3 pb-2 pt-6">
                        <div class="flex items-center gap-2 min-w-0 flex-1">
                            <div class="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                                <img v-if="link.favicon" :src="link.favicon" class="w-5 h-5" alt="" />
                                <Icon v-else name="i-heroicons-link" class="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div class="min-w-0 flex-1">
                                <h3 class="font-semibold text-xs truncate">{{ link.siteName }}</h3>
                            </div>
                        </div>
                    </div>

                    <!-- Image -->
                    <div class="aspect-video w-full overflow-hidden relative p-2">
                        <img v-if="link.image" :src="link.image" :alt="link.title"
                            class="w-full h-full object-cover rounded-xl" />
                        <div v-else
                            class="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-primary/10 via-primary/5 to-transparent rounded-xl">
                            <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                <Icon name="i-heroicons-link" class="w-8 h-8 text-primary" />
                            </div>
                            <p class="text-xs text-muted-foreground font-medium px-4 text-center line-clamp-2">
                                {{ link.siteName }}
                            </p>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-3 pt-2">
                        <a :href="link.url" target="_blank" rel="noopener noreferrer"
                            class="block hover:text-primary transition-colors mb-2">
                            <h3 class="font-semibold text-sm leading-tight line-clamp-2">{{ link.title }}</h3>
                        </a>
                        <p class="text-xs text-muted-foreground line-clamp-2 mb-3">{{ link.description }}</p>
                        <div class="flex items-center gap-2">
                            <a :href="link.url" target="_blank" rel="noopener noreferrer"
                                class="flex-1 text-xs text-primary hover:underline truncate">
                                {{ link.url }}
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </template>

        <template #footer>
            <div class="flex justify-end gap-2">
                <UButton color="neutral" variant="outline" @click="isOpen = false">
                    Cancel
                </UButton>
                <UButton color="primary" @click="handleSave" :loading="saving">
                    Save Link
                </UButton>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import type { Link } from '../../../types/link'
import { getCategoryIcon, getCategoryColor } from '~/utils/categories'

const props = defineProps<{
    link: Link | null
    categories: Array<{ id: string; name: string; icon: string; color: string }>
}>()

const emit = defineEmits<{
    save: [category: string]
    close: []
}>()

const isOpen = defineModel<boolean>('open', { required: true })
const saving = ref(false)
const selectedCategory = ref('')
const showDropdown = ref(false)
const badgeRef = ref<HTMLElement | null>(null)

// Watch for link changes to update selected category
watch(() => props.link, (newLink) => {
    if (newLink) {
        selectedCategory.value = newLink.category
    }
}, { immediate: true })

const categoryOptions = computed(() => {
    return props.categories.map(cat => ({
        label: cat.name,
        value: cat.name
    }))
})

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value
}

const selectCategory = (category: string) => {
    selectedCategory.value = category
    showDropdown.value = false
}

// Close dropdown when modal closes
watch(isOpen, (value) => {
    if (!value) {
        showDropdown.value = false
        emit('close')
    }
})

const handleSave = async () => {
    if (!props.link) return

    saving.value = true
    emit('save', selectedCategory.value)

    // Keep modal open until parent closes it
    await new Promise(resolve => setTimeout(resolve, 300))
    saving.value = false
}

// Close modal when open changes to false
watch(isOpen, (value) => {
    if (!value) {
        emit('close')
    }
})
</script>
