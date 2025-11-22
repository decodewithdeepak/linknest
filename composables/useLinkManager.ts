import type { Link } from '../types/link'

export interface CustomCategory {
  name: string
  color: string
}

export const useLinkManager = () => {
  const links = useState<Link[]>('links', () => [])
  const customCategories = useState<CustomCategory[]>('custom-categories', () => [])
  const isLoading = useState<boolean>('links-loading', () => false)
  const error = useState<string | null>('links-error', () => null)

  // Load from local storage on mount
  onMounted(() => {
    const savedLinks = localStorage.getItem('link-nest-links')
    const savedCategories = localStorage.getItem('link-nest-categories')
    
    if (savedLinks) {
      try {
        links.value = JSON.parse(savedLinks)
      } catch (e) {
        console.error('Failed to parse saved links', e)
      }
    }
    
    if (savedCategories) {
      try {
        customCategories.value = JSON.parse(savedCategories)
      } catch (e) {
        console.error('Failed to parse saved categories', e)
      }
    }
  })

  // Watch for changes and save to local storage
  watch(links, (newLinks) => {
    try {
      localStorage.setItem('link-nest-links', JSON.stringify(newLinks))
    } catch (e) {
      console.error('Failed to save links to localStorage:', e)
      error.value = 'Failed to save changes. Storage may be full.'
    }
  }, { deep: true })

  watch(customCategories, (newCategories) => {
    try {
      localStorage.setItem('link-nest-categories', JSON.stringify(newCategories))
    } catch (e) {
      console.error('Failed to save categories to localStorage:', e)
      error.value = 'Failed to save categories. Storage may be full.'
    }
  }, { deep: true })

  const fetchMetadata = async (url: string) => {
    try {
      // Call our internal server API
      const data = await $fetch('/api/metadata', {
        params: { url }
      })
      return data
    } catch (err) {
      console.error('Metadata fetch error:', err)
      throw err
    }
  }

  const categorizeLink = (metadata: any): string => {
    const { title, description, siteName, url } = metadata
    const text = `${title} ${description} ${siteName} ${url}`.toLowerCase()
    
    // Simple keyword-based categorization (simulating AI)
    if (text.includes('github') || text.includes('gitlab') || text.includes('repo') || text.includes('open source')) {
      return 'Open Source'
    }
    if (text.includes('portfolio') || text.includes('resume') || text.includes('cv') || text.includes('personal website')) {
      return 'Portfolio'
    }
    if (text.includes('blog') || text.includes('article') || text.includes('medium') || text.includes('dev.to') || text.includes('news')) {
      return 'Blog'
    }
    if (text.includes('tool') || text.includes('utility') || text.includes('generator') || text.includes('converter') || text.includes('app')) {
      return 'Tool'
    }
    if (text.includes('learn') || text.includes('course') || text.includes('tutorial') || text.includes('docs') || text.includes('guide')) {
      return 'Learning'
    }
    if (text.includes('youtube') || text.includes('video') || text.includes('stream') || text.includes('movie')) {
      return 'Video'
    }
    if (text.includes('design') || text.includes('ui') || text.includes('ux') || text.includes('figma') || text.includes('dribbble')) {
      return 'Design'
    }
    
    return 'Other'
  }

  const addLink = async (url: string) => {
    if (!url) return

    // Check if link already exists
    if (links.value.some(l => l.url === url)) {
      error.value = 'Link already exists'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      // Validate URL first
      let parsedUrl: URL
      try {
        parsedUrl = new URL(url)
      } catch {
        error.value = 'Invalid URL. Please enter a valid URL.'
        isLoading.value = false
        return
      }

      const metadata = await fetchMetadata(url)
      const category = categorizeLink(metadata)

      // Get favicon from Google's service as a reliable fallback
      const favicon = `https://www.google.com/s2/favicons?domain=${parsedUrl.hostname}&sz=128`

      const newLink: Link = {
        id: crypto.randomUUID(),
        url: metadata.url || url,
        title: metadata.title || url,
        description: metadata.description || '',
        image: metadata.image || null,
        favicon: favicon,
        siteName: metadata.siteName || parsedUrl.hostname,
        category,
        dateAdded: new Date().toISOString(),
        isFavorite: false
      }

      links.value.unshift(newLink)
      error.value = null // Clear any previous errors
    } catch (err) {
      console.error(err)
      error.value = 'Failed to fetch link details. Please check the URL.'
    } finally {
      isLoading.value = false
    }
  }

  const removeLink = (id: string) => {
    links.value = links.value.filter(l => l.id !== id)
  }

  const toggleFavorite = (id: string) => {
    const link = links.value.find(l => l.id === id)
    if (link) {
      link.isFavorite = !link.isFavorite
    }
  }

  const createCategory = (name: string, color: string = '#6b7280') => {
    if (name && !customCategories.value.some(c => c.name.toLowerCase() === name.toLowerCase())) {
      customCategories.value.push({ name, color })
    }
  }

  const updateLinkCategory = (linkId: string, newCategory: string) => {
    const link = links.value.find(l => l.id === linkId)
    if (link) {
      link.category = newCategory
    }
  }

  return {
    links,
    customCategories,
    isLoading,
    error,
    addLink,
    removeLink,
    toggleFavorite,
    createCategory,
    updateLinkCategory
  }
}
