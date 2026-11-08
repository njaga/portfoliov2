import type { Metadata } from "next";
import { cookies } from "next/headers";

import { addLocaleToPath, defaultLocale, getLanguageAlternates, getTranslations, type Locale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value as Locale) || defaultLocale;
  const t = getTranslations(locale);

  return {
    title: t.projects.title,
    description: t.projects.collection,
    alternates: {
      canonical: addLocaleToPath("/projects", locale),
      languages: getLanguageAlternates("/projects"),
    },
    openGraph: {
      url: addLocaleToPath("/projects", locale),
      locale: locale === "fr" ? "fr_SN" : "en_US",
      title: t.projects.title,
      description: t.projects.collection,
    },
    twitter: {
      card: "summary_large_image",
      title: t.projects.title,
      description: t.projects.collection,
    },
  };
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
