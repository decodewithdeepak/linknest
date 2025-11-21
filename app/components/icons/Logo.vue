<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="[sizeClasses[props.size || 'md'], variantClasses[props.variant || 'auto'], props.class]"
    viewBox="0 0 24 24"
    fill="none"
  >
    <!-- Center Hub Circle -->
    <circle
      cx="12"
      cy="12"
      r="3"
      fill="currentColor"
      opacity="0.9"
    />
    
    <!-- Connection Lines -->
    <path
      d="M12 9V4M12 20v-5M15 12h5M4 12h5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      opacity="0.4"
    />
    
    <path
      d="M14.5 9.5l3.5-3.5M6 6l3.5 3.5M14.5 14.5l3.5 3.5M6 18l3.5-3.5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      opacity="0.4"
    />

    <!-- Outer Nodes (Link Symbols) -->
    <!-- Top -->
    <g transform="translate(12, 3)">
      <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.8"/>
      <path d="M-0.8 0.8L0.8 -0.8" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
    </g>
    
    <!-- Right -->
    <g transform="translate(21, 12)">
      <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.8"/>
      <path d="M-0.8 0.8L0.8 -0.8" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
    </g>
    
    <!-- Bottom -->
    <g transform="translate(12, 21)">
      <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.8"/>
      <path d="M-0.8 0.8L0.8 -0.8" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
    </g>
    
    <!-- Left -->
    <g transform="translate(3, 12)">
      <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.8"/>
      <path d="M-0.8 0.8L0.8 -0.8" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
    </g>
    
    <!-- Top Right -->
    <g transform="translate(18.5, 5.5)">
      <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.8"/>
      <path d="M-0.8 0.8L0.8 -0.8" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
    </g>
    
    <!-- Top Left -->
    <g transform="translate(5.5, 5.5)">
      <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.8"/>
      <path d="M-0.8 0.8L0.8 -0.8" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
    </g>
    
    <!-- Bottom Right -->
    <g transform="translate(18.5, 18.5)">
      <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.8"/>
      <path d="M-0.8 0.8L0.8 -0.8" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
    </g>
    
    <!-- Bottom Left -->
    <g transform="translate(5.5, 18.5)">
      <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.8"/>
      <path d="M-0.8 0.8L0.8 -0.8" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
    </g>

    <!-- Outer Ring -->
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="1"
      fill="none"
      opacity="0.15"
    />
  </svg>
</template>

<script setup lang="ts">
interface LogoProps {
  class?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'light' | 'dark' | 'auto'
}

const props = withDefaults(defineProps<LogoProps>(), {
  size: 'md',
  variant: 'auto'
})

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10'
}

const variantClasses = {
  light: 'text-white',
  dark: 'text-black',
  auto: 'text-primary'
}
</script>
