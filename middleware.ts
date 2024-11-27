import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path matches an email-like pattern
  if (pathname.startsWith("/") && pathname.length > 1) {
    const email = pathname.slice(1); // Extract the email from the URL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validate email format

    if (emailRegex.test(email)) {
      // Redirect to the avatar API with the default format as PNG
      const url = request.nextUrl.clone();
      url.pathname = `/api/avatar`; // Direct to API endpoint
      url.searchParams.set("email", email); // Pass email as query param
      url.searchParams.set("format", "png"); // Default to PNG format
      return NextResponse.redirect(url); // Redirect to the new API URL
    }
  }

  return NextResponse.next(); // Proceed as usual if no valid email
}