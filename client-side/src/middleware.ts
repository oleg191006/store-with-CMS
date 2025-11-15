import { NextResponse, type NextRequest } from "next/server";
import { PUBLIC_URL } from "./config/url.config";

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isAuthPage = request.url.includes(PUBLIC_URL.auth());

  if (isAuthPage) {
    if (refreshToken) {
      return NextResponse.redirect(new URL(PUBLIC_URL.home(), request.url));
    }

    return NextResponse.next();
  }

  if (refreshToken === undefined) {
    return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/store/:path*", "/auth"],
};
