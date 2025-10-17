<!-- af5ba053-7c65-4935-80ac-d58478a729f0 9fd0d58f-9dad-4c0a-9a7d-51277611cadb -->
# Next.js Migration with Blog & Enhanced Design

## 1. Next.js Project Setup

- Initialize Next.js 14+ with App Router (for SSR/SSG capabilities)
- Configure for static export to work with GitHub Pages
- Set up TypeScript, Tailwind CSS, and Framer Motion
- Configure `next.config.js` with `output: 'export'` and proper base path
- Update GitHub Actions workflow for Next.js static build

## 2. Design System Overhaul

Create a unique AI-aesthetic design language:

- **Color Palette**: Move beyond standard blues - use electric cyan, deep purples, neural network-inspired gradients (think: cyberpunk meets minimalism)
- **Typography**: Modern, geometric fonts with variable weights for hierarchy
- **Motion**: Subtle particle effects, neural network animations, holographic accents
- **Components**: Glassmorphism for cards, animated mesh gradients, glowing borders
- **Layout**: Asymmetric grid layouts, flowing sections with organic shapes
- **Micro-interactions**: Magnetic buttons, fluid hover states, intelligent loading states

## 3. Header Component

Create a sticky header with:

- VeloceAI logo (left)
- Navigation links: Home, Blog, About (center/right)
- "Book Now" CTA button (right)
- Mobile responsive hamburger menu
- Smooth scroll behavior with backdrop blur on scroll
- Active route highlighting

## 4. Blog Infrastructure

### Content Management (Markdown-based)

- Create `/content/blogs/` directory for markdown files
- Frontmatter structure: title, date, author, excerpt, tags, categories, coverImage, readTime
- Create `/content/authors/` for author profiles (markdown)
- Implement markdown parser (gray-matter + remark/rehype)
- Code syntax highlighting for technical content

### Blog Pages

- `/blog` - Main blog listing page with search, filter by category/tag
- `/blog/[slug]` - Individual blog post with:
  - Hero section with cover image
  - Author card with bio
  - Reading time estimate
  - Table of contents (auto-generated from headings)
  - Social share buttons
  - Related posts section (based on tags/categories)
- `/blog/category/[category]` - Category archive pages
- `/blog/tag/[tag]` - Tag archive pages
- `/blog/author/[author]` - Author profile pages

### Blog Features

- Search functionality (client-side fuzzy search)
- Category and tag filtering
- Pagination or infinite scroll
- RSS feed generation
- OG images for social sharing
- Estimated reading time calculation
- View count tracking (localStorage for now)

## 5. Booking System

### Custom Calendar Component

- Monthly calendar view with available/booked slots
- Time slot selection (configurable business hours)
- Multi-timezone support (user's local timezone)
- Booking state management

### Backend Integration

- API route: `/api/book` to handle booking submissions
- Email service using SMTP (nodemailer):
  - Send confirmation to user
  - Send notification to massab@veloceai.co
  - Include booking details, calendar ICS file attachment
- Form validation (Zod schema)
- Rate limiting to prevent spam
- Store bookings temporarily in JSON file or use GitHub Issues API

### Booking Flow

1. User clicks "Book Now" → Opens modal/dedicated page
2. Select date & time from calendar
3. Fill form: name, email, company, message
4. Confirmation screen with calendar invite download
5. Email sent to both parties

## 6. Page Migrations

Migrate existing sections to Next.js structure with improved design:

- Hero section - Add particle network background, holographic accents
- Problem section - Animated stat counters, glowing card effects
- Solution timeline - Interactive timeline with hover reveals
- Features - Animated grid with magnetic hover effects
- Technical section - Subtle code snippets or terminal animations
- CTA section - Enhanced with booking modal integration
- Footer - Add blog link, improved social icons

## 7. SEO & Performance Optimization

- Next.js metadata API for all pages
- Structured data (JSON-LD) for blog posts
- OpenGraph and Twitter Card meta tags
- Sitemap.xml generation
- robots.txt configuration
- Image optimization (next/image)
- Font optimization (next/font)
- Static generation for blog posts (SSG)
- Server components where possible

## 8. GitHub Pages Deployment

- Update `next.config.js` for static export
- Modify GitHub Actions workflow:
  - Use `npm run build` (Next.js export)
  - Deploy `out` directory instead of `dist`
- Handle client-side routing with 404.html fallback
- Ensure proper asset paths

## 9. Content Creation

Create 2-3 sample blog posts:

- "How We Build AI Support Bots in 6 Weeks"
- "RAG vs Fine-tuning: When to Use Each"
- "Agentic Workflows: The Future of AI Automation"

Create sample author profile for Massab

## Key Files to Create/Modify

**New Structure:**

```
├── app/
│   ├── layout.tsx (root layout with header/footer)
│   ├── page.tsx (home page)
│   ├── blog/
│   │   ├── page.tsx (blog listing)
│   │   ├── [slug]/page.tsx (blog post)
│   │   ├── category/[category]/page.tsx
│   │   ├── tag/[tag]/page.tsx
│   │   └── author/[author]/page.tsx
│   ├── api/
│   │   └── book/route.ts (booking API)
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── BookingModal.tsx
│   ├── Calendar.tsx
│   ├── blog/
│   │   ├── BlogCard.tsx
│   │   ├── BlogSearch.tsx
│   │   ├── RelatedPosts.tsx
│   │   └── AuthorCard.tsx
│   └── ui/ (design system components)
├── content/
│   ├── blogs/
│   └── authors/
├── lib/
│   ├── blog.ts (markdown processing)
│   ├── email.ts (SMTP integration)
│   └── utils.ts
├── next.config.js
└── package.json
```

### To-dos

- [ ] Initialize Next.js project with App Router, TypeScript, Tailwind, and configure for static export
- [ ] Create unique AI-aesthetic design system (colors, gradients, motion, glassmorphism components)
- [ ] Build responsive header with navigation, blog link, and Book Now CTA
- [ ] Set up markdown processing, content directories, and blog utilities
- [ ] Create blog listing, post detail, category, tag, and author pages
- [ ] Implement search, filtering, related posts, and social sharing
- [ ] Build custom calendar component with time slot selection
- [ ] Create booking API with SMTP email integration (nodemailer)
- [ ] Migrate existing sections to Next.js with enhanced AI-aesthetic design
- [ ] Add metadata, structured data, OG tags, and generate sitemap
- [ ] Configure Next.js for GitHub Pages deployment and update workflow
- [ ] Create 2-3 sample blog posts and author profile