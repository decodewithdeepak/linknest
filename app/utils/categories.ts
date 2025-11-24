// Predefined categories with colors
export const PREDEFINED_CATEGORIES = [
  { name: 'Development', color: '#10b981' },
  { name: 'Open Source', color: '#22c55e' },
  { name: 'Portfolio', color: '#3b82f6' },
  { name: 'Productivity', color: '#0ea5e9' },
  { name: 'Blog', color: '#8b5cf6' },
  { name: 'Design', color: '#a855f7' },
  { name: 'Tool', color: '#f59e0b' },
  { name: 'Learning', color: '#ec4899' },
  { name: 'Social', color: '#f97316' },
  { name: 'Video', color: '#ef4444' },
  { name: 'Entertainment', color: '#dc2626' },
  { name: 'Other', color: '#6b7280' }
] as const

// Get icon for a category
export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    'Open Source': 'i-heroicons-code-bracket',
    'Portfolio': 'i-heroicons-user-circle',
    'Blog': 'i-heroicons-document-text',
    'Tool': 'i-heroicons-wrench-screwdriver',
    'Learning': 'i-heroicons-academic-cap',
    'Video': 'i-heroicons-play-circle',
    'Design': 'i-heroicons-paint-brush',
    'Development': 'i-heroicons-computer-desktop',
    'Productivity': 'i-heroicons-chart-bar',
    'Social': 'i-heroicons-user-group',
    'Entertainment': 'i-heroicons-film',
    'Other': 'i-heroicons-folder'
  }
  return icons[category] || 'i-heroicons-folder'
}

// Get color for a category
export const getCategoryColor = (category: string, categories?: Array<{ name: string, color?: string }>): string => {
  // First, try to find in provided categories
  if (categories) {
    const cat = categories.find(c => c.name === category)
    if (cat?.color) return cat.color
  }
  
  // Fallback to predefined categories
  const predefined = PREDEFINED_CATEGORIES.find(c => c.name === category)
  return predefined?.color || '#6b7280' // Default gray
}

// Categorize link based on metadata
export const categorizeLink = (metadata: any): string => {
  const { title, description, siteName, url } = metadata
  const text = `${title} ${description} ${siteName} ${url}`.toLowerCase()

  // Simple keyword-based categorization
  if (
    text.includes("github") ||
    text.includes("gitlab") ||
    text.includes("repo") ||
    text.includes("open source")
  ) {
    return "Open Source"
  }
  if (
    text.includes("portfolio") ||
    text.includes("resume") ||
    text.includes("cv") ||
    text.includes("personal website")
  ) {
    return "Portfolio"
  }
  if (
    text.includes("blog") ||
    text.includes("article") ||
    text.includes("medium") ||
    text.includes("dev.to") ||
    text.includes("news")
  ) {
    return "Blog"
  }
  if (
    text.includes("tool") ||
    text.includes("utility") ||
    text.includes("generator") ||
    text.includes("converter") ||
    text.includes("app")
  ) {
    return "Tool"
  }
  if (
    text.includes("learn") ||
    text.includes("course") ||
    text.includes("tutorial") ||
    text.includes("docs") ||
    text.includes("guide")
  ) {
    return "Learning"
  }
  if (
    text.includes("youtube") ||
    text.includes("video") ||
    text.includes("stream") ||
    text.includes("movie")
  ) {
    return "Video"
  }
  if (
    text.includes("design") ||
    text.includes("ui") ||
    text.includes("ux") ||
    text.includes("figma") ||
    text.includes("dribbble")
  ) {
    return "Design"
  }

  return "Other"
}

