import { getAllPosts } from '@/lib/blog'
import { generateSitemap } from '@/lib/utils'

export const dynamic = 'force-static'

export async function GET() {
  return new Response('Sitemap disabled', { status: 404 })
}
