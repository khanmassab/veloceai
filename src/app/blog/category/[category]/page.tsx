import { Metadata } from 'next'
import { getAllPosts, getAllCategories } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import { ArrowLeft, Filter } from 'lucide-react'
import Link from 'next/link'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  return {
    title: `${categoryName} - Blog - VeloceAI`,
    description: `AI support bot development insights and best practices in ${categoryName.toLowerCase()}.`,
    openGraph: {
      title: `${categoryName} - Blog - VeloceAI`,
      description: `AI support bot development insights and best practices in ${categoryName.toLowerCase()}.`,
      url: `https://veloceai.co/blog/category/${category}`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  const allPosts = getAllPosts()
  const posts = allPosts.filter(post => 
    post.categories.some(cat => 
      cat.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
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
            <Filter className="w-8 h-8 mr-3 text-blue-400" />
            <h1 className="text-4xl font-bold">
              {categoryName}
            </h1>
          </div>
          
          <p className="text-xl text-gray-300">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
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
              <p className="text-gray-500 text-lg">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
