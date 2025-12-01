import type { Metadata } from "next";
import { cookies } from "next/headers";

import { defaultLocale, getTranslations, type Locale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value as Locale) || defaultLocale;
  const t = getTranslations(locale);

  return {
    title: t.contact.title,
    description: t.contact.description,
    openGraph: {
      title: t.contact.title,
      description: t.contact.description,
    },
    twitter: {
      card: "summary_large_image",
      title: t.contact.title,
      description: t.contact.description,
    },
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
