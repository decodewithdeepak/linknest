// Enhanced categorization logic with domain intelligence and better keyword matching

// Predefined categories with colors
export const PREDEFINED_CATEGORIES = [
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
] as const

// Get icon for a category
export const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
        'Open Source': 'i-heroicons-code-bracket',
        'Portfolio': 'i-heroicons-user-circle',
        'Blog': 'i-heroicons-document-text',
        'Tool': 'i-heroicons-wrench-screwdriver',
        'Learning': 'i-heroicons-academic-cap',
        'Video': 'i-heroicons-play-circle',
        'Design': 'i-heroicons-paint-brush',
        'Development': 'i-heroicons-computer-desktop',
        'Productivity': 'i-heroicons-chart-bar',
        'Social': 'i-heroicons-user-group',
        'Entertainment': 'i-heroicons-film',
        'Documentation': 'i-heroicons-book-open',
        'Shopping': 'i-heroicons-shopping-cart',
        'Music': 'i-heroicons-musical-note',
        'Other': 'i-heroicons-folder'
    }
    return icons[category] || 'i-heroicons-folder'
}

// Get color for a category
export const getCategoryColor = (category: string, categories?: Array<{ name: string, color?: string }>): string => {
    // First, try to find in provided categories
    if (categories) {
        const cat = categories.find(c => c.name === category)
        if (cat?.color) return cat.color
    }

    // Fallback to predefined categories
    const predefined = PREDEFINED_CATEGORIES.find(c => c.name === category)
    return predefined?.color || '#6b7280' // Default gray
}

// Domain-based categorization (highest priority)
const DOMAIN_CATEGORIES: Record<string, string> = {
    // Development & Code
    'github.com': 'Open Source',
    'gitlab.com': 'Open Source',
    'bitbucket.org': 'Open Source',
    'stackoverflow.com': 'Development',
    'stackexchange.com': 'Development',
    'codepen.io': 'Development',
    'codesandbox.io': 'Development',
    'replit.com': 'Development',
    'glitch.com': 'Development',

    // Documentation
    'react.dev': 'Documentation',
    'vuejs.org': 'Documentation',
    'nextjs.org': 'Documentation',
    'nuxt.com': 'Documentation',
    'angular.io': 'Documentation',
    'svelte.dev': 'Documentation',
    'tailwindcss.com': 'Documentation',
    'nodejs.org': 'Documentation',
    'developer.mozilla.org': 'Documentation',
    'docs.': 'Documentation',
    'developer.': 'Documentation',
    'api.': 'Documentation',

    // Design
    'figma.com': 'Design',
    'dribbble.com': 'Design',
    'behance.net': 'Design',
    'awwwards.com': 'Design',
    'pinterest.com': 'Design',

    // Social Media
    'twitter.com': 'Social',
    'x.com': 'Social',
    'facebook.com': 'Social',
    'instagram.com': 'Social',
    'linkedin.com': 'Social',
    'reddit.com': 'Social',
    'discord.com': 'Social',
    'slack.com': 'Social',
    'threads.net': 'Social',
    'mastodon.': 'Social',

    // Video
    'youtube.com': 'Video',
    'youtu.be': 'Video',
    'vimeo.com': 'Video',
    'twitch.tv': 'Video',
    'tiktok.com': 'Video',

    // Learning
    'udemy.com': 'Learning',
    'coursera.org': 'Learning',
    'edx.org': 'Learning',
    'khanacademy.org': 'Learning',
    'pluralsight.com': 'Learning',
    'freecodecamp.org': 'Learning',
    'codecademy.com': 'Learning',
    'frontendmasters.com': 'Learning',
    'egghead.io': 'Learning',

    // Blogs & Articles
    'medium.com': 'Blog',
    'dev.to': 'Blog',
    'hashnode.': 'Blog',
    'substack.com': 'Blog',
    'wordpress.com': 'Blog',
    'blogger.com': 'Blog',

    // Productivity
    'notion.so': 'Productivity',
    'notion.site': 'Productivity',
    'trello.com': 'Productivity',
    'asana.com': 'Productivity',
    'monday.com': 'Productivity',
    'airtable.com': 'Productivity',
    'clickup.com': 'Productivity',

    // Entertainment
    'netflix.com': 'Entertainment',
    'hulu.com': 'Entertainment',
    'disneyplus.com': 'Entertainment',
    'primevideo.com': 'Entertainment',
    'imdb.com': 'Entertainment',

    // Music
    'spotify.com': 'Music',
    'soundcloud.com': 'Music',
    'apple.com/music': 'Music',
    'music.youtube.com': 'Music',
    'bandcamp.com': 'Music',

    // Shopping
    'amazon.com': 'Shopping',
    'ebay.com': 'Shopping',
    'etsy.com': 'Shopping',
    'shopify.com': 'Shopping',
    'aliexpress.com': 'Shopping',
}

// Keyword patterns with weighted scoring
interface CategoryPattern {
    keywords: string[]
    weight: number
}

