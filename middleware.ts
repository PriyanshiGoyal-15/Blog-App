import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Public routes
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")
  ) {
    return NextResponse.next();
  }

  // No token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const decoded: any = jwt.decode(token);

  // Admin protection
  if (pathname.startsWith("/dashboard") && decoded.role !== "admin") {
    return NextResponse.redirect(new URL("/user/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

/*
this matcher means:

Run middleware on:
/ (home page)
/dashboard
/login
/api/users
All your actual pages and APIs

DON'T run middleware on:
/_next/static/... (JavaScript, CSS files)
/_next/image/... (optimized images)
/favicon.ico (website icon)
*/
