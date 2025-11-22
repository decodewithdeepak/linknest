import { requireAuth } from '../../../utils/auth'
import { getDb } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const linkId = getRouterParam(event, 'id')
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
})

