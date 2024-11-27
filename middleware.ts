import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path matches a valid email-like pattern
  if (pathname.startsWith("/") && pathname.length > 1) {
    const email = pathname.slice(1); // Extract the email from the URL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validate email format

    if (emailRegex.test(email)) {
      // Rewrite the request to your API endpoint
      const url = request.nextUrl.clone();
      url.pathname = `/api/avatar/${email}`;
      url.searchParams.set("format", "png"); // Default to PNG
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}