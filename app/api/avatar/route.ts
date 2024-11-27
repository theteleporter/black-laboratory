import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const format = searchParams.get("format") || "svg"; // Default format is SVG

  if (!email) {
    return new NextResponse("Email is required", { status: 400 });
  }

  const generateColors = (input: string) => {
    const hash = input.split("").reduce((acc, char) => acc * 33 + char.charCodeAt(0), 5381);
    const baseHue = Math.abs(hash % 360);
    const offset = Math.abs((hash >> 3) % 45);
    const hue1 = (baseHue + offset) % 360;
    const hue2 = (baseHue + 120 + offset) % 360;

    const sat1 = 80 + Math.abs((hash >> 5) % 20);
    const light1 = 60 + Math.abs((hash >> 7) % 20);
    const sat2 = 90 + Math.abs((hash >> 8) % 10);
    const light2 = 65 + Math.abs((hash >> 9) % 15);

    return [
      `hsl(${hue1}, ${sat1}%, ${light1}%)`,
      `hsl(${hue2}, ${sat2}%, ${light2}%)`,
    ];
  };

  const [color1, color2] = generateColors(email);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color1}" />
          <stop offset="100%" stop-color="${color2}" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" fill="url(#gradient)" />
    </svg>
  `;

  if (format === "svg") {
    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=604800, immutable",
      },
    });
  }

  if (format === "png") {
    const buffer = await sharp(Buffer.from(svg))
      .png()
      .toBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=604800, immutable",
      },
    });
  }

  return new NextResponse("Unsupported format", { status: 400 });
}