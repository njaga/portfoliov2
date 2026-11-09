import type { Metadata } from "next";

import { SITE_INFO } from "@/config/site";
import { addLocaleToPath, getLanguageAlternates, type Locale } from "@/lib/i18n";

export function localizedMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string
): Metadata {
  const localized = addLocaleToPath(path, locale);
  const url = new URL(localized, SITE_INFO.url).toString();
  const image = new URL(SITE_INFO.ogImage, SITE_INFO.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: localized,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      url,
      title,
      description,
      locale: locale === "fr" ? "fr_SN" : "en_US",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
