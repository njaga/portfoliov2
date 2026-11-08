import type { Metadata } from "next";
import { cookies } from "next/headers";

import { SITE_INFO } from "@/config/site";
import { BLOG_TEXT } from "@/lib/blog-editorial";
import { addLocaleToPath, getLanguageAlternates, type Locale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get("locale")?.value === "en" ? "en" : "fr";
  const copy = BLOG_TEXT[locale];
  const title =
    locale === "fr"
      ? "Journal de bord"
      : "Build journal";
  const description = copy.introduction;
  const ogImage = SITE_INFO.url + SITE_INFO.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: addLocaleToPath("/blog", locale),
      languages: getLanguageAlternates("/blog"),
    },
    openGraph: {
      url: SITE_INFO.url + addLocaleToPath("/blog", locale),
      locale: locale === "fr" ? "fr_SN" : "en_US",
      type: "website",
      title,
      description,
      images: {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
