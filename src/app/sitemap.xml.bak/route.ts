import { getAllPosts } from '@/lib/blog'
import { generateSitemap } from '@/lib/utils'

export const dynamic = 'force-static'

export async function GET() {
  const posts = await getAllPosts()
  const sitemap = generateSitemap(posts)
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
