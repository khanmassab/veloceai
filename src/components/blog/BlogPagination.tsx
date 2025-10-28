'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  baseUrl?: string
  onPageChange?: (page: number) => void
}

export default function BlogPagination({ currentPage, totalPages, baseUrl, onPageChange }: BlogPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  if (totalPages <= 1) return null

  const handlePageChange = (page: number) => {
    // If onPageChange callback is provided, use it (client-side pagination)
    if (onPageChange) {
      onPageChange(page)
      return
    }
    
    // Otherwise, use router-based navigation (URL-based pagination)
    if (!baseUrl) return
    
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    
    const queryString = params.toString()
    const url = queryString ? `${baseUrl}?${queryString}` : baseUrl
    router.push(url)
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      {/* Previous Button */}
      <motion.button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
          currentPage === 1
            ? 'bg-slate-600/30 text-gray-500 cursor-not-allowed'
            : 'bg-slate-600/50 text-white hover:bg-slate-500/50 hover:scale-105'
        }`}
        whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
        whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </motion.button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-400">...</span>
            ) : (
              <motion.button
                onClick={() => handlePageChange(page as number)}
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-600/50 text-white hover:bg-slate-500/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {page}
              </motion.button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
          currentPage === totalPages
            ? 'bg-slate-600/30 text-gray-500 cursor-not-allowed'
            : 'bg-slate-600/50 text-white hover:bg-slate-500/50 hover:scale-105'
        }`}
        whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
        whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </motion.button>
    </div>
  )
}
