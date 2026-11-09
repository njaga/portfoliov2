import type { Metadata } from "next";

import { getTranslations } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/seo";
import { getRequestLocale } from "@/lib/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const t = getTranslations(locale);

  return localizedMetadata(locale, "/contact", t.contact.title, t.contact.description);
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
