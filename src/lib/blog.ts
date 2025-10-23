import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
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

const postsDirectory = path.join(process.cwd(), 'src/content/blogs')
const authorsDirectory = path.join(process.cwd(), 'src/content/authors')

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

// Get all blog posts (markdown + Sanity combined)
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  try {
    // Get markdown posts
    const markdownPosts = getMarkdownPosts()
    
    // Get Sanity posts
    const sanityPosts = await getSanityPosts()
    
    // Combine and sort by date
    const allPosts = [...markdownPosts, ...sanityPosts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return allPosts
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

// Get markdown posts only
function getMarkdownPosts(): BlogPostMeta[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter(name => name.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)
        
        return {
          slug,
          title: data.title || '',
          date: data.date || '',
          author: data.author || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          tags: data.tags || [],
          categories: data.categories || [],
          coverImage: data.coverImage,
          readTime: calculateReadTime(fileContents),
          published: data.published !== false,
          source: 'markdown' as const,
        } as BlogPostMeta
      })
      .filter(post => post.published !== false)

    return allPostsData
  } catch (error) {
    console.error('Error reading markdown posts:', error)
    return []
  }
}

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

// Get a single blog post by slug (markdown or Sanity)
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // First try to get from Sanity
    const sanityPost = await getSanityPostBySlug(slug)
    if (sanityPost) {
      return sanityPost
    }

    // Fallback to markdown
    return await getMarkdownPostBySlug(slug)
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// Get markdown post by slug
async function getMarkdownPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Process markdown content with proper pipeline
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, {
        behavior: 'wrap',
        properties: {
          className: ['anchor-link'],
          ariaLabel: 'Link to section'
        }
      })
      .use(rehypeHighlight, { 
        detect: true,
        ignoreMissing: true 
      })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content)

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      excerpt: data.excerpt,
      content: processedContent.toString(),
      tags: data.tags || [],
      categories: data.categories || [],
      coverImage: data.coverImage,
      readTime: calculateReadTime(content),
      published: data.published !== false,
      source: 'markdown',
    }
  } catch (error) {
    return null
  }
}

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

// Get all authors (markdown + Sanity combined)
export async function getAllAuthors(): Promise<Author[]> {
  try {
    // Get markdown authors
    const markdownAuthors = getMarkdownAuthors()
    
    // Get Sanity authors
    const sanityAuthors = await getSanityAuthors()
    
    // Combine authors
    const allAuthors = [...markdownAuthors, ...sanityAuthors]
    
    return allAuthors
  } catch (error) {
    console.error('Error reading authors:', error)
    return []
  }
}

// Get markdown authors only
function getMarkdownAuthors(): Author[] {
  try {
    const fileNames = fs.readdirSync(authorsDirectory)
    const allAuthors = fileNames
      .filter(name => name.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(authorsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)
        
        return {
          slug,
          ...data,
        } as Author
      })

    return allAuthors
  } catch (error) {
    console.error('Error reading markdown authors:', error)
    return []
  }
}

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

// Get author by slug
export function getAuthorBySlug(slug: string): Author | null {
  try {
    const fullPath = path.join(authorsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    
    return {
      slug,
      ...data,
    } as Author
  } catch (error) {
    console.error(`Error reading author ${slug}:`, error)
    return null
  }
}

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
