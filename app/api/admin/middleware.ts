import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  // Protect all paths starting with /admin
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      // If no token, redirect to login page
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      // Verify token
      jwt.verify(token, JWT_SECRET);
      // If token is valid, allow the request to proceed
      return NextResponse.next();
    } catch {
      // If token is expired or invalid, redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Allow all other requests to proceed
  return NextResponse.next();
}

export const config = {
  // Apply middleware to all paths starting with /admin
  matcher: ["/admin/:path*"],
};
