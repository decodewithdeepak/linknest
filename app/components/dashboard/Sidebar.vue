<template>
  <div class="h-full flex flex-col">
    <!-- Logo/Brand -->
    <div class="mb-6 pb-6 border-b border-border">
      <NuxtLink to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Logo size="lg" />
        <span class="font-bold text-2xl">LinkNest</span>
      </NuxtLink>
    </div>

    <!-- Navigation -->
    <div class="space-y-2">
      <!-- All Links -->
      <button
        @click="$emit('select', null)"
        :class="[
          'w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-left text-sm',
          selectedCategory === null
            ? 'bg-primary text-black'
            : 'text-foreground hover:bg-muted'
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
        'w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-left text-sm',
        selectedCategory === 'recent'
          ? 'bg-primary text-black'
          : 'text-foreground hover:bg-muted'
      ]"
    >
      <div class="flex items-center gap-2.5">
        <Icon name="i-heroicons-clock" class="w-4 h-4" />
        <span class="font-medium">Recent</span>
      </div>
      <span class="text-xs opacity-70">{{ recentCount }}</span>
    </button>

    <!-- Divider -->
    <div class="h-px bg-border my-3"></div>

    <!-- Collections Header -->
    <div class="px-3 py-2">
      <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Collections
      </p>
    </div>

    <!-- Category List -->
    <div class="space-y-2">
      <button
        v-for="category in categories"
        :key="category.name"
        @click="$emit('select', category.name)"
        :class="[
          'w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-left text-sm group',
          selectedCategory === category.name
            ? 'bg-primary text-black'
            : 'text-foreground hover:bg-muted'
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
  </div>
</template>

<script setup lang="ts">
defineProps<{
  selectedCategory: string | null
  totalCount: number
  recentCount: number
  categories: Array<{
    name: string
    count: number
    icon: string
    gradient: string
  }>
}>()

defineEmits<{
  select: [category: string | null]
}>()
</script>

