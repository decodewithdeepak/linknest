# LinkNest - Smart Link Organizer

A modern, AI-powered link management application built with Nuxt 4, PostgreSQL, and Nuxt UI.

## Features

✨ **Smart Categorization** - Automatically categorizes your links using intelligent pattern matching  
🔐 **Secure Authentication** - JWT-based authentication with HTTP-only cookies  
📊 **Rich Metadata** - Fetches titles, descriptions, and images from URLs  
🎨 **Beautiful UI** - Modern, responsive design with dark mode support  
⚡ **Fast Performance** - Optimized database queries with strategic indexes  
🔍 **Search & Filter** - Find your links by title, description, or category  
⭐ **Favorites** - Mark important links for quick access  

## Tech Stack

- **Frontend**: Nuxt 4, Vue 3, TypeScript
- **UI**: Nuxt UI (Tailwind CSS)
- **Backend**: Nuxt Server API
- **Database**: PostgreSQL (NeonDB)
- **Authentication**: JWT with bcrypt password hashing
- **Metadata**: Microlink API

## Prerequisites

- Node.js 18+ 
- PostgreSQL database (we recommend [NeonDB](https://neon.tech))
- npm or pnpm

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration (REQUIRED)
DATABASE_URL=postgresql://username:password@host/database?sslmode=require

# Authentication Secret (REQUIRED)
# Generate using: openssl rand -base64 32
AUTH_SECRET=your-secure-random-secret-key-here

# Node Environment
NODE_ENV=development
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Database Schema

The application automatically creates the required tables on first run:

- **users** - User accounts with hashed passwords
- **links** - User's saved links with metadata

Indexes are automatically created for optimal performance.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login
- `GET /api/auth/session` - Get current session
- `POST /api/auth/logout` - Logout
- `POST /api/auth/change-password` - Change password

### Links
- `GET /api/links` - Get all user's links
- `POST /api/links` - Add new link
- `DELETE /api/links/:id` - Delete link
- `PATCH /api/links/:id/favorite` - Toggle favorite
- `PATCH /api/links/:id/category` - Update category

### Metadata
- `GET /api/metadata?url=<url>` - Fetch URL metadata

## Production Build

```bash
npm run build
npm run preview
```

## Deployment

The application can be deployed to any platform that supports Nuxt 4:

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)
- [DigitalOcean](https://digitalocean.com)

Make sure to set the environment variables in your deployment platform.

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT tokens with HTTP-only cookies
- ✅ SQL injection protection with parameterized queries
- ✅ CORS protection
- ✅ Secure session management

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
