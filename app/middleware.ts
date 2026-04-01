import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // If user tries to access /login or /signup directly
    if (pathname === '/login' || pathname === '/signup') {
        const mode = pathname === '/login' ? 'login' : 'signup';

        // Redirect to homepage + open the modal via query param
        const url = request.nextUrl.clone();
        url.pathname = '/';
        url.searchParams.set('auth', mode);

        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Run this middleware only for these paths
export const config = {
    matcher: ['/login', '/signup'],
};