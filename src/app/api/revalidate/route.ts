import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  
  // Verify the secret
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    
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
