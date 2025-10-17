'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { BlogPostMeta } from '@/lib/blog'

interface RelatedPostsProps {
  posts: BlogPostMeta[]
  currentPostSlug: string
}

const RelatedPosts = ({ posts, currentPostSlug }: RelatedPostsProps) => {
  if (posts.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-white/20">
      <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group-hover:border-blue-400/50 overflow-hidden glass-dark">
                {/* Cover Image */}
                {post.coverImage && (
                  <div className="aspect-video bg-gradient-to-br from-blue-900/20 to-cyan-900/20 relative overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}
                
                <div className="p-4">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.categories.slice(0, 1).map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded border border-blue-400/30"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  {/* Title */}
                  <h4 className="font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  
                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>{formatDate(post.date)}</span>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>
                  
                  {/* Read More */}
                  <div className="flex items-center text-blue-400 text-sm font-medium mt-2 group-hover:text-blue-300">
                    <span>Read more</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default RelatedPosts
