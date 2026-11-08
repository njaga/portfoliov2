import type { Metadata } from "next";
import { cookies } from "next/headers";

import { addLocaleToPath, defaultLocale, getLanguageAlternates, getTranslations, type Locale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value as Locale) || defaultLocale;
  const t = getTranslations(locale);

  return {
    title: t.services.title,
    description: t.services.description,
    alternates: {
      canonical: addLocaleToPath("/services", locale),
      languages: getLanguageAlternates("/services"),
    },
    openGraph: {
      url: addLocaleToPath("/services", locale),
      locale: locale === "fr" ? "fr_SN" : "en_US",
      title: t.services.title,
      description: t.services.description,
    },
    twitter: {
      card: "summary_large_image",
      title: t.services.title,
      description: t.services.description,
    },
  };
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
