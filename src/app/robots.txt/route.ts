export const dynamic = 'force-static'

export async function GET() {
  const robots = `User-agent: *
Disallow: /
`

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
