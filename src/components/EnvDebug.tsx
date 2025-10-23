'use client'

import { useState, useEffect } from 'react'

const EnvDebug = () => {
  const [envVars, setEnvVars] = useState<Record<string, string>>({})

  useEffect(() => {
    setEnvVars({
      'NEXT_PUBLIC_RECAPTCHA_SITE_KEY': process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'Not set',
      'NEXT_PUBLIC_SITE_URL': process.env.NEXT_PUBLIC_SITE_URL || 'Not set',
      'NEXT_PUBLIC_GA_ID': process.env.NEXT_PUBLIC_GA_ID || 'Not set',
    })
  }, [])

  // Only show in development or if NEXT_PUBLIC_DEBUG is set
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_DEBUG) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Environment Variables Debug:</h3>
      {Object.entries(envVars).map(([key, value]) => (
        <div key={key} className="mb-1">
          <span className="text-blue-300">{key}:</span>
          <span className="ml-2 text-yellow-300">
            {value === 'Not set' ? '❌ Not set' : '✅ Set'}
          </span>
        </div>
      ))}
      <div className="mt-2 text-gray-400">
        Domain: {typeof window !== 'undefined' ? window.location.hostname : 'SSR'}
      </div>
    </div>
  )
}

export default EnvDebug
