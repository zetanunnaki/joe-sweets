import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'joe_admin_session';
const SESSION_VALUE = 'authenticated';
const LOGIN_PATH = '/joesweets-admin';
const DASHBOARD_PATH = '/joesweets-admin/dashboard';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only run on admin routes
  if (!pathname.startsWith('/joesweets-admin')) {
    return NextResponse.next();
  }

  const session = req.cookies.get(COOKIE_NAME);
  const isAuthenticated = session?.value === SESSION_VALUE;

  // If on login page and already authenticated → redirect to dashboard
  if (pathname === LOGIN_PATH && isAuthenticated) {
    return NextResponse.redirect(new URL(DASHBOARD_PATH, req.url));
  }

  // If on any admin page (not login) and not authenticated → redirect to login
  if (pathname !== LOGIN_PATH && !isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN_PATH, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/joesweets-admin', '/joesweets-admin/:path*'],
};
