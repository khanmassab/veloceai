'use client'

import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { getImageUrl } from '@/lib/sanity.image'

interface PortableTextRendererProps {
  content: any[]
}

const components = {
  types: {
    codeBlock: ({ value }: any) => (
      <div className="my-6">
        {value.filename && (
          <div className="bg-slate-800 text-gray-300 px-4 py-2 text-sm font-mono border-b border-slate-700">
            {value.filename}
          </div>
        )}
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
          <code className={`text-sm text-gray-300 language-${value.language || 'javascript'}`}>
            {value.code}
          </code>
        </pre>
      </div>
    ),
    image: ({ value }: any) => {
      const imageUrl = getImageUrl(value, 800)
      if (!imageUrl) return null
      
      return (
        <div className="my-6 relative w-full h-96">
          <Image
            src={imageUrl}
            alt={value.alt || ''}
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-white mb-6 mt-8 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-white mb-5 mt-7">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-white mb-4 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold text-white mb-3 mt-5">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-lg font-bold text-white mb-3 mt-4">
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="text-base font-bold text-white mb-2 mt-4">
        {children}
      </h6>
    ),
    normal: ({ children }: any) => (
      <p className="text-white leading-relaxed mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 bg-slate-800/50 pl-6 py-4 my-6 text-gray-300 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside text-white mb-4 space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside text-white mb-4 space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-white">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="text-white">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-white">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-slate-800 text-blue-300 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-blue-400 hover:text-blue-300 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
}

export default function PortableTextRenderer({ content }: PortableTextRendererProps) {
  if (!content) return null
  
  return (
    <div className="prose prose-invert max-w-none">
      <PortableText value={content} components={components} />
    </div>
  )
}
