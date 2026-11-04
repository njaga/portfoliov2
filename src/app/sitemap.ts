import dayjs from "dayjs";
import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";
import { getAllPosts } from "@/data/blog";
import { PROJECTS } from "@/features/profile/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_INFO.url}/blog/${post.slug}`,
    lastModified: dayjs(post.metadata.updatedAt).toISOString(),
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
