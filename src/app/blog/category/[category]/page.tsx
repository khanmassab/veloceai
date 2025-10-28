import { Metadata } from 'next'
import { getAllPosts, getAllCategories } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import BlogPagination from '@/components/blog/BlogPagination'
import { ArrowLeft, Filter } from 'lucide-react'
import Link from 'next/link'
import { PageWrapper } from '@/components/NeuralNetworkBackground'
import { ScrollAnimation, StaggerContainer, StaggerItem, GradientText } from '@/components/ScrollAnimations'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories()
    return categories.map((category) => ({
      category: category.toLowerCase().replace(/\s+/g, '-'),
    }))
  } catch (error) {
    console.error('Error generating category params:', error)
    return []
  }
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

export default async function CategoryPage({ params, searchParams }: CategoryPageProps & { searchParams: Promise<{ page?: string }> }) {
  const { category } = await params
  const { page } = await searchParams
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  let allPosts: any[] = []
  let filteredPosts: any[] = []
  
  try {
    allPosts = await getAllPosts()
    filteredPosts = allPosts.filter((post: any) => 
      post.categories.some((cat: any) => 
        cat.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
      )
    )
  } catch (error) {
    console.error('Error loading posts for category:', error)
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
              <Filter className="w-8 h-8 mr-3 text-blue-400" />
              <h1 className="text-4xl font-bold">
                <GradientText 
                  className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                  gradient="linear-gradient(45deg, #3b82f6, #06b6d4, #3b82f6)"
                  duration={2}
                >
                  {categoryName}
                </GradientText>
              </h1>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation direction="up" distance={30} delay={0.4}>
            <p className="text-xl text-gray-300">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} in this category
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
                <p className="text-gray-400 text-lg">No posts found in this category.</p>
              </div>
            </ScrollAnimation>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <ScrollAnimation direction="up" distance={30} delay={0.2}>
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={`/blog/category/${category}`}
              />
            </ScrollAnimation>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
