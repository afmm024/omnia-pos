import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import LogtoService from "./data/provider/logto/LogtoService";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const logtoService = new LogtoService();

  const isAuthenticated = await logtoService.isAuth();

  console.log(isAuthenticated)

  const publicRoutes = ["/auth"];
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route));

  const privateRoutes = ["/sales", "/turns"];
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  if (isAuthenticated && isPrivateRoute) {
    return NextResponse.next();
  }

  if (!isAuthenticated && isPrivateRoute) {
    const loginUrl = new URL("/auth", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && pathname === '/') {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};