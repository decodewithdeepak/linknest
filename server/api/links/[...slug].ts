import { requireAuth } from '../../utils/auth'
import { validateUrl } from '../../utils/validation'
import { getDb, query } from '../../utils/db'
import { initDatabase } from '../../utils/init-database'

export default defineEventHandler(async (event) => {
  const method = event.method
  const path = event.path

  // Extract ID from path for specific link operations
  const idMatch = path.match(/\/links\/([^\/]+)/)
  const linkId = idMatch ? idMatch[1] : null

  // Route to appropriate handler
  if (!linkId) {
    // Collection endpoints: /api/links
    switch (method) {
      case 'GET':
        return await getLinks(event)
      case 'POST':
        return await createLink(event)
      default:
        throw createError({ statusCode: 405, message: 'Method not allowed' })
    }
  } else {
    // Individual link endpoints: /api/links/:id/*
    if (path.includes('/category')) {
      return await updateLinkCategory(event, linkId)
    } else if (path.includes('/favorite')) {
      return await updateLinkFavorite(event, linkId)
    } else if (path.includes('/refresh')) {
      return await refreshLink(event, linkId)
    } else {
      // /api/links/:id
      switch (method) {
        case 'DELETE':
          return await deleteLink(event, linkId)
        default:
          throw createError({ statusCode: 405, message: 'Method not allowed' })
      }
    }
  }
})

// GET /api/links - Get all links for user
async function getLinks(event: any) {
  try {
    const user = await requireAuth(event)

    // Get user's links
    const result = await query(
      `SELECT id, url, title, description, image, category, is_favorite, created_at 
       FROM links 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [user.userId]
    )

    return {
      success: true,
      links: result.rows
    }
  } catch (error: any) {
    console.error('❌ Error fetching links:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch links'
    })
  }
}

// POST /api/links - Create new link
async function createLink(event: any) {
  const user = await requireAuth(event)
  
  // Ensure links table exists
  await initDatabase()

  const body = await readBody(event)
  let { url, title, description, image, category } = body

  // Validate and sanitize URL
  url = validateUrl(url)

  const pool = getDb()
  const client = await pool.connect()

  try {
    // Check if link already exists for this user
    const existingLink = await client.query(
      'SELECT id FROM links WHERE user_id = $1 AND url = $2',
      [user.userId, url]
    )

    if (existingLink.rows.length > 0) {
      throw createError({ statusCode: 400, message: 'Link already exists' })
    }

    // Insert new link
    const result = await client.query(
      'INSERT INTO links (user_id, url, title, description, image, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user.userId, url, title || url, description || '', image, category || 'Other']
    )

    return { success: true, link: result.rows[0] }
  } catch (error: any) {
    console.error('❌ Error adding link:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to add link'
    })
  } finally {
    client.release()
  }
}

// DELETE /api/links/:id - Delete link
async function deleteLink(event: any, linkId: string) {
  const user = await requireAuth(event)

  if (!linkId) {
    throw createError({ statusCode: 400, message: 'Link ID is required' })
  }

  const pool = getDb()
  const client = await pool.connect()

  try {
    // Delete link (only if it belongs to the user)
    const result = await client.query(
      'DELETE FROM links WHERE id = $1 AND user_id = $2 RETURNING id',
      [linkId, user.userId]
    )

    if (result.rows.length === 0) {
      throw createError({ statusCode: 404, message: 'Link not found or unauthorized' })
    }

    return { success: true, message: 'Link deleted successfully' }
  } catch (error: any) {
    console.error('❌ Error deleting link:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to delete link'
    })
  } finally {
    client.release()
  }
}

// PATCH /api/links/:id/category - Update link category
async function updateLinkCategory(event: any, linkId: string) {
  const user = await requireAuth(event)

  if (!linkId) {
    throw createError({ statusCode: 400, message: 'Link ID is required' })
  }

  const body = await readBody(event)
  const { category } = body

  if (!category) {
    throw createError({ statusCode: 400, message: 'Category is required' })
  }

  const pool = getDb()
  const client = await pool.connect()

  try {
    // Update category (only if it belongs to the user)
    const result = await client.query(
      'UPDATE links SET category = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [category, linkId, user.userId]
    )

    if (result.rows.length === 0) {
      throw createError({ statusCode: 404, message: 'Link not found or unauthorized' })
    }

    return { success: true, link: result.rows[0] }
  } catch (error: any) {
    console.error('❌ Error updating category:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to update category'
    })
  } finally {
    client.release()
  }
}

// PATCH /api/links/:id/favorite - Update link favorite status
async function updateLinkFavorite(event: any, linkId: string) {
  const user = await requireAuth(event)

  if (!linkId) {
    throw createError({ statusCode: 400, message: 'Link ID is required' })
  }

  const body = await readBody(event)
  const { isFavorite } = body

  const pool = getDb()
  const client = await pool.connect()

  try {
    // Update favorite status (only if it belongs to the user)
    const result = await client.query(
      'UPDATE links SET is_favorite = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [isFavorite, linkId, user.userId]
    )

    if (result.rows.length === 0) {
      throw createError({ statusCode: 404, message: 'Link not found or unauthorized' })
    }

    return { success: true, link: result.rows[0] }
  } catch (error: any) {
    console.error('❌ Error updating favorite status:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to update favorite status'
    })
  } finally {
    client.release()
  }
}

// PATCH /api/links/:id/refresh - Refresh link metadata
async function refreshLink(event: any, linkId: string) {
  const user = await requireAuth(event)

  if (!linkId) {
    throw createError({ statusCode: 400, message: 'Link ID is required' })
  }

  const pool = getDb()
  const client = await pool.connect()

  try {
    // Get the current link
    const linkResult = await client.query(
      'SELECT * FROM links WHERE id = $1 AND user_id = $2',
      [linkId, user.userId]
    )

    if (linkResult.rows.length === 0) {
      throw createError({ statusCode: 404, message: 'Link not found or unauthorized' })
    }

    const currentLink = linkResult.rows[0]

    // Fetch fresh metadata from Microlink API
    let metadata: any = {}
    try {
      const response = await $fetch(`https://api.microlink.io`, {
        params: {
          url: currentLink.url,
          screenshot: false,
          video: false,
          audio: false
        }
      })

      if (response && typeof response === 'object' && 'data' in response) {
        const data = (response as any).data
        metadata = {
          title: data.title || currentLink.title,
          description: data.description || currentLink.description,
          image: data.image?.url || data.logo?.url || currentLink.image
        }
      }
    } catch (error) {
      console.error('❌ Microlink API error:', error)
      // If metadata fetch fails, keep existing data
      metadata = {
        title: currentLink.title,
        description: currentLink.description,
        image: currentLink.image
      }
    }

    // Update link with fresh metadata
    const result = await client.query(
      `UPDATE links 
       SET title = $1, description = $2, image = $3, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $4 AND user_id = $5 
       RETURNING *`,
      [metadata.title, metadata.description, metadata.image, linkId, user.userId]
    )

    console.log(`✅ Refreshed metadata for link ${linkId}`)

    return { success: true, link: result.rows[0] }
  } catch (error: any) {
    console.error('❌ Error refreshing link:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to refresh link'
    })
  } finally {
    client.release()
  }
}

