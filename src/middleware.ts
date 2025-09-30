import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import LogtoService from "./data/provider/logto/LogtoService";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let isAuthenticated = false;
  const logtoService = new LogtoService();

  try {
    isAuthenticated = await logtoService.isAuth();
  } catch (error) {
    console.error('Error al obtener el contexto de Logto en middleware:', error);
    isAuthenticated = false;
  }

  const publicRoutes = ["/auth"];
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route));

  const privateRoutes = ["/pos"];
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  if (isAuthenticated && isPrivateRoute) {
    return NextResponse.next();
  }

  if (!isAuthenticated && isPrivateRoute) {
    const loginUrl = new URL("/auth", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/pos", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};