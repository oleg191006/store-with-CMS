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

  if (!refreshToken) {
    const url = new URL(PUBLIC_URL.auth(), request.url);
    return NextResponse.redirect(url);
  }

  try {
    const response = await fetch(
      `${process.env.SERVER_URL}/auth/access-token`,
      {
        method: "POST",
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const url = new URL(PUBLIC_URL.auth(), request.url);
      const redirectResponse = NextResponse.redirect(url);
      redirectResponse.cookies.delete("refreshToken");
      return redirectResponse;
    }
  } catch {
    const url = new URL(PUBLIC_URL.auth(), request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/store/:path*", "/auth"],
};
