import type { Metadata } from "next";
import { cookies } from "next/headers";

import { SITE_INFO } from "@/config/site";
import { BLOG_TEXT } from "@/lib/blog-editorial";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get("locale")?.value === "fr" ? "fr" : "en";
  const copy = BLOG_TEXT[locale];
  const title =
    locale === "fr"
      ? "Journal de bord | Ndiaga Ndiaye"
      : "Build journal | Ndiaga Ndiaye";
  const description = copy.introduction;
  const ogImage = SITE_INFO.url + SITE_INFO.ogImage;

  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    openGraph: {
      url: SITE_INFO.url + "/blog",
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
