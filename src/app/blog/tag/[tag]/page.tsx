import { Metadata } from 'next'
import { getAllPosts, getAllTags } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import BlogPagination from '@/components/blog/BlogPagination'
import { ArrowLeft, Tag } from 'lucide-react'
import Link from 'next/link'

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  try {
    const tags = await getAllTags()
    return tags.map((tag) => ({
      tag: tag.toLowerCase().replace(/\s+/g, '-'),
    }))
  } catch (error) {
    console.error('Error generating tag params:', error)
    return []
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const tagName = tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  return {
    title: `#${tagName} - Blog - VeloceAI`,
    description: `AI support bot development insights and best practices tagged with ${tagName.toLowerCase()}.`,
    openGraph: {
      title: `#${tagName} - Blog - VeloceAI`,
      description: `AI support bot development insights and best practices tagged with ${tagName.toLowerCase()}.`,
      url: `https://veloceai.co/blog/tag/${tag}`,
    },
  }
}

export default async function TagPage({ params, searchParams }: TagPageProps & { searchParams: Promise<{ page?: string }> }) {
  const { tag } = await params
  const { page } = await searchParams
  const tagName = tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  let allPosts = []
  let filteredPosts = []
  
  try {
    allPosts = await getAllPosts()
    filteredPosts = allPosts.filter(post => 
      post.tags.some(postTag => 
        postTag.toLowerCase().replace(/\s+/g, '-') === tag.toLowerCase()
      )
    )
  } catch (error) {
    console.error('Error loading posts for tag:', error)
    allPosts = []
    filteredPosts = []
  }

  // Pagination
  const postsPerPage = 6
  const currentPage = parseInt(page || '1')
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const posts = filteredPosts.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen neural-bg">
      {/* Header */}
      <section className="py-12 text-white">
        <div className="container mx-auto px-6">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <div className="flex items-center mb-6">
            <Tag className="w-8 h-8 mr-3 text-blue-400" />
            <h1 className="text-4xl font-bold">
              #{tagName}
            </h1>
          </div>
          
          <p className="text-xl text-gray-300">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} tagged with #{tagName}
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No posts found with this tag.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                const url = new URL(window.location.href)
                url.searchParams.set('page', page.toString())
                window.location.href = url.toString()
              }}
            />
          )}
        </div>
      </section>
    </div>
  )
}
