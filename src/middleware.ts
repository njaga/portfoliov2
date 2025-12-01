import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { defaultLocale, type Locale } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Ne pas traiter les routes API, statiques, etc.
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Détection de la langue préférée du navigateur ou cookie
  const cookieLocale = request.cookies.get("locale")?.value as
    | Locale
    | undefined;
  const acceptLanguage = request.headers.get("accept-language");
  let locale: Locale = cookieLocale || defaultLocale;

  if (!cookieLocale && acceptLanguage) {
    const preferredLocale = acceptLanguage.split(",")[0]?.split("-")[0];
    if (preferredLocale === "fr") {
      locale = "fr";
    }
  }

  // Créer une réponse et définir le cookie si nécessaire
  const response = NextResponse.next();

  // Définir le cookie de locale s'il n'existe pas
  if (!cookieLocale) {
    response.cookies.set("locale", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 an
      sameSite: "lax",
    });
  }

  // Ajouter un header pour que les composants puissent accéder à la locale
  response.headers.set("x-locale", locale);

  return response;
}

export const config = {
  matcher: [
    // Matcher toutes les routes sauf:
    // - api routes
    // - _next (Next.js internals)
    // - static files (images, etc.)
    // - favicon.ico
    "/((?!api|_next|.*\\..*|favicon.ico).*)",
  ],
};
