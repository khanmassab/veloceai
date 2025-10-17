import { Metadata } from 'next'
import { getAllPosts, getAllTags } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import { ArrowLeft, Tag } from 'lucide-react'
import Link from 'next/link'

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: tag.toLowerCase().replace(/\s+/g, '-'),
  }))
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

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const tagName = tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  const allPosts = getAllPosts()
  const posts = allPosts.filter(post => 
    post.tags.some(postTag => 
      postTag.toLowerCase().replace(/\s+/g, '-') === tag.toLowerCase()
    )
  )

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
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with #{tagName}
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts found with this tag.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
