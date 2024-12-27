import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage } from "canvas";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const format = searchParams.get("format") || "png"; // Default format is PNG

  if (!email) {
    return new NextResponse("Email is required", { status: 400 });
  }

  // Generate a unique color for each letter instance
  const generateUniqueColors = (input: string) => {
    const colors: { [key: string]: string } = {};
    const generateColor = () => {
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 70%, 60%)`;
    };

    input.split("").forEach(() => {
      colors[uuidv4()] = generateColor();
    });

    return colors;
  };

  const letterColors = generateUniqueColors(email);

  // Create an SVG with each letter in its unique color
  const svgLetters = email.split("").map((char, index) => {
    const color = letterColors[Object.keys(letterColors)[index]];
    return `<text x="${10 + index * 12}" y="30" fill="${color}" font-size="20">${char}</text>`;
  });

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${email.length * 12 + 20}" height="50" viewBox="0 0 ${email.length * 12 + 20} 50">
      ${svgLetters.join("\n")}
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
    const canvas = createCanvas(email.length * 12 + 20, 50);
    const ctx = canvas.getContext("2d");

    // Load the SVG into the canvas
    const svgBuffer = Buffer.from(svg);
    const image = await loadImage(`data:image/svg+xml;base64,${svgBuffer.toString("base64")}`);

    ctx.drawImage(image, 0, 0, email.length * 12 + 20, 50);

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