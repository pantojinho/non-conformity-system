import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Refresh the Supabase session
  const response = await updateSession(request);

  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/signup", "/forgot-password", "/api/auth/callback"];
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

  // Handle locale cookie for next-intl (non-invasive)
  const locale = request.cookies.get("NEXT_LOCALE")?.value || "pt-BR";
  if (!["pt-BR", "en-US", "es-AR"].includes(locale)) {
    // invalid locale, just continue
  }

  // Set locale in request headers so next-intl can read it server-side
  const requestHeaders = new Headers(response.headers);
  requestHeaders.set("x-next-intl-locale", locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};