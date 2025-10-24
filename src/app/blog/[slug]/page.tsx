import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/blog'
import { formatDate, getSocialShareUrls } from '@/lib/utils'
import AuthorCard from '@/components/blog/AuthorCard'
import RelatedPosts from '@/components/blog/RelatedPosts'
import SyntaxHighlighter from '@/components/SyntaxHighlighter'
import PortableTextRenderer from '@/components/blog/PortableTextRenderer'
import { Calendar, Clock, User, Share2, Twitter, Linkedin, Facebook } from 'lucide-react'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const socialUrls = getSocialShareUrls(`https://veloceai.co/blog/${post.slug}`, post.title)

  return {
    title: `${post.title} - VeloceAI Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://veloceai.co/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage ? [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post, 3)
  const socialUrls = getSocialShareUrls(`https://veloceai.co/blog/${post.slug}`, post.title)
  
  // Use author details from Sanity post data
  const author = post.authorDetails ? {
    slug: post.authorDetails.slug,
    name: post.authorDetails.name,
    bio: post.authorDetails.bio,
    avatar: post.authorDetails.avatar,
    social: {
      twitter: post.authorDetails.social?.email, // Map email to twitter field for compatibility
      linkedin: post.authorDetails.social?.linkedin,
      github: post.authorDetails.social?.github,
      website: post.authorDetails.social?.website,
    }
  } : null

  return (
    <div className="min-h-screen neural-bg">
      <SyntaxHighlighter />
      {/* Hero Section */}
      <section className="py-24 neural-bg text-white dark">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-300">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li>/</li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li>/</li>
                <li className="text-white">{post.title}</li>
              </ol>
            </nav>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-8">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Share:</span>
              <a
                href={socialUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={socialUrls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={socialUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <section className="py-8 bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-12 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {post.source === 'sanity' ? (
              <PortableTextRenderer content={post.content as any[]} />
            ) : (
              <div className="prose prose-lg max-w-none prose-invert prose-headings:text-white prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-white prose-strong:font-semibold prose-code:text-blue-400 prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg prose-blockquote:border-l-blue-400 prose-blockquote:bg-slate-800/50 prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:text-gray-300 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 prose-table:text-gray-300 prose-th:bg-slate-800 prose-th:text-white prose-td:border-slate-700 prose-img:rounded-lg prose-img:shadow-lg">
                <div dangerouslySetInnerHTML={{ __html: post.content as string }} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tags */}
      {post.tags.length > 0 && (
        <section className="py-8 bg-gradient-to-br from-slate-700 to-slate-800">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-1 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition-colors border border-white/20"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Author Card */}
      {author && (
        <section className="py-12 bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <AuthorCard author={author} />
            </div>
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-gradient-to-br from-slate-700 to-slate-800">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <RelatedPosts posts={relatedPosts} currentPostSlug={post.slug} />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
