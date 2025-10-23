import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VeloceAI - AI Chatbot for Customer Support | 24/7 Automated Service',
  description: 'Transform your customer support with VeloceAI\'s intelligent chatbot. Automate 70% of queries, reduce costs by 60%, and delight customers 24/7. Perfect for startups and e-commerce.',
  keywords: ['AI chatbot', 'customer support', 'automation', '24/7 support', 'e-commerce', 'startup', 'customer service'],
  authors: [{ name: 'VeloceAI' }],
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: 'VeloceAI - AI Chatbot for Customer Support | 24/7 Automated Service',
    description: 'Transform your customer support with VeloceAI\'s intelligent chatbot. Automate 70% of queries, reduce costs by 60%, and delight customers 24/7. Perfect for startups and e-commerce.',
    url: 'https://veloceai.co',
    siteName: 'VeloceAI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VeloceAI - AI Support Bot Development',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VeloceAI - AI Chatbot for Customer Support | 24/7 Automated Service',
    description: 'Transform your customer support with VeloceAI\'s intelligent chatbot. Automate 70% of queries, reduce costs by 60%, and delight customers 24/7. Perfect for startups and e-commerce.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
          async
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
