import { NextResponse, type NextRequest } from "next/server";
import { PUBLIC_URL } from "./config/url.config";

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname === PUBLIC_URL.auth();

  if (isAuthPage) {
    if (refreshToken) {
      const url = new URL(PUBLIC_URL.home(), request.url);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (refreshToken === undefined) {
    const url = new URL(PUBLIC_URL.auth(), request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/store/:path*", "/auth"],
};
