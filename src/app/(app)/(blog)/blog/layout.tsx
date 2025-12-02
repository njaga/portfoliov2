import type { Metadata } from "next";
import { cookies } from "next/headers";

import { SITE_INFO } from "@/config/site";
import { defaultLocale, getTranslations, type Locale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value as Locale) || defaultLocale;
  const t = getTranslations(locale);

  const ogImage = `${SITE_INFO.url}${SITE_INFO.ogImage}`;

  return {
    title: t.blog.title,
    description: t.blog.description,
    openGraph: {
      url: `${SITE_INFO.url}/blog`,
      type: "website",
      title: t.blog.title,
      description: t.blog.description,
      images: {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: t.blog.title,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: t.blog.title,
      description: t.blog.description,
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
