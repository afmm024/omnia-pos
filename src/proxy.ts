import LogtoService from '@/data/provider/logto/LogtoService';
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = [
    '/callback',
    '/logout',
    '/',
    '/auth',
];

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        PUBLIC_PATHS.includes(pathname)
    ) {
        return NextResponse.next();
    }

    const logtoService = new LogtoService();

    try {
        const isAuthenticated = await logtoService.isAuth();
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/logout', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error(error)
        return NextResponse.redirect(new URL('/logout', request.url));
    }
}

export const config = {
  matcher: [
    '/((?!api/logto|static|_next|favicon.ico|login|/$).*)',
  ],
};