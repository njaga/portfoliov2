import dayjs from "dayjs";
import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";
import { getAllPosts } from "@/data/blog";
import { PROJECTS } from "@/features/profile/data/projects";
import { addLocaleToPath } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    path: `/blog/${post.slug}`,
    lastModified: dayjs(post.metadata.updatedAt).toISOString(),
  }));

  const projects = PROJECTS.map((project) => ({
    path: `/projects/${project.id}`,
  }));

  const routes = ["", "/projects", "/services", "/blog", "/blog/archive", "/contact"].map(
    (path) => ({ path: path || "/" })
  );

  // A common entry type avoids a union with an unknown lastModified field.
  const entries: { path: string; lastModified?: string }[] = [
    ...routes,
    ...posts,
    ...projects,
  ];

  // Each language has its own crawlable URL and reciprocal hreflang links.
  return entries.flatMap((entry) =>
    (["fr", "en"] as const).map((locale) => ({
      url: `${SITE_INFO.url}${addLocaleToPath(entry.path, locale)}`,
      lastModified: entry.lastModified,
      alternates: {
        languages: {
          fr: `${SITE_INFO.url}${addLocaleToPath(entry.path, "fr")}`,
          en: `${SITE_INFO.url}${addLocaleToPath(entry.path, "en")}`,
        },
      },
    }))
  );
}
