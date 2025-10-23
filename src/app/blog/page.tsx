import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog'
import BlogPageClient from './BlogPageClient'

export default async function BlogPage() {
  const allPosts = await getAllPosts()
  const categories = await getAllCategories()
  const tags = await getAllTags()

  return (
    <BlogPageClient 
      posts={allPosts}
      categories={categories}
      tags={tags}
    />
  )
}
