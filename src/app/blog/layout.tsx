import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - VeloceAI',
  description: 'AI support bot development insights, best practices, and industry trends from the VeloceAI team.',
  openGraph: {
    title: 'Blog - VeloceAI',
    description: 'AI support bot development insights, best practices, and industry trends from the VeloceAI team.',
    url: 'https://veloceai.co/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
