import type { Link } from '../types/link'

export const useLinkManager = () => {
  const links = useState<Link[]>('links', () => [])
  const isLoading = useState<boolean>('links-loading', () => false)
  const error = useState<string | null>('links-error', () => null)

  // Load from local storage on mount
  onMounted(() => {
    const savedLinks = localStorage.getItem('link-nest-links')
    if (savedLinks) {
      try {
        links.value = JSON.parse(savedLinks)
      } catch (e) {
        console.error('Failed to parse saved links', e)
      }
    }
  })

  // Watch for changes and save to local storage
  watch(links, (newLinks) => {
    localStorage.setItem('link-nest-links', JSON.stringify(newLinks))
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
      const metadata = await fetchMetadata(url)
      const category = categorizeLink(metadata)

      // Get favicon from Google's service as a reliable fallback
      const favicon = `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=128`

      const newLink: Link = {
        id: crypto.randomUUID(),
        url: metadata.url || url,
        title: metadata.title || url,
        description: metadata.description || '',
        image: metadata.image || null,
        favicon: favicon,
        siteName: metadata.siteName || new URL(url).hostname,
        category,
        dateAdded: new Date().toISOString(),
        isFavorite: false
      }

      links.value.unshift(newLink)
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

  return {
    links,
    isLoading,
    error,
    addLink,
    removeLink,
    toggleFavorite
  }
}
