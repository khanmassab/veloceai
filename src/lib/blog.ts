// Removed markdown-related imports since we're using Sanity only
import { client } from './sanity.client'
import { 
  blogPostQuery, 
  blogPostBySlugQuery, 
  authorsQuery, 
  authorBySlugQuery,
  categoriesQuery,
  tagsQuery,
  postsByCategoryQuery,
  postsByTagQuery,
  postsByAuthorQuery
} from './sanity.queries'
import { getImageUrl } from './sanity.image'

// Removed directory constants since we're using Sanity only

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  content: string | any[] // Can be HTML string (markdown) or Portable Text array (Sanity)
  tags: string[]
  categories: string[]
  coverImage?: string
  readTime: number
  published: boolean
  source?: 'markdown' | 'sanity' // Track content source
}

// Sanity-specific interfaces
export interface SanityBlogPost {
  _id: string
  title: string
  slug: { current: string }
  date: string
  author: {
    name: string
    slug: { current: string }
    avatar?: any
  }
  excerpt: string
  content?: any[]
  tags: Array<{ name: string; slug: { current: string } }>
  categories: Array<{ name: string; slug: { current: string } }>
  coverImage?: any
  readTime: number
  published: boolean
}

export interface SanityAuthor {
  _id: string
  name: string
  slug: { current: string }
  bio: string
  avatar?: any
  social?: {
    email?: string
    linkedin?: string
    github?: string
    website?: string
  }
}

export interface Author {
  slug: string
  name: string
  bio: string
  avatar?: string
  social: {
    twitter?: string
    linkedin?: string
    github?: string
    website?: string
  }
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  tags: string[]
  categories: string[]
  coverImage?: string
  readTime: number
  published: boolean
  source?: 'markdown' | 'sanity' // Track content source
}

// Get all blog posts (Sanity only)
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  try {
    // Get Sanity posts only
    const sanityPosts = await getSanityPosts()
    
    // Sort by date
    const allPosts = sanityPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return allPosts
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

// Removed getMarkdownPosts function - using Sanity only

// Get Sanity posts
async function getSanityPosts(): Promise<BlogPostMeta[]> {
  try {
    // Check if Sanity is properly configured
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'your-project-id') {
      return []
    }
    
    const sanityPosts = await client.fetch(blogPostQuery)
    return sanityPosts.map(transformSanityPost)
  } catch (error) {
    console.error('Error reading Sanity posts:', error)
    return []
  }
}

// Transform Sanity post to unified format
function transformSanityPost(post: SanityBlogPost): BlogPostMeta {
  return {
    slug: post.slug.current,
    title: post.title,
    date: post.date,
    author: post.author?.name || 'Unknown Author',
    excerpt: post.excerpt,
    tags: post.tags?.map((tag: any) => tag.name) || [],
    categories: post.categories?.map((cat: any) => cat.name) || [],
    coverImage: getImageUrl(post.coverImage),
    readTime: post.readTime || 5,
    published: post.published,
    source: 'sanity' as const,
  }
}

// Get a single blog post by slug (Sanity only)
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Get from Sanity only
    return await getSanityPostBySlug(slug)
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// Removed getMarkdownPostBySlug function - using Sanity only

// Get Sanity post by slug
async function getSanityPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const sanityPost = await client.fetch(blogPostBySlugQuery, { slug })
    if (!sanityPost) return null

    return {
      slug: sanityPost.slug.current,
      title: sanityPost.title,
      date: sanityPost.date,
      author: sanityPost.author.name,
      excerpt: sanityPost.excerpt,
      content: sanityPost.content, // Portable text content
      tags: sanityPost.tags?.map((tag: any) => tag.name) || [],
      categories: sanityPost.categories?.map((cat: any) => cat.name) || [],
      coverImage: getImageUrl(sanityPost.coverImage),
      readTime: sanityPost.readTime || 5,
      published: sanityPost.published,
      source: 'sanity',
    }
  } catch (error) {
    return null
  }
}

// Get all authors (Sanity only)
export async function getAllAuthors(): Promise<Author[]> {
  try {
    // Get Sanity authors only
    const sanityAuthors = await getSanityAuthors()
    
    return sanityAuthors
  } catch (error) {
    console.error('Error reading authors:', error)
    return []
  }
}

// Removed getMarkdownAuthors function - using Sanity only

// Get Sanity authors
async function getSanityAuthors(): Promise<Author[]> {
  try {
    // Check if Sanity is properly configured
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'your-project-id') {
      return []
    }
    
    const sanityAuthors = await client.fetch(authorsQuery)
    return sanityAuthors.map(transformSanityAuthor)
  } catch (error) {
    console.error('Error reading Sanity authors:', error)
    return []
  }
}

// Transform Sanity author to unified format
function transformSanityAuthor(author: SanityAuthor): Author {
  return {
    slug: author.slug.current,
    name: author.name,
    bio: author.bio,
    avatar: getImageUrl(author.avatar),
    social: {
      twitter: author.social?.email, // Map email to twitter field for compatibility
      linkedin: author.social?.linkedin,
      github: author.social?.github,
      website: author.social?.website,
    },
  }
}

// Removed getAuthorBySlug function - using Sanity only

// Get posts by category
export async function getPostsByCategory(category: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => 
    post.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
  )
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

// Get posts by author
export async function getPostsByAuthor(author: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => 
    post.author.toLowerCase() === author.toLowerCase()
  )
}

// Get related posts
export async function getRelatedPosts(currentPost: BlogPostMeta, limit: number = 3): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts()
  const currentTags = currentPost.tags
  const currentCategories = currentPost.categories
  
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      const tagMatches = post.tags.filter(tag => currentTags.includes(tag)).length
      const categoryMatches = post.categories.filter(cat => currentCategories.includes(cat)).length
      const score = tagMatches * 2 + categoryMatches
      return { post, score }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)

  return relatedPosts
}

// Calculate reading time
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Get all unique categories
export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const categories = new Set<string>()
  
  allPosts.forEach(post => {
    post.categories.forEach(category => categories.add(category))
  })
  
  return Array.from(categories).sort()
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const tags = new Set<string>()
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

// Search posts
export async function searchPosts(query: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts()
  const searchTerm = query.toLowerCase()
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    post.categories.some(cat => cat.toLowerCase().includes(searchTerm))
  )
}
