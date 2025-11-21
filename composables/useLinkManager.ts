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
      const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`)
      const data = await response.json()
      
      if (data.status === 'success') {
        return data.data
      } else {
        throw new Error('Failed to fetch metadata')
      }
    } catch (err) {
      console.error('Metadata fetch error:', err)
      throw err
    }
  }

  const categorizeLink = (metadata: any): string => {
    const { title, description, publisher, url } = metadata
    const text = `${title} ${description} ${publisher} ${url}`.toLowerCase()
    
    // Simple keyword-based categorization (simulating AI)
    if (text.includes('github') || text.includes('gitlab') || text.includes('repo') || text.includes('open source')) {
      return 'Open Source'
    }
    if (text.includes('portfolio') || text.includes('resume') || text.includes('cv') || text.includes('personal website')) {
      return 'Portfolio'
    }
    if (text.includes('blog') || text.includes('article') || text.includes('medium') || text.includes('dev.to')) {
      return 'Blog'
    }
    if (text.includes('tool') || text.includes('utility') || text.includes('generator') || text.includes('converter')) {
      return 'Tool'
    }
    if (text.includes('learn') || text.includes('course') || text.includes('tutorial') || text.includes('docs')) {
      return 'Learning'
    }
    if (text.includes('youtube') || text.includes('video') || text.includes('stream')) {
      return 'Video'
    }
    if (text.includes('design') || text.includes('ui') || text.includes('ux') || text.includes('figma')) {
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

      const newLink: Link = {
        id: crypto.randomUUID(),
        url: metadata.url || url,
        title: metadata.title || url,
        description: metadata.description || '',
        image: metadata.image?.url || null,
        favicon: metadata.logo?.url || null,
        siteName: metadata.publisher || new URL(url).hostname,
        category,
        dateAdded: new Date().toISOString()
      }

      links.value.unshift(newLink)
    } catch (err) {
      error.value = 'Failed to fetch link details. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  const removeLink = (id: string) => {
    links.value = links.value.filter(l => l.id !== id)
  }

  return {
    links,
    isLoading,
    error,
    addLink,
    removeLink
  }
}
