import { query } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    console.log('🗑️  Clearing database...')
    
    // Drop the users table
    await query('DROP TABLE IF EXISTS users CASCADE')
    
    console.log('✅ Database cleared successfully')
    
    return {
      success: true,
      message: 'Database cleared successfully'
    }
  } catch (error: any) {
    console.error('❌ Error clearing database:', error.message)
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to clear database'
    })
  }
})

