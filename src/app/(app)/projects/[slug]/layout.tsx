import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { SITE_INFO } from "@/config/site";
import { PROJECTS } from "@/features/profile/data/projects";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { getTranslatedProject } from "@/lib/translations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    return notFound();
  }

  // Récupérer la locale depuis les cookies
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value as Locale) || defaultLocale;

  const projectTranslation = getTranslatedProject(slug, locale);
  const title = projectTranslation?.title || project.title;
  const description = projectTranslation?.description || project.description;

  const ogImage = project.logo || SITE_INFO.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
      languages: {
        fr: `/projects/${slug}`,
        en: `/projects/${slug}`,
      },
    },
    openGraph: {
      url: `/projects/${slug}`,
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

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
