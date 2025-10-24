import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('Force revalidation triggered')
    
    // Revalidate all blog-related paths
    const paths = [
      '/',
      '/blog',
      '/blog/',
      '/about',
      '/rss.xml',
      '/sitemap.xml.bak'
    ]
    
    for (const path of paths) {
      try {
        revalidatePath(path)
        revalidatePath(path, 'page')
        revalidatePath(path, 'layout')
        console.log(`Revalidated: ${path}`)
      } catch (error) {
        console.error(`Failed to revalidate ${path}:`, error)
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'All paths revalidated',
      paths,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Force revalidation error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Force revalidation endpoint - use POST to trigger revalidation',
    timestamp: new Date().toISOString()
  })
}
