import { requireAuth } from '../../utils/auth'
import { getDb } from '../../utils/db'
import { initDatabase } from '../../utils/init-database'
import { validateRequired, handleApiError } from '../../utils/api-response'

const PREDEFINED_CATEGORIES = [
  { name: 'Development', color: '#10b981' },
  { name: 'Open Source', color: '#22c55e' },
  { name: 'Portfolio', color: '#3b82f6' },
  { name: 'Productivity', color: '#0ea5e9' },
  { name: 'Blog', color: '#8b5cf6' },
  { name: 'Design', color: '#a855f7' },
  { name: 'Tool', color: '#f59e0b' },
  { name: 'Learning', color: '#ec4899' },
  { name: 'Social', color: '#f97316' },
  { name: 'Video', color: '#ef4444' },
  { name: 'Entertainment', color: '#dc2626' },
  { name: 'Documentation', color: '#06b6d4' },
  { name: 'Shopping', color: '#84cc16' },
  { name: 'Music', color: '#d946ef' },
  { name: 'Other', color: '#6b7280' }
]

export default defineEventHandler(async (event) => {
  const method = event.method
  const path = event.path

  // Handle /api/categories/seed endpoint
  if (path.includes('/seed') && method === 'POST') {
    return await seedCategories(event)
  }

  // Extract ID from path for specific category operations
  const idMatch = path.match(/\/categories\/([^\/]+)$/)
  const categoryId = idMatch ? idMatch[1] : null

  // Route to appropriate handler
  if (!categoryId) {
    // Collection endpoints: /api/categories
    switch (method) {
      case 'GET':
        return await getCategories(event)
      case 'POST':
        return await createCategory(event)
      default:
        throw createError({ statusCode: 405, message: 'Method not allowed' })
    }
  } else {
    // Individual category endpoints: /api/categories/:id
    switch (method) {
      case 'PATCH':
        return await updateCategory(event, categoryId)
      case 'DELETE':
        return await deleteCategory(event, categoryId)
      default:
        throw createError({ statusCode: 405, message: 'Method not allowed' })
    }
  }
})

// GET /api/categories - Get all categories for user
async function getCategories(event: any) {
  const user = await requireAuth(event)
  await initDatabase()

  const pool = getDb()
  const client = await pool.connect()

  try {
    const result = await client.query(
      'SELECT id, name, color, created_at FROM categories WHERE user_id = $1 ORDER BY name ASC',
      [user.userId]
    )

    return { success: true, categories: result.rows }
  } catch (error: any) {
    console.error('❌ Error fetching categories:', error.message)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch categories'
    })
  } finally {
    client.release()
  }
}

// POST /api/categories - Create new category
async function createCategory(event: any) {
  const user = await requireAuth(event)
  await initDatabase()

  const body = await readBody(event)
  validateRequired(body, ['name', 'color'])
  
  const { name, color } = body

  // Validate color format (hex color)
  if (!/^#[0-9A-F]{6}$/i.test(color)) {
    throw createError({ statusCode: 400, message: 'Invalid color format. Use hex color (e.g., #10b981)' })
  }

  const pool = getDb()
  const client = await pool.connect()

  try {
    // Check if category already exists for this user
    const existing = await client.query(
      'SELECT id FROM categories WHERE user_id = $1 AND LOWER(name) = LOWER($2)',
      [user.userId, name]
    )

    if (existing.rows.length > 0) {
      throw createError({ statusCode: 409, message: 'Category already exists' })
    }

    // Create new category
    const result = await client.query(
      'INSERT INTO categories (user_id, name, color) VALUES ($1, $2, $3) RETURNING *',
      [user.userId, name, color]
    )

    return { success: true, category: result.rows[0] }
  } catch (error: any) {
    return handleApiError(error, 'Create category')
  } finally {
    client.release()
  }
}

// PATCH /api/categories/:id - Update category
async function updateCategory(event: any, categoryId: string) {
  const user = await requireAuth(event)

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
}

// DELETE /api/categories/:id - Delete category
async function deleteCategory(event: any, categoryId: string) {
  const user = await requireAuth(event)

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
}

// POST /api/categories/seed - Seed predefined categories
async function seedCategories(event: any) {
  const user = await requireAuth(event)
  await initDatabase()

  const pool = getDb()
  const client = await pool.connect()

  try {
    // Check if user already has categories
    const existing = await client.query(
      'SELECT COUNT(*) as count FROM categories WHERE user_id = $1',
      [user.userId]
    )

    if (parseInt(existing.rows[0].count) > 0) {
      return { success: true, message: 'Categories already exist', seeded: false }
    }

    // Insert all predefined categories
    const insertPromises = PREDEFINED_CATEGORIES.map(cat =>
      client.query(
        'INSERT INTO categories (user_id, name, color) VALUES ($1, $2, $3)',
        [user.userId, cat.name, cat.color]
      )
    )

    await Promise.all(insertPromises)

    console.log(`✅ Seeded ${PREDEFINED_CATEGORIES.length} categories for user ${user.userId}`)

    return { 
      success: true, 
      message: `Seeded ${PREDEFINED_CATEGORIES.length} categories`,
      seeded: true 
    }
  } catch (error: any) {
    console.error('❌ Error seeding categories:', error.message)
    throw createError({
      statusCode: 500,
      message: 'Failed to seed categories'
    })
  } finally {
    client.release()
  }
}

