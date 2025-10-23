<!-- 1695631d-16fb-4ff3-86a1-043d2e4b7f3c 6be88cd3-35a5-45b7-9540-3e795db4c10e -->
# Sanity CMS Integration Plan

## Overview

Integrate Sanity headless CMS to enable non-technical users to manage blog content through an intuitive dashboard, while maintaining existing markdown support during transition. The Studio will be self-hosted at `/studio` route with webhook-triggered Vercel deployments.

## Implementation Steps

### 1. Install Dependencies and Setup Sanity Project

- Install `@sanity/client`, `next-sanity`, `@sanity/vision`, `@sanity/image-url`, and `sanity` packages
- Initialize Sanity project configuration with schema definitions
- Create `.env.local` with Sanity project ID, dataset, and API token

### 2. Define Sanity Schemas

Create schemas matching current blog structure:

- **Blog Post Schema**: title, slug, date, author (reference), excerpt, content (portable text), tags, categories, coverImage (with support for both Sanity images and external URLs), published status
- **Author Schema**: name, slug, bio, avatar (with support for both Sanity images and external URLs), social links (email, linkedin, github, website)
- **Category Schema**: name, slug, description
- **Tag Schema**: name, slug

### 3. Configure Sanity Studio

- Create `sanity.config.ts` with project configuration
- Set up Studio at `/src/app/studio/[[...index]]/page.tsx` route
- Configure custom branding to match site's blue/cyan theme
- Add vision plugin for GROQ query testing
- Customize Studio appearance (logo, colors) to match existing design

### 4. Update Blog Data Layer (`src/lib/blog.ts`)

Modify to support **dual mode** - both markdown and Sanity:

- Keep all existing markdown functions intact
- Add new Sanity client functions: `getSanityPosts()`, `getSanityPostBySlug()`, `getSanityAuthors()`, etc.
- Create unified functions that merge results from both sources: `getAllPosts()` returns markdown + Sanity posts combined
- Ensure Sanity posts use `@portabletext/react` for rendering rich content
- Maintain backward compatibility with existing markdown blog posts

### 5. Create Sanity Utilities

- `src/lib/sanity.client.ts`: Configure Sanity client with CDN/preview modes
- `src/lib/sanity.queries.ts`: Define GROQ queries for posts, authors, categories, tags
- `src/lib/sanity.image.ts`: Image URL builder supporting both Sanity CDN optimization and external URLs

### 6. Update Components for Portable Text

- Modify blog rendering components to handle both markdown HTML and Sanity Portable Text
- Create `src/components/blog/PortableTextRenderer.tsx` with custom serializers matching current styling (code blocks, headings, links, etc.)
- Ensure consistent styling between markdown and Sanity content using existing CSS classes

### 7. Configure Vercel Webhook

- Create API route `src/app/api/revalidate/route.ts` to handle Sanity webhooks
- Add webhook secret validation
- Implement on-demand ISR revalidation for blog routes
- Document webhook URL format: `https://your-domain.com/api/revalidate?secret=YOUR_SECRET`
- Add instructions to configure webhook in Sanity project settings

### 8. Environment Variables Setup

Update `.env.local` and document in `GITHUB_SECRETS.md`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN= (for webhook revalidation)
SANITY_WEBHOOK_SECRET= (for webhook validation)
```

### 9. Update .gitignore

Add Sanity-specific ignores if needed (Studio build artifacts)

### 10. Testing and Validation

- Verify Studio loads at `/studio` route
- Test creating/editing blog posts and authors in Studio
- Confirm both markdown and Sanity posts display correctly on blog pages
- Validate webhook triggers revalidation
- Test image handling for both Sanity CDN and external URLs
- Ensure all existing functionality remains intact

## Key Technical Details

**Files to Create:**

- `sanity.config.ts` - Sanity project configuration
- `sanity.cli.ts` - Sanity CLI configuration
- `src/app/studio/[[...index]]/page.tsx` - Studio route
- `src/lib/sanity.client.ts` - Sanity client setup
- `src/lib/sanity.queries.ts` - GROQ queries
- `src/lib/sanity.image.ts` - Image URL builder
- `src/schemas/` - Schema definitions (blog, author, category, tag)
- `src/components/blog/PortableTextRenderer.tsx` - Portable text renderer
- `src/app/api/revalidate/route.ts` - Webhook handler

**Files to Modify:**

- `src/lib/blog.ts` - Add Sanity support while keeping markdown
- `src/app/blog/[slug]/page.tsx` - Handle both content types
- `package.json` - Add new dependencies
- `.gitignore` - Add Sanity artifacts
- `next.config.js` - Add Sanity image domains

**Design Consistency:**

- Use existing color scheme: slate-700/800/900 backgrounds, blue-400/cyan-400 accents
- Maintain neural-bg, glass effects, and glow-text patterns
- Studio will inherit site's blue theme for consistency
- All text remains white/gray as per current design

**No Breaking Changes:**

- Existing markdown blog posts continue working
- All current routes remain functional
- Current components receive minimal changes
- Design and styling completely preserved

### To-dos

- [ ] Install Sanity packages and initialize project configuration
- [ ] Define Sanity schemas for blog posts, authors, categories, and tags
- [ ] Configure Sanity Studio at /studio route with custom branding
- [ ] Create Sanity client, queries, and image utilities
- [ ] Extend blog.ts to support dual mode (markdown + Sanity)
- [ ] Create PortableText renderer with custom serializers matching current styling
- [ ] Implement webhook API route for on-demand revalidation
- [ ] Set up environment variables and update documentation
- [ ] Test Studio, content creation, and webhook functionality