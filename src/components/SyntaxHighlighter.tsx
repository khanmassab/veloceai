'use client'

import { useEffect } from 'react'

export default function SyntaxHighlighter() {
  useEffect(() => {
    const loadHighlightJS = async () => {
      try {
        // Load highlight.js dynamically
        const hljs = await import('highlight.js')
        
        // Configure highlight.js
        hljs.default.configure({
          languages: ['javascript', 'typescript', 'python', 'java', 'css', 'html', 'json', 'bash', 'sql', 'yaml', 'markdown']
        })
        
        // Apply highlighting to all code blocks
        hljs.default.highlightAll()
        
        // Also try to highlight any dynamically added content
        const observer = new MutationObserver(() => {
          hljs.default.highlightAll()
        })
        
        observer.observe(document.body, {
          childList: true,
          subtree: true
        })
        
        return () => observer.disconnect()
      } catch (error) {
        console.warn('Failed to load highlight.js:', error)
      }
    }
    
    loadHighlightJS()
  }, [])

  return null
}
