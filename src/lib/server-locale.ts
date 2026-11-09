import { headers } from "next/headers";

import { defaultLocale, type Locale } from "@/lib/i18n";

/**
 * The middleware provides x-locale on the current request. Unlike a cookie,
 * it cannot hold a stale preference that overrides the explicit /en URL.
 */
export async function getRequestLocale(): Promise<Locale> {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-locale");
  return locale === "en" || locale === "fr" ? locale : defaultLocale;
}
