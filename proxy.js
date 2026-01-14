import { NextResponse } from 'next/server';

// Add the 'default' keyword here
export default function middleware(request) {
  const session = request.cookies.get('admin_session');

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};