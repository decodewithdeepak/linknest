import type { H3Event } from 'h3'

/**
 * Standard API response helpers
 */

export interface ApiSuccessResponse<T = any> {
  success: true
  data?: T
  message?: string
}

export interface ApiErrorResponse {
  success: false
  error: string
  statusCode: number
}

/**
 * Send a success response
 */
export function sendSuccess<T>(event: H3Event, data?: T, message?: string): ApiSuccessResponse<T> {
  return {
    success: true,
    ...(data && { data }),
    ...(message && { message })
  }
}

/**
 * Handle API errors consistently
 */
export function handleApiError(error: any, context?: string): never {
  console.error(`❌ API Error${context ? ` (${context})` : ''}:`, error.message || error)
  
  // If it's already an H3 error, rethrow it
  if (error.statusCode) {
    throw error
  }
  
  // Handle specific error types
  if (error.code === '23505') { // PostgreSQL unique violation
    throw createError({
      statusCode: 409,
      message: 'Resource already exists'
    })
  }
  
  if (error.code === '23503') { // PostgreSQL foreign key violation
    throw createError({
      statusCode: 400,
      message: 'Invalid reference'
    })
  }
  
  if (error.code === '23502') { // PostgreSQL not null violation
    throw createError({
      statusCode: 400,
      message: 'Required field missing'
    })
  }
  
  // Generic error
  throw createError({
    statusCode: 500,
    message: error.message || 'Internal server error'
  })
}

/**
 * Validate required fields in request body
 */
export function validateRequired(body: any, fields: string[]): void {
  const missing = fields.filter(field => !body[field])
  
  if (missing.length > 0) {
    throw createError({
      statusCode: 400,
      message: `Missing required fields: ${missing.join(', ')}`
    })
  }
}

/**
 * Wrap async handler with error handling
 */
export function withErrorHandling<T>(
  handler: (event: H3Event) => Promise<T>,
  context?: string
) {
  return async (event: H3Event): Promise<T> => {
    try {
      return await handler(event)
    } catch (error) {
      return handleApiError(error, context) as never
    }
  }
}

