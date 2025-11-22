import { defineEventHandler, getQuery, createError } from 'h3'
import * as cheerio from 'cheerio'

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
    // 1. Fetch the HTML content
    // We need a User-Agent so some sites don't block us (thinking we are a bot)
    const html = await $fetch<string>(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkNest/1.0; +http://localhost:3000)'
      }
    })

    // 2. Load HTML into Cheerio
    const $ = cheerio.load(html)

    // 3. Extract Metadata
    // We look for Open Graph tags first, then fallback to standard tags
    
    const title = 
      $('meta[property="og:title"]').attr('content') || 
      $('title').text() || 
      ''

    const description = 
      $('meta[property="og:description"]').attr('content') || 
      $('meta[name="description"]').attr('content') || 
      ''

    const image = 
      $('meta[property="og:image"]').attr('content') || 
      $('meta[name="twitter:image"]').attr('content') || 
      ''

    const siteName = 
      $('meta[property="og:site_name"]').attr('content') || 
      new URL(targetUrl).hostname.replace('www.', '')

    return {
      title: title.trim(),
      description: description.trim(),
      image,
      siteName: siteName.trim(),
      url: targetUrl
    }

  } catch (error) {
    console.error('Metadata fetch error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch metadata for this URL',
    })
  }
})

