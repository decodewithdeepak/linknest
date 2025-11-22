import { hash } from 'bcrypt-ts'
import { query } from '../../utils/db'
import { initDatabase } from '../../utils/init-db'
import { initLinksTable } from '../../utils/init-links-table'

export default defineEventHandler(async (event) => {
  try {
    console.log('🌱 Seeding database...')
    
    // Initialize database (create tables)
    await initDatabase()
    await initLinksTable()
    
    // Hash password
    const hashedPassword = await hash('LinkNest@8676', 10)
    
    // Create user
    const userResult = await query(
      'INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING id, email, name',
      ['deepakmodi8676@gmail.com', 'Deepak Modi', hashedPassword]
    )
    
    const user = userResult.rows[0]
    console.log('✅ Created user:', user.email)
    
    // Real links with categories
    const linksToAdd = [
      // Development
      { url: 'https://github.com', category: 'Development' },
      { url: 'https://stackoverflow.com', category: 'Development' },
      { url: 'https://developer.mozilla.org', category: 'Development' },
      { url: 'https://nodejs.org', category: 'Development' },
      
      // Design
      { url: 'https://dribbble.com', category: 'Design' },
      { url: 'https://behance.net', category: 'Design' },
      { url: 'https://figma.com', category: 'Design' },
      
      // Productivity
      { url: 'https://notion.so', category: 'Productivity' },
      { url: 'https://trello.com', category: 'Productivity' },
      { url: 'https://todoist.com', category: 'Productivity' },
      
      // Learning
      { url: 'https://youtube.com', category: 'Learning' },
      { url: 'https://coursera.org', category: 'Learning' },
      { url: 'https://udemy.com', category: 'Learning' },
      
      // Social
      { url: 'https://twitter.com', category: 'Social' },
      { url: 'https://linkedin.com', category: 'Social' },
      { url: 'https://reddit.com', category: 'Social' },
      
      // Entertainment
      { url: 'https://netflix.com', category: 'Entertainment' },
      { url: 'https://spotify.com', category: 'Entertainment' },
      
      // Tools
      { url: 'https://vercel.com', category: 'Tools' },
      { url: 'https://railway.app', category: 'Tools' },
    ]
    
    console.log('📦 Fetching metadata for links...')
    
    // Fetch metadata and insert links
    for (const link of linksToAdd) {
      try {
        // Fetch metadata from microlink API
        const metadataResponse = await fetch(
          `https://api.microlink.io?url=${encodeURIComponent(link.url)}`
        )
        const metadata = await metadataResponse.json()
        
        if (metadata.status === 'success') {
          const data = metadata.data
          
          await query(
            `INSERT INTO links (user_id, url, title, description, image, category, is_favorite) 
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
              user.id,
              link.url,
              data.title || link.url,
              data.description || '',
              data.image?.url || data.logo?.url || '',
              link.category,
              false
            ]
          )
          
          console.log(`  ✅ Added: ${data.title || link.url}`)
        }
      } catch (error) {
        console.log(`  ⚠️  Failed to fetch metadata for ${link.url}, adding without metadata`)
        // Add link without metadata if fetch fails
        await query(
          `INSERT INTO links (user_id, url, title, description, image, category, is_favorite) 
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [user.id, link.url, link.url, '', '', link.category, false]
        )
      }
    }
    
    const linksCount = await query('SELECT COUNT(*) FROM links WHERE user_id = $1', [user.id])
    
    return {
      success: true,
      message: 'Database seeded successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      stats: {
        linksAdded: linksCount.rows[0].count
      }
    }
  } catch (error: any) {
    console.error('❌ Error seeding database:', error.message)
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to seed database'
    })
  }
})
