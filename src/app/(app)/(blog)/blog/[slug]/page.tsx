import dayjs from "dayjs";
import { getTableOfContents } from "fumadocs-core/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { BlogPosting as PageSchema, WithContext } from "schema-dts";

import { SITE_INFO } from "@/config/site";
import { findNeighbour, getAllPosts, getPostBySlug } from "@/data/blog";
import { USER } from "@/data/user";
import { defaultLocale } from "@/lib/i18n";
import type { Post } from "@/types/blog";

import { Back } from "./back";
import { BlogNavigation } from "./blog-navigation";
import { BlogPostContent } from "./blog-post-content";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;

  // Récupérer la locale depuis les cookies
  const { cookies: getCookies } = await import("next/headers");
  const cookieStore = await getCookies();
  const locale =
    (cookieStore.get("locale")?.value as "fr" | "en") || defaultLocale;

  const post = getPostBySlug(slug, locale);

  if (!post) {
    return notFound();
  }

  // Utiliser les traductions si disponibles
  const { getTranslatedBlogPost } = await import("@/lib/translations");
  const postTranslation = getTranslatedBlogPost(slug, locale);

  const title = postTranslation?.title || post.metadata.title;
  const description = postTranslation?.description || post.metadata.description;
  const { image, createdAt, updatedAt } = post.metadata;

  // Construire l'URL absolue de l'image
  const ogImagePath = image || `/og/simple?title=${encodeURIComponent(title)}`;
  const ogImage = ogImagePath.startsWith("http")
    ? ogImagePath
    : `${SITE_INFO.url}${ogImagePath}`;

  const blogUrl = `${SITE_INFO.url}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: {
        fr: `/blog/${post.slug}`,
        en: `/blog/${post.slug}`,
      },
    },
    openGraph: {
      url: blogUrl,
      type: "article",
      title,
      description,
      publishedTime: dayjs(createdAt).toISOString(),
      modifiedTime: dayjs(updatedAt).toISOString(),
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

function getPageJsonLd(post: Post): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    image:
      post.metadata.image ||
      `/og/simple?title=${encodeURIComponent(post.metadata.title)}`,
    url: `${SITE_INFO.url}/blog/${post.slug}`,
    datePublished: dayjs(post.metadata.createdAt).toISOString(),
    dateModified: dayjs(post.metadata.updatedAt).toISOString(),
    author: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params).slug;

  // Récupérer la locale depuis les cookies
  const { cookies: getCookies } = await import("next/headers");
  const cookieStore = await getCookies();
  const locale =
    (cookieStore.get("locale")?.value as "fr" | "en") || defaultLocale;

  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const toc = getTableOfContents(post.content);
  // const tocDepth2Count = toc.reduce(
  //   (count, item) => (item.depth === 2 ? count + 1 : count),
  //   0
  // );

  const allPosts = getAllPosts();
  const { previous, next } = findNeighbour(allPosts, slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(post)).replace(/</g, "\\u003c"),
        }}
      />

      <div className="flex items-center justify-between p-2 pl-4">
        <Suspense>
          <Back />
        </Suspense>

        <Suspense>
          <BlogNavigation previous={previous} next={next} />
        </Suspense>
      </div>

      <Suspense>
        <BlogPostContent post={post} toc={toc} />
      </Suspense>

      <div className="screen-line-before h-4 w-full" />
    </>
  );
}
