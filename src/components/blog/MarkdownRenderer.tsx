'use client'

import { useEffect, useState } from 'react'
import FAQSection, { parseFAQContent } from './FAQSection'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [htmlContent, setHtmlContent] = useState('')
  const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>([])

  useEffect(() => {
    if (!content) return

    // Parse FAQ content first
    const parsedFaqs = parseFAQContent(content)
    setFaqs(parsedFaqs)

    // Convert markdown to HTML
    let html = content

      // Convert headers
      html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-300 mb-4 mt-8 leading-tight relative pl-6 border-l-4 border-blue-400/50 hover:border-blue-400 transition-all duration-300 group"><span class="drop-shadow-lg shadow-blue-300/20 group-hover:shadow-blue-300/40 transition-all duration-300">$1</span><div class="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div></h3>')
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 mb-8 mt-12 leading-tight tracking-tight"><span class="drop-shadow-xl shadow-blue-400/30">$1</span></h2>')
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 mb-12 mt-16 first:mt-0 leading-tight tracking-tight"><span class="drop-shadow-2xl shadow-blue-500/50">$1</span></h1>')

    // Convert bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">$1</strong>')
    html = html.replace(/\*(.*?)\*/g, '<em class="italic text-blue-200 font-light">$1</em>')

    // Convert code
    html = html.replace(/`(.*?)`/g, '<code class="bg-gradient-to-r from-slate-800 to-slate-700 text-blue-300 px-3 py-1 rounded-lg text-sm font-mono border border-slate-600 shadow-lg">$1</code>')

    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline decoration-blue-400 hover:decoration-blue-300 transition-all duration-300 font-medium" target="_blank" rel="noopener noreferrer">$1</a>')

    // Convert paragraphs
    html = html.replace(/^(?!<[h1-6]|<ul|<ol|<li|<blockquote)(.*)$/gim, '<p class="text-white leading-relaxed mb-8 text-lg md:text-xl font-light">$1</p>')

    // Convert lists
    html = html.replace(/^\* (.*)$/gim, '<li class="text-white leading-relaxed flex items-start"><span class="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-3 mr-4 flex-shrink-0"></span><span class="flex-1">$1</span></li>')
    html = html.replace(/(<li class="text-white leading-relaxed flex items-start"><span class="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-3 mr-4 flex-shrink-0"><\/span><span class="flex-1">.*?<\/span><\/li>)/s, '<ul class="list-none text-white mb-8 space-y-4 text-lg md:text-xl font-light">$1</ul>')

    // Convert numbered lists
    html = html.replace(/^\d+\. (.*)$/gim, '<li class="text-white leading-relaxed flex items-start"><span class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 flex-shrink-0 mt-1"></span><span class="flex-1">$1</span></li>')
    html = html.replace(/(<li class="text-white leading-relaxed flex items-start"><span class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 flex-shrink-0 mt-1"><\/span><span class="flex-1">.*?<\/span><\/li>)/s, '<ol class="list-none text-white mb-8 space-y-4 text-lg md:text-xl font-light">$1</ol>')

    // Convert blockquotes
    html = html.replace(/^> (.*)$/gim, '<blockquote class="border-l-4 border-gradient-to-b from-blue-500 to-purple-500 bg-gradient-to-r from-slate-800/50 to-slate-700/50 pl-8 py-8 my-12 text-white italic rounded-r-xl shadow-xl"><div class="text-xl leading-relaxed font-light"><span class="text-4xl text-blue-400 mr-2">"</span>$1<span class="text-4xl text-blue-400 ml-2">"</span></div></blockquote>')

    // Remove FAQ section from HTML since we'll render it separately
    html = html.replace(/## FAQ\s*\n(.*?)(?=\n## |$)/gs, '')

    setHtmlContent(html)
  }, [content])

  if (!content) return null

  return (
    <div className="max-w-none">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      {faqs.length > 0 && <FAQSection faqs={faqs} title="FAQ" />}
    </div>
  )
}
