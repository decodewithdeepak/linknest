<template>
  <div class="h-full flex flex-col">
    <!-- Logo/Brand -->
    <div class="pb-4 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Logo size="lg" />
        <span class="font-bold text-2xl">LinkNest</span>
      </NuxtLink>
      <ThemeToggle />
    </div>

    <!-- Navigation -->
    <div class="space-y-2 mt-auto pt-4 border-t border-border shrink-0">
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
      <!-- Add/Edit Category Form -->
      <div v-if="isAddingCategory || isEditingCategory" class="px-3 mb-2">
        <CategoryForm
          :initial-name="isEditingCategory ? editingCategoryData?.name : ''"
          :initial-color="isEditingCategory ? editingCategoryData?.color : '#8b5cf6'"
          :placeholder="isEditingCategory ? 'Edit category name...' : 'New category name...'"
          :submit-label="isEditingCategory ? 'Save Changes' : 'Add Category'"
          @submit="isEditingCategory ? handleSaveEdit($event) : handleAddCategory($event)"
          @cancel="handleCancelForm"
        />
      </div>

      <!-- Category List -->
      <div class="space-y-2">
        <div
          v-for="category in categories"
          :key="category.name"
          class="relative group/item"
        >
          <button
            @click="$emit('select', category.name)"
            :class="[
              'w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-left text-sm border',
              selectedCategory === category.name
                ? 'bg-primary text-black border-primary'
                : 'text-foreground hover:bg-primary/10 hover:border-primary/20 border-transparent'
            ]"
          >
            <div class="flex items-center gap-2.5 min-w-0 flex-1">
              <div 
                class="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                :style="`background-color: ${category.color}`"
              >
                <Icon 
                  :name="category.icon" 
                  class="w-3 h-3 text-white"
                />
              </div>
              <span class="font-medium truncate">{{ category.name }}</span>
            </div>
            <div class="flex items-center gap-1 shrink-0 ml-2">
              <!-- Edit & Delete Icons (shown on hover for all categories) -->
              <UButton
                icon="i-heroicons-pencil"
                color="warning"
                variant="ghost"
                size="xs"
                @click.stop="handleEditCategory(category.name)"
                class="opacity-0 group-hover/item:opacity-100"
                title="Edit category"
              />
              <UButton
                icon="i-heroicons-trash"
                color="error"
                variant="ghost"
                size="xs"
                @click.stop="handleDeleteCategory(category.name)"
                class="opacity-0 group-hover/item:opacity-100"
                title="Delete category"
              />
              <!-- Count (always visible) -->
              <span class="text-xs opacity-70">{{ category.count }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- User Profile Section - Bottom -->
    <div class="mt-auto pt-4 border-t border-border shrink-0">
      <!-- Loading Skeleton -->
      <div v-if="loading || !user" class="flex items-center gap-3 animate-pulse">
        <div class="w-10 h-10 rounded-full bg-muted"></div>
        <div class="flex-1 min-w-0 space-y-2">
          <div class="h-4 bg-muted rounded w-24"></div>
          <div class="h-3 bg-muted rounded w-32"></div>
        </div>
        <div class="w-8 h-8 bg-muted rounded"></div>
      </div>
      
      <!-- User Profile -->
      <div v-else-if="user" class="flex items-center gap-3">
        <!-- User Avatar with Initials -->
        <div 
          :class="[avatarColor, 'w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center text-white font-semibold text-sm']"
        >
          {{ userInitials }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold truncate">{{ userName }}</p>
          <p class="text-xs text-muted-foreground truncate">{{ userEmail }}</p>
        </div>
        <!-- Logout Icon Button -->
        <UButton
          icon="i-heroicons-arrow-right-on-rectangle"
          color="error"
          variant="ghost"
          size="md"
          @click="handleLogout"
          title="Logout"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryForm from './CategoryForm.vue'

const props = defineProps<{
  selectedCategory: string | null
  totalCount: number
  recentCount: number
  favoritesCount: number
  categories: Array<{
    id?: number
    name: string
    count: number
    icon: string
    color: string
  }>
}>()

const emit = defineEmits<{
  select: [category: string | null]
  'create-category': [data: { name: string, color: string }]
  'edit-category': [data: { id: number, newName?: string, newColor?: string, oldName: string }]
  'delete-category': [data: { id: number, name: string }]
}>()

const isAddingCategory = ref(false)
const isEditingCategory = ref(false)
const editingCategoryData = ref<{ id?: number, name: string, color: string } | null>(null)

// Handle add category
const handleAddCategory = (data: { name: string, color: string }) => {
  emit('create-category', data)
  isAddingCategory.value = false
}

// Handle edit category
const handleEditCategory = (categoryName: string) => {
  const category = props.categories.find(c => c.name === categoryName)
  if (category && category.id) {
    editingCategoryData.value = { 
      id: category.id,
      name: categoryName, 
      color: category.color || '#8b5cf6'
    }
    isEditingCategory.value = true
    isAddingCategory.value = false
  }
}

// Handle save edited category
const handleSaveEdit = (data: { name: string, color: string }) => {
  if (editingCategoryData.value && editingCategoryData.value.id) {
    const nameChanged = data.name !== editingCategoryData.value.name
    const colorChanged = data.color !== editingCategoryData.value.color
    
    emit('edit-category', {
      id: editingCategoryData.value.id,
      oldName: editingCategoryData.value.name,
      newName: nameChanged ? data.name : undefined,
      newColor: colorChanged ? data.color : undefined
    })
    isEditingCategory.value = false
    editingCategoryData.value = null
  }
}

// Handle delete category
const handleDeleteCategory = (categoryName: string) => {
  const category = props.categories.find(c => c.name === categoryName)
  if (category && category.id && confirm(`Are you sure you want to delete the category "${categoryName}"? Links in this category will be moved to "Other".`)) {
    emit('delete-category', { id: category.id, name: categoryName })
  }
}

// Handle cancel form
const handleCancelForm = () => {
  isAddingCategory.value = false
  isEditingCategory.value = false
  editingCategoryData.value = null
}

// Auth composable
const { user, loading, logout } = useAuth()

const handleLogout = () => {
  logout()
}

// Update user info
const userEmail = computed(() => user.value?.email || '')
const userName = computed(() => user.value?.name || '')

// Generate user initials from name or email
const userInitials = computed(() => {
  if (!user.value) return ''
  
  const name = user.value?.name
  const email = user.value?.email
  
  if (name) {
    // Get first letter of first and last name
    const nameParts = name.trim().split(' ')
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }
  
  if (email) {
    // Get first two letters of email
    return email.substring(0, 2).toUpperCase()
  }
  
  return ''
})

// Generate a consistent color based on the user's name or email
const avatarColor = computed(() => {
  const str = user.value?.email || user.value?.name || 'default'
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const colors = [
    'bg-purple-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500'
  ]
  return colors[Math.abs(hash) % colors.length]
})
</script>



