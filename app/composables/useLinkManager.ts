import type { Link } from "../../types/link"
import { categorizeLink } from "../utils/categories"

export const useLinkManager = () => {
  const links = useState<Link[]>("links", () => [])
  const isLoading = useState<boolean>("links-loading", () => false)
  const error = useState<string | null>("links-error", () => null)

  // Load links from database on mount
  onMounted(async () => {
    await fetchLinks()
  })

  const fetchLinks = async () => {
    try {
      const response: any = await $fetch('/api/links')
      if (response.success && response.links) {
        // Transform database links to match the Link interface
        links.value = response.links.map((dbLink: any) => ({
          id: dbLink.id.toString(),
          url: dbLink.url,
          title: dbLink.title || dbLink.url,
          description: dbLink.description || '',
          image: dbLink.image || null,
          favicon: `https://www.google.com/s2/favicons?domain=${new URL(dbLink.url).hostname}&sz=128`,
          siteName: new URL(dbLink.url).hostname,
          category: dbLink.category || 'Other',
          dateAdded: dbLink.created_at,
          isFavorite: dbLink.is_favorite || false,
        }))
        console.log(`✅ Loaded ${links.value.length} links from database`)
      }
    } catch (e) {
      console.error("Failed to load links from database:", e)
      error.value = "Failed to load links"
    }
  }

  const fetchMetadata = async (url: string) => {
    try {
      const data = await $fetch("/api/metadata", {
        params: { url },
      })
      return data
    } catch (err) {
      console.error("Metadata fetch error:", err)
      throw err
    }
  }

  const addLink = async (
    url: string,
    customTitle?: string,
    customDescription?: string,
    customCategory?: string
  ) => {
    if (!url) {
      error.value = "URL is required"
      return
    }

    isLoading.value = true
    error.value = null

    try {
      // Fetch metadata
      const metadata: any = await fetchMetadata(url)

      // Use custom values or fallback to metadata
      const title = customTitle || metadata.title || url
      const description = customDescription || metadata.description || ""
      const image = metadata.image || null
      const category = customCategory || categorizeLink(metadata)

      // Save to database
      const response: any = await $fetch('/api/links', {
        method: 'POST',
        body: {
          url,
          title,
          description,
          image,
          category
        }
      })

      if (response.success && response.link) {
        // Add to local state
        const newLink: Link = {
          id: response.link.id.toString(),
          url: response.link.url,
          title: response.link.title,
          description: response.link.description || '',
          image: response.link.image || null,
          favicon: `https://www.google.com/s2/favicons?domain=${new URL(response.link.url).hostname}&sz=128`,
          siteName: new URL(response.link.url).hostname,
          category: response.link.category,
          dateAdded: response.link.created_at,
          isFavorite: response.link.is_favorite || false,
        }
        links.value.unshift(newLink)
        console.log(`✅ Added link: ${title}`)
      }
    } catch (err: any) {
      console.error("Failed to add link:", err)
      error.value = err.message || "Failed to add link"
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const removeLink = async (id: string) => {
    try {
      await $fetch(`/api/links/${id}`, {
        method: 'DELETE'
      })
      links.value = links.value.filter((l) => l.id !== id)
      console.log(`✅ Removed link: ${id}`)
    } catch (err) {
      console.error('Failed to delete link:', err)
      error.value = 'Failed to delete link'
    }
  }

  const toggleFavorite = async (id: string) => {
    const link = links.value.find((l) => l.id === id)
    if (link) {
      const newFavoriteState = !link.isFavorite
      try {
        await $fetch(`/api/links/${id}/favorite`, {
          method: 'PATCH',
          body: { isFavorite: newFavoriteState }
        })
        link.isFavorite = newFavoriteState
        console.log(`✅ Toggled favorite for link: ${id}`)
      } catch (err) {
        console.error('Failed to toggle favorite:', err)
        error.value = 'Failed to update favorite status'
      }
    }
  }

  const updateLinkCategory = async (linkId: string, newCategory: string) => {
    const link = links.value.find((l) => l.id === linkId)
    if (link) {
      try {
        await $fetch(`/api/links/${linkId}/category`, {
          method: 'PATCH',
          body: { category: newCategory }
        })
        link.category = newCategory
        console.log(`✅ Updated category for link: ${linkId}`)
      } catch (err) {
        console.error('Failed to update category:', err)
        error.value = 'Failed to update category'
      }
    }
  }

  const refreshLink = async (linkId: string) => {
    const link = links.value.find((l) => l.id === linkId)
    if (link) {
      try {
        const response: any = await $fetch(`/api/links/${linkId}/refresh`, {
          method: 'PATCH'
        })
        
        if (response.success && response.link) {
          // Update the link with fresh metadata
          link.title = response.link.title
          link.description = response.link.description
          link.image = response.link.image
          console.log(`✅ Refreshed metadata for link: ${linkId}`)
          return true
        }
        return false
      } catch (err) {
        console.error('Failed to refresh link:', err)
        error.value = 'Failed to refresh link'
        return false
      }
    }
    return false
  }

  return {
    links,
    isLoading,
    error,
    fetchLinks,
    addLink,
    removeLink,
    toggleFavorite,
    updateLinkCategory,
    refreshLink
  }
}
