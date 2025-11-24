# LinkNest - More than a Bookmark

## The Idea

I wanted to build a link organizer that actually saves time instead of creating more work. Most bookmark managers require you to manually categorize and tag everything. I thought - why not make it automatic? Just paste a link and let the app handle the rest.

## What It Does

LinkNest is a smart link manager that:
- Automatically fetches title, description, and images from any URL
- Categorizes links based on their content (GitHub repos, blogs, videos, etc.)
- Lets you search, filter, and favorite links
- Works with a clean, modern interface

## How I Built It

### Tech Stack
- **Frontend**: Nuxt 4 + Vue 3 + TypeScript
- **UI**: Nuxt UI (Tailwind CSS)
- **Backend**: Nuxt Server API
- **Database**: PostgreSQL (NeonDB)
- **Auth**: JWT with bcrypt

### Key Features Implementation

**1. Automatic Metadata Fetching**
- Used Microlink API to scrape link metadata (title, description, images)
- Handles JavaScript-rendered sites that simple HTML parsers can't
- Falls back to basic info if scraping fails

**2. Smart Categorization**
- Keyword-based pattern matching on URL and metadata
- Automatically sorts links into categories like "Open Source", "Blog", "Video", etc.
- Users can also create custom categories with custom colors

**3. Authentication**
- JWT tokens stored in HTTP-only cookies
- Passwords hashed with bcrypt
- Global middleware protects dashboard routes

**4. Database Design**
- Two main tables: `users` and `links`
- Links tied to user accounts with foreign keys
- Indexed queries for fast searching

**5. UI/UX**
- Responsive design (mobile + desktop)
- Dark mode support
- Search and filter functionality
- Drag-and-drop friendly input

## Challenges

- **Metadata scraping**: Initially tried Cheerio but it doesn't work with JavaScript-rendered sites. Switched to Microlink API.
- **Categorization**: Kept it simple with keyword matching instead of overcomplicating with ML.
- **Performance**: Added database indexes to keep queries fast even with many links.

## What I Learned

- How to build a full-stack app with Nuxt 4's new server API
- Working with PostgreSQL and managing database connections
- Implementing JWT authentication properly
- Making automatic categorization that actually works

## Future Ideas

- Browser extension for one-click saving
- Sharing links with other users
- Better categorization with ML
- Import from browser bookmarks

