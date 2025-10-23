import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

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
    
    // Handle different document types
    if (body._type === 'blogPost') {
      // Revalidate blog pages
      revalidatePath('/blog')
      revalidatePath(`/blog/${body.slug?.current}`)
      
      // Revalidate category and tag pages if they exist
      if (body.categories) {
        body.categories.forEach((category: any) => {
          revalidatePath(`/blog/category/${category.slug?.current}`)
        })
      }
      
      if (body.tags) {
        body.tags.forEach((tag: any) => {
          revalidatePath(`/blog/tag/${tag.slug?.current}`)
        })
      }
    }
    
    if (body._type === 'author') {
      // Revalidate author pages
      revalidatePath(`/blog/author/${body.slug?.current}`)
    }

    return NextResponse.json({ revalidated: true })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
