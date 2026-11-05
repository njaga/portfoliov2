import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";
import { getAllPosts, getPublicModifiedAt } from "@/data/blog";
import { PROJECTS } from "@/features/profile/data/projects";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_INFO.url}/blog/${post.slug}`,
    lastModified: getPublicModifiedAt(post.metadata),
  }));

  // Avoid assigning the build timestamp to pages that weren't actually updated.
  const projects = PROJECTS.map((project) => ({
    url: `${SITE_INFO.url}/projects/${project.id}`,
  }));

  const routes = ["", "/projects", "/services", "/blog", "/blog/archive", "/contact"].map(
    (route) => ({
      url: `${SITE_INFO.url}${route}`,
    })
  );

  return [...routes, ...posts, ...projects];
}
