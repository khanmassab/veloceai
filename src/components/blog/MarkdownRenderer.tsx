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

    // IMPORTANT: Convert tables FIRST before other conversions
    // This regex matches: | header | header |\n|--------|--------|\n| cell | cell |
    const tableRegex = /\|(.+)\|\n\|[\s:|-]+\|\n((?:\|.+\|\n?)+)/g
    html = html.replace(tableRegex, (match, headerRow, bodyRows) => {
      // Parse header cells
      const headers = headerRow.split('|')
        .map((cell: string) => cell.trim())
        .filter((cell: string) => cell)
      
      // Parse body rows
      const rows = bodyRows.trim().split('\n')
        .map((row: string) => 
          row.split('|')
            .map((cell: string) => cell.trim())
            .filter((cell: string) => cell)
        )
      
      // Build table HTML
      let tableHtml = '<div class="my-12 overflow-x-auto rounded-xl shadow-2xl border border-slate-700/50">'
      tableHtml += '<div class="inline-block min-w-full align-middle">'
      tableHtml += '<table class="min-w-full divide-y divide-slate-700/50">'
      
      // Header
      tableHtml += '<thead class="bg-gradient-to-r from-slate-800/90 to-slate-700/90"><tr>'
      headers.forEach((header: string) => {
        tableHtml += `<th class="px-6 py-4 text-left text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 uppercase tracking-wider border-b-2 border-blue-400/30">${header}</th>`
      })
      tableHtml += '</tr></thead>'
      
      // Body
      tableHtml += '<tbody class="bg-slate-900/40 divide-y divide-slate-700/30">'
      rows.forEach((row: string[]) => {
        tableHtml += '<tr class="hover:bg-slate-800/50 transition-colors duration-200">'
        row.forEach((cell: string) => {
          tableHtml += `<td class="px-6 py-4 text-base text-white leading-relaxed">${cell}</td>`
        })
        tableHtml += '</tr>'
      })
      tableHtml += '</tbody>'
      
      tableHtml += '</table></div></div>'
      return tableHtml
    })

    // Convert side-by-side sections (content + image between ---)
    // Store them temporarily with unique markers
    const sxsPattern = /---\s*\n([\s\S]*?)!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]+)")?\)\s*\n---/g
    html = html.replace(sxsPattern, (match, contentPart, alt, url, title) => {
      // Use base64 encoding to preserve special characters
      const encodedContent = Buffer.from(contentPart.trim()).toString('base64')
      return `__SXS_START__${encodedContent}__SXS_IMG__${alt}__SXS_URL__${url}__SXS_TITLE__${title || alt}__SXS_END__`
    })

    // Convert remaining horizontal rules (any --- not part of side-by-side sections)
    html = html.replace(/---/g, '<hr class="my-12 border-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />')

    // Convert headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-300 mb-4 mt-8 leading-tight relative pl-6 border-l-4 border-blue-400/50 hover:border-blue-400 transition-all duration-300 group"><span>$1</span><div class="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div></h3>')
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 mb-8 mt-12 leading-tight tracking-tight"><span>$1</span></h2>')
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 mb-12 mt-16 first:mt-0 leading-tight tracking-tight"><span>$1</span></h1>')
    
    // Detect and wrap CTA sections (AFTER headers are converted)
    // Pattern: <h2>Ready to ... or <h2>Contact or <h2>Get Started
    const ctaPattern = /(<h2[^>]*>(?:Ready|Contact|Get Started|Ship|Let's|Start)[\s\S]*?<\/h2>[\s\S]*?)(?=<h2|$)/gi
    html = html.replace(ctaPattern, (match) => {
      return `__CTA_START__${match}__CTA_END__`
    })

    // Convert bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">$1</strong>')
    html = html.replace(/\*(.*?)\*/g, '<em class="italic text-blue-200 font-light">$1</em>')

    // Convert code
    html = html.replace(/`(.*?)`/g, '<code class="bg-gradient-to-r from-slate-800 to-slate-700 text-blue-300 px-3 py-1 rounded-lg text-sm font-mono border border-slate-600 shadow-lg">$1</code>')

    // Convert standalone images to full-width display (NOT in --- blocks)
    html = html.replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]+)")?\)/g, (match, alt, url, title) => {
      const displayText = title || alt
      return `<div class="my-8 w-full"><div class="relative overflow-hidden rounded-2xl shadow-xl border border-slate-700/50"><img src="${url}" alt="${alt}" class="w-full h-auto object-contain max-h-[500px]" loading="lazy" /></div>${displayText ? `<p class="mt-3 text-center text-sm text-gray-400 italic">${displayText}</p>` : ''}</div>`
    })
    
    // Convert links (after images)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline decoration-blue-400 hover:decoration-blue-300 transition-all duration-300 font-medium" target="_blank" rel="noopener noreferrer">$1</a>')

    // Convert blockquotes (before paragraphs)
    html = html.replace(/^> (.*)$/gim, '<blockquote class="border-l-4 border-gradient-to-b from-blue-500 to-purple-500 bg-gradient-to-r from-slate-800/50 to-slate-700/50 pl-8 py-8 my-12 text-white italic rounded-r-xl shadow-xl"><div class="text-xl leading-relaxed font-light"><span class="text-4xl text-blue-400 mr-2">"</span>$1<span class="text-4xl text-blue-400 ml-2">"</span></div></blockquote>')

    // Convert numbered lists (before paragraphs)
    html = html.replace(/^(\d+)\.\s+(.*)$/gim, '<li class="text-white leading-relaxed flex items-start"><span class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 flex-shrink-0 mt-1">$1</span><span class="flex-1">$2</span></li>')
    html = html.replace(/(<li class="text-white leading-relaxed flex items-start"><span class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 flex-shrink-0 mt-1">\d+<\/span><span class="flex-1">.*?<\/span><\/li>\n?)+/gs, (match) => {
      return `<ol class="list-none text-white mb-8 space-y-4 text-lg md:text-xl font-light mt-0">${match}</ol>`
    })

    // Convert bullet lists (before paragraphs)
    html = html.replace(/^\*\s+(.*)$/gim, '<li class="text-white leading-relaxed flex items-start"><span class="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-3 mr-4 flex-shrink-0"></span><span class="flex-1">$1</span></li>')
    html = html.replace(/(<li class="text-white leading-relaxed flex items-start"><span class="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-3 mr-4 flex-shrink-0"><\/span><span class="flex-1">.*?<\/span><\/li>\n?)+/gs, (match) => {
      return `<ul class="list-none text-white mb-8 space-y-4 text-lg md:text-xl font-light mt-0">${match}</ul>`
    })

    // Convert paragraphs (LAST - after all other block elements)
    // Skip empty lines or lines that are only whitespace or markers
    html = html.replace(/^(?!<[h1-6]|<ul|<ol|<li|<blockquote|<div|<table|<hr|<img|.*__SXS|.*__CTA)(.+)$/gim, '<p class="text-white leading-relaxed mb-8 text-lg md:text-xl font-light">$1</p>')
    
    // Remove empty paragraphs
    html = html.replace(/<p class="[^"]*">\s*<\/p>/g, '')
    
    // Process CTA sections (after markdown conversion, before side-by-side)
    html = html.replace(/__CTA_START__([\s\S]*?)__CTA_END__/g, (match, content) => {
      // Remove the ## marker if it's still there
      const cleanContent = content.replace(/^##\s+/gm, '')
      
      return `<div class="my-12 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-2xl"></div>
        <div class="relative bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 shadow-xl p-6 md:p-8">
          <div class="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl -z-10"></div>
          <div class="max-w-3xl mx-auto cta-content space-y-4">
            ${cleanContent}
          </div>
        </div>
      </div>`
    })
    
    // Now process side-by-side sections (after ALL markdown is converted)
    html = html.replace(/__SXS_START__(.*?)__SXS_IMG__(.*?)__SXS_URL__(.*?)__SXS_TITLE__(.*?)__SXS_END__/g, (match, encodedContent, alt, url, title) => {
      // Decode the content
      const decodedContent = Buffer.from(encodedContent, 'base64').toString('utf-8')
      
      // Convert the decoded markdown content to HTML
      let convertedContent = decodedContent
      
      // Remove any stray --- markers first
      convertedContent = convertedContent.replace(/^---\s*$/gm, '')
      
      // Bold and italic (FIRST - process inline formatting before block elements)
      convertedContent = convertedContent.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">$1</strong>')
      convertedContent = convertedContent.replace(/\*([^*\n]+)\*/g, '<em class="italic text-blue-200">$1</em>')
      
      // Links (before other block conversions)
      convertedContent = convertedContent.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline decoration-blue-400 hover:decoration-blue-300 transition-all duration-300 font-medium" target="_blank" rel="noopener noreferrer">$1</a>')
      
      // Headers
      convertedContent = convertedContent.replace(/^### (.*$)/gim, '<h3 class="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-300 mb-4 mt-0 leading-tight relative pl-6 border-l-4 border-blue-400/50 hover:border-blue-400 transition-all duration-300 group"><span>$1</span></h3>')
      convertedContent = convertedContent.replace(/^## (.*$)/gim, '<h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 mb-4 mt-0 leading-tight tracking-tight"><span>$1</span></h2>')
      
      // Blockquotes
      convertedContent = convertedContent.replace(/^> (.*)$/gim, '<blockquote class="border-l-4 border-gradient-to-b from-blue-500 to-purple-500 bg-gradient-to-r from-slate-800/50 to-slate-700/50 pl-6 py-4 my-4 text-white italic rounded-r-xl shadow-xl"><div class="text-base leading-relaxed font-light"><span class="text-2xl text-blue-400 mr-2">"</span>$1<span class="text-2xl text-blue-400 ml-2">"</span></div></blockquote>')
      
      // Numbered lists
      convertedContent = convertedContent.replace(/^(\d+)\.\s+(.*)$/gim, '<li class="text-white leading-relaxed flex items-start"><span class="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 flex-shrink-0 mt-1">$1</span><span class="flex-1">$2</span></li>')
      convertedContent = convertedContent.replace(/(<li class="text-white leading-relaxed flex items-start"><span class="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 flex-shrink-0 mt-1">\d+<\/span><span class="flex-1">.*?<\/span><\/li>\n?)+/gs, (match) => {
        return `<ol class="list-none text-white mb-4 space-y-2 text-base">${match}</ol>`
      })
      
      // Bullet lists
      convertedContent = convertedContent.replace(/^- (.*$)/gim, '<li class="text-white leading-relaxed flex items-start"><span class="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span class="flex-1">$1</span></li>')
      convertedContent = convertedContent.replace(/(<li class="text-white leading-relaxed flex items-start"><span class="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"><\/span><span class="flex-1">.*?<\/span><\/li>\n?)+/gs, (match) => {
        return `<ul class="list-none text-white mb-4 space-y-2 text-base">${match}</ul>`
      })
      
      // Paragraphs (LAST - only wrap lines that aren't already HTML)
      convertedContent = convertedContent.replace(/^(?!<)(.+)$/gim, '<p class="text-white leading-relaxed mb-4 text-base">$1</p>')
      
      // Remove empty paragraphs
      convertedContent = convertedContent.replace(/<p class="[^"]*">\s*<\/p>/g, '')
      
      return `<div class="my-12 w-full"><div class="flex flex-col lg:flex-row gap-8 items-start"><div class="w-full lg:w-1/2 flex flex-col justify-center"><div class="sxs-content-area">${convertedContent}</div></div><div class="w-full lg:w-1/2 relative group"><div class="relative overflow-hidden rounded-2xl shadow-xl"><img src="${url}" alt="${alt}" class="w-full h-auto object-contain max-h-[600px] transition-all duration-500 group-hover:scale-105" loading="lazy" /></div>${title ? `<p class="mt-4 text-center text-sm text-gray-400 italic">${title}</p>` : ''}</div></div></div>`
    })
    
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
