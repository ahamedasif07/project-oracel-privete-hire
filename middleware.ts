import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("oracle_admin_session")?.value;

  const publicAdminRoutes = [
    "/admin/login",
    "/admin/forgot-password",
    "/admin/reset-password",
  ];

  const isPublicAdminRoute = publicAdminRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  // If attempting to access any protected admin route (not in public list)
  if (pathname.startsWith("/admin") && !isPublicAdminRoute) {
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If authenticated user visits public admin auth routes, redirect to /admin
  if (isPublicAdminRoute && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

