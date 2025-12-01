import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

export type Locale = "en" | "fr";

export const locales: Locale[] = ["en", "fr"];
export const defaultLocale: Locale = "en";

export const translations = {
  en,
  fr,
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment === "fr" || firstSegment === "en") {
    return firstSegment as Locale;
  }

  return defaultLocale;
}

export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment === "fr" || firstSegment === "en") {
    return "/" + segments.slice(1).join("/");
  }

  return pathname;
}

export function addLocaleToPath(pathname: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return pathname;
  }

  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/${locale}${cleanPath}`;
}
