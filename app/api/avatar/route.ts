import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage } from "canvas";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const format = searchParams.get("format") || "png"; // Default format is PNG

  if (!email) {
    return new NextResponse("Email is required", { status: 400 });
  }

  // Generate colors using djb2 hash and triadic HSL
  const generateColors = (input: string) => {
    // djb2 hash algorithm
    const hash = input.split("").reduce((acc, char) => acc * 33 + char.charCodeAt(0), 5381);

    // Generate base hue and triadic hues
    const baseHue = Math.abs(hash % 360); // Base hue
    const hue1 = baseHue;                 // Primary color
    const hue2 = (baseHue + 120) % 360;   // Triadic color

    // Richer and brighter colors: increased saturation and lightness
    return [`hsl(${hue1}, 90%, 60%)`, `hsl(${hue2}, 90%, 50%)`];
  };

  const [color1, color2] = generateColors(email);

  // Base SVG string with the gradient
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

  // Serve SVG directly
  if (format === "svg") {
    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=604800, immutable",
      },
    });
  }

  // Convert to PNG if requested
  if (format === "png") {
    const canvas = createCanvas(120, 120);
    const ctx = canvas.getContext("2d");

    // Load the SVG into a canvas
    const svgBuffer = Buffer.from(svg);
    const image = await loadImage(`data:image/svg+xml;base64,${svgBuffer.toString("base64")}`);

    ctx.drawImage(image, 0, 0, 120, 120);

    // Convert the canvas to PNG
    const pngBuffer = canvas.toBuffer("image/png");
    return new NextResponse(pngBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=604800, immutable",
      },
    });
  }

  // If format is unsupported
  return new NextResponse("Unsupported format", { status: 400 });
}