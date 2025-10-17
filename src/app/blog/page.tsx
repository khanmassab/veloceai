import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog'
import BlogPageClient from './BlogPageClient'

export default function BlogPage() {
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const tags = getAllTags()

  return (
    <BlogPageClient 
      posts={allPosts}
      categories={categories}
      tags={tags}
    />
  )
}
