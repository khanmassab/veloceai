import { Metadata } from 'next'
import { getAllPosts, getAllTags } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import BlogPagination from '@/components/blog/BlogPagination'
import { ArrowLeft, Tag } from 'lucide-react'
import Link from 'next/link'
import { PageWrapper } from '@/components/NeuralNetworkBackground'
import { ScrollAnimation, StaggerContainer, StaggerItem, GradientText } from '@/components/ScrollAnimations'

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
  
  let allPosts: any[] = []
  let filteredPosts: any[] = []
  
  try {
    allPosts = await getAllPosts()
    filteredPosts = allPosts.filter((post: any) => 
      post.tags.some((postTag: any) => 
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
    <PageWrapper backgroundVariant="full" className="min-h-screen neural-bg">
      {/* Header */}
      <section className="pt-24 pb-12 text-white">
        <div className="container mx-auto px-6">
          <ScrollAnimation direction="up" distance={30}>
            <Link 
              href="/blog" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </ScrollAnimation>
          
          <ScrollAnimation direction="up" distance={40} delay={0.2}>
            <div className="flex items-center mb-6">
              <Tag className="w-8 h-8 mr-3 text-blue-400" />
              <h1 className="text-4xl font-bold">
                <GradientText 
                  className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                  gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #3b82f6)"
                  duration={2}
                >
                  #{tagName}
                </GradientText>
              </h1>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation direction="up" distance={30} delay={0.4}>
            <p className="text-xl text-gray-300">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} tagged with #{tagName}
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          {posts.length > 0 ? (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <BlogCard post={post} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <ScrollAnimation direction="up" distance={30}>
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No posts found with this tag.</p>
              </div>
            </ScrollAnimation>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <ScrollAnimation direction="up" distance={30} delay={0.2}>
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  const url = new URL(window.location.href)
                  url.searchParams.set('page', page.toString())
                  window.location.href = url.toString()
                }}
              />
            </ScrollAnimation>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
