'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
  title?: string
}

export default function FAQSection({ faqs, title = "FAQ" }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const toggleAll = () => {
    if (openItems.size === faqs.length) {
      setOpenItems(new Set())
    } else {
      setOpenItems(new Set(faqs.map((_, index) => index)))
    }
  }

  if (!faqs || faqs.length === 0) return null

  return (
    <div className="my-8 bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-slate-700/50 to-slate-800/50 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
            {title}
          </h3>
          <button
            onClick={toggleAll}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium px-3 py-1 rounded-md hover:bg-blue-400/10"
          >
            {openItems.size === faqs.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="divide-y divide-slate-700/50">
        {faqs.map((faq, index) => {
          const isOpen = openItems.has(index)
          
          return (
            <div key={index} className="transition-all duration-200">
              {/* Question */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left hover:bg-slate-700/30 transition-colors focus:outline-none focus:bg-slate-700/30 group"
                aria-expanded={isOpen}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-white pr-4 group-hover:text-blue-100 transition-colors">
                    {faq.question}
                  </h4>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    )}
                  </div>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <div className="text-white leading-relaxed prose prose-invert max-w-none prose-p:text-white prose-strong:text-white prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 prose-ul:text-white prose-ol:text-white prose-li:text-white">
                    <div dangerouslySetInnerHTML={{ __html: formatAnswerText(faq.answer) }} />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Helper function to parse FAQ content from markdown-style text
export function parseFAQContent(content: string): FAQItem[] {
  const faqs: FAQItem[] = []
  
  console.log('parseFAQContent - input content:', content.substring(0, 500))
  
  // Split content by FAQ section - look for any H2 with FAQ
  const faqSectionMatch = content.match(/## FAQ\s*\n(.*?)(?=\n## |$)/s)
  if (!faqSectionMatch) {
    console.log('No FAQ section found in content')
    return faqs
  }
  
  const faqContent = faqSectionMatch[1]
  console.log('FAQ content found:', faqContent.substring(0, 300))
  
  // Split by question headers (###)
  const questionMatches = faqContent.match(/### (.+?)\n\n(.+?)(?=\n### |$)/gs)
  
  if (questionMatches) {
    console.log('Found question matches:', questionMatches.length)
    questionMatches.forEach((match, index) => {
      const lines = match.trim().split('\n')
      if (lines.length >= 2) {
        const question = lines[0].replace(/^### /, '').trim()
        const answer = lines.slice(1).join('\n').trim()
        
        if (question && answer) {
          faqs.push({ question, answer })
          console.log(`Added FAQ ${index + 1}:`, question)
        }
      }
    })
  } else {
    console.log('No question matches found in FAQ content')
  }
  
  console.log('Final FAQs array:', faqs.length)
  return faqs
}

// Helper function to convert plain text to HTML with proper formatting
function formatAnswerText(text: string): string {
  // Convert line breaks to <br> tags
  let formatted = text.replace(/\n/g, '<br>')
  
  // Convert bold text (**text** to <strong>text</strong>)
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  // Convert italic text (*text* to <em>text</em>)
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // Convert links [text](url) to <a href="url">text</a>
  formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')
  
  return formatted
}
