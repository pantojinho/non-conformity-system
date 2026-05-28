
// Auth middleware utilities - see src/middleware.ts for the actual middleware
export function isPublicPath(pathname: string): boolean {
  const publicPaths = ["/login", "/signup", "/auth/callback"];
  return publicPaths.some((p) => pathname.startsWith(p));
}
