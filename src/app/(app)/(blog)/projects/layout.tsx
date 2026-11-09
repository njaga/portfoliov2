import type { Metadata } from "next";

import { getTranslations } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/seo";
import { getRequestLocale } from "@/lib/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const t = getTranslations(locale);

  return localizedMetadata(locale, "/projects", t.projects.title, t.projects.collection);
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
