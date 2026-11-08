import { type NextRequest, NextResponse } from "next/server";

import { getLocaleFromPath, type Locale, removeLocaleFromPath } from "@/lib/i18n";

/** Choose the first supported language from the browser's weighted preferences. */
function getBrowserLocale(header: string | null): Locale {
  if (!header) return "fr";

  const languages = header
    .split(",")
    .map((entry, index) => {
      const [language, ...parameters] = entry.trim().split(";");
      const qualityParameter = parameters.find((part) =>
        part.trim().toLowerCase().startsWith("q=")
      );
      const quality = qualityParameter
        ? Number(qualityParameter.trim().slice(2))
        : 1;

      return { language: language.toLowerCase(), quality, index };
    })
    .filter(({ quality }) => Number.isFinite(quality) && quality > 0 && quality <= 1)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  for (const { language } of languages) {
    if (language === "en" || language.startsWith("en-")) return "en";
    if (language === "fr" || language.startsWith("fr-")) return "fr";
  }

  return "fr";
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Keep French canonical without a prefix. Explicit /en URLs always stay English.
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = removeLocaleFromPath(pathname);
    return NextResponse.redirect(redirect, 308);
  }

  // Detect the browser language only at the homepage entry point. Never
  // override an explicitly requested page or a manually selected language.
  if (pathname === "/") {
    const preference = request.cookies.get("locale_preference")?.value;
    const locale =
      preference === "en" || preference === "fr"
        ? preference
        : getBrowserLocale(request.headers.get("accept-language"));

    if (locale === "en") {
      const redirect = request.nextUrl.clone();
      redirect.pathname = "/en";
      const response = NextResponse.redirect(redirect, 307);
      response.headers.set("Vary", "Accept-Language, Cookie");
      return response;
    }
  }

  const locale = getLocaleFromPath(pathname);

  // Set the locale on this request so the server render sees it immediately.
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
