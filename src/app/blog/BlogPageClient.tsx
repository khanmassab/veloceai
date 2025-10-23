'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BlogPostMeta } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import BlogSearch from '@/components/blog/BlogSearch'
import BlogPagination from '@/components/blog/BlogPagination'
import { Search, Filter, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface BlogPageClientProps {
  posts: BlogPostMeta[]
  categories: string[]
  tags: string[]
}

export default function BlogPageClient({ posts, categories, tags }: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // Filter posts based on search and filters
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === '' || 
        post.categories.includes(selectedCategory)

      const matchesTag = selectedTag === '' || 
        post.tags.includes(selectedTag)

      return matchesSearch && matchesCategory && matchesTag
    })
  }, [posts, searchQuery, selectedCategory, selectedTag])

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedTag])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedTag('')
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen neural-bg">
      {/* Hero Section */}
      <section className="py-24 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            AI Development{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent glow-text">
              Insights
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Learn how to build production-ready AI support bots, implement RAG systems, 
            and master agentic workflows from our engineering team.
          </motion.p>
          
          {/* Search and Filter */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <BlogSearch 
              posts={posts}
              onSearchChange={setSearchQuery}
              onCategoryChange={setSelectedCategory}
              onTagChange={setSelectedTag}
            />
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          {/* Results Header */}
          {(searchQuery || selectedCategory || selectedTag) && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'Result' : 'Results'}
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Clear all filters
                </button>
              </div>
              
              {/* Active Filters */}
              <div className="flex flex-wrap gap-2">
                {selectedCategory && (
                  <span className="inline-flex items-center px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="ml-2 hover:text-blue-200"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedTag && (
                  <span className="inline-flex items-center px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                    #{selectedTag}
                    <button
                      onClick={() => setSelectedTag('')}
                      className="ml-2 hover:text-purple-200"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {paginatedPosts.length > 0 ? (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {paginatedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No blog posts found.</p>
              {(searchQuery || selectedCategory || selectedTag) && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Clear filters to see all posts
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>

      {/* Categories and Tags */}
      <section className="py-12 bg-gradient-to-br from-slate-700 to-slate-800 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Filter className="w-6 h-6 mr-2 text-blue-400" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-4 py-2 bg-slate-600/50 text-blue-300 rounded-lg hover:bg-slate-500/50 hover:shadow-md transition-all duration-200 border border-slate-500/50"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Tag className="w-6 h-6 mr-2 text-blue-400" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 10).map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-1 bg-slate-600/50 text-gray-300 rounded-full text-sm hover:bg-slate-500/50 hover:shadow-sm transition-all duration-200 border border-slate-500/50"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
