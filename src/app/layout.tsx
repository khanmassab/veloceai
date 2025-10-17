import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VeloceAI - Ship AI features in weeks, not quarters',
  description: 'Ship your AI support bot in 6 weeks. We build production-ready AI features while your competitors are still hiring teams.',
  keywords: ['AI', 'support bot', 'automation', 'machine learning', 'customer service'],
  authors: [{ name: 'VeloceAI' }],
  openGraph: {
    title: 'VeloceAI - Ship AI features in weeks, not quarters',
    description: 'Ship your AI support bot in 6 weeks. We build production-ready AI features while your competitors are still hiring teams.',
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
    title: 'VeloceAI - Ship AI features in weeks, not quarters',
    description: 'Ship your AI support bot in 6 weeks. We build production-ready AI features while your competitors are still hiring teams.',
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
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
          async
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                if (typeof hljs !== 'undefined') {
                  hljs.highlightAll();
                } else {
                  // Fallback: try again after a short delay
                  setTimeout(function() {
                    if (typeof hljs !== 'undefined') {
                      hljs.highlightAll();
                    }
                  }, 100);
                }
              });
              
              // Also run on window load as backup
              window.addEventListener('load', function() {
                if (typeof hljs !== 'undefined') {
                  hljs.highlightAll();
                }
              });
            `,
          }}
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
