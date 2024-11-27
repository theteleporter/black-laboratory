import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage } from "canvas";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const format = searchParams.get("format") || "svg"; // Default format is SVG

  if (!email) {
    return new NextResponse("Email is required", { status: 400 });
  }

  // Generate colors using djb2 hash and triadic HSL
  const generateColors = (input: string) => {
  const hash = input.split("").reduce((acc, char) => acc * 33 + char.charCodeAt(0), 5381);

  const baseHue = Math.abs(hash % 360);
  const offset = Math.abs((hash >> 3) % 45); // Generate a semi-random offset for more variety
  const hue1 = (baseHue + offset) % 360;    // Slightly shift the first hue
  const hue2 = (baseHue + 120 + offset) % 360; // Shift the second hue

  // Randomize saturation and lightness within reasonable ranges
  const sat1 = 60 + Math.abs((hash >> 5) % 20); // 60-80%
  const light1 = 40 + Math.abs((hash >> 7) % 20); // 40-60%
  const sat2 = 70 + Math.abs((hash >> 8) % 10); // 70-80%
  const light2 = 35 + Math.abs((hash >> 9) % 15); // 35-50%

  return [
    `hsl(${hue1}, ${sat1}%, ${light1}%)`,
    `hsl(${hue2}, ${sat2}%, ${light2}%)`,
  ];
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