import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const headers = Object.fromEntries(request.headers.entries())
    
    console.log('Webhook test received:', {
      body,
      headers,
      url: request.url,
      method: request.method
    })
    
    return NextResponse.json({ 
      message: 'Webhook test successful',
      received: {
        body,
        headers: {
          'content-type': headers['content-type'],
          'user-agent': headers['user-agent'],
          'x-sanity-webhook-secr': headers['x-sanity-webhook-secr']
        },
        url: request.url
      }
    })
  } catch (err) {
    console.error('Webhook test error:', err)
    return NextResponse.json({ 
      message: 'Webhook test failed',
      error: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook test endpoint is working',
    timestamp: new Date().toISOString()
  })
}
