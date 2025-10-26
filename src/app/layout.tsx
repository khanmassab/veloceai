import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GlobalScrollProgress from '@/components/GlobalScrollProgress'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VeloceAI | Your Strategic Digital Solutions Partner',
  description: 'Transform customer support with AI digital solutions. Automate 70% of queries, reduce costs by 60%. Launch your intelligent chatbot in weeks. Free consultation.',
  keywords: ['digital solutions', 'AI chatbot', 'customer support automation', 'AI integration services', 'chatbot platform', 'automated customer service', 'AI digital solutions', 'customer support AI', 'intelligent automation', 'support automation'],
  authors: [{ name: 'VeloceAI' }],
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: 'AI Digital Solutions for Customer Support | VeloceAI',
    description: 'Transform customer support with AI digital solutions. Automate 70% of queries, reduce costs by 60%. Launch your intelligent chatbot in weeks.',
    url: 'https://www.veloceai.co/',
    siteName: 'VeloceAI',
    images: [
      {
        url: 'https://www.veloceai.co/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VeloceAI - AI Digital Solutions for Customer Support',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Digital Solutions for Customer Support | VeloceAI',
    description: 'Transform customer support with AI digital solutions. Automate 70% of queries, reduce costs by 60%. Launch your intelligent chatbot in weeks.',
    images: ['https://www.veloceai.co/twitter-image.jpg'],
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
  alternates: {
    canonical: 'https://www.veloceai.co/',
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
        <GlobalScrollProgress />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
