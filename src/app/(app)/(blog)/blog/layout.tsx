import type { Metadata } from "next";

import { BLOG_TEXT } from "@/lib/blog-editorial";
import { localizedMetadata } from "@/lib/seo";
import { getRequestLocale } from "@/lib/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const title = locale === "fr" ? "Journal de bord" : "Build journal";
  return localizedMetadata(locale, "/blog", title, BLOG_TEXT[locale].introduction);
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
