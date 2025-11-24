<template>
  <div class="relative max-w-4xl mx-auto">
    <!-- Browser Window -->
    <div class="relative rounded-md border border-black/20 dark:border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-xl overflow-hidden">
      <!-- Browser Header -->
      <div class="flex items-center gap-4 px-6 py-4 border-b border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50">
        <div class="hidden sm:flex gap-2">
          <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div class="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
          <div class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
        <div class="flex-1 flex justify-center">
          <div class="flex items-center gap-2 px-4 py-1.5 rounded-sm bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-muted-foreground w-64 justify-center font-mono shadow-sm">
            <Icon name="i-heroicons-lock-closed" class="w-3 h-3" />
            linknest.app/dashboard
          </div>
        </div>
        <div class="w-16"></div>
      </div>

      <!-- Demo Content Area -->
      <div class="p-4 sm:p-8 bg-linear-to-br from-white/40 to-white/10 dark:from-black/40 dark:to-black/10 min-h-[400px] sm:min-h-[500px]">
        
        <!-- Input Section -->
        <div class="mb-6">
          <div class="flex items-center gap-2 mb-3">
            <Icon name="i-heroicons-sparkles" class="w-4 h-4 text-primary" />
            <p class="text-xs sm:text-sm font-medium text-foreground">Try it yourself - paste any URL</p>
          </div>
          
          <div class="relative">
            <input
              v-model="inputUrl"
              type="text"
              placeholder="https://deepakmodi.tech"
              @keyup.enter="handleAddLink"
              :disabled="isLoading"
              class="w-full px-4 py-3 pr-24 rounded-lg border border-black/10 dark:border-white/30 bg-white/60 dark:bg-white/10 backdrop-blur-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50 disabled:opacity-50"
            />
            <UButton
              @click="handleAddLink"
              :disabled="isLoading || !inputUrl"
              size="xs"
              color="primary"
              :icon="isLoading ? 'i-heroicons-arrow-path' : undefined"
              :loading="isLoading"
              class="absolute right-2 top-1/2 -translate-y-1/2"
            >
              {{ isLoading ? 'Adding...' : 'Add Link' }}
            </UButton>
          </div>

           <!-- Example URLs -->
          <div class="flex flex-wrap gap-2 mt-3">
            <UButton
              v-for="example in exampleUrls"
              :key="example.url"
              @click="inputUrl = example.url; handleAddLink()"
              :disabled="isLoading"
              size="xs"
              variant="outline"
              color="primary"
              class="font-mono"
            >
              {{ example.label }}
            </UButton>
          </div>
        </div>

        <!-- Loading State -->
        <Transition
          enter-active-class="transition-all duration-500"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-300"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
            <div class="relative">
              <div class="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
              <Icon name="i-heroicons-sparkles" class="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p class="mt-4 text-sm text-muted-foreground animate-pulse">{{ loadingMessage }}</p>
          </div>
        </Transition>

        <!-- Link Cards Grid -->
        <div v-if="!isLoading && demoLinks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TransitionGroup
            enter-active-class="transition-all duration-500"
            enter-from-class="opacity-0 scale-90 -translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-300"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-90"
          >
            <div
              v-for="(link, index) in demoLinks"
              :key="link.url"
              :style="{ transitionDelay: `${index * 100}ms` }"
              class="group/card p-4 rounded-lg border border-black/10 dark:border-white/20 bg-white/60 dark:bg-gray-900/60 hover:bg-white/80 dark:hover:bg-gray-900/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <!-- Card Header -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2 min-w-0 flex-1">
                  <div class="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <img 
                      v-if="link.favicon" 
                      :src="link.favicon" 
                      class="w-5 h-5"
                      @error="link.favicon = ''"
                    />
                    <Icon v-else name="i-heroicons-link" class="w-4 h-4 text-primary" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <h3 class="font-semibold text-xs truncate">{{ link.title }}</h3>
                    <p class="text-[10px] text-muted-foreground truncate">{{ link.siteName }}</p>
                  </div>
                </div>
                <UButton
                  @click="removeLink(index)"
                  icon="i-heroicons-x-mark"
                  size="xs"
                  color="neutral"
                  variant="ghost"
                  class="opacity-0 group-hover/card:opacity-100 transition-opacity"
                />
              </div>

              <!-- Card Image -->
              <div v-if="link.image" class="aspect-video w-full mb-3 rounded-md overflow-hidden bg-muted">
                <img 
                  :src="link.image" 
                  :alt="link.title"
                  class="w-full h-full object-cover"
                  @error="link.image = ''"
                />
              </div>

              <!-- Card Description -->
              <p class="text-[10px] text-muted-foreground line-clamp-2 mb-3">
                {{ link.description || 'No description available' }}
              </p>

              <!-- Category Badge with Animation -->
              <div class="flex items-center gap-2">
                <Transition
                  enter-active-class="transition-all duration-500 delay-300"
                  enter-from-class="opacity-0 scale-0"
                  enter-to-class="opacity-100 scale-100"
                >
                  <span 
                    v-if="link.category"
                    class="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full text-white font-medium"
                    :style="{ backgroundColor: getCategoryColor(link.category) }"
                  >
                    <Icon :name="getCategoryIcon(link.category)" class="w-3 h-3" />
                    {{ link.category }}
                  </span>
                </Transition>
                <span v-if="link.isNew" class="text-[10px] text-primary animate-pulse">New</span>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Empty State -->
        <div v-if="!isLoading && demoLinks.length === 0" class="flex flex-col items-center justify-center py-12 text-center">
          <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Icon name="i-heroicons-link" class="w-8 h-8 text-primary" />
          </div>
          <p class="text-sm text-muted-foreground mb-2">Paste a URL above to see the magic</p>
          <p class="text-xs text-muted-foreground/70">Try one of the example links</p>
        </div>
      </div>
    </div>

    <!-- Info Badge -->
    <div class="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
      <Icon name="i-heroicons-information-circle" class="w-4 h-4" />
      <span>This is a live demo - no signup required!</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCategoryColor, getCategoryIcon, categorizeLink } from '~/utils/categories'

