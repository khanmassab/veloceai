export const dynamic = 'force-static'

export async function GET() {
  const robots = `User-agent: *
  Allow: /
`

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}