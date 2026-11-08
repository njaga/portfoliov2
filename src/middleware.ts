import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getLocaleFromPath, removeLocaleFromPath } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // The URL, not a previous cookie or the visitor's browser, determines the
  // language. French lives at /, English at /en and /en/...
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = removeLocaleFromPath(pathname);
    return NextResponse.redirect(redirect, 308);
  }

  const locale = getLocaleFromPath(pathname);

  // Pass the locale to the current server render; a response cookie alone
  // would only become readable on the *next* request.
  request.cookies.set("locale", locale);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  const options = { request: { headers: requestHeaders } };
  let response: NextResponse;

  if (locale === "en") {
    const destination = request.nextUrl.clone();
    destination.pathname = removeLocaleFromPath(pathname);
    response = NextResponse.rewrite(destination, options);
  } else {
    response = NextResponse.next(options);
  }

  response.cookies.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*|favicon.ico).*)"],
};
