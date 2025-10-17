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

const postsDirectory = path.join(process.cwd(), 'src/content/blogs')
const authorsDirectory = path.join(process.cwd(), 'src/content/authors')

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  content: string
  tags: string[]
  categories: string[]
  coverImage?: string
  readTime: number
  published: boolean
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
}

// Get all blog posts
export function getAllPosts(): BlogPostMeta[] {
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
          ...data,
          readTime: calculateReadTime(fileContents),
        } as BlogPostMeta
      })
      .filter(post => post.published !== false)
      .sort((a, b) => (a.date < b.date ? 1 : -1))

    return allPostsData
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

// Get a single blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
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
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// Get all authors
export function getAllAuthors(): Author[] {
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
    console.error('Error reading authors:', error)
    return []
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
export function getPostsByCategory(category: string): BlogPostMeta[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => 
    post.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
  )
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPostMeta[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

// Get posts by author
export function getPostsByAuthor(author: string): BlogPostMeta[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => 
    post.author.toLowerCase() === author.toLowerCase()
  )
}

// Get related posts
export function getRelatedPosts(currentPost: BlogPostMeta, limit: number = 3): BlogPostMeta[] {
  const allPosts = getAllPosts()
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
export function getAllCategories(): string[] {
  const allPosts = getAllPosts()
  const categories = new Set<string>()
  
  allPosts.forEach(post => {
    post.categories.forEach(category => categories.add(category))
  })
  
  return Array.from(categories).sort()
}

// Get all unique tags
export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tags = new Set<string>()
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

// Search posts
export function searchPosts(query: string): BlogPostMeta[] {
  const allPosts = getAllPosts()
  const searchTerm = query.toLowerCase()
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    post.categories.some(cat => cat.toLowerCase().includes(searchTerm))
  )
}
