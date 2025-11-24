import { requireAuth } from '../../utils/auth'
import { getDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  const categoryId = getRouterParam(event, 'id')
  if (!categoryId) {
    throw createError({ statusCode: 400, message: 'Category ID is required' })
  }

  const pool = getDb()
  const client = await pool.connect()

  try {
    // Get the category name before deleting
    const category = await client.query(
      'SELECT name FROM categories WHERE id = $1 AND user_id = $2',
      [categoryId, user.userId]
    )

    if (category.rows.length === 0) {
      throw createError({ statusCode: 404, message: 'Category not found or unauthorized' })
    }

    const categoryName = category.rows[0].name

    // Move all links with this category to "Other"
    await client.query(
      'UPDATE links SET category = $1 WHERE category = $2 AND user_id = $3',
      ['Other', categoryName, user.userId]
    )

    // Delete the category
    await client.query(
      'DELETE FROM categories WHERE id = $1 AND user_id = $2',
      [categoryId, user.userId]
    )

    return { success: true, message: 'Category deleted successfully' }
  } catch (error: any) {
    console.error('❌ Error deleting category:', error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to delete category'
    })
  } finally {
    client.release()
  }
})