interface DemoLink {
  url: string
  title: string
  description: string
  image: string
  favicon: string
  siteName: string
  category: string
  isNew?: boolean
}

const inputUrl = ref('')
const isLoading = ref(false)
const loadingMessage = ref('Fetching metadata...')
const demoLinks = ref<DemoLink[]>([])

const exampleUrls = [
  { label: 'https://github.com', url: 'https://github.com' },
  { label: 'https://deepakmodi.tech', url: 'https://deepakmodi.tech' },
  { label: 'https://notion.so', url: 'https://notion.so' },
  { label: 'https://youtube.com', url: 'https://youtube.com' },
//   { label: 'https://linear.app', url: 'https://linear.app' },
  { label: 'https://dribbble.com', url: 'https://dribbble.com' },
  
]

const loadingMessages = [
  'Fetching metadata...',
  'Analyzing content...',
  'Categorizing link...',
  'Almost there...',
]

let messageInterval: NodeJS.Timeout | null = null

const handleAddLink = async () => {
  if (!inputUrl.value || isLoading.value) return

  // Validate URL
  try {
    new URL(inputUrl.value)
  } catch {
    alert('Please enter a valid URL')
    return
  }

  isLoading.value = true
  let messageIndex = 0
  loadingMessage.value = loadingMessages[0] || 'Loading...'

  // Rotate loading messages
  messageInterval = setInterval(() => {
    messageIndex = (messageIndex + 1) % loadingMessages.length
    loadingMessage.value = loadingMessages[messageIndex] || 'Loading...'
  }, 800)

  try {
    // Fetch metadata from API
    const metadata = await $fetch('/api/metadata', {
      params: { url: inputUrl.value }
    })

    // Categorize the link
    const category = categorizeLink(metadata)

    // Create demo link
    const newLink: DemoLink = {
      url: inputUrl.value,
      title: metadata.title || 'Untitled',
      description: metadata.description || '',
      image: metadata.image || '',
      favicon: `https://www.google.com/s2/favicons?domain=${new URL(inputUrl.value).hostname}&sz=128`,
      siteName: metadata.siteName || new URL(inputUrl.value).hostname,
      category: category,
      isNew: true
    }

    // Add to beginning of array with animation
    demoLinks.value.unshift(newLink)

    // Remove "new" badge after 3 seconds
    setTimeout(() => {
      if (demoLinks.value[0]) {
        demoLinks.value[0].isNew = false
      }
    }, 3000)

    // Clear input
    inputUrl.value = ''

    // Limit to 6 links
    if (demoLinks.value.length > 6) {
      demoLinks.value.pop()
    }

  } catch (error) {
    console.error('Error fetching metadata:', error)
    alert('Failed to fetch link metadata. Please try another URL.')
  } finally {
    if (messageInterval) {
      clearInterval(messageInterval)
    }
    isLoading.value = false
  }
}

const removeLink = (index: number) => {
  demoLinks.value.splice(index, 1)
}

// Cleanup on unmount
onUnmounted(() => {
  if (messageInterval) {
    clearInterval(messageInterval)
  }
})
</script>

