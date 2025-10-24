import { getAllPosts } from '@/lib/blog'
import { generateRSSFeed } from '@/lib/utils'

export const dynamic = 'force-static'

export async function GET() {
  return new Response('RSS feed disabled', { status: 404 })
}
