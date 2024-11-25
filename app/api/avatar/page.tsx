import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get('email')

  if (!email) {
    return new NextResponse('Email is required', { status: 400 })
  }

  const generateColors = (input: string) => {
    const hue1 = (input.length * 40) % 360
    const hue2 = (hue1 + 60) % 360
    return [`hsl(${hue1}, 70%, 60%)`, `hsl(${hue2}, 70%, 60%)`]
  }

  const [color1, color2] = generateColors(email)

  const svg = `
    <svg width="280" height="280" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="140" cy="140" r="140" fill="url(#grad)" />
    </svg>
  `

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=604800, immutable',
    },
  })
}
