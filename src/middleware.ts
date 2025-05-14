import { NextRequest, NextResponse } from 'next/server';

type Routes = Record<string, boolean>;

const publicOnlyUrls: Routes = {
  '/onboarding': true,
  '/oauth/kakao/callback': true,
};

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  console.log('accessToken 확인', accessToken);
  console.log('exists 확인', exists);

  if (!accessToken) {
    if (!exists) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
