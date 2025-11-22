<template>
  <div class="h-full flex flex-col">
    <!-- Logo/Brand -->
    <div class="mb-6 pb-6 border-b border-border shrink-0">
      <NuxtLink to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Logo size="lg" />
        <span class="font-bold text-2xl">LinkNest</span>
      </NuxtLink>
    </div>

    <!-- Navigation -->
    <div class="space-y-2 shrink-0">
      <!-- All Links -->
      <button
        @click="$emit('select', null)"
        :class="[
          'w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-left text-sm border',
          selectedCategory === null
            ? 'bg-primary text-black border-primary'
            : 'text-foreground hover:bg-primary/10 hover:border-primary/20 border-transparent'
        ]"
      >
        <div class="flex items-center gap-2.5">
          <Icon name="i-heroicons-squares-2x2" class="w-4 h-4" />
          <span class="font-medium">All Links</span>
        </div>
        <span class="text-xs opacity-70">{{ totalCount }}</span>
      </button>

    <!-- Recently Added -->
    <button
      @click="$emit('select', 'recent')"
      :class="[
        'w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-left text-sm border',
        selectedCategory === 'recent'
          ? 'bg-primary text-black border-primary'
          : 'text-foreground hover:bg-primary/10 hover:border-primary/20 border-transparent'
      ]"
    >
      <div class="flex items-center gap-2.5">
        <Icon name="i-heroicons-clock" class="w-4 h-4" />
        <span class="font-medium">Recent</span>
      </div>
      <span class="text-xs opacity-70">{{ recentCount }}</span>
    </button>

    <!-- Favorites -->
    <button
      @click="$emit('select', 'favorites')"
      :class="[
        'w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-left text-sm border',
        selectedCategory === 'favorites'
          ? 'bg-primary text-black border-primary'
          : 'text-foreground hover:bg-primary/10 hover:border-primary/20 border-transparent'
      ]"
    >
      <div class="flex items-center gap-2.5">
        <Icon name="i-heroicons-heart" class="w-4 h-4" />
        <span class="font-medium">Favorites</span>
      </div>
      <span class="text-xs opacity-70">{{ favoritesCount }}</span>
    </button>

    <!-- Divider -->
    <div class="h-px bg-border my-3"></div>

    <!-- Collections Header -->
    <div class="px-3 py-2 flex items-center justify-between group">
      <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Collections
      </p>
      <button 
        @click="isAddingCategory = true"
        class="text-muted-foreground hover:text-primary transition-colors"
        title="Add Collection"
      >
        <Icon name="i-heroicons-plus" class="w-4 h-4" />
      </button>
    </div>
    </div>

    <!-- Collections Scrollable Area -->
    <div class="flex-1 overflow-y-auto min-h-0 pr-1">
      <!-- Add Category Input -->
      <div v-if="isAddingCategory" class="px-3 mb-2">
        <div class="space-y-2 p-2 bg-muted/50 rounded-lg border border-border">
          <div class="flex items-center gap-2">
            <input
              v-model="newCategoryName"
              @keydown.enter="addCategory"
              @keydown.esc="isAddingCategory = false"
              ref="categoryInput"
              type="text"
              placeholder="Category name..."
              class="w-full bg-background border border-border rounded px-2 py-1.5 text-sm focus:outline-none focus:border-primary/50"
            />
            <button @click="isAddingCategory = false" class="text-muted-foreground hover:text-red-500 shrink-0">
              <Icon name="i-heroicons-x-mark" class="w-4 h-4" />
            </button>
          </div>
          
          <!-- Color Picker -->
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="color in categoryColors"
              :key="color"
              @click="selectedColor = color"
              class="w-5 h-5 rounded-full border transition-transform hover:scale-110"
              :class="[
                selectedColor === color ? 'ring-2 ring-primary ring-offset-1 ring-offset-background scale-110' : 'border-transparent'
              ]"
              :style="{ backgroundColor: color }"
            />
          </div>

          <button 
            @click="addCategory"
            :disabled="!newCategoryName.trim()"
            class="w-full py-1 text-xs font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Category
          </button>
        </div>
      </div>

      <!-- Category List -->
      <div class="space-y-2">
        <button
          v-for="category in categories"
          :key="category.name"
          @click="$emit('select', category.name)"
          :class="[
            'w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-left text-sm group border',
            selectedCategory === category.name
              ? 'bg-primary text-black border-primary'
              : 'text-foreground hover:bg-primary/10 hover:border-primary/20 border-transparent'
          ]"
        >
          <div class="flex items-center gap-2.5 min-w-0 flex-1">
            <div 
              class="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
              :style="`background: linear-gradient(135deg, ${category.gradient})`"
            >
              <Icon 
                :name="category.icon" 
                class="w-3 h-3 text-white"
              />
            </div>
            <span class="font-medium truncate">{{ category.name }}</span>
          </div>
          <span class="text-xs opacity-70 shrink-0 ml-2">{{ category.count }}</span>
        </button>
      </div>
    </div>

    <!-- User Profile Section - Bottom -->
    <div class="mt-auto pt-4 border-t border-border shrink-0">
      <div class="flex items-center gap-3 mb-3">
        <img 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
          alt="User Avatar"
          class="w-10 h-10 rounded-full border-2 border-primary/20"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold truncate">Deepak Modi</p>
          <p class="text-xs text-muted-foreground truncate">deepak@example.com</p>
        </div>
      </div>
      
      <!-- Actions Row -->
      <div class="flex items-center gap-2">
        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10 hover:border-primary/20 border border-transparent hover:text-primary transition-all text-sm"
          title="Toggle theme"
        >
          <Icon :name="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'" class="w-4 h-4" />
          <span class="text-xs">{{ isDark ? 'Light' : 'Dark' }}</span>
        </button>
        
        <!-- Logout Button -->
        <button
          @click="handleLogout"
          class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/15 hover:border-red-500/30 border border-transparent hover:text-red-600 transition-all text-sm"
          title="Logout"
        >
          <Icon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4" />
          <span class="text-xs">Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  selectedCategory: string | null
  totalCount: number
  recentCount: number
  favoritesCount: number
  categories: Array<{
    name: string
    count: number
    icon: string
    gradient: string
  }>
}>()

const emit = defineEmits<{
  select: [category: string | null]
  'create-category': [data: { name: string, color: string }]
}>()

const isAddingCategory = ref(false)
const newCategoryName = ref('')
const categoryInput = ref<HTMLInputElement | null>(null)
const selectedColor = ref('#8b5cf6') // Default purple

const categoryColors = [
  '#ef4444', // Red
  '#f97316', // Orange
  '#eab308', // Yellow
  '#22c55e', // Green
  '#14b8a6', // Teal
  '#3b82f6', // Blue
  '#8b5cf6', // Purple
  '#d946ef', // Pink
  '#6b7280', // Gray
]

watch(isAddingCategory, (newValue) => {
  if (newValue) {
    nextTick(() => {
      categoryInput.value?.focus()
    })
  } else {
    newCategoryName.value = ''
    selectedColor.value = '#8b5cf6'
  }
})

const addCategory = () => {
  if (newCategoryName.value.trim()) {
    emit('create-category', { 
      name: newCategoryName.value.trim(), 
      color: selectedColor.value 
    })
    isAddingCategory.value = false
  }
}

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

const handleLogout = () => {
  // Add logout logic here
  console.log('Logout clicked')
  // For now, just show an alert
  alert('Logout functionality - to be implemented')
}
</script>



