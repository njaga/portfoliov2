import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

export type Locale = "en" | "fr";

export const locales: Locale[] = ["fr", "en"];
export const defaultLocale: Locale = "fr";

export const translations = { en, fr } as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}

export function removeLocaleFromPath(pathname: string): string {
  if (/^\/(en|fr)(\/|$)/.test(pathname)) {
    return pathname.replace(/^\/(en|fr)(?=\/|$)/, "") || "/";
  }

  return pathname;
}

/** Keep internal links in the currently selected language. */
export function addLocaleToPath(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const path = removeLocaleFromPath(href);
  return locale === "en" ? `/en${path === "/" ? "" : path}` : path;
}

export function getLanguageAlternates(path: string) {
  const cleanPath = removeLocaleFromPath(path);
  return {
    fr: addLocaleToPath(cleanPath, "fr"),
    en: addLocaleToPath(cleanPath, "en"),
    "x-default": addLocaleToPath(cleanPath, "fr"),
  };
}
