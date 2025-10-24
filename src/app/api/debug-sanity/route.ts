import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity.client'
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog'

export async function GET() {
  try {
    const debug = {
      environment: {
        SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
        SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
      },
      sanity: {
        connected: false,
        error: null
      },
      blog: {
        posts: [],
        categories: [],
        tags: [],
        error: null
      }
    }

    // Test Sanity connection
    try {
      const testQuery = '*[_type == "blogPost"][0]'
      const testResult = await client.fetch(testQuery)
      debug.sanity.connected = true
      debug.sanity.testResult = testResult
    } catch (error) {
      debug.sanity.error = error instanceof Error ? error.message : 'Unknown error'
    }

    // Test blog functions
    try {
      const posts = await getAllPosts()
      const categories = await getAllCategories()
      const tags = await getAllTags()
      
      debug.blog.posts = posts.map(post => ({
        slug: post.slug,
        title: post.title,
        categories: post.categories,
        tags: post.tags,
        source: post.source
      }))
      debug.blog.categories = categories
      debug.blog.tags = tags
    } catch (error) {
      debug.blog.error = error instanceof Error ? error.message : 'Unknown error'
    }

    return NextResponse.json(debug, { status: 200 })
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
