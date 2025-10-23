import { getAllPosts } from '@/lib/blog'
import { generateRSSFeed } from '@/lib/utils'

export const dynamic = 'force-static'

export async function GET() {
  const posts = await getAllPosts()
  const rss = generateRSSFeed(posts)
  
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
