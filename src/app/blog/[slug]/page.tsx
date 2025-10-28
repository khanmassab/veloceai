import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/blog'
import { formatDate, getSocialShareUrls } from '@/lib/utils'
import AuthorCard from '@/components/blog/AuthorCard'
import RelatedPosts from '@/components/blog/RelatedPosts'
import SyntaxHighlighter from '@/components/SyntaxHighlighter'
import PortableTextRenderer from '@/components/blog/PortableTextRenderer'
import MarkdownRenderer from '@/components/blog/MarkdownRenderer'
import { Calendar, Clock, User, Share2, Twitter, Linkedin, Facebook } from 'lucide-react'
import { PageWrapper } from '@/components/NeuralNetworkBackground'
import { ScrollAnimation, StaggerContainer, StaggerItem, GradientText } from '@/components/ScrollAnimations'

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
    <PageWrapper backgroundVariant="full" className="min-h-screen neural-bg">
      <SyntaxHighlighter />
      {/* Hero Section with Cover Image Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Cover Image Background */}
        {post.coverImage && (
          <div className="absolute inset-0">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            {/* Blur overlay for text readability */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
            {/* Gradient overlays for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
          </div>
        )}
        
        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-6 pt-24 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <ScrollAnimation direction="up" distance={30}>
              <nav className="mb-8">
                <ol className="flex items-center justify-center space-x-2 text-sm text-gray-200">
                  <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                  <li>/</li>
                  <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                  <li>/</li>
                  <li className="text-white">{post.title}</li>
                </ol>
              </nav>
            </ScrollAnimation>

            {/* Categories */}
            <ScrollAnimation direction="up" distance={30} delay={0.1}>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {post.categories.map((category) => (
                  <span
                    key={category}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </ScrollAnimation>

            {/* Title */}
            <ScrollAnimation direction="up" distance={50} delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white drop-shadow-2xl">
                {post.title}
              </h1>
            </ScrollAnimation>

            {/* Meta Info */}
            <ScrollAnimation direction="up" distance={30} delay={0.3}>
              <div className="flex flex-wrap justify-center items-center gap-8 text-gray-200 mb-8">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <User className="w-5 h-5 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </ScrollAnimation>

            {/* Social Share */}
            <ScrollAnimation direction="up" distance={30} delay={0.4}>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-gray-200">Share:</span>
                <a
                  href={socialUrls.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors border border-white/30"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href={socialUrls.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors border border-white/30"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={socialUrls.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors border border-white/30"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <ScrollAnimation direction="up" distance={30}>
        <section className="py-12 bg-gradient-to-br from-slate-800 to-slate-900 text-white relative">
          {/* Gradient overlay for better blending with cover image */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent pointer-events-none"></div>
          <div className="w-full px-4 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto blog-content">
              {post.contentType === 'markdown' ? (
                <MarkdownRenderer content={post.content as string} />
              ) : (
                <PortableTextRenderer content={post.content as any[]} />
              )}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Tags */}
      {post.tags.length > 0 && (
        <ScrollAnimation direction="up" distance={30}>
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
        </ScrollAnimation>
      )}

      {/* Author Card */}
      {author && (
        <ScrollAnimation direction="up" distance={30}>
          <section className="py-12 bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <AuthorCard author={author} />
              </div>
            </div>
          </section>
        </ScrollAnimation>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <ScrollAnimation direction="up" distance={30}>
          <section className="py-12 bg-gradient-to-br from-slate-700 to-slate-800">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <RelatedPosts posts={relatedPosts} currentPostSlug={post.slug} />
              </div>
            </div>
          </section>
        </ScrollAnimation>
      )}
    </PageWrapper>
  )
}
