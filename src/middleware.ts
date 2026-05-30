import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Refresh the Supabase session — this returns a response with cookies set
  const response = await updateSession(request);

  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/forgot-password", "/api/auth/callback", "/api/debug-nps-schema"];
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Allow public routes
  if (isPublicRoute) {
    return response;
  }

  // Allow static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return response;
  }

  // Check for authenticated session via cookies
  const authCookie = request.cookies.getAll().find(
    (c) => c.name.includes("sb-") && c.name.includes("-auth-token")
  );

  if (!authCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return Response.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};