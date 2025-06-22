import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for a private route
  if (request.nextUrl.pathname.startsWith('/private')) {
    // Skip middleware for the login page itself
    if (request.nextUrl.pathname === '/private') {
      return NextResponse.next();
    }

    // Check for authentication token/session
    const authToken = request.cookies.get('auth-token');
    
    if (!authToken) {
      // Redirect to login page if not authenticated
      const loginUrl = new URL('/private', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Verify the token (simple check for now)
    try {
      // In a real app, you'd verify JWT or check against database
      const tokenValue = authToken.value;
      if (tokenValue !== 'authenticated-user') {
        throw new Error('Invalid token');
      }
    } catch (error) {
      // Invalid token, redirect to login
      const loginUrl = new URL('/private', request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('auth-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
