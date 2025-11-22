import { defineEventHandler, getQuery, createError } from 'h3'
// Note: cheerio is installed but not used here. We use Microlink.io API instead
// because it handles JavaScript-rendered sites (like Dribbble, Behance) that 
// cheerio cannot scrape properly. Cheerio only parses static HTML.

interface MicrolinkResponse {
  status: string
  data?: {
    title?: string
    description?: string
    image?: {
      url?: string
    }
    logo?: {
      url?: string
    }
    publisher?: string
    url?: string
  }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const targetUrl = query.url as string

  if (!targetUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: 'URL is required',
    })
  }

  try {
    // Use Microlink.io API - it handles JS-rendered sites perfectly
    const response = await $fetch<MicrolinkResponse>(`https://api.microlink.io/?url=${encodeURIComponent(targetUrl)}`, {
      timeout: 10000
    })

    if (response.status === 'success' && response.data) {
      const data = response.data
      
      return {
        title: data.title || new URL(targetUrl).hostname,
        description: data.description || '',
        image: data.image?.url || data.logo?.url || '',
        siteName: data.publisher || new URL(targetUrl).hostname.replace('www.', ''),
        url: data.url || targetUrl
      }
    } else {
      throw new Error('Microlink API returned unsuccessful status')
    }

  } catch (error) {
    console.error('Metadata fetch error:', error)
    
    // Fallback: return basic info from URL
    const urlObj = new URL(targetUrl)
    return {
      title: urlObj.hostname.replace('www.', ''),
      description: 'No description available',
      image: '',
      siteName: urlObj.hostname.replace('www.', ''),
      url: targetUrl
    }
  }
})