const CATEGORY_PATTERNS: Record<string, CategoryPattern[]> = {
    'Open Source': [
        { keywords: ['github', 'gitlab', 'open source', 'repository', 'repo', 'fork', 'pull request'], weight: 10 },
        { keywords: ['contribute', 'contributor', 'oss', 'foss'], weight: 8 }
    ],
    'Development': [
        { keywords: ['code', 'programming', 'developer', 'software', 'api', 'framework', 'library'], weight: 10 },
        { keywords: ['javascript', 'python', 'react', 'vue', 'node', 'typescript', 'java', 'c++'], weight: 9 },
        { keywords: ['web development', 'frontend', 'backend', 'fullstack'], weight: 8 }
    ],
    'Documentation': [
        { keywords: ['documentation', 'docs', 'reference', 'guide', 'manual', 'api reference'], weight: 10 },
        { keywords: ['getting started', 'quickstart', 'installation'], weight: 7 }
    ],
    'Portfolio': [
        { keywords: ['portfolio', 'resume', 'cv', 'personal website', 'about me'], weight: 10 },
        { keywords: ['work', 'projects', 'experience'], weight: 6 }
    ],
    'Blog': [
        { keywords: ['blog', 'article', 'post', 'writing', 'author'], weight: 10 },
        { keywords: ['read', 'story', 'opinion', 'thoughts'], weight: 6 }
    ],
    'Tool': [
        { keywords: ['tool', 'utility', 'generator', 'converter', 'calculator'], weight: 10 },
        { keywords: ['online', 'free tool', 'web tool'], weight: 7 }
    ],
    'Learning': [
        { keywords: ['course', 'tutorial', 'learn', 'education', 'training', 'lesson'], weight: 10 },
        { keywords: ['beginner', 'advanced', 'workshop', 'bootcamp'], weight: 8 }
    ],
    'Video': [
        { keywords: ['video', 'watch', 'stream', 'streaming', 'live'], weight: 10 },
        { keywords: ['channel', 'subscribe', 'playlist'], weight: 7 }
    ],
    'Design': [
        { keywords: ['design', 'ui', 'ux', 'interface', 'user experience'], weight: 10 },
        { keywords: ['mockup', 'wireframe', 'prototype', 'sketch'], weight: 8 },
        { keywords: ['color', 'typography', 'layout', 'visual'], weight: 6 }
    ],
    'Productivity': [
        { keywords: ['productivity', 'task', 'project management', 'organize', 'workflow'], weight: 10 },
        { keywords: ['notes', 'todo', 'planner', 'calendar'], weight: 8 }
    ],
    'Social': [
        { keywords: ['social', 'community', 'network', 'connect', 'share'], weight: 10 },
        { keywords: ['follow', 'followers', 'profile', 'feed'], weight: 7 }
    ],
    'Entertainment': [
        { keywords: ['entertainment', 'movie', 'show', 'series', 'film'], weight: 10 },
        { keywords: ['watch', 'streaming', 'tv'], weight: 6 }
    ],
    'Music': [
        { keywords: ['music', 'song', 'album', 'artist', 'playlist'], weight: 10 },
        { keywords: ['listen', 'audio', 'sound', 'track'], weight: 7 }
    ],
    'Shopping': [
        { keywords: ['shop', 'buy', 'store', 'product', 'purchase'], weight: 10 },
        { keywords: ['cart', 'checkout', 'price', 'sale'], weight: 8 }
    ]
}

// Extract domain from URL
const extractDomain = (url: string): string => {
    try {
        const urlObj = new URL(url)
        return urlObj.hostname.replace('www.', '')
    } catch {
        return ''
    }
}

// Check domain-based categorization
const categorizByDomain = (url: string): string | null => {
    const domain = extractDomain(url)

    // Exact domain match
    if (DOMAIN_CATEGORIES[domain]) {
        return DOMAIN_CATEGORIES[domain]
    }

    // Partial domain match (e.g., "docs." matches "docs.react.dev")
    for (const [pattern, category] of Object.entries(DOMAIN_CATEGORIES)) {
        if (domain.includes(pattern)) {
            return category
        }
    }

    return null
}

// Score-based keyword categorization
const categorizeByKeywords = (text: string): string => {
    const scores: Record<string, number> = {}

    for (const [category, patterns] of Object.entries(CATEGORY_PATTERNS)) {
        let score = 0

        for (const pattern of patterns) {
            for (const keyword of pattern.keywords) {
                if (text.includes(keyword)) {
                    score += pattern.weight
                }
            }
        }

        if (score > 0) {
            scores[category] = score
        }
    }

    // Return category with highest score
    const entries = Object.entries(scores)
    if (entries.length === 0) return 'Other'

    entries.sort((a, b) => b[1] - a[1])
    return entries[0]?.[0] || 'Other'
}

// Main categorization function
export const categorizeLink = (metadata: any): string => {
    const { title = '', description = '', siteName = '', url = '' } = metadata

    // 1. Try domain-based categorization first (highest confidence)
    const domainCategory = categorizByDomain(url)
    if (domainCategory) {
        return domainCategory
    }

    // 2. Fall back to keyword-based categorization with scoring
    const text = `${title} ${description} ${siteName} ${url}`.toLowerCase()
    return categorizeByKeywords(text)
}

// Get categorization confidence (0-100)
export const getCategorizationConfidence = (metadata: any, category: string): number => {
    const { url = '' } = metadata

    // Domain-based = 95% confidence
    if (categorizByDomain(url) === category) {
        return 95
    }

    // Keyword-based = 60-80% confidence based on score
    const text = `${metadata.title} ${metadata.description} ${metadata.siteName} ${url}`.toLowerCase()
    const patterns = CATEGORY_PATTERNS[category] || []

    let matchCount = 0
    let totalKeywords = 0

    for (const pattern of patterns) {
        totalKeywords += pattern.keywords.length
        for (const keyword of pattern.keywords) {
            if (text.includes(keyword)) {
                matchCount++
            }
        }
    }

    if (totalKeywords === 0) return 50

    const matchRatio = matchCount / totalKeywords
    return Math.min(80, Math.max(50, Math.round(matchRatio * 100)))
}

