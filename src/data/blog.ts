import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type { Post, PostMetadata } from "@/types/blog";

function parseFrontmatter(fileContent: string) {
  const file = matter(fileContent);

  return {
    metadata: file.data as PostMetadata,
    content: file.content,
  };
}

function getMDXFiles(dir: string) {
  const allFiles = fs
    .readdirSync(dir)
    .filter((file) => path.extname(file) === ".mdx");

  // Exclure les fichiers avec suffixe de locale (ex: .fr.mdx, .en.mdx)
  // Ces fichiers seront chargés séparément par getPostBySlug selon la locale
  return allFiles.filter((file) => {
    const basename = path.basename(file, ".mdx");
    // Exclure les fichiers qui se terminent par .fr ou .en
    return !basename.endsWith(".fr") && !basename.endsWith(".en");
  });
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles.map<Post>((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));

    // Extraire le slug en enlevant le suffixe de locale s'il existe
    let slug = path.basename(file, path.extname(file));
    if (slug.endsWith(".fr") || slug.endsWith(".en")) {
      slug = slug.slice(0, -3);
    }

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getAllPosts(locale?: "en" | "fr") {
  const blogDir = path.join(process.cwd(), "src", "content", "blog");
  const posts = getMDXData(blogDir);

  // Si une locale est spécifiée, essayer de charger les versions traduites
  if (locale && locale !== "en") {
    return posts
      .map((post) => {
        // Chercher un fichier avec le suffixe de locale (ex: importance-site-web-2025.fr.mdx)
        const translatedPath = path.join(blogDir, `${post.slug}.${locale}.mdx`);
        if (fs.existsSync(translatedPath)) {
          const { metadata, content } = readMDXFile(translatedPath);
          return {
            ...post,
            metadata: { ...post.metadata, ...metadata },
            content,
          };
        }
        return post;
      })
      .sort(
        (a, b) =>
          new Date(b.metadata.createdAt).getTime() -
          new Date(a.metadata.createdAt).getTime()
      );
  }

  return posts.sort(
    (a, b) =>
      new Date(b.metadata.createdAt).getTime() -
      new Date(a.metadata.createdAt).getTime()
  );
}

export function getPostBySlug(slug: string, locale?: "en" | "fr") {
  const blogDir = path.join(process.cwd(), "src", "content", "blog");

  // Si une locale est spécifiée et différente de "en", chercher la version traduite
  if (locale && locale !== "en") {
    const translatedPath = path.join(blogDir, `${slug}.${locale}.mdx`);
    if (fs.existsSync(translatedPath)) {
      const { metadata, content } = readMDXFile(translatedPath);
      return {
        slug,
        metadata,
        content,
      };
    }
  }

  // Sinon, charger la version par défaut (anglais)
  const defaultPath = path.join(blogDir, `${slug}.mdx`);
  if (fs.existsSync(defaultPath)) {
    const { metadata, content } = readMDXFile(defaultPath);
    return {
      slug,
      metadata,
      content,
    };
  }

  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string) {
  return getAllPosts().filter((post) => post.metadata?.category === category);
}

export function findNeighbour(posts: Post[], slug: string) {
  const len = posts.length;

  for (let i = 0; i < len; ++i) {
    if (posts[i].slug === slug) {
      return {
        previous: i > 0 ? posts[i - 1] : null,
        next: i < len - 1 ? posts[i + 1] : null,
      };
    }
  }

  return { previous: null, next: null };
}
