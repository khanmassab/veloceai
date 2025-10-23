/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel configuration - no output export needed
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['cdn.sanity.io', 'images.unsplash.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://www.google.com https://www.gstatic.com https://www.recaptcha.net https://core.sanity-cdn.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: https://www.gstatic.com https://cdn.sanity.io",
              "connect-src 'self' https://www.google.com https://www.recaptcha.net https://*.api.sanity.io https://*.sanity.io",
              "frame-src 'self' https://www.google.com https://www.recaptcha.net",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          }
        ]
      }
    ]
  },
  env: {
    // Public environment variables (accessible in browser)
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://veloceai.co',
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
  // Server-side environment variables (only accessible during build)
  serverRuntimeConfig: {
    // These will be available in API routes
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  },
}

module.exports = nextConfig
