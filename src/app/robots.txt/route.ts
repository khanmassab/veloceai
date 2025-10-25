export const dynamic = 'force-static'

export async function GET() {
  const robots = `User-agent: *
Disallow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Anthropic
Allow: /

User-agent: claude-ai
Allow: /

User-agent: Anthropic-AI
Allow: /
`

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}