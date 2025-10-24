import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Helper function to revalidate all blog-related paths
async function revalidateAllBlogPaths() {
  const paths = [
    '/blog',
    '/blog/',
    '/rss.xml',
    '/sitemap.xml.bak'
  ]
  
  for (const path of paths) {
    try {
      revalidatePath(path)
      revalidatePath(path, 'page')
      revalidatePath(path, 'layout')
    } catch (error) {
      console.error(`Failed to revalidate ${path}:`, error)
    }
  }
}

export async function POST(request: NextRequest) {
  // Check for secret in URL params (for backward compatibility)
  const urlSecret = request.nextUrl.searchParams.get('secret')
  
  // Check for secret in headers
  const headerSecret = request.headers.get('x-sanity-webhook-secret')
  
  // Parse request body once
  let body = null
  let bodySecret = null
  try {
    body = await request.json()
    bodySecret = body.secret
  } catch (err) {
    // Body might not be JSON or might be empty
    console.error('Failed to parse request body:', err)
  }
  
  const secret = urlSecret || headerSecret || bodySecret
  const expectedSecret = process.env.SANITY_WEBHOOK_SECRET
  
  // Verify the secret
  if (!secret || secret !== expectedSecret) {
    console.error('Webhook secret mismatch:', { 
      provided: secret ? 'present' : 'missing', 
      expected: expectedSecret ? 'present' : 'missing' 
    })
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    console.log('Webhook received:', { type: body._type, slug: body.slug?.current })
    
    // Handle different document types
    if (body._type === 'blogPost') {
      const slug = body.slug?.current
      
      // Revalidate all blog paths first
      await revalidateAllBlogPaths()
      
      // Revalidate specific blog post
      if (slug) {
        revalidatePath(`/blog/${slug}`)
        revalidatePath(`/blog/${slug}/`)
      }
      
      // Revalidate category pages
      if (body.categories && Array.isArray(body.categories)) {
        body.categories.forEach((category: any) => {
          if (category.slug?.current) {
            revalidatePath(`/blog/category/${category.slug.current}`)
            revalidatePath(`/blog/category/${category.slug.current}/`)
          }
        })
      }
      
      // Revalidate tag pages
      if (body.tags && Array.isArray(body.tags)) {
        body.tags.forEach((tag: any) => {
          if (tag.slug?.current) {
            revalidatePath(`/blog/tag/${tag.slug.current}`)
            revalidatePath(`/blog/tag/${tag.slug.current}/`)
          }
        })
      }
      
      console.log('Revalidated blog post:', slug)
    }
    
    if (body._type === 'author') {
      const slug = body.slug?.current
      if (slug) {
        revalidatePath(`/blog/author/${slug}`)
        console.log('Revalidated author:', slug)
      }
    }
    
    // Revalidate tags and categories
    if (body._type === 'tag' || body._type === 'category') {
      await revalidateAllBlogPaths()
      console.log('Revalidated blog due to tag/category change')
    }
    
    // Force revalidation of all blog content (nuclear option)
    if (body._type === 'blogPost') {
      // Also revalidate the home page in case it shows recent posts
      revalidatePath('/')
      revalidatePath('/about')
      
      // Force revalidation with different cache types
      try {
        revalidateTag('blog-posts')
        revalidateTag('blog-categories')
        revalidateTag('blog-tags')
      } catch (error) {
        console.log('Tag revalidation not available:', error)
      }
    }

    return NextResponse.json({ 
      revalidated: true, 
      type: body._type,
      slug: body.slug?.current,
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
