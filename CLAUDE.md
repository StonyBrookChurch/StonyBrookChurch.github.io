# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands are run from the root of the project:

- `npm install` - Install dependencies
- `npm run dev` - Start local dev server at `localhost:4321`
- `npm run build` - Build production site to `./dist/`
- `npm run preview` - Preview build locally before deploying
- `npm run astro` - Run Astro CLI commands (e.g., `npm run astro check`)

## Architecture Overview

This is a static church website built with Astro 5, featuring content from multiple external sources (Ghost CMS, Vimeo, Planning Center).

### Content Sources

The site integrates with three main external APIs:

1. **Ghost CMS** (`src/lib/ghost.ts`) - Blog posts and articles
   - Fetches posts via `@tryghost/content-api`
   - Requires `GHOST_URL` and `GHOST_API_KEY` environment variables
   - Blog posts are rendered at `/blog/[year]/[month]/[slug]` using date-based permalinks
   - Featured posts are displayed on the home page (limit: 2)

2. **Vimeo** (`src/utils/getLatestMessages.js`) - Sermon/message videos
   - Fetches videos from Vimeo showcases (albums)
   - Requires `VIMEO_URL` and `VIMEO_ACCESS_TOKEN` environment variables
   - Messages are organized by year using the `showcases` content collection
   - Video descriptions follow format: `title\ndescription\nseries` (newline-separated)
   - Video names are parsed for dates in format: `M.D.YYYY` or `M-D-YYYY`

3. **Planning Center** (`src/utils/getLatestEvents.js`) - Church events
   - Fetches events via Planning Center Online Calendar API
   - Requires `PLANNING_CENTER_URL`, `CHURCH_CENTER_USERNAME`, and `CHURCH_CENTER_PASSWORD` environment variables
   - Uses Basic Auth with base64-encoded credentials
   - Events are filtered by tags and date ranges
   - All times are converted to America/Chicago timezone

### Content Collections

The site uses Astro's Content Layer API (glob loader) for local content:

- **ministries** - Ministry pages (Kids, Youth, Women, Men, Life, Worship, Preaching, Missions)
- **about** - About section pages (What we believe, Our story, Meet the pastor, Staff, Leadership, USMB)
- **staff** - Staff member profiles with name, description, and image
- **leaders** - Leadership profiles with name, description, and image
- **showcases** - Vimeo showcase IDs mapped to years for message archives

All content collections are defined in `src/content.config.ts` using the glob loader pattern `**/[^_]*.{md,mdx}`.

### Path Aliases

TypeScript path aliases are configured in `tsconfig.json`:

- `@assets/*` → `src/assets/*`
- `@consts` → `src/consts`
- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`
- `@styles/*` → `src/styles/*`
- `@utils/*` → `src/utils/*`
- `@lib/*` → `src/lib/*`

### Site Configuration

Global constants are defined in `src/consts.ts`:

- Site metadata (title, description, contact info)
- Navigation structure with dropdown menus
- Social media links
- Vimeo showcase configuration
- Church Center app URLs

### Build Configuration

The site is configured to:

- Build with file-based routing (`format: 'file'`)
- Inline all stylesheets (`inlineStylesheets: 'always'`)
- Exclude specific paths from sitemap (leaders, staff, give, prayer, connect, special-events, events/calendar)
- Use Luxon for date/time handling (timezone: America/Chicago)

### Key Utilities

- `src/utils/permalink.ts` - Generates date-based permalinks for Ghost posts (supports `:year`, `:month`, `:day`, `:hour`, `:minute`, `:second`, `:author`, `:slug`)
- `src/utils/getFeaturedPosts.ts` - Fetches featured blog posts from Ghost (limit: 2)
- `src/utils/getLatestMessages.js` - Fetches latest sermon videos from Vimeo (combines current and previous year if needed)
- `src/utils/getLatestMessage.js` - Fetches the most recent sermon video
- `src/utils/getLatestEvents.js` - Fetches upcoming events from Planning Center by tag and date range

### Environment Variables Required

Create a `.env` file with:

```
GHOST_URL=
GHOST_API_KEY=
VIMEO_URL=https://api.vimeo.com
VIMEO_ACCESS_TOKEN=
PLANNING_CENTER_URL=https://api.planningcenteronline.com
CHURCH_CENTER_USERNAME=
CHURCH_CENTER_PASSWORD=
```