'use client'

import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { getImageUrl } from '@/lib/sanity.image'
import FAQSection, { parseFAQContent } from './FAQSection'

interface PortableTextRendererProps {
  content: any[]
}

const components = {
  types: {
    ctaSection: ({ value }: any) => {
      // Extract content from the CTA section
      const content = value.content || []
      
      return (
        <div className="my-16 relative overflow-hidden">
          {/* Background gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-800/50 to-slate-700/50 rounded-3xl"></div>
          
          {/* Content */}
          <div className="relative bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-600/50 shadow-2xl p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl -z-10"></div>
            
            <div className="max-w-4xl mx-auto">
              {/* Render content with custom components */}
              <div className="cta-content space-y-6">
                {content.map((block: any, index: number) => {
                  // H2 Heading
                  if (block.style === 'h2') {
                    return (
                      <h2 key={index} className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 mb-6 leading-tight">
                        {block.children?.map((child: any) => child.text).join('')}
                      </h2>
                    )
                  }
                  
                  // Normal paragraph
                  if (block.style === 'normal' && !block.listItem) {
                    return (
                      <p key={index} className="text-xl md:text-2xl text-white mb-6 leading-relaxed">
                        {block.children?.map((child: any) => child.text).join('')}
                      </p>
                    )
                  }
                  
                  // List items with links
                  if (block.listItem === 'bullet') {
                    const children = block.children || []
                    const markDefs = block.markDefs || []
                    
                    // Extract all parts: before link, link, after link
                    let beforeText = ''
                    let linkHref = ''
                    let linkText = ''
                    let afterLinkText = ''
                    let foundLink = false
                    
                    children.forEach((child: any) => {
                      const text = child.text || ''
                      
                      // Check if this child has a link mark
                      if (child.marks && Array.isArray(child.marks)) {
                        const linkMarkKey = child.marks.find((markKey: string) => {
                          const mark = markDefs.find((def: any) => def._key === markKey)
                          return mark && mark._type === 'link'
                        })
                        
                        if (linkMarkKey) {
                          const linkMark = markDefs.find((def: any) => def._key === linkMarkKey)
                          if (linkMark && linkMark.href) {
                            linkHref = linkMark.href
                            linkText = text
                            foundLink = true
                            return
                          }
                        }
                      }
                      
                      // Regular text
                      if (!foundLink) {
                        beforeText += text
                      } else {
                        afterLinkText += text
                      }
                    })
                    
                    if (linkHref && linkText) {
                      // Render as regular link with bullet
                      return (
                        <div key={index} className="flex items-start my-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                          <p className="text-white text-lg">
                            {beforeText}
                            <a
                              href={linkHref}
                              className="text-blue-400 hover:text-blue-300 underline decoration-blue-400 hover:decoration-blue-300 transition-all duration-300 font-medium"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {linkText}
                            </a>
                            {afterLinkText && <span>{afterLinkText}</span>}
                          </p>
                        </div>
                      )
                    }
                    
                    // No link found, render as regular bullet
                    const fullText = children.map((child: any) => child.text || '').join('')
                    if (fullText) {
                      return (
                        <div key={index} className="flex items-start my-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                          <p className="text-white text-lg">{fullText}</p>
                        </div>
                      )
                    }
                  }
                  
                  return null
                })}
              </div>
            </div>
          </div>
        </div>
      )
    },
    codeBlock: ({ value }: any) => (
      <div className="my-8">
        {value.filename && (
          <div className="bg-slate-800 text-white px-4 py-2 text-sm font-mono border-b border-slate-700 rounded-t-lg">
            {value.filename}
          </div>
        )}
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-6 overflow-x-auto">
          <code className={`text-sm text-white language-${value.language || 'javascript'}`}>
            {value.code}
          </code>
        </pre>
      </div>
    ),
    image: ({ value }: any) => {
      const imageUrl = getImageUrl(value, 1400)
      if (!imageUrl) return null
      
      return (
        <div className="my-12 w-full">
          {/* Modern Side-by-Side Layout */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Image Container */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={imageUrl}
                  alt={value.alt || ''}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              {value.alt && (
                <div className="space-y-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <p className="text-white text-lg leading-relaxed">
                    {value.alt}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    },
    faqSection: ({ value }: any) => {
      const faqs = parseFAQContent(value.content || '')
      
      // If parsing failed, try to create FAQs from the structured data
      if (faqs.length === 0 && value.faqs && Array.isArray(value.faqs)) {
        return <FAQSection faqs={value.faqs} title={value.title || 'FAQ'} />
      }
      
      return <FAQSection faqs={faqs} title={value.title || 'FAQ'} />
    },
    h2WithH3s: ({ value }: any) => {
      const style = value.style || 0
      const { h2Title, h3Sections } = value
      
      // Check if any section has lists or images - if so, skip box designs
      const hasListsOrImages = h3Sections.some((section: any) => {
        if (!section.content || !Array.isArray(section.content)) return false
        
        return section.content.some((block: any) => {
          // Check for lists (bullet or number)
          if (block.listItem === 'bullet' || block.listItem === 'number') return true
          // Check for images
          if (block._type === 'image') return true
          // Check for image grid
          if (block._type === 'imageGrid') return true
          
          return false
        })
      })
      
      // If has lists or images, use simple layout
      if (hasListsOrImages) {
        return (
          <div className="my-12">
            <div className="space-y-8">
              {h3Sections.map((section: any, index: number) => (
                <div key={index} className="group">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-300 mb-4 leading-tight relative pl-6 border-l-4 border-blue-400/50 hover:border-blue-400 transition-all duration-300">
                    {section.title}
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </h3>
                  <div className="ml-6 pl-6 border-l-2 border-slate-600/30 hover:border-slate-500/50 transition-colors duration-300">
                    <PortableText value={section.content} components={components} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
      
      // Check if any section has long content (more than 400 characters)
      const hasLongContent = h3Sections.some((section: any) => {
        const contentLength = JSON.stringify(section.content).length
        return contentLength > 400
      })
      
      // Style 0: Grid Layout - Modern card grid (responsive 1-2-4 columns)
      if (style === 0) {
        // If content is too long, use 2-column max layout for better readability
        const gridCols = hasLongContent 
          ? "grid grid-cols-1 md:grid-cols-2 gap-6"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        
        return (
          <div className="my-12">
            <div className={gridCols}>
              {h3Sections.map((section: any, index: number) => (
                <div key={index} className="group bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-blue-500/20 flex flex-col h-full">
                  <div className="p-6 flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300 mb-4 leading-tight">
                      {section.title}
                    </h3>
                    <div className="text-white leading-relaxed">
                      <PortableText value={section.content} components={components} />
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              ))}
            </div>
          </div>
        )
      }
      
      // Style 1: Vertical Stack Layout - Better for long content
      if (style === 1) {
        return (
          <div className="my-12">
            <div className="flex flex-col space-y-6">
              {h3Sections.map((section: any, index: number) => (
                <div key={index} className="group flex flex-col bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-xl border border-slate-600/50 hover:border-blue-400/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-blue-500/20">
                  <div className="p-6 border-b border-slate-600/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                    <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300 leading-tight">
                      {section.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="text-white leading-relaxed">
                      <PortableText value={section.content} components={components} />
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              ))}
            </div>
          </div>
        )
      }
      
      // Style 2: Two-Column Balanced Layout - Good for medium content
      if (style === 2) {
        return (
          <div className="my-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {h3Sections.map((section: any, index: number) => (
                <div key={index} className="group bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 flex flex-col h-full">
                  <div className="relative p-6 flex-1">
                    <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300 mb-4 leading-tight pr-8">
                      {section.title}
                    </h3>
                    <div className="text-white leading-relaxed">
                      <PortableText value={section.content} components={components} />
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              ))}
            </div>
          </div>
        )
      }
      
      // Fallback to simple list
      return (
        <div className="my-12">
          <div className="space-y-6">
            {h3Sections.map((section: any, index: number) => (
              <div key={index} className="group">
                <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-300 mb-4 leading-tight pl-6 border-l-4 border-blue-400/50 hover:border-blue-400 transition-all duration-300">
                  {section.title}
                </h3>
                <div className="ml-6 pl-6 border-l-2 border-slate-600/30 hover:border-slate-500/50 transition-colors duration-300">
                  <PortableText value={section.content} components={components} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    imageGrid: ({ value }: any) => {
      const images = value.images || []
      if (!images.length) return null
      
      return (
        <div className="my-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image: any, index: number) => {
              const imageUrl = getImageUrl(image, 800)
              if (!imageUrl) return null
              
              return (
                <div key={index} className="group relative">
                  <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                    <Image
                      src={imageUrl}
                      alt={image.alt || ''}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  {image.alt && (
                    <p className="mt-3 text-sm text-white text-center italic">
                      {image.alt}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 mb-12 mt-16 first:mt-0 leading-tight tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 mb-8 mt-12 leading-tight tracking-tight">
        {children}
      </h2>
    ),
        h3: ({ children }: any) => (
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-300 mb-4 mt-8 leading-tight relative pl-6 border-l-4 border-blue-400/50 hover:border-blue-400 transition-all duration-300 group">
            {children}
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </h3>
        ),
    h4: ({ children }: any) => (
      <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-200 mb-5 mt-8 leading-tight">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-100 mb-4 mt-6 leading-tight">
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="text-base md:text-lg lg:text-xl font-bold text-blue-100 mb-3 mt-5 leading-tight">
        {children}
      </h6>
    ),
        normal: ({ children }: any) => (
          <p className="text-white leading-relaxed mb-8 text-lg md:text-xl">
            {children}
          </p>
        ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gradient-to-b from-blue-500 to-purple-500 bg-gradient-to-r from-slate-800/50 to-slate-700/50 pl-8 py-8 my-12 text-white italic rounded-r-xl shadow-xl">
        <div className="text-xl leading-relaxed">
          <span className="text-4xl text-blue-400 mr-2">"</span>
          {children}
          <span className="text-4xl text-blue-400 ml-2">"</span>
        </div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-none text-white mb-8 space-y-4 text-lg md:text-xl">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-none text-white mb-8 space-y-4 text-lg md:text-xl">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-white leading-relaxed flex items-start">
        <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-3 mr-4 flex-shrink-0"></span>
        <span className="flex-1">{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-white leading-relaxed flex items-start">
        <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 flex-shrink-0 mt-1">
          {/* This will be replaced by the actual number */}
        </span>
        <span className="flex-1">{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-blue-200">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gradient-to-r from-slate-800 to-slate-700 text-blue-300 px-3 py-1 rounded-lg text-sm font-mono border border-slate-600 shadow-lg">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-blue-400 hover:text-blue-300 underline decoration-blue-400 hover:decoration-blue-300 transition-all duration-300 font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
}

// Custom component to handle H3 sections with content grouping and H2-based styling
function ContentWithGroupedSections({ content }: { content: any[] }) {
  if (!content || !Array.isArray(content)) {
    return <PortableText value={content} components={components} />
  }

  const processedContent = []
  let i = 0
  let h2StyleIndex = 0 // Track which H2 style to use for its H3s
  
  while (i < content.length) {
    const block = content[i]
    
    // Check if this is a CTA section (last H2 with "ready" or "ship" in title)
    if (block && block.style === 'h2' && 
        block.children && 
        block.children[0]?.text) {
      const h2Text = block.children[0].text.toLowerCase()
      const isCTA = (h2Text.includes('ready') || h2Text.includes('ship') || h2Text.includes('contact') || h2Text.includes('get started'))
      
      if (isCTA) {
        // Collect all content until the end or next H2
        const ctaContent = [block]
        let currentIndex = i + 1
        
        while (currentIndex < content.length) {
          const currentBlock = content[currentIndex]
          if (currentBlock && currentBlock.style === 'h2') {
            break
          }
          ctaContent.push(currentBlock)
          currentIndex++
        }
        
        // Add CTA section component
        processedContent.push({
          _type: 'ctaSection',
          _key: `cta-${i}`,
          content: ctaContent
        })
        
        i = currentIndex
        continue
      }
    }
    
    // Check if this is an FAQ section - skip H2-H3 grouping for FAQ
    if (block && block.style === 'h2' && 
        block.children && 
        block.children[0]?.text && 
        block.children[0].text.toLowerCase().includes('faq')) {
      
      // Find all h3 blocks that follow this h2 (FAQ questions)
      const faqBlocks = []
      let currentIndex = i + 1
      
      while (currentIndex < content.length) {
        const currentBlock = content[currentIndex]
        if (currentBlock && currentBlock.style === 'h3') {
          // This is a question, find the answer (next normal block)
          const answerBlock = content[currentIndex + 1]
          if (answerBlock && answerBlock.style === 'normal') {
            const question = currentBlock.children?.[0]?.text || ''
            const answer = answerBlock.children?.map((child: any) => child.text || '').join('') || ''
            
            if (question && answer) {
              faqBlocks.push({ question, answer })
            }
            currentIndex += 2 // Skip both question and answer
          } else {
            currentIndex++
          }
        } else if (currentBlock && currentBlock.style === 'h2') {
          // Found another h2, stop processing FAQ
          break
        } else {
          currentIndex++
        }
      }
      
      if (faqBlocks.length > 0) {
        // Add FAQ section component with structured data
        processedContent.push({
          _type: 'faqSection',
          _key: `faq-${i}`,
          title: 'FAQ',
          faqs: faqBlocks, // Pass structured FAQ data directly
          content: faqBlocks.map(faq => 
            `### ${faq.question}\n\n${faq.answer}`
          ).join('\n\n')
        })
        
        // Skip the processed FAQ blocks
        i = currentIndex
      } else {
        i++
      }
    }
    // Check if this is a regular H2 heading
    else if (block && block.style === 'h2') {
      // Add the H2 heading
      processedContent.push(block)
      
      // Find all H3s that belong to this H2
      const h3Sections = []
      let currentIndex = i + 1
      
      while (currentIndex < content.length) {
        const currentBlock = content[currentIndex]
        
        if (currentBlock && currentBlock.style === 'h3') {
          // Found an H3, collect its content
          const sectionContent = []
          let sectionIndex = currentIndex + 1
          
          // Collect content until next heading
          while (sectionIndex < content.length) {
            const sectionBlock = content[sectionIndex]
            if (sectionBlock && (sectionBlock.style === 'h1' || sectionBlock.style === 'h2' || sectionBlock.style === 'h3')) {
              break
            }
            sectionContent.push(sectionBlock)
            sectionIndex++
          }
          
          h3Sections.push({
            title: currentBlock.children?.[0]?.text || '',
            content: sectionContent
          })
          
          currentIndex = sectionIndex
        } else if (currentBlock && currentBlock.style === 'h2') {
          // Found another H2, stop processing
          break
        } else {
          // Regular content, add it
          processedContent.push(currentBlock)
          currentIndex++
        }
      }
      
      // If we found H3s, create a grouped H2 section
      if (h3Sections.length > 0) {
        const h2Style = h2StyleIndex % 3
        h2StyleIndex++
        
        processedContent.push({
          _type: 'h2WithH3s',
          _key: `h2-section-${i}`,
          h2Title: block.children?.[0]?.text || '',
          h3Sections: h3Sections,
          style: h2Style
        })
      }
      
      i = currentIndex
    } else {
      processedContent.push(block)
      i++
    }
  }
  
  return <PortableText value={processedContent} components={components} />
}


export default function PortableTextRenderer({ content }: PortableTextRendererProps) {
  if (!content) return null
  
  return (
    <div className="max-w-none">
      <ContentWithGroupedSections content={content} />
    </div>
  )
}
