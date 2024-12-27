import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage } from "canvas";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const format = searchParams.get("format") || "png";

  if (!email) {
    return new NextResponse("Email is required", { status: 400 });
  }

  const generateColors = (input: string) => {
    const timestamp = Date.now().toString();
    const combinedInput = input + timestamp;

    const hash = combinedInput.split("").reduce((acc, char, index) => {
      return Math.imul(31, acc) + char.charCodeAt(0) + index;
    }, 0);

    const hue1 = Math.abs(hash % 360);
    const hue2 = (hue1 + 137) % 360;
    const hue3 = (hue2 + 137) % 360;

    return [
      `hsl(${hue1}, ${85 + hash % 15}%, ${50 + (hash % 20)}%)`,
      `hsl(${hue2}, ${90 + hash % 10}%, ${45 + (hash % 25)}%)`,
      `hsl(${hue3}, ${80 + hash % 20}%, ${55 + (hash % 15)}%)`,
    ];
  };

  const [color1, color2, color3] = generateColors(email);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color1}" />
          <stop offset="50%" stop-color="${color2}" />
          <stop offset="100%" stop-color="${color3}" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" fill="url(#gradient)" />
    </svg>
  `;

  if (format === "svg") {
    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }

  if (format === "png") {
    const canvas = createCanvas(120, 120);
    const ctx = canvas.getContext("2d");

    const svgBuffer = Buffer.from(svg);
    const image = await loadImage(`data:image/svg+xml;base64,${svgBuffer.toString("base64")}`);

    ctx.drawImage(image, 0, 0, 120, 120);

    const pngBuffer = canvas.toBuffer("image/png");
    return new NextResponse(pngBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }

  return new NextResponse("Unsupported format", { status: 400 });
}

