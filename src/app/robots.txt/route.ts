export const dynamic = 'force-static'

export async function GET() {
  const robots = `User-agent: *
Disallow: /

User-agent: Claude-Web
Allow: /

User-agent: Anthropic
Allow: /

User-agent: claude-ai
Allow: /

User-agent: Claude-Web-Search
Allow: /

User-agent: Claude-Web-Search-Preview-* 
Allow: /

User-agent: ClaudeBot
Allow: /
`

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
