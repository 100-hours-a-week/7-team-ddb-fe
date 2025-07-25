import { NextRequest, NextResponse } from 'next/server';

const exactPublicPaths = [
  '/',
  '/onboarding',
  '/login-required',
  '/oauth/kakao/callback',
  '/moments',
  '/search',
  '/users',
];

const dynamicPublicPatterns = [
  /^\/moments\/\d+$/,
  /^\/places\/\d+$/,
  /^\/users\/\d+$/,
];

function isPublicPath(pathname: string): boolean {
  if (exactPublicPaths.includes(pathname)) {
    return true;
  }

  return dynamicPublicPatterns.some((pattern) => pattern.test(pathname));
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const pathname = request.nextUrl.pathname;
  const isPublic = isPublicPath(pathname);

  console.log('accessToken 확인', accessToken);
  console.log('pathname 확인', pathname);
  console.log('isPublic 확인', isPublic);

  if (!accessToken && !isPublic) {
    return NextResponse.redirect(new URL('/login-required', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
