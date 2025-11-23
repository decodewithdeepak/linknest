<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="[sizeClasses[props.size || 'md'], variantClasses[props.variant || 'auto'], props.class]"
    viewBox="0 0 32 32"
    fill="none"
  >
    <!-- Outer Circle -->
    <circle cx="16" cy="16" r="13" stroke="currentColor" stroke-width="1.5" opacity="0.25" fill="none"/>
    
    <!-- Inner Circle -->
    <circle cx="16" cy="16" r="9" stroke="currentColor" stroke-width="1.5" opacity="0.4" fill="none"/>
    
    <!-- Outer Nodes (drawn before center icon so lines stay behind) -->
    <circle cx="16" cy="3" r="2.5" fill="currentColor" opacity="0.5"/>
    <circle cx="29" cy="16" r="2.5" fill="currentColor" opacity="0.5"/>
    <circle cx="16" cy="29" r="2.5" fill="currentColor" opacity="0.5"/>
    <circle cx="3" cy="16" r="2.5" fill="currentColor" opacity="0.5"/>
    
    <!-- Center Link Icon (drawn last = on top) -->
    <g transform="translate(16, 16)">
      <!-- Left link -->
      <path d="M-5 -1.5 L-2.5 -1.5 C-1.5 -1.5, -1 -1, -1 0 C-1 1, -1.5 1.5, -2.5 1.5 L-5 1.5" 
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <!-- Right link -->
      <path d="M5 1.5 L2.5 1.5 C1.5 1.5, 1 1, 1 0 C1 -1, 1.5 -1.5, 2.5 -1.5 L5 -1.5" 
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <!-- Connection bar -->
      <line x1="-1" y1="0" x2="1" y2="0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </g>
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
