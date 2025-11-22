import { requireAuth } from '../../utils/auth'
import { getDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const categoryId = getRouterParam(event, 'id')
  if (!categoryId) {
    throw createError({ statusCode: 400, message: 'Category ID is required' })
  }

  const body = await readBody(event)
  const { name, color } = body

  if (!name && !color) {
    throw createError({ statusCode: 400, message: 'At least one field (name or color) is required' })
  }

  // Validate color format if provided
  if (color && !/^#[0-9A-F]{6}$/i.test(color)) {
    throw createError({ statusCode: 400, message: 'Invalid color format. Use hex color (e.g., #10b981)' })
  }

  const pool = getDb()
  const client = await pool.connect()

  try {
    // Get the old category name before updating
    const oldCategory = await client.query(
      'SELECT name FROM categories WHERE id = $1 AND user_id = $2',
      [categoryId, user.userId]
    )

    if (oldCategory.rows.length === 0) {
      throw createError({ statusCode: 404, message: 'Category not found or unauthorized' })
    }

    const oldName = oldCategory.rows[0].name

    // Build update query dynamically
    const updates: string[] = []
    const values: any[] = []
    let paramCount = 1

    if (name) {
      // Check if new name already exists for this user
      const existing = await client.query(
        'SELECT id FROM categories WHERE user_id = $1 AND LOWER(name) = LOWER($2) AND id != $3',
        [user.userId, name, categoryId]
      )

      if (existing.rows.length > 0) {
        throw createError({ statusCode: 409, message: 'Category name already exists' })
      }

      updates.push(`name = $${paramCount++}`)
      values.push(name)
    }

    if (color) {
      updates.push(`color = $${paramCount++}`)
      values.push(color)
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(categoryId, user.userId)

    // Update category
    const result = await client.query(
      `UPDATE categories SET ${updates.join(', ')} WHERE id = $${paramCount++} AND user_id = $${paramCount++} RETURNING *`,
      values
    )

    // If name changed, update all links with this category
    if (name && name !== oldName) {
      await client.query(
        'UPDATE links SET category = $1 WHERE category = $2 AND user_id = $3',
        [name, oldName, user.userId]
      )
    }

    return { success: true, category: result.rows[0] }
  } catch (error: any) {
    console.error('❌ Error updating category:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to update category'
    })
  } finally {
    client.release()
  }
})

