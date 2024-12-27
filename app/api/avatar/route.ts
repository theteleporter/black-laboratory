import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage } from "canvas";

// Helper function to generate unique color for each letter
const generateLetterColor = (letter: string, index: number) => {
  // Use the index to create a hash and generate a unique color
  const hash = letter.charCodeAt(0) + index * 10; // Create a simple hash
  const hue = hash % 360; // Create a color hue from the hash value
  return `hsl(${hue}, 90%, 60%)`; // Return the color as HSL
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const format = searchParams.get("format") || "png"; // Default format is PNG

  if (!email) {
    return new NextResponse("Email is required", { status: 400 });
  }

  // Generate unique colors for each letter in the email
  const letterColors = email.split('').map((letter, index) => generateLetterColor(letter, index));

  // Create SVG with unique colors for each letter
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${letterColors.map((color, index) => {
            return `<stop offset="${(index / email.length) * 100}%" stop-color="${color}" />`;
          }).join('')}
        </linearGradient>
      </defs>
      <rect width="120" height="120" fill="url(#gradient)" />
      <text x="50%" y="50%" font-size="30" text-anchor="middle" fill="white">${email}</text>
    </svg>
  `;

  // Return SVG if requested
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

  return new NextResponse("Unsupported format", { status: 400 });
}