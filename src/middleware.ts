import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  //const authToken = request.cookies.get("auth_token")?.value;
  const isAuthenticated = false;

  const publicRoutes = ["/auth"];
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route));

  const privateRoutes = ["/sales", "/turns"];
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  if (isAuthenticated && pathname === "/") {
    return NextResponse.redirect(new URL("/sales", request.url));
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/sales", request.url));
  }

  if (!isAuthenticated && isPrivateRoute) {
    const loginUrl = new URL("/auth", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};