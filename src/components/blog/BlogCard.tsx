'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { BlogPostMeta } from '@/lib/blog'

interface BlogCardProps {
  post: BlogPostMeta
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-600/50 group-hover:border-blue-400/50">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 relative overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}
          
          <div className="p-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.slice(0, 2).map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30"
                >
                  {category}
                </span>
              ))}
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
            
            {/* Excerpt */}
            <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
            
            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{formatDate(post.date)}</span>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded font-medium bg-slate-600/50 text-gray-300 border border-slate-500/50"
                >
                  #{tag}
                </span>
              ))}
            </div>
            
            {/* Read More */}
            <div className="flex items-center text-blue-400 font-medium group-hover:text-blue-300">
              <span>Read more</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default BlogCard
