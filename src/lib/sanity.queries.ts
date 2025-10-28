import { groq } from 'next-sanity'

export const blogPostQuery = groq`
  *[_type == "blogPost" && published == true] | order(date desc) {
    _id,
    title,
    slug,
    date,
    author->{
      name,
      slug,
      avatar
    },
    excerpt,
    tags[]->{
      name,
      slug
    },
    categories[]->{
      name,
      slug
    },
    coverImage,
    readTime,
    published
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug && published == true][0] {
    _id,
    title,
    slug,
    date,
    author->{
      name,
      slug,
      bio,
      avatar,
      social
    },
    excerpt,
    contentType,
    content,
    markdownContent,
    tags[]->{
      name,
      slug
    },
    categories[]->{
      name,
      slug
    },
    coverImage,
    readTime,
    published
  }
`

export const authorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    bio,
    avatar,
    social
  }
`

export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    bio,
    avatar,
    social
  }
`

export const categoriesQuery = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description
  }
`

export const tagsQuery = groq`
  *[_type == "tag"] | order(name asc) {
    _id,
    name,
    slug
  }
`

export const postsByCategoryQuery = groq`
  *[_type == "blogPost" && published == true && $category in categories[]->slug.current] | order(date desc) {
    _id,
    title,
    slug,
    date,
    author->{
      name,
      slug,
      avatar
    },
    excerpt,
    tags[]->{
      name,
      slug
    },
    categories[]->{
      name,
      slug
    },
    coverImage,
    readTime,
    published
  }
`

export const postsByTagQuery = groq`
  *[_type == "blogPost" && published == true && $tag in tags[]->slug.current] | order(date desc) {
    _id,
    title,
    slug,
    date,
    author->{
      name,
      slug,
      avatar
    },
    excerpt,
    tags[]->{
      name,
      slug
    },
    categories[]->{
      name,
      slug
    },
    coverImage,
    readTime,
    published
  }
`

export const postsByAuthorQuery = groq`
  *[_type == "blogPost" && published == true && author->slug.current == $author] | order(date desc) {
    _id,
    title,
    slug,
    date,
    author->{
      name,
      slug,
      avatar
    },
    excerpt,
    tags[]->{
      name,
      slug
    },
    categories[]->{
      name,
      slug
    },
    coverImage,
    readTime,
    published
  }
`
